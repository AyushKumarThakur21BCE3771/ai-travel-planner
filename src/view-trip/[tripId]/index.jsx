import { db } from "@/constants/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";
import Footer from "../../components/custom/Footer";
import sandTimer from "../../../images/sandTimer.gif";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBookOption, setShowBookOption] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(false);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, "AiTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error("Error fetching trip data:", err);
      setError("Failed to load trip data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <img src={sandTimer} className="mt-80 m-auto" alt="" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="p-4 md:px-20 lg:px-44 xl:px-56">
          {/* Information Section */}
          <InfoSection trip={trip} showBookOption={showBookOption} paymentStatus={paymentStatus} />

          {/* Recommended Hotels */}
          <Hotels trip={trip} showBookOption={showBookOption} setShowBookOption={setShowBookOption} paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus}/>

          {/* Itinerary Plans */}
          <Itinerary trip={trip} />
        </div>
      )}
    </div>
  );
}

export default ViewTrip;
