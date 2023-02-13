import React, { useContext, useEffect } from "react";
import Navbar from "../SharedComponents/Navbar";
import imgcard from "../assets/images/image_02.png";
import { Link, NavLink } from "react-router-dom";
import Footer from "../SharedComponents/Footer";
import { useState } from "react";
import ApiConfig from "../api/ApiConfig";
import { AppContext } from "../context/AppContext ";
const Offers = () => {
  const [offer, setOffer] = useState(null);
  const { logedIn, setLoggedIn } = useContext(AppContext);
  useEffect(() => {
    getProduct();
  }, []);
  let getProduct = () => {
    fetch(ApiConfig.OFFERS, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log("offers", resp);
        setOffer(resp.offers);
      });
    });
  };
  console.log(offer);

  return (
    <main>
      <Navbar />

      {/* <.................... card-1..................> */}

      <div className=" offers-bg">
        {offer &&
          offer.map((steel) => {
            return (
              <div className=" inner-card-section  ">
                <div className="offer-card ">
                  <div className=" offer-card-inner">
                    <div className="img-card">
                      <img
                        src={steel.image[0]}
                        alt=""
                        style={{ height: "120px", width: "180px" }}
                        className=""
                      />
                    </div>
                    <div className="offer-content ">
                      <p className="card-title">{steel.offer_on_product}</p>
                      <p className="first-purchase ">{steel.offer_name}</p>
                      {/* <p className="card-text">
                    Buy any steel for the first time and receive flat {steel.discount_percent}
                    discount.
                  </p> */}
                      <label className="exp-date ">Expiry Date</label>{" "}
                      <span className="current-date ">{steel.expiry_date}</span>
                    </div>
                  </div>
                  <div className="btn-offer-grab">
                    <Link to={"/Detailslist/" + steel.offer_on_product_id}>
                      <button className="grab-btn ">Get Quote</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <Footer />
    </main>
  );
};

export default Offers;
