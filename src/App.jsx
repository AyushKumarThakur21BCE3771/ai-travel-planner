import "./App.css";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTrip from "./create-trip";
import Home from "./Home";
import Header from "./components/custom/Header";
import SignIn from "./components/signIn";
import SignUp from "./components/SignUp";
import AccountDetails from "./components/AccountDetails";
import ViewTrip from "./view-trip/[tripId]/index";
import Footer from "./components/custom/Footer";
import MyTrips from "./my-trips";

const App = () => {
  return (
    <Router>
      <Header />
      <Toaster position={"top-center"} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:tripId" element={<ViewTrip />} />
        <Route path="/user/details" element={<AccountDetails />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </Router>
  );
};

export default App;
