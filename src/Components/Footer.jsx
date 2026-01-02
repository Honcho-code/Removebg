import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center gap-5">
        <img
          src="/Images/bg.png"
          alt=""
          className="w-12 border-r border-gray-400 pr-4"
        />
        <p className="text-xs font-extralight">
          All right reserved Rapheal@2025
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="https://x.com/Honchocode" className="" target="_blank">
          <img src="/assets/twitter_icon.svg" alt="" className="w-10" />
        </a>
        <a href="https://rapheal-clinton.vercel.app" className="" target="_blank">
          <img src="/assets/google_plus_icon.svg" alt="" className="w-10" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
