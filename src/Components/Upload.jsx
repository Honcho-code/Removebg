import React from "react";
import { useStore } from "../Store/useStore";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate()
  const { startRemoveBgFlow, user, signin } = useStore()
  const fileInputRef = React.useRef(null)

  const handleUpload = () => {
    if (user) {
      fileInputRef.current.click()
    } else {
      signin()
    }
  }

  return (
    <div className="py-10 md:py-12 ">
      <div className="flex flex-col justify-center items-center text-center space-y-10">
        <div>
          <h1 className="font-bold text-2xl">See the magic. Try now</h1>
          <p className="font-extralight">Start your free trial, no credit card needed. <br />You’ll get 10 free credits every month to test, build, and create.</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept='image/*'
            onChange={(e) => startRemoveBgFlow(e.target.files[0], navigate)}
          />
          <button
            onClick={handleUpload}
            className="bg-[#17565D] text-white px-6 py-3 rounded-full cursor-pointer hover:bg-[#0f3d40] transition-all duration-300 ease-in-out flex items-center gap-2 w-max"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <p>Upload Image</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
