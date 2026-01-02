import React, { use, useEffect, useState } from "react";
import { useStore } from "../Store/useStore";
import { HandCoins, LogOut } from "lucide-react";
import { assets } from "../../public/assets/assets";
import {useNavigate} from 'react-router-dom'

const Navber = () => {
  const [open, setOpen] = useState(false);
  const { user, signin, logout } = useStore();
  useEffect(() => {
    console.log(user);
  }, [user]);

  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center justify-between md:py-6">
        <img src="/Images/bg.png" alt="" width={50} className="cursor-pointer" onClick={()=>navigate('/')}/>
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-5">
              <div>
                <div className="flex items-center gap-3 mr-4">
                  <span className="text-[#17565D] font-bold ml-1">
                    Hello, {user.name}
                  </span>
                </div>
              </div>
              <div onClick={() => setOpen(!open)}>
                <div className="flex items-center bg-gray-200 px-3 py-2 gap-2 rounded-full cursor-pointer">
                  <img src={assets.credit_icon} alt="" className="w-6 h-6" />
                  <span className="text-[#17565D] font-bold ml-1">
                    {user.credits}
                  </span>
                </div>
                <div
                  className={`${
                    open ? "block" : "hidden"
                  } absolute bg-white shadow-lg rounded-lg mt-2 p-2  right-0 mx-4 md:mx-25 `}
                >
                  <div className="flex flex-col gap-3  items-center">
                    <div className="flex gap-3 items-center hover:bg-gray-200 px-4 py-2 rounded cursor-pointer" onClick={()=>navigate("/buycredit")}>
                      <HandCoins className="size-5" />
                      <span onClick={null}>Topup</span>
                    </div>
                    <div className="flex gap-3 items-center hover:bg-red-200 px-4 py-2 rounded cursor-pointer">
                      <LogOut className="size-5" />
                      <span onClick={logout}>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-[#17565D] text-white  px-4 py-2 rounded-full cursor-pointer hover:bg-[#0f3d40] transition-all duration-300 ease-in-out flex items-center gap-2 w-max"
              onClick={signin}
            >
              Get started 
              <img src={assets.arrow_icon} alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
