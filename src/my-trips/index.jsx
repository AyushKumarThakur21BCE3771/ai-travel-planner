import { db } from "@/constants/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import UserTripCard from "./components/UserTripCard";
import sandTimer from "../../images/sandTimer.gif";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function MyTrips() {
  const [userTrips, setUsertrips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    setLoading(true);
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
      trips.push(doc.data());
    });

    setUsertrips(trips);
    setLoading(false);
  };

  return (
    <div className="mb-20">
      {loading ? (
        <div className="mt-[300px]">
          <img src={sandTimer} alt="" className="m-auto scale-150" />
        </div>
      ) : (
        <div className="sm:px-1 md:px:32 lg:px-56 px-5 mt-20 w-[90%] m-auto">
          <div className="flex mb-4">
          <h2 className="text-[#f56551] font-bold mt-5 mb-4 text-md sm:text-xl capitalize">
            My Trips&nbsp;&nbsp;🗺️ 🚁 🍸
          </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mx-16">
            {userTrips.map((trip, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger><UserTripCard trip={trip} key={index} /></TooltipTrigger>
                  <TooltipContent className="relative top-10">
                    Click To View Trip History
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
