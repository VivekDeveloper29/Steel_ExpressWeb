import React, { useState } from "react";
import eye from "../../assets/images/ic_eye.svg";
import eyeclose from "../../assets/images/ic_eye_closed.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { postWithAuthCall, postWithAuthCallWithErrorResponse, simplePostCall, simplePostCallforQuote } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import { useContext } from "react";
import swal from "sweetalert";
import { AppContext } from "../../context/AppContext ";


function Registration() {
  const navigate = useNavigate()
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  // const {customerData} = useContext(AppContext)
  const { addproductcart, setAddProductCart,setCustomerData ,SetUserDetails,setLoggedIn} = useContext(AppContext)
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirm_password: "",

  })
  const handlePasswordChange = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordinputField = e.target.value;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordinputField]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
  };
  const handleValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.value;
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Confirm password is not matched");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const [user, setUser] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",

    device_type: "Android",
    device_token: "sad",

  });
  const [errMsg, setErrMsg] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",

    device_type: "Android",
    device_token: "sad",
  });

  const Add = (e) => {
    e.preventDefault();
    console.log(user);
    if (
      !user.full_name ||
      user.phone_number === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirm_password === "" ||

      user.device_type === "" ||
      user.device_token === ""

    ) 
    {
      if (!user.full_name) {
        setErrMsg({
          ...errMsg,
          full_name: "Please enter name!",
        });
        return;
      }



      if (user.email === "") {
        setErrMsg({
          ...errMsg,
          email: "Please enter email!",
        });
        return;
      }

      if (user.phone_number === "") {
        setErrMsg({
          ...errMsg,
          phone_number: "Please enter phone number!",
        });
        return;
      }
      if (user.password === "") {
        setErrMsg({
          ...errMsg,
          password: "Please enter password!",
        });
        return;
      }
      else if (user.password.length < 6) {
        setErrMsg({
          ...errMsg,
          password: "Password should be 6 characters or more! ",
        });
        return;
      }

      if (user.confirm_password === "") {
        setErrMsg({
          ...errMsg,
          confirm_password: "Please re-enter password!",
        });
        return;
      }


    } else {
      if (!validateEmail(user.email)) {
        setErrMsg({ ...errMsg, email: "Enter email in proper format!" });
        return;
      }

      let fromdata = new FormData();
      // fromdata.append("api_key", customerData.api_key);
      // fromdata.append("user_id", customerData.user_id);
      // fromdata.append("customer_id", customerData.customer_id);
      fromdata.append("full_name", user.full_name);
      fromdata.append("phone_number", user.phone_number);
      fromdata.append("email", user.email);
      fromdata.append("password", user.password);
      fromdata.append("confirm_password", user.confirm_password);
      // fromdata.append("Email_Address", user.Email_Address);
      // fromdata.append("Confirm_Password", user.Confirm_Password);
      postWithAuthCallWithErrorResponse(ApiConfig.REGISTER, JSON.stringify({ ...user }))
        .then((res) => {
          console.log(res);
          swal(res.json.message)
          if (res.json.result) {
            swal(res.json.message);
            let token = res.json.user_details.auth_token
            if (addproductcart.product_id && !addproductcart.cart) {
              let data = JSON.stringify({
                ...addproductcart,
                full_name: res.json.user_details.full_name,
                phone_number: res.json.user_details.phone_number,
                email: res.json.user_details.email
              })
              simplePostCallforQuote(ApiConfig.GETQUOTE, data, token).then((res) => {
                console.log(res)
                swal("Thank you for registrtion, quote will be sent")
                setAddProductCart({});
              })
            }
            else if (addproductcart.cart) {
              simplePostCallforQuote(
                ApiConfig.CARTDISPLAY, //apiconfig file me jo endpoint add kiya haii usko inherite kiya haii
                JSON.stringify({ ...addproductcart }) //or user ke record ko stringify me store kiya haii
                , token).then((res) => {
                  console.log(res);
                  if (res.result) {
                    swal("Thank you for registrtion, Product added to cart")
                    setAddProductCart({});
                  }
                });
            }
            let user=res.json.user_details;
            localStorage.setItem("auth_token", user.auth_token); //ham local storage me auth_token store karege
            localStorage.setItem("id", user.id); //id store karege
            localStorage.setItem(
              //used details ko local storage me set kiya hai
              "userDetails",
              JSON.stringify(user)
            );
            localStorage.setItem("logedIn", true); //jo  data localstoreg me savehaii
            setCustomerData({
              id: user.id,
              auth_token: user.auth_token,
            });

            SetUserDetails(user);
            setLoggedIn(true)
            // navigate("/Login");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const [eyes, setEyes] = useState(false);
  const [eyes1, setEyes1] = useState(false);
  const handleEyes = () => setEyes(!eyes);
  const handleEyes1 = () => setEyes1(!eyes1);

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
            <div className="form-content register-content ">
              <form action="">
                <div className="top-form-text  ">
                  <label className="welcome-text">
                    Welcome to Steel Express
                  </label>
                  <p className="enter-text">Enter below details to register</p>
                </div>

                <div className="email-main-login">
                  <label htmlFor="" className="email-label ">
                    Full Name<span className="fill-img-star">*</span>
                  </label>
                  <input type="text"
                    // value={full_name}
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, full_name: "" });
                      setUser({ ...user, full_name: e.target.value });
                    }}
                    className="email-input" />
                  {errMsg.full_name.length > 0 && (
                    <div className="text-center text-danger"><span>{errMsg.full_name}</span></div>
                  )}
                </div>
                <div className="email-main-login">
                  <label htmlFor="" className="email-label ">
                    Email ID<span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input type="text"
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, email: "" });
                      setUser({ ...user, email: e.target.value });
                    }}

                    className="email-input" />
                  {errMsg.email.length > 0 && (
                    <div className="text-center text-danger"><span>{errMsg.email}</span></div>
                  )}
                </div>

                <div className="email-main-login">
                  <label htmlFor="" className="email-label ">
                    Phone Number<span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input type="text"
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, phone_number: "" });
                      setUser({ ...user, phone_number: e.target.value });
                    }}

                    className="email-input" />
                  {errMsg.phone_number.length > 0 && (
                    <div className="text-center text-danger"><span>{errMsg.phone_number}</span></div>
                  )}
                </div>

                <div className="pass-main-log">
                  <label htmlFor="" className="email-label">
                    Password<span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type={eyes ? "text": "password"}
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, password: "" });
                      setUser({ ...user, password: e.target.value });
                    }}
                    className="email-input"
                    maxLength={10}
                  />
                  <span className="span-eye position-relative">
                  {eyes ? (
                    <img src={eye}
                     alt="" onClick={handleEyes} 
                     className="eye-icon" />
                     ):
                     (
                      <img
                        src={eyeclose}
                        alt=""
                        className="eye-icon"
                        onClick={handleEyes}
                      />
                    )}
                  </span>

                </div>

                {errMsg.password.length > 0 && (
                  <div className="text-center text-danger"><span>{errMsg.password}</span></div>
                )}

                <div className="pass-main-log">
                  <label htmlFor="" className="email-label">
                    Confirm Password<span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type={eyes1 ? "text": "password"}
                    onChange={(e) => {
                      setErrMsg({ ...errMsg, confirm_password: "" });
                      setUser({ ...user, confirm_password: e.target.value });
                    }}
                    className="email-input"
                    maxLength={10}
                  />
                  <span className="span-eye position-relative">
                  {eyes1 ? (
                    <img src={eye} 
                    alt="" onClick={handleEyes1} 
                    className="eye-icon" />
                  ):
                  (
                    <img
                      src={eyeclose}
                      alt=""
                      className="eye-icon"
                      onClick={handleEyes1}
                    />
                  )}
                  </span>
                </div>
                {errMsg.confirm_password.length > 0 && (
                  <div className="text-center text-danger"><span>{errMsg.confirm_password}</span></div>
                )}

                {/* <p className="email-label text-end ">Forgot Password?</p> */}
                <Link to="/Registration">
                  <button onClick={Add} className="login-button register-button ">Register</button>
                </Link>

                <div className="d-flex justify-content-center  register-bottom">
                  <p className="have-account">Already have an account?</p>
                  <Link to="/Login">
                    <p className="register ">Login</p>
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

export default Registration;
