import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, db, googleProvider } from "./firebase";
import { toast } from "react-toastify";
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { removeBackground } from "../removeBackground";
import axios from "axios";

export const useStore = create(
  persist((set, get) => {
    return {
      user: null,
      loading: false,
      error: null,
      isOpen: false,
      selectedPlan: null,
      checkingOut: false,
      checkoutSuccess: false,
      image: null,
      processedImage: null,
      openModel: (plan) =>
        set({
          isOpen: true,
          selectedPlan: plan,
        }),
      closeModel: () =>
        set({
          isOpen: false,
          selectedPlan: null,
        }),
      signin: async () => {
        set({ loading: true, error: null });
        try {
          const credential = await signInWithPopup(auth, googleProvider);
          const user = credential.user;
          const useRef = doc(db, "users", credential.user.uid);
          const snap = await getDoc(useRef);

          if (!snap.exists()) {
            await setDoc(useRef, {
              name: credential.user.displayName || "",
              email: credential.user.email,
              credits: 10,
              createdAt: serverTimestamp(),
            });
          }
          const freshSnap = await getDoc(useRef);

          set({
            user: {
              id: credential.user.uid,
              ...freshSnap.data(),
            },
            loading: false,
          });
        } catch (error) {
          set({ loading: false, error: error.message });
        } finally {
          set({ loading: false });
        }
      },
      checkout: async () => {
        const { selectedPlan, user } = get();
        if (!user || !selectedPlan) return;

        set({ checkingOut: true });

        try {
          await new Promise((res) => setTimeout(res, 2000));
          const userRef = doc(db, "users", user.id);

          await updateDoc(userRef, {
            credits: increment(selectedPlan.credits),
          });

          // update local state AFTER DB success
          set((state) => ({
            user: {
              ...state.user,
              credits: state.user.credits + selectedPlan.credits,
            },
            isOpen: false,
            selectedPlan: null,
            checkoutSuccess: true,
            checkingOut: false,
          }));
        } catch (error) {
          set({ checkingOut: false, error: error.message });
        }
      },
      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },
      startRemoveBgFlow: (file, navigate) => {
        const { user, imagePreview } = get();

        try {
          if (!user) {
            toast.info("Please sign in to remove background");
            return;
          }
          if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
          }
          set({
            image: file,
            imagePreview: URL.createObjectURL(file),
            processedImage: null,
          });

          navigate("/result");
        } catch (error) {
          set({ error: error.message });
        }
      },
      resetImageFlopw: () => {
        const { imagePreview } = get();
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        set({
          imageFile: null,
          imagePreview: null,
          processedImage: null,
        });
      },
      removeBackground: async () => {
        const { image, user } = get();
        if (!image) {
          toast.error("Please upload image file (jpg, jpeg)");
          return;
        }
        if (!user) {
          toast.error("Please sign in to remove background");
          return;
        }
        if (user.credits <= 0) {
          toast.error("Credit is low, topup credit to remove background!");
          return;
        }

        set({ loading: true, error: null });

        try {
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (err) => reject(err);
          });

          const response = await axios.post(
            "https://api.remove.bg/v1.0/removebg",
            { image_file_b64: base64, size: "auto" },
            {
              headers: {
                "X-Api-Key": "dvVgJSVgfe5Nc4bPQ1BauNLG",
                "Content-Type": "application/json",
              },
              responseType: "arraybuffer",
            }
          );

          // convert ArrayBuffer to base64 (browser safe)
          const arrayBufferToBase64 = (buffer) => {
            let binary = "";
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
          };

          const resultBase64 = arrayBufferToBase64(response.data);

          // update user credits & processed image
          set((state) => ({
            processedImage: `data:image/png;base64,${resultBase64}`,
            user: {
              ...state.user,
              credits: state.user.credits - 1,
            },
          }));
          toast.success("Background image sucessfully removed.");
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },
      downloadImage: () => {
        const { processedImage } = get();
        if (!processedImage) {
          toast.error("No processed image to download");
          return;
        }

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = processedImage;
        link.download = `removebg_${Date.now()}.png`; // name the file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Image downloaded successfully!");
      },
    };
  }),
  { name: "removebg-store" }
);
