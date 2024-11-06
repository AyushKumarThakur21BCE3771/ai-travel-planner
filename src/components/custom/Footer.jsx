import React from "react";
import logo from "../../../images/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="h-[60px] bg-slate-200 shadow-inner px-10 py-4 flex justify-between fixed bottom-0 left-0 right-0">
      <div className="flex h-[40px] items-center justify-center gap-8">
        <Link to={"/"}><img src={logo} className="h-[40px]" /></Link>
        <p> &copy; 2024 Company, Inc</p>
      </div>
      <div className="flex gap-10 h-[30px] justify-center items-center">
        <FaFacebook className="scale-150" />
        <FaSquareInstagram className="scale-150" />
        <FaSquareXTwitter className="scale-150" />
      </div>
    </div>
  );
}

export default Footer;
