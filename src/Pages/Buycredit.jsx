import React from "react";
import Navber from "../Components/Navber";
import Plan from "../Components/Plan";
import Footer from "../Components/Footer";
import PlanModel from "../Components/PlanModel";
import { useStore } from "../Store/useStore";

const Buycredit = () => {
  const isOpen = useStore((state) => state.isOpen);

  return (
    <div className="p-4 md:px-25">
      <Navber />
      <Plan />
      {isOpen && <PlanModel />}
      {/* <Footer /> */}
    </div>
  );
};

export default Buycredit;
