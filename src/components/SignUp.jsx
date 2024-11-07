import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "sonner";
import { auth, db } from "../constants/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import Cookies from "js-cookie";
import infinityLoader from "../../images/infinityLoader.gif";

const Form = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all details !");
      setLoading(false);
      return;
    }
    if (formData.password != formData.confirmPassword) {
      alert("Confirm Password must be same !");
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = auth.currentUser;
      // console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: formData.name,
        });
        const authToken = user.accessToken;
        Cookies.set("token", authToken, { expires: 7 });
        console.log(Cookies.get("token"));
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
          })
        );
      }
      window.location.href = "/create-trip";
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <StyledWrapper>
      <div className="form-box">
        <form className="form">
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              placeholder="Enter Full Name"
              type="text"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Enter email"
              type="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <span>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="input-container">
            <input
              placeholder="Enter password"
              type="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <span>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="input-container">
            <input
              placeholder="Confirm password"
              type="password"
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            />
            <span>
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!loading ? (<button className="submit" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>):(
            <img src={infinityLoader} className="scale-75 m-auto" alt="" />
          )}
          <p className="signup-link">
            Already a Member?&nbsp;&nbsp;
            <Link to={"/auth/signin"}>Sign In</Link>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-box {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }
  .form {
    background-color: #fff;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
    margin-bottom: 20px;
  }

  .input-container {
    position: relative;
  }

  .input-container input,
  .form button {
    outline: none;
    border: 1px solid #f56551;
    margin: 8px 0;
  }

  .input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .input-container span {
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    place-content: center;
  }

  .input-container span svg {
    color: #9ca3af;
    width: 1rem;
    height: 1rem;
  }

  .submit {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #f56551;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
  }

  .signup-link {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
  }

  .signup-link a {
    text-decoration: underline;
  }
`;

export default Form;
