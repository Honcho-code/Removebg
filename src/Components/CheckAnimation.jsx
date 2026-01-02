import Lottie from "lottie-react";
import check from '../../public/assets/check.json'


const CheckAnimation = ({ playing }) => {
  return (
    <div className="w-32 h-32">
      <Lottie
        animationData={check}
        loop={false}
        autoplay={playing}
      />
    </div>
  );
};

export default CheckAnimation;
