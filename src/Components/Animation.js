import React from "react";
import Lottie from "react-lottie";
import animationData from "../lottie/movieAnim1.json";
import './Animation.css'

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
    <div className="movAnim" > 
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default Animation;
