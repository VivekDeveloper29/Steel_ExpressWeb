import React, { useState } from "react";
import eye from "../../assets/images/ic_eye.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import eyeclose from "../../assets/images/ic_eye_closed.svg";
import ApiConfig from "../../api/ApiConfig";
import swal from "sweetalert";
import { postWithAuthCallWithErrorResponse } from "../../api/ApiServices";

const NewPassword = () => {
  const previousPageData = useLocation().state;
  console.log("previousPageData",previousPageData)

  const [eyes, setEyes] = useState(false);
  const handleEyes = () => setEyes(!eyes);
  const [eyes1, setEyes1] = useState(false);
  const handleEyes1 = () => setEyes1(!eyes1);

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState({ password: "", confirm_password: ""})

  let otp=Number(previousPageData.otp)
  console.log("otp",otp)
  const [data_one, setData] = useState({});

  const SaveUser = (e) => {
    e.preventDefault();// The preventDefault() method cancels the event if it is cancelable,

    if (password === "") {
      setErrMsg({ password: "password required!" })
      return
    }
    if (confirm_password === "") {
      setErrMsg({ confirm_password: "confirm password required!" })
      return
    }
    else if (password != confirm_password) {
      setErrMsg({ ...errMsg, confirm_password: "password and confirm password not match !" });
      return;
    }
   
    else {
      console.log(Number(previousPageData.otp), password, confirm_password )

      let data = { otp ,password, confirm_password }
      postWithAuthCallWithErrorResponse(ApiConfig.RESERTPASSWORD,
        JSON.stringify(data)
        ).then((res) => {
          console.log("res", res);
          if (!res.error)
          {
            swal({
              title: "Success",
              text: res.json.message,
              icon: "success",
              button: true,
            });
            navigate("/Login")
          }
          else
          {
            swal({
            title: "Error",
            text: res.json.message,
            icon: "success",
            button: true,
          });
        }
          
          
        })
      }
    
    
  }


  
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
                    <p className="welcome-text">Forgot Password</p>

                    <p className="back-btn-red">
                      <Link to="/PasswordOTP">Go Back</Link>
                    </p>
                  </div>

                  
                </div>

                <div className="pass-main-log">
                  <label htmlFor="" className="email-label">
                    Enter New Password <span className="fill-img-star ms-1">*</span>
                  </label>
                  <br />
                  <input
                  type={eyes ? "text": "password"}
                    // type="password"
                    className="email-input"
                    maxLength={10}
                    value={password} onChange={(e) => { setPassword(e.target.value) }}
                  />
                  <span className="span-eye position-relative">
                  {eyes ? (
                    <img src={eye} 
                    alt=""
                    onClick={handleEyes}
                     className="eye-icon" />
                     ) : (
                      <img src={eyeclose}
                       alt=""
                       onClick={handleEyes}
                        className="eye-icon" />

                      )}
                  </span>
                  {errMsg.password && errMsg.password.length > 0 && (
                  <span className="text-danger">{errMsg.password}</span>
                )}
                </div>
                <div className="pass-main-log">
                  <label htmlFor="" className="email-label">
                    Confirm Password <span className="fill-img-star ms-1">*</span>
                  </label>
                  <br />
                  <input
                  type={eyes1 ? "text": "password"}
                    // type="password"
                    className="email-input"
                    maxLength={10}
                    value={confirm_password} onChange={(e) => { setConfirmPassword(e.target.value) }}
                  />
                  
                  <span className="span-eye position-relative">
                  {eyes1 ? (
                    <img src={eye}
                     onClick={handleEyes1}
                     alt=""
                      className="eye-icon" />
                      ) : (
                        <img src={eyeclose}
                       alt=""
                       onClick={handleEyes1}
                        className="eye-icon" />

                      )}

                  </span>
                  {errMsg.confirm_password && errMsg.confirm_password.length > 0 && (
                  <span className="text-danger">{errMsg.confirm_password}</span>
                )}
                </div>
                <Link to="/home">
                  <button className="login-button forgot-btn" onClick={SaveUser}>Continue</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewPassword;
