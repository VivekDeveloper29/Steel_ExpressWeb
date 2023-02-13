import React from "react";
import notification_icon from "../assets/images/notification_icon.svg";
import Navbar from "../SharedComponents/Navbar";
import Footer from "../SharedComponents/Footer";
import ApiConfig from "../api/ApiConfig";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
const Notifications = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getNotification();
     
  }, []);

  let getNotification = () => {
    setLoading(true)
    fetch(ApiConfig.NOTIFICATION, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        setLoading(false)
        console.log("notifications", resp);
        setNotification(resp.notifications);
      });
    });
  };
  console.log(notification);


  const getUserRequest = (notification) => {
    console.log("called",notification.notification_type);

    if(notification && notification.notification_type=="Additional Details")
    {
    navigate("/Getquote/"+notification.order_id)
    }
    else
    {
    navigate("/MyQutoes/")
    }
  }

  return (

    <main>
      <Navbar />
   
      <div className="main-notification">
      {loading ? (
      <ScaleLoader

        color={"#ff3e6c"}
        loading={loading}
        size={10}
        className="loading d-flex justify-content-center"
        style={{ left: "70%" }}
      />
    ) : (
        <>
        {notification &&
          notification.map((notifications) => (
            // <Link
            //   to={"/Getquote/" + notifications.order_id}
            //   className="d-block"
            // >
            // <Link
            //   to={"/MyQutoes/"}
            //   className="d-block"
            // >
              <div className="noti-box">
                <div className="icon-para-main">
                  <div className="icon">
                    <span>
                      <img src={notification_icon} alt="" />
                    </span>
                  </div>

                  <div className="paragraph-noti" >
                    <p onClick={()=>getUserRequest(notifications)}>{notifications.notification_body}</p>

                    <div className="time-date">
                      <label className="me-2" >{notifications.created_at}</label>
                      {/* <label>04:44:48 pm</label> */}
                    </div>
                  </div>
                </div>
              </div>
            // </Link>
          ))}
          </>
    )}
      </div>

      <Footer />
    </main>
    
  );
};

export default Notifications;
