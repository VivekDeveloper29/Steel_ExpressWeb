import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import logo from "../assets/images/logo_new1.svg";
import ic_mail from "../assets/images/ic_mail.svg";
import ic_call from "../assets/images/ic_call1.svg";
import ic_call_red from "../assets/images/ic_call_red.svg";
import ic_menu from "../assets/images/ic_menu.svg";
import cart1 from "../assets/images/ic_cart1.svg";
import ic_bell from "../assets/images/ic_bell.svg";

import ertugul from "../assets/images/profile-icon.png";
import ic_back_circle from "../assets/images/ic_back_circle.svg";
import Draggable from "react-draggable";

import Account from "./Account";
import { useContext } from "react";
import { AppContext } from "../context/AppContext ";
import ApiConfig from "../api/ApiConfig";
const Navbar = () => {
  const location = useLocation();
  let currentRoute = location.pathname;
  const { userDetails } = useContext(AppContext);
  const { logedIn, setLoggedIn } = useContext(AppContext);
  const [cartcount, setCartCount] = useState(0); //cart item count show ke liye
  const [cart_displya, setCartDisplay] = useState(null);

  const [notification, setNotification] = useState([]);
  const [notification_count, setNotificationCount] = useState([])

  useEffect(() => {
    getNotification();
    getCartDisplay();
  }, []);


  let getCartDisplay = () => {
    fetch(ApiConfig.CARTDISPLAY, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    }).then((result) => {
      result.json().then((resp) => {
  
        if (resp.result) {
          setCartDisplay(resp.cart_items);
          setCartCount(resp.cart_items_count);
        }
      });
    });
  };


  let getNotification = () => {
    fetch(ApiConfig.NOTIFICATION, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    }).then((result) => {
      
      result.json().then((resp) => {
        // if (resp.result)
        // {
        setNotification(resp.notifications);
        setNotificationCount(resp.notification_count)
        // }
      });
    });
  };

  let params = useParams();
  let id = params.id;
  return (
    <main className="main-nav">
      <nav>
        <div className="top-logo-section">
          <Link to={"/Home/"}>
            <div className="left-section">
              <img src={logo} alt="logo" className="main-logo" />
              {/* <p className="text-below-logo">Simplifying Steel Sourcing</p> */}
            </div>
          </Link>
          <div className="right-section">
            <div className="contact-main">
              <label htmlFor="" className="contact-number">
                <a href="tel:7499093719" style={{ color: "#222222" }}>
                  <img src={ic_call} alt="" />
                  {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></button> */}
                  +91 7499093719
                </a>
              </label>
              <label htmlFor="" className="contact-mail">
                <a
                  href="mailto:info@steelexpress.co.in"
                  style={{ color: "#222222" }}
                >
                  <img src={ic_mail} alt="" /> info@steelexpress.co.in
                </a>
              </label>
            </div>

            {logedIn ? (
              <>
                <div
                  className={`nav-cart-account-logo ${
                    currentRoute === "/" && "hide-ac-cart"
                  }`}
                >
                  <div className="bell">
                    <Link to="/Notifications">
                      <img src={ic_bell} alt="" />
                      <span className="cart-badge">
                        <label>{notification_count}</label>
                        {/* {
                  notification && notification.map((notifications) =>
                    <label>{notifications && notifications.notification_count}</label>
                  )}  */}
                      </span>
                    </Link>
                  </div>

                  <div className="cart">
                    <Link to="/Cart">
                      <img src={cart1} alt="" />
                      <span className="cart-badge">
                        <label>{cartcount}</label>
                      </span>
                    </Link>
                  </div>
                  <div className="account">
                    <Link
                      to="#"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                      <img
                        src={
                          (userDetails && userDetails.profile_pic) || ertugul
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                </div>

                <Account />
              </>
            ) : (
              <>
                <div className={`login-btn-main`}>
                  <Link to="/Login">Login/Register</Link>
                </div>
              </>
            )}
          </div>
        </div>
        {/* ==== Menu === */}

        {/* className={({ isActive }) => (isActive ? "nav-active" : "")} */}

        <div className="menu-section">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon">
                  <img src={ic_menu} alt="" />
                </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    {/* ${
            currentRoute === "/" || currentRoute === "/home"
              ? "hide-ac-cart"
              : "route-bar-main"
          } */}

                    <NavLink
                      className={`${
                        currentRoute === "/home" || currentRoute === "/"
                          ? "nav-active nav-link"
                          : "nav-link"
                      }`}
                      // className="nav-link active" aria-current="page " Getquote
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={`${
                        currentRoute === "/products" ||
                        currentRoute === "/Detailslist" ||
                        currentRoute === "/Getquote" ||
                        currentRoute === "/Cart"
                          ? "nav-active nav-link"
                          : "nav-link"
                      }`}
                      to="/products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-active nav-link" : "nav-link"
                      }
                      to="/offers"
                    >
                      Offers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-active nav-link" : "nav-link"
                      }
                      to="/About"
                    >
                      About Us
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-active nav-link" : "nav-link"
                      }
                      to="/ContactUs"
                    >
                      Contact Us
                    </NavLink>
                  </li>

                  <div
                    className={` ${
                      currentRoute === "/"
                        ? "login-btn-main-responsive"
                        : "hide-ac-cart"
                    }`}
                  >
                    <Link to="/Login">Login/Register</Link>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div
          className={` ${
            currentRoute === "/" || currentRoute === "/home"
              ? "hide-ac-cart"
              : "route-bar-main"
          }`}
        >
          <div
            className={`${currentRoute === "/products" && "ProductListing"}`}
          >
            <Link to="/products">
              <img src={ic_back_circle} alt="" />
            </Link>

            {currentRoute === "/products" && (
              <Link to="/products">
                <label htmlFor="" className="route-page-name">
                  Product Listing
                </label>
              </Link>
            )}

           {currentRoute === "/Detailslist/"+id+"/details" && (
              <Link to="/products">
                <label htmlFor="" className="route-page-name">
                  Products
                </label>
              </Link>
            )}

           {currentRoute === "/Detailslist/"+id && (
              <Link to="/products">
                <label htmlFor="" className="route-page-name">
                  Products
                </label>
              </Link>
            )}

           {currentRoute === "/MyOrderDetails/"+id && (
              <Link to="/home">
                <label htmlFor="" className="route-page-name">
                  Order Detail
                </label>
              </Link>
            )}

            {currentRoute === "/Cart" && (
              <Link to="/home">
                <label htmlFor="" className="route-page-name">
                  Cart
                </label>
              </Link>
            )}

           

            {currentRoute === "/Getquote" && (
              <label htmlFor="" className="route-page-name">
                Product Listing / Details / Get Quote
              </label>
            )}

            {currentRoute === "/offers" && (
              <Link to="/home/">
                <label htmlFor="" className="route-page-name">
                  Offers
                </label>
              </Link>
            )}

        {currentRoute === "/PerfomaInvice/"+id && (
              <Link to="/home/">
                <label htmlFor="" className="route-page-name">
               invoice
                </label>
              </Link>
            )}

       {currentRoute === "/sendinovice/"+id && (
              <Link to="/home/">
                <label htmlFor="" className="route-page-name">
                Send invoice
                </label>
              </Link>
            )}      

            





            {currentRoute === "/Wishlist" && (
              <label htmlFor="" className="route-page-name">
                Account / Wishlist
              </label>
            )}

            {currentRoute === "/ContactUs" && (
              <label htmlFor="" className="route-page-name">
                Account / Contact Us
              </label>
            )}

            {currentRoute === "/MyOrders" && (
              <label htmlFor="" className="route-page-name">
                Account / My Orders
              </label>
            )}

            {currentRoute === "/MyQutoes" && (
              <label htmlFor="" className="route-page-name">
                All Qutoes 
              </label>
            )}

            {currentRoute === "/Notifications" && (
              <Link to="/Home/">
                <label htmlFor="" className="route-page-name">
                  Notifications
                </label>
              </Link>
            )}

            {currentRoute === "/Profile" && (
              <label htmlFor="" className="route-page-name">
                My Profile
              </label>
            )}

            {currentRoute === "/About" && (
              <label htmlFor="" className="route-page-name">
                About Us
              </label>
            )}

            {currentRoute === "/MyOrderDetails" && (
              <label htmlFor="" className="route-page-name">
                Account / My Orders / Details
              </label>
            )}

            {currentRoute === "/HowWeWork" && (
              <label htmlFor="" className="route-page-name">
                Account / How we work?
              </label>
            )}

            {currentRoute === "/TermsConditions" && (
              <label htmlFor="" className="route-page-name">
                Account / Terms & Conditions
              </label>
            )}

            {currentRoute === "/PrivacyPolicy" && (
              <label htmlFor="" className="route-page-name">
                Account / Privacy Policy
              </label>
            )}

            {/* <label htmlFor="" className="route-page-name">
              Product Listing
            </label> HowWeWork MyOrderDetails Detailslist Getquote offers MyOrders Notifications Profile About*/}
          </div>
        </div>
      </nav>

      <Draggable>
        <a href="tel:7499093719">
          <div className="fix-call-icon">
            <img src={ic_call_red} alt="" />
          </div>
        </a>
      </Draggable>
    </main>
  );
};

export default Navbar;
