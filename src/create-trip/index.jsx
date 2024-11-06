import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.jsx";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTraveleesList,
} from "../constants/options.jsx";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel.jsx";
import Cookies from "js-cookie";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/constants/firebase.js";
import { useNavigate } from "react-router-dom";
import Footer from "../components/custom/Footer.jsx";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name == "noOfDays" && value > 30) {
      toast("Please enter number of days less than 30!");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateTrip = async () => {
    if (
      formData?.noOfDays > 30 ||
      !formData?.location ||
      !formData?.traveler ||
      !formData?.budget
    ) {
      toast("Please fill all details !");
      return;
    }

    const token = Cookies.get("token");

    if (token) {
      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
        .replace("{totalDays}", formData?.totalDays)
        .replace("{budget}", formData?.budget)
        .replace("{traveler}", formData?.traveler);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      // console.log(result?.response?.text());
      saveTrip(result?.response?.text());
      setLoading(false);
      setUserLoggedIn(true);
    } else {
      console.log("user needs to log in first to generate trip");
    }
  };

  const saveTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    console.log(docId);
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <>
      <div className="sm:px-10 md:px:32 lg:px-56 xl:px-10 px-5 mt-20 lg:w-[60%] m-auto">
        <div>
          <h1 className="font-bold text-3xl">
            Tell us your travel preferences 🏕️🌴
          </h1>
          <p className="mt-3 text-gray-500 text-xl">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>
          <div className="mt-10 flex flex-col gap-10">
            <div>
              <h2 className="text-xl my-3 font-medium">
                What is destination of your choice?
              </h2>
              {/* <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            /> */}
              <Input
                placeholder={"Enter your destination place"}
                type="text"
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
            <div>
              <h2 className="text-xl my-3 font-medium">
                How many days are you planning for?
              </h2>
              <Input
                placeholder={"Ex: 3"}
                type="text"
                onChange={(e) => handleInputChange("totalDays", e.target.value)}
              />
            </div>
            <div>
              <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
              <div className="cursor-pointer grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg hover:shadow-sm ${
                      formData?.budget == item.title &&
                      "border-3 border-[#f56551]"
                    }`}
                    onClick={() => handleInputChange("budget", item.title)}
                  >
                    <h2 className="text-3xl">{item.icon}</h2>
                    <h2 className="font-bold mt-2">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl my-3 font-medium">
                Who do you want to travel with on your next trip?
              </h2>
              <div className="cursor-pointer grid grid-cols-2 gap-5 mt-5">
                {SelectTraveleesList.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg hover:shadow-sm ${
                      formData?.traveler == item.people &&
                      "border-3 border-[#f56551]"
                    }`}
                    onClick={() => handleInputChange("traveler", item.people)}
                  >
                    <h2 className="text-3xl">{item.icon}</h2>
                    <h2 className="font-bold mt-2">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
            <Button
              disabled={loading}
              className="bg-[#f56551] mt-5 mb-20 font-semibold"
              onClick={generateTrip}
            >
              {loading ? "Trip being generated !" : "Generate Trip"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateTrip;
