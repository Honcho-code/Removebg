import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 md:my-20">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-3">About</h1>
        <p className="text-gray-500 font-extralight max-w-lg">
          This is an open source project aimed at providing a simple and
          efficient solution for removing image backgrounds.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-10">
        <div className="flex flex-col bg-gray-100 items-center text-center gap-1 px-5 md:px-8 py-6 rounded-lg drop-shadow-md hover:scale-105 transistion-all duration-500">
          <div className="w-10 h-10 bg-[#17565D] rounded-full text-white flex items-center justify-center mx-auto mb-4">
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
          </div>
          <h1 className="text-2xl font-semibold">Upload image</h1>
          <p className="text-gray-500 font-extralight">Select Image format you want to remove background</p>
        </div>
        <div className="flex flex-col bg-gray-100 items-center text-center gap-1 px-5 md:px-8 py-6 rounded-lg drop-shadow-md hover:scale-105 transition-all duration-500">
          <div className="w-10 h-10 bg-[#17565D] rounded-full text-white flex items-center justify-center mx-auto mb-4">
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
          </div>
          <h1 className="text-2xl font-semibold">AI removes the background</h1>
          <p className="text-gray-500 font-extralight">Our advanced AI algorithms automatically detect and remove backgrounds from images.</p>
        </div>
        <div className="flex flex-col bg-gray-100 items-center text-center gap-1 px-5 md:px-8 py-6 rounded-lg drop-shadow-md hover:scale-105 transistion-all duration-500">
          <div className="w-10 h-10 bg-[#17565D] rounded-full text-white flex items-center justify-center mx-auto mb-4">
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
          </div>
          <h1 className="text-2xl font-semibold">Download Image</h1>
          <p className="text-gray-500 font-extralight">Once the background is removed, you can download the new image with ease.</p>
        </div>
      
      </div>
    </div>
  );
};

export default About;
