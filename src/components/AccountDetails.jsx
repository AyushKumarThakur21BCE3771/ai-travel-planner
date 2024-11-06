import React, { useEffect, useState } from "react";
import { auth, db } from "../constants/firebase.js";
import { getDoc, doc } from "firebase/firestore";
import logout from "../../images/logout.png";
import Cookies from "js-cookie";

const Card = () => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        // console.log(userDetails);
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
      Cookies.remove('token');
      localStorage.removeItem("user");
      window.location.href = "/auth/signin";
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-[600px]">
      <div className="group before:hover:scale-95 before:hover:w-80 before:hover:h-40 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-90 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
        <div className="w-28 h-28 bg-[#e49287] mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-[70%] group-hover:-translate-x-24 group-hover:-translate-y-[30px] transition-all duration-500">
          <img src="https://avatar.iran.liara.run/public" />
        </div>
        <div className="z-10 group-hover:-translate-y-[60px] transition-all duration-500">
          <span className="text-2xl font-semibold">
            {userDetails ? userDetails.name : ""}
          </span>
          <p>{userDetails ? userDetails.email : ""}</p>
        </div>
        <div
          className="bg-[#f56551] flex items-center h-[35px] justify-center gap-3 px-3 py-1 text-black-500 rounded-md z-10 transition-all duration-500 hover:cursor-pointer mt-10 mb-4"
          onClick={handleLogout}
        >
          Logout <span><img src={logout} className="h-[15px] w-[15px]"/></span>
        </div>
      </div>
    </div>
  );
};

export default Card;
