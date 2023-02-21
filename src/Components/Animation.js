import React from "react";
import Lottie from "react-lottie";
import animationData from "../lottie/movieAnim1.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

function Animation() {
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}

export default Animation;