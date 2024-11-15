import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import banner from "../../../images/banner-img.jpg";
import Cookies from "js-cookie";

function Hero() {
  const handleCreateTrip = async () => {
    const token = Cookies.get("token");

    if (!token) {
      window.location.href = "/auth/signin";
    } else {
      window.location.href = "/create-trip";
    }
  };

  return (
    <div
      className="flex
    items-center gap-2 flex-col"
      id="screen-size"
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
      <img src={banner} style={{ width: "500px", height: "350px" }} />
      <p className="text-xl text-gray-500">
        Plan with Ease, Travel with Peace !
      </p>
      <Button className="mt-4" onClick={handleCreateTrip}>
        Get Started, It's Free
      </Button>
    </div>
  );
}

export default Hero;
