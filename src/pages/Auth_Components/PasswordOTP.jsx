import React, { useState } from "react";
import eye from "../../assets/images/ic_eye.svg";
import { Link , useLocation, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { postWithAuthCallWithErrorResponse } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import swal from "sweetalert";


const PasswordOTP = () => {
  // const phoneData = useLocation().state;
  const navigate = useNavigate();
  const previousPageData = useLocation().state;
  console.log("previousPageData",previousPageData)

  const [state, setState] = useState({
    // ...previousPageData,
    otpDigit1: "",
    otpDigit2: "",
    otpDigit3: "",
    otpDigit4: "",
    ...previousPageData,

  });
  // const [errMsg, setErrMsg] = useState({ email: "", otp: "", password: "" });
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    var otp =
      state.otpDigit1 +
      state.otpDigit2 +
      state.otpDigit3 +
      state.otpDigit4;

    postWithAuthCallWithErrorResponse(
      ApiConfig.VERIFYOTP,
      JSON.stringify({ ...previousPageData, otp:otp })
    )
      .then((res) => {
        console.log("res", res);
        setData(res.json.data);
        swal({
          title: "Success",
          text: res.json.message,
          icon: "success",
          button: true,
        });
        navigate("/NewPassword", {
          state: { 
           otp: otp,
         }
        // navigate("/NewPassword");
        });
      })
      .catch((err) => console.log(err));
    // }
  };

  const handleEnter = (event) => {
    var validkeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (validkeys.includes(event.key)) {
      event.target.value = event.key;
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1] && form.elements[index + 1].focus();
      event.preventDefault();
    }
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
                  <div className="back-main">
                    <p className="welcome-text">Forgot Password</p>

                    <p className="back-btn-red">
                      <Link to="/ForgotPassword">Go Back</Link>
                    </p>
                  </div>

                  <p className="enter-text">
                  Enter the code sent your registered {state.phone_number} to continue Otp is <span>{state.otp}</span>
                  </p>
                </div>
                <div className="email-main-login otp-main">
                  
                 
                  <input type="text" className="otp-input" size="1"
                  maxLength="1"
                            value={state.otpDigit1}
                            onKeyDown={(e) => {
                              if (String(e.key).match("^[0-9]+$")) {
                                setState({ ...state, otpDigit1: e.key });
                                handleEnter(e);
                              }
                            }}
                            />
                  <input type="text" className="otp-input" 
                  maxLength="1"
                  value={state.otpDigit2}
                  onKeyDown={(e) => {
                    if (String(e.key).match("^[0-9]+$")) {
                      setState({ ...state, otpDigit2: e.key });
                      handleEnter(e);
                    }
                  }}
                  />
                  <input type="text" className="otp-input" 
                   maxLength="1"
                   value={state.otpDigit3}
                   onKeyDown={(e) => {
                     if (String(e.key).match("^[0-9]+$")) {
                       setState({ ...state, otpDigit3: e.key });
                       handleEnter(e);
                     }
                   }}
                   />
                  <input type="text" className="otp-input"
                  maxLength="1"
                  value={state.otpDigit4}
                  onKeyDown={(e) => {
                    if (String(e.key).match("^[0-9]+$")) {
                      setState({ ...state, otpDigit4: e.key });
                      handleEnter(e);
                    }
                  }}
                   />
                </div>
                <div className="d-flex mb-4 ">
                  <p className="have-account">Didn't receive code? </p>
                  <Link to="#">
                  
                  {/* <p className="register" onClick={handleSubmit} >Resend</p> */}
                  </Link>
                </div>
                <Link to="#" onClick={handleSubmit}>
                  <button className="login-button forgot-btn">Verify</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default PasswordOTP