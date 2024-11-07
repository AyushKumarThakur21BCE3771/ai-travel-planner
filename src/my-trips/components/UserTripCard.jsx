import React from "react";
import placeholder from "../../../images/placeholder.jpg";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div>
        <img src={placeholder} className="rounded-xl object-cover w-[200px]" />
        <div className="flex flex-col justify-center items-start">
          <h2 className="font-bold text-lg capitalize mt-1">
            {trip?.userSelection?.location}
          </h2>
          <p className="text-slate-500 text-sm">
            {trip?.userSelection?.totalDays} Days Trip in{" "}
            {trip?.userSelection?.budget} Budget
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
