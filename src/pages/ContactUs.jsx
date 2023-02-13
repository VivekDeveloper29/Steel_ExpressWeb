import React from "react";
import Footer from "../SharedComponents/Footer";
import Navbar from "../SharedComponents/Navbar";
import mail_red from "../assets/images/mail_red.svg";
import call_red from "../assets/images/call_red.svg";
import ic_whatsapp from "../assets/images/location.svg";
import { useState } from "react";
import ApiConfig from "../api/ApiConfig";
import swal from "sweetalert";
import Slider from "react-slick";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState({ name: "", email: "", message: "" })
    // const { logedIn, setLoggedIn ,userDetails} = useContext(AppContext);

    

  const SaveUser = (e) => {
    e.preventDefault();// The preventDefault() method cancels the event if it is cancelable,

    if (name === "") {
      setErrMsg({ name: "Name required!" })
      return
    }
    if (email === "") {
      setErrMsg({ email: "Emal ID required!" })
      return
    }
    else if (!validateEmail(email)) {
      setErrMsg({ ...errMsg, email: "Enter valid email!" });
      return;
    }
    if (message === "") {
      setErrMsg({ message: "Message required!" })
      return
    }
 
    else {
      console.log({ name, email, message })

      let data = { name, email, message }
      fetch(ApiConfig.CONTACTUS,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)

        }).then((res) => {

          console.log(res)

          swal("Message Sent Successfully.")
        })
    }
    
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  return (
    <main>
      <Navbar />
      <div className="main-contact-us">
        <div className="main-contact-card">
          <div className="left-contact">
            <h3 className="contact-heading">
              <span className="black">Get In Touch </span>{" "}
              <span className="red"> With Us</span>
            </h3>

            <div className="form-contact">
              <div>
                <label htmlFor="">Name<span className="fill-img-star">*</span></label> <br />
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }}
                  className="input-contact"
                />
                {errMsg.name && errMsg.name.length > 0 && (
                  <span className="text-danger">{errMsg.name}</span>
                )}
              </div>

              <div>
                <label htmlFor="">Email ID<span className="fill-img-star">*</span></label> <br />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }}
                  className="input-contact" />
                {errMsg.email && errMsg.email.length > 0 && (
                  <span className="text-danger">{errMsg.email}</span>
                )}
              </div>

              <div>
                <label htmlFor="">Message<span className="fill-img-star">*</span></label> <br />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={message} onChange={(e) => { setMessage(e.target.value) }}
                  className="message input-contact"
                ></textarea>
                {errMsg.message && errMsg.message.length > 0 && (
                  <span className="text-danger">{errMsg.message}</span>
                )}
              </div>

              <button onClick={SaveUser}>Send</button>
            </div>
          </div>
          <div className="right-contact">
            <section>
              <p className="heading">Contact Us</p>
              <div className="call ">
                <span>
                  <img src={call_red} alt="" />
                </span>
                <label htmlFor="">+91 7499093719</label>
              </div>
              <div className="mail ">
                <span>
                  <img src={mail_red} alt="" />
                </span>
                <label htmlFor="">info@steelexpress.co.in</label>
              </div>
              <div className="whatsapp">
                <span>
                  <img src={ic_whatsapp} alt="" />
                </span>
                <label htmlFor="">309, Loha Bhavan, P.D.Mello Road, Carnac Bunder, Masjid (E), Mumbai – 400009</label>
              </div>
            </section>
          </div>
        </div>
      </div>

     
      
      <Footer />
    </main>
  );
};

export default ContactUs;
