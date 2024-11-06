import React from "react";
import placeholder from "../../../images/placeholder.jpg";

function Itinerary({ trip }) {
  const { itinerary } = trip?.tripData || {};
  return (
    <div>
      <h2 className="text-[#f56551] font-medium mt-5 mb-4 text-md sm:text-xl capitalize">
        Itinerary
      </h2>
      {Object.keys(itinerary || {}).map((day, index) => (
        <div
          key={day}
          className="bg-white rounded-md mb-4 grid sm:grid-cols-2 sm:gap-3  hover:scale-95 transition-all cursor-pointer"
        >
          <h3 className="text-lg font-semibold mt-4">Day {index + 1}</h3>
          <p className="text-sm text-gray-500 sm:mt-4">
            Best Time: {itinerary[day].bestTime}
          </p>
          {itinerary[day].plan.map((place, index) => (
            <div
              key={index}
              className="flex space-x-4 mt-4 shadow rounded-md p-4"
            >
              <img
                // src={place.placeImageUrl}
                src={placeholder}
                alt={place.placeName}
                className="w-20 h-20 object-cover rounded-md text-gray-500 text-xs"
              />
              <div>
                <h4 className="font-semibold">{place.placeName}</h4>
                <p className="text-gray-500 text-xs">{place.placeDetails}</p>
                <p className="text-gray-800 mt-1 text-xs">
                  🕜 Time to Travel: {place.timeToTravel}
                </p>
                <p className="text-gray-800 text-xs">
                  🎫 Ticket Pricing: {place.ticketPricing}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="h-[10px] mb-10 "></div>
    </div>
  );
}

export default Itinerary;
