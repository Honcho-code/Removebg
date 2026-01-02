import React from "react";
import { X } from "lucide-react";
import { useStore } from "../Store/useStore";
import Loading from "./Loading";
import { toast } from "react-toastify";

const PlanModel = () => {
  const {  selectedPlan, closeModel, checkout, checkingOut } = useStore();
  const handlehandleCheckout = (selectedPlan)=>{
    checkout()
    toast.success(`${selectedPlan.credits}credits sucessfully added to your balance`)
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg mx-4 md:max-w-sm w-full">
        <div className="flex justify-between items-start pb-2 border-b border-gray-200 mb-4">
          <div className="flex flex-col gap-1 my-3">
            <p className="text-2xl font-bold text-[#17565D]">{selectedPlan.id}</p>
            <h2 className="text-sm font-extralight text-gray-600">{selectedPlan.desc}</h2>
          </div>
          <div className="cursor-pointer" onClick={closeModel}>
            <X />
          </div>
        </div>
        <div className="">
            <h1 className="text-lg">FEATURES</h1>
            <ul className="flex flex-col gap-3 my-5">
                {selectedPlan.features.map((item)=>(
                    <li className="text-sm font-light">- {item}</li>
                ))}
            </ul>
        </div>
        {checkingOut ?(<button className="w-full py-2 rounded bg-[#17565D] text-white mt-5 cursor-pointer text-center m-auto" onClick={checkout}><Loading/></button>): (<button className="w-full py-2 rounded bg-[#17565D] text-white mt-5 cursor-pointer" onClick={()=>handlehandleCheckout(selectedPlan)}>Checkout ${selectedPlan.price}</button>)}
      </div>
    </div>
  );
};

export default PlanModel;
