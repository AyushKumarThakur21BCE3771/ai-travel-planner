import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import placeholder from "../../../images/placeholder.jpg";
import { toast } from "sonner";
import Cookies from "js-cookie";

function Hotels({ trip, showBookOption, setShowBookOption }) {
  const { hotelOptions } = trip?.tripData || {};
  const handlePayment = () => {
    toast.success("payment done..");
    setShowBookOption(!showBookOption);
    window.open("https://ayushkumarthakur-portfolio.vercel.app", "_blank");
  };
  return (
    <div>
      <h2 className="text-[#f56551] font-medium mt-5 mb-4 text-md sm:text-xl capitalize">
        Hotels Recommendation
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotelOptions &&
          hotelOptions.map((hotel, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-md p-4 mb-4 flex flex-col gap-2"
            >
              <img
                //   src={hotel.hotelImageUrl}
                src={`https://source.unsplash.com/random/400x300/?hotel`}
                alt={hotel.hotelName}
                className="w-full h-28 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{hotel.hotelName}</h3>
              <p className="text-gray-500 text-xs">{hotel.description}</p>
              <p className="text-gray-800 text-sm">
                📍 Address: {hotel.hotelAddress}
              </p>
              <p className="text-gray-800 text-sm">
                💲Price Range: {hotel.price}
              </p>
              <p className="text-gray-800 text-sm">
                🌟 Rating: {hotel.rating} / 5
              </p>
              {showBookOption?(<button
                className="bg-[#f56551] py-1 rounded-md cursor-pointer"
                onClick={handlePayment}
              >
                Book Now
              </button>):(<div></div>)}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Hotels;
