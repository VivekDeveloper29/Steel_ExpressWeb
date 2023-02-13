import React, { useContext, useEffect } from "react";
import eye from "../../assets/images/ic_eye.svg";
import ic_eye_closed from "../../assets/images/ic_eye_closed.svg";

import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useState } from "react";
import {
  logintWithAuthCallWithErrorResponse,
  PostCallWithErrorResponse,
  simplePostCall,
} from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { AppContext } from "../../context/AppContext ";
import swal from "sweetalert";

function Login() {
  const [eyes, setEyes] = useState(false);
  const handleEyes = () => setEyes(!eyes);
  const { setCustomerData, setLoggedIn, userDetails, SetUserDetails } =
    useContext(AppContext);
  const [errMsg, setErrMsg] = useState({ phone_number: "", password: "" });
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    
    e.preventDefault(); // The preventDefault() method cancels the event if it is cancelable,
    setLoading(true);
    console.log("user", userDetails);
    console.log(userDetails); 
    if (userDetails === null) {
      setErrMsg({
        password: "Password is required!",
        phone_number: " Phone number is required!",
      });
      return;
    } else {
      if (userDetails && userDetails.phone_number && !userDetails.password) {
        setErrMsg({ password: "Password is required!", phone_number: "" });
        return;
      }
      if (userDetails && userDetails.password && !userDetails.phone_number) {
        setErrMsg({ password: "", phone_number: " Phone number is required!" });
        return;
      }
    }
    logintWithAuthCallWithErrorResponse(
      ApiConfig.LOGIN, //apiconfig file me jo endpoint add kiya haii usko inherite kiya haii
      JSON.stringify({ ...userDetails }) //or user ke record ko stringify me store kiya haii
    )
      .then((res) => {
        //jo response aa raha haii
        // setLoading(false);
        console.log(res);
        // swal(res.message)
        if (res.result) {
          //response me jo result aayega
          localStorage.setItem("auth_token", res.user_details.auth_token); //ham local storage me auth_token store karege
          localStorage.setItem("id", res.user_details.id); //id store karege

          localStorage.setItem(
            //used details ko local storage me set kiya hai
            "userDetails",
            JSON.stringify(res.user_details)
          );
          localStorage.setItem("logedIn", true); //jo  data localstoreg me savehaii
          setCustomerData({
            id: res.user_details.id,
            auth_token: res.user_details.auth_token,
          });
          SetUserDetails(res.user_details);
          setLoggedIn(true); //tab ye true hoga
          setLoading(false);
        }
        if (res.message != "Login Successful.") {
          swal(res.message);
        }
      })
      .catch((err) => {
        //nhi to catch block chalega
        // setLoading(false);

        console.log(err);
      });

    // }
  };
  return (
    <>
      <main className="main-login ">
        <div className="row ">
          {/* left section */}
          <div className="col-md-6 login-banner-img left">
            <div className="logo-rsponsive">
              <img src={logo} alt="" />
            </div>
            <div className="image-back"></div>
          </div>
          {/* right section */}
          <div className="col-md-6 login-form right">
            <div className="form-content">
              <form action="">
                <div className="top-form-text">
                  <label className="welcome-text">
                    Welcome to Steel Express
                  </label>
                  <p className="enter-text">Enter your credentials to login</p>
                </div>
                <div className="email-main-login">
                  <label htmlFor="" className="email-label ">
                    Phone Number<span className="fill-img-star ms-1">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    required
                    maxLength={15}
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, phone_number: "" });
                      SetUserDetails({
                        ...userDetails,
                        phone_number: e.target.value,
                      });
                    }}
                    className="email-input"
                  />
                  {errMsg.phone_number.length > 0 && (
                    <span className="text-danger">{errMsg.phone_number}</span>
                  )}
                </div>

                <div className="pass-main-log">
                  <label htmlFor="" className="email-label">
                    Password<span className="fill-img-star ms-1">*</span>
                  </label>
                  <br />
                  <input
                    type={eyes ? "text": "password"}
                    placeholder="Password"
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, password: "" });
                      SetUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      });
                    }}
                    className="email-input"
                    maxLength={10}
                  />
                    {/* type={passwordShown ? "text" : "password"} */}

                  <span className="span-eye position-relative">
                    {eyes ? (
                      <img
                        src={eye}
                        alt=""
                        className="eye-icon"
                        onClick={handleEyes}
                      />
                    ) : (
                      <img
                        src={ic_eye_closed}
                        alt=""
                        className="eye-icon"
                        onClick={handleEyes}
                      />
                    )}
                  </span>
                  {errMsg.password.length > 0 && (
                    <span className="text-danger">{errMsg.password}</span>
                  )}
                </div>
                <Link to="/ForgotPassword">
                  <p className="email-label text-end ">Forgot Password?</p>
                </Link>

                <button onClick={login} className="login-button ">
                  {loading ? (
                    <div
                      class="spinner-border"
                      style={{ textAlign: "right", color: "#FFFBF3" }}
                    />
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="d-flex justify-content-center ">
                  <p className="have-account">Don't have an account?</p>
                  <Link to="/Registration">
                    <p className="register ">Register</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
