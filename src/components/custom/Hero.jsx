import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import banner from "../../../images/banner-img.jpg";

function Hero() {
  return (
    <div
      className="flex
    items-center gap-2 flex-col" id="screen-size"
    >
      <h1 className="font-extrabold text-center mt-20" id="heading">
        <span className="text-[#f56551] text-[25px] sm:text-[30px] lg:text-[40px] px-5">
          Discover Your next Adventure with AI
        </span>
        <br />
        <span className="text-[15px] sm:text-[20px] lg:text-[30px]">
          Personlized Itineraries at Your Fingertips
        </span>
      </h1>
      <img src={banner} style={{width:"500px", height:"350px"}} />
      <p className="text-xl text-gray-500">
        Plan with Ease, Travel with Peace !
      </p>
      <Link to={"/create-trip"}>
        <Button className="mt-4">Get Started, It's Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
