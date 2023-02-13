import React, { useEffect, useState } from "react";
import eye from "../../assets/images/ic_eye.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

import ApiConfig from "../../api/ApiConfig";
import { postWithAuthCallWithErrorResponse } from "../../api/ApiServices";
import swal from "sweetalert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  let ForgotData = useLocation().state;

  const [state, setState] = useState({ ...ForgotData, phone_number: "" });
  const [errMsg, setErrMsg] = useState({ phone_number: "" });

  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.phone_number === "") {
      setErrMsg({ ...errMsg, phone_number: "Enter phone number " });
      return;
    } else {
      postWithAuthCallWithErrorResponse(
        ApiConfig.FORGAT_PASSWORD,
        JSON.stringify({ ...state })
      )
        .then((res) => {
          console.log("res", res.json);
          setData(res.json.data);

          swal({
            title: "Success",
            text: "OTP sent successfully",
            icon: "success",
            button: true,
          });
          navigate("/PasswordOTP", {
             state: { 
              otp: res.json.otp,
              phone_number: res.json.phone_number,
              result: res.json.result,
            }
             });
          // navigate("/PasswordOTP", { state: { ...state } });
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {}, []);
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
                  <div className="back-main">
                    <p className="welcome-text">Forgot Password </p>

                    <p className="back-btn-red">
                      <Link to="/Login">Go Back</Link>
                    </p>
                  </div>

                  <p className="enter-text">
                    Please enter your email id to continue
                  </p>
                </div>
                <div className="email-main-login">
                  <label htmlFor="" className="email-label ">
                    Phone Number <span className="fill-img-star ms-1">*</span>
                  </label>
                  <br />
                  <input
                    type="tel"
                    maxLength={10}
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, phone_number: "" });
                      setState({ ...state, phone_number: e.target.value });
                    }}
                    className="email-input"
                  />
                </div>
                {
                  <div className="text-center text-danger">
                    <span> {errMsg.phone_number}</span>
                  </div>
                }
                <Link to="#" onClick={handleSubmit}>
                  <button className="login-button forgot-btn">Continue</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
