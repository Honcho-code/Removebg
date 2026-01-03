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
      setSelectedColor: (color) =>
        set({
          selectedColor: color,
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
            selectedColor: null, // Reset color on new flow
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
          selectedColor: null, // Reset color
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
                "X-Api-Key": import.meta.env.VITE_REMOVE_BG_API_KEY,
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
      downloadImage: async () => {
        const { processedImage, selectedColor } = get();
        if (!processedImage) {
          toast.error("No processed image to download");
          return;
        }

        try {
          let downloadUrl = processedImage;

          if (selectedColor) {
            const canvas = document.createElement('canvas');
            const img = new Image();
            img.src = processedImage;
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });

            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // Fill background
            ctx.fillStyle = selectedColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw image
            ctx.drawImage(img, 0, 0);

            downloadUrl = canvas.toDataURL('image/png');
          }

          // Create a temporary link element
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `removebg_${Date.now()}.png`; // name the file
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          toast.success("Image downloaded successfully!");
        } catch (error) {
          console.error(error);
          toast.error("Failed to download image");
        }
      },
    };
  }),
  { name: "removebg-store" }
);
