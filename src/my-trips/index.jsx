import { db } from "@/constants/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import UserTripCard from "./components/UserTripCard";

function MyTrips() {
  const [userTrips, setUsertrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/auth/signin";
      return;
    }

    const q = query(
      collection(db, "AiTrips"),
      where("userEmail", "==", user.email)
    );

    const querySnap = await getDocs(q);
    const trips = [];

    querySnap.forEach((doc) => {
      console.log(doc.data());
      trips.push(doc.data());
    });

    setUsertrips(trips);
  };

  return (
    <div className="sm:px-10 md:px:32 lg:px-56 xl:px-10 px-5 mt-20 lg:w-[60%] m-auto">
      <h2 className="text-[#f56551] font-medium mt-5 mb-4 text-md sm:text-xl capitalize">
        My Trips
      </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-16">
          {userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))}
      </div>
    </div>
  );
}

export default MyTrips;
