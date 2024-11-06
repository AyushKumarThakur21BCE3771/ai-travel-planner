import { db } from "@/constants/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";
import Footer from "../../components/custom/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="mt-20">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="p-4 md:px-20 lg:px-44 xl:px-56">
          {/* Information Section */}
          <InfoSection trip={trip} />

          {/* Recommended Hotels */}
          <Hotels trip={trip} />

          {/* Itinerary Plans */}
          <Itinerary trip={trip} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ViewTrip;
