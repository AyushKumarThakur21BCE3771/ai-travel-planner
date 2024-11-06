import React from "react";
import placeholder from "../../../images/placeholder.jpg";
import { IoMdShare } from "react-icons/io";
import { Button } from "@/components/ui/button";

function InfoSection({ trip }) {
  return (
    <div>
      <img
        src={placeholder}
        className="h-[200px] sm:h-[300px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-xl sm:text-2xl capitalize">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex flex-col gap-5 sm:flex-row">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700">
              📅 {trip?.userSelection?.totalDays}
              {trip?.userSelection?.totalDays > 1 ? " Days" : " Day"}
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700">
              💸 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700">
              🧑‍🤝‍🧑 No. of Travellers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button className="scale-75">
          <IoMdShare className="scale-150" />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
