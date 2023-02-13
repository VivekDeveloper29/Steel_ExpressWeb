import React from "react";
import Footer from "../SharedComponents/Footer";
import Navbar from "../SharedComponents/Navbar";
import product_image_01 from "../assets/images/product_image_01.png";
import ic_cart from "../assets/images/ic_cart.svg";
import ic_heart from "../assets/images/ic_heart.svg";
import ic_heart_active from "../assets/images/ic_heart_active.svg";
import product_image_02 from "../assets/images/product_image_01-1.png";
import product_image_04 from "../assets/images/product_image_04.png";
import { Link, NavLink } from "react-router-dom";
import ApiConfig from "../api/ApiConfig";
import { useState } from "react";
import { useEffect } from "react";
import { deleteWithAuthCall } from "../api/ApiServices";
import swal from "sweetalert";
import { ScaleLoader } from "react-spinners";

const Wishlist = () => {
  const [wishlist, setWishList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProduct();
  }, []);

  let getProduct = () => {
    setLoading(true)
    fetch(ApiConfig.WISHLIST, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        setLoading(false)
        console.log("wishlist", resp);
        setWishList(resp.wishlist);
      });
    });
  };
  console.log(wishlist);

  //WishList Delete

  const WishList = (id) => {
    // e.preventDefault();// The preventDefault() method cancels the event if it is cancelable,
    {
      let data = { id }; //yaha id define ki hiiii product ki
      deleteWithAuthCall(
        ApiConfig.WISHLIST, //apiconfig file me jo endpoint add kiya haii usko inherite kiya haii
        JSON.stringify({ product_id: id }) //yaha se product_id=1 aisa jayega ye product_id wishlist ki api me delete me pass karna haii
      ).then((res) => {
        console.log(res);

        swal(res.message);
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="">
   
        <div className=" offers-bg">
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
        {wishlist &&
            wishlist.map((userWishList) => {
              return (
                console.log(userWishList),
                (
          <div className=" inner-card-section  ">
            <div className="offer-card ">
              <div className=" offer-card-inner">
                <div className="img-card">
                  <img src={userWishList.product.images[0]} alt="" className="" />
                </div>
                <div className="offer-content ">
                  <p className="card-title"></p>
                  <p className="first-purchase ">
                  {userWishList.product.name}
                  </p>
                  <span className="exp-date " style={{ fontSize: "10px" }}>
                  {userWishList.product.number}
                  </span>
                  {/* <div className="d-flex justify-content-between mt-3">
                    <div>
                      <label className="exp-date ">Thickness</label>
                      <br />
                      <span className="current-date ">3-6 mm</span>
                    </div>
                    <div>
                      <label className="exp-date ">Width</label>
                      <br />
                      <span className="current-date ">800 - 1500 mm</span>
                    </div>
                    <div>
                      <label className="exp-date ">Grade</label>
                      <br />
                      <span className="current-date ">3</span>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="btn-offer-grab">
                <div className="mb-4 text-end">                  
                  <img src={ic_heart_active} onClick={()=>WishList(userWishList.product.id)} alt="" className="me-3" />
                  <img src={ic_cart} alt="" />
                </div>
                <Link to={"/Detailslist/"+userWishList.product.id}>
                  <button className="grab-btn " style={{ width: "120px" }}>
                    Get Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
               )
               );
             })}
             </>
              )}
          
        </div>
   

        {/* <div className="wish-card">
          {wishlist &&
            wishlist.map((userWishList) => {
              return (
                console.log(userWishList),
                (
                  <div className="tab-card ">
                    <div className="image">
                      <img src={userWishList.product.images[0]} alt="" />
                    </div>
                    <div className="product-detail">
                      <p className="detail-top">{userWishList.product.name}</p>
                      <p>
                        <label htmlFor="" className="number">
                        {userWishList.product.number}
                        </label>
                      </p>                     
                      <div className="amt-add-card-main">
                        <div className="price"></div>
                        <div className="like-img">
                          <img src={ic_heart_active} onClick={()=>WishList(userWishList.product.id)} alt="" />
                          <img src={ic_cart} alt="" />
                        </div>
                      </div>
                      <div className="red-line"></div>
                    </div>
                  </div>
                )
              );
            })}
         
        </div> */}
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
