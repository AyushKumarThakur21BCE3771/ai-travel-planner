import React, { useEffect, useState } from "react";
import { auth, db } from "../constants/firebase.js";
import { getDoc, doc, setDoc } from "firebase/firestore";
import logout from "../../images/logout.png";
import Cookies from "js-cookie";
import sandTimer from "../../images/sandTimer.gif";
import infinityLoader from "../../images/infinityLoader.gif";
import Footer from "./custom/Footer.jsx";
import { Link } from "react-router-dom";
import { Input } from "postcss";
import { toast } from "sonner";

const Card = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [travelPreferences, setTravelPreferences] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        setLoading(false);
      } else {
        console.log("user not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      Cookies.remove("token");
      localStorage.removeItem("user");
      if (localStorage.getItem("hotelPayment")) {
        localStorage.removeItem("hotelPayment");
      }
      if (localStorage.getItem("rateTripOption")) {
        localStorage.removeItem("rateTripOption");
      }
      window.location.href = "/auth/signin";
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleSavePreferences = async () => {
    if (travelPreferences == "") {
      toast.error("Please provide some preferences !");
      return;
    }
    setSaveLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const docId = Date.now().toString();
      await setDoc(doc(db, "Preferences", docId), {
        travelPreferences: travelPreferences,
        userEmail: user?.email,
      });
      toast.success("Travel Preferences Saved Successfully !");
      setTravelPreferences("");
      setSaveLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[600px]">
      {loading ? (
        <div>
          <img src={sandTimer} alt="" className="m-auto scale-150" />
        </div>
      ) : (
        <div className="group before:hover:scale-95 before:hover:w-80 before:hover:h-40 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-90 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
          <div className="w-28 h-28 bg-[#e49287] mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-[70%] group-hover:-translate-x-24 group-hover:-translate-y-[30px] transition-all duration-500">
            <img src="https://i.ibb.co/RTKjrQq/rb-4704.png" />
          </div>
          <div className="z-10 group-hover:-translate-y-[60px] transition-all duration-500">
            <span className="text-2xl font-semibold">
              {userDetails ? userDetails.name : ""}
            </span>
            <p>{userDetails ? userDetails.email : ""}</p>
          </div>
          <div className=" w-[100%] flex flex-col items-start text-slate-500 px-5">
            <Link to={"/my-trips"} className="hover:text-slate-900 mb-2">
              Travel History
            </Link>
            <div className="input-container bg-inherit w-[100%] flex flex-col items-start mb-2">
              <label className="text-slate-900">Travel Preferences</label>
              <div className="flex justify-between w-[100%]">
                <input
                  placeholder="Ex: Peace, Nature"
                  type="text"
                  value={travelPreferences}
                  className="bg-inherit outline-none text-xs border-2 p-1 w-[75%] rounded-md"
                  onChange={(e) => setTravelPreferences(e.target.value)}
                />
                {!saveLoading ? (
                  <button
                    className="w-12 px-2 rounded-md text-sm pb-1 bg-slate-800 text-white"
                    onClick={handleSavePreferences}
                  >
                    Save
                  </button>
                ) : (
                  <img
                    src={infinityLoader}
                    className="w-[35px] h-[28px]"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="bg-[#f56551] flex items-center h-[35px] justify-center gap-3 px-3 py-1 text-black-500 rounded-md z-10 transition-all duration-500 hover:cursor-pointer mt-5 mb-4"
            onClick={handleLogout}
          >
            Logout{" "}
            <span>
              <img src={logout} className="h-[15px] w-[15px]" />
            </span>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Card;
