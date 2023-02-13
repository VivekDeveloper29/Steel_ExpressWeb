import React, { useState } from "react";
import Navbar from "../../SharedComponents/Navbar";
import Footer from "../../SharedComponents/Footer";
import quote from "../../assets/images/enquairy_image.svg";
import { Link, useParams } from "react-router-dom";
import ApiConfig from "../../api/ApiConfig";
import swal from "sweetalert";

function Getquote() {
  const [getquits, setGetQuets] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_contact, setCompanyContact] = useState("");
  const [gst_details, setGstDetails] = useState("");
  const [delivery_address, setDeliveryAddress] = useState("");
  const [billing_address, setBillingAddress] = useState("");
  const [shipping_address, setShippingAddress] = useState("");
  const [errMsg, setErrMsg] = useState({ company_name: "", company_contact: "", gst_details: "" , delivery_address: "", billing_address: "", shipping_address:""})
  let params = useParams();
  let id = params.id
  console.log("id", id);


  const SaveOrder = (e) => {
    e.preventDefault();// The preventDefault() method cancels the event if it is cancelable,

    if (company_name === "") {
      setErrMsg({ company_name: "company_name required!" })
      return
    }
    if (company_contact === "") {
      setErrMsg({ company_contact: "company_contact required!" })
      return
    }
   
    if (gst_details === "") {
      setErrMsg({ gst_details: "gst_details required!" })
      return
    }
    if (delivery_address === "") {
      setErrMsg({ delivery_address: "delivery_address required!" })
      return
    }
    if (billing_address === "") {
      setErrMsg({ billing_address: "billing_address required!" })
      return
    }

    if (shipping_address === "") {
      setErrMsg({ shipping_address: "shipping_address required!" })
      return
    }


    else {
      console.log({order_id:id,company_name, company_contact, gst_details, delivery_address, shipping_address, billing_address })

      let data = { order_id:id,company_name, company_contact, gst_details, delivery_address, shipping_address, billing_address }
      fetch(ApiConfig.FetchAdditionalDetails,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("auth_token"),

          },
          body: JSON.stringify(data)

        }).then((res) => {

          console.log(res)
          swal("Details Sent Successfully.")
        })
    }
    
  }
 

  return (
    <>
      <Navbar />

      <main className="get-quote-bg main-quote">
        <div className="inner-section-cart">
          <div className="row">
            <div className="col-md-6 img-layout">
              <img src={quote} alt="" className="quote-img" />
            </div>
            <div className="col-md-6">
              <div className="row">
                <p className="get-text ">
                Enquiry <span>Details</span>
                </p>

                <div className="col-md-6">
                  <label htmlFor="" className="email-label ">
                  Company Name <span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="q-input"
                    value={company_name} onChange={(e) => { setCompanyName(e.target.value) }}
                    style={{ width: "100%" }}
                  />
                   {errMsg.company_name && errMsg.company_name.length > 0 && (
                  <span className="text-danger">{errMsg.company_name}</span>
                )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="" className="email-label ">
                  Company Contact Number <span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="q-input"
                    value={company_contact} onChange={(e) => { setCompanyContact(e.target.value) }}
                    style={{ width: "100%" }}
                  />
                   {errMsg.company_contact && errMsg.company_contact.length > 0 && (
                  <span className="text-danger">{errMsg.company_contact}</span>
                )}
                </div>
                <div className="col-12">
                  <label htmlFor="" className="email-label ">
                  Gst Details <span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className=" q-input"
                    value={gst_details} onChange={(e) => { setGstDetails(e.target.value) }}
                    style={{ width: "100%" }}
                  />
                   {errMsg.gst_details && errMsg.gst_details.length > 0 && (
                  <span className="text-danger">{errMsg.gst_details}</span>
                )}
                </div>
                <div className="col-12">
                  <label htmlFor="" className="email-label ">
                  Delivery Address <span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className=" q-input"
                    value={delivery_address} onChange={(e) => { setDeliveryAddress(e.target.value) }}
                    style={{ width: "100%" }}
                  />
                   {errMsg.delivery_address && errMsg.delivery_address.length > 0 && (
                  <span className="text-danger">{errMsg.delivery_address}</span>
                )}
                </div>
                <div className="col-12">
                  <label htmlFor="" className="email-label ">
                  Billing Address <span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className=" q-input"
                    value={billing_address} onChange={(e) => { setBillingAddress(e.target.value) }}
                    style={{ width: "100%" }}
                  />
                   {errMsg.billing_address && errMsg.billing_address.length > 0 && (
                  <span className="text-danger">{errMsg.billing_address}</span>
                )}
                </div>

                <div className="col-12">
                  <label htmlFor="" className="email-label ">
                  Shipping Address <span className="fill-img-star">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className=" q-input"
                    value={shipping_address} onChange={(e) => { setShippingAddress(e.target.value) }}
                    style={{ width: "100%" }}
                  />
                   {errMsg.shipping_address && errMsg.shipping_address.length > 0 && (
                  <span className="text-danger">{errMsg.shipping_address}</span>
                )}
                </div>
        
                <div className="btn-main-qout ">
                  {/* <Link to="/Getquote"> */}
                    <button  onClick={SaveOrder} className="quote-btn" style={{ width: "100%" }}>
                      Submit
                    </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
            <div className="row">
              <div className="col-lg-6">
                
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12">
                    
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="" className="email-label mt-4">
                        Full Name
                      </label>
                      <br />
                      <input
                        type="text"
                        className="email-input"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="" className="email-label mt-4">
                        Mobile Number
                      </label>
                      <br />
                      <input
                        type="text"
                        className="email-input"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-lg-12">
                      <label htmlFor="" className="email-label mt-4">
                        Email-ID
                      </label>
                      <br />
                      <input
                        type="text"
                        className="email-input"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-lg-12">
                      <label htmlFor="" className="email-label mt-4">
                        Message
                      </label>
                      <br />
                      <input
                        type="text"
                        className="message-input"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-lg-12 mt-4">
                      <button className="quote-btn" style={{ width: "100%" }}>
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
        </div> */}
      </main>
      <Footer />
    </>
  );
}

export default Getquote;
