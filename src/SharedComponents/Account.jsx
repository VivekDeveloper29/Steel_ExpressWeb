import React from "react";
import ic_my_orders from "../assets/images/ic_my_orders.svg";
import heart1 from "../assets/images/ic_my_fav.svg";
import ic_track_order from "../assets/images/ic_track_order.svg";

import back1 from "../assets/images/back_arrow.png";
import help1 from "../assets/images/ic_help.svg";
import about1 from "../assets/images/ic_about.svg";
import logout1 from "../assets/images/ic_logout.svg";
import ertugul from "../assets/images/profile-icon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext ";
import swal from "sweetalert";

const Account = () => {
  const { logedIn, setLoggedIn ,userDetails} = useContext(AppContext);
  console.log(userDetails)
  const logOut = (e) =>{ //jab user logout pe click karega tab sara data clene ho jayega storage se or login page pe redirect ho jayega 
    // e.preventDefault()
    localStorage.clear();
    setLoggedIn(false);
    
  }
  return (
    <main className="main-account-side ">
      <div
        class="offcanvas offcanvas-end profile-canvas"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header ">
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="profile-detail-mg">
          <Link to="/Profile">
            <img src={userDetails && userDetails.profile_pic || ertugul} alt="" />
          </Link>
          <p className="u-name ">{userDetails && userDetails.full_name}</p>
          <p className="u-email">{userDetails &&userDetails.email}</p>
        </div>

        <div class="offcanvas-body">
         
          <div className="account-list ">
            <div className="ac-icon">
              <img src={heart1} alt="" />
            </div>

            <Link to="/Wishlist">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>Wishlist</p>
                </div>
                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div>



          <div className="account-list ">
            <div className="ac-icon">
              <img src={ic_my_orders} alt="" />
            </div>

            <Link to="/MyQutoes">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>My Quote</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div>
          
          

          <div className="account-list ">
            <div className="ac-icon">
              <img src={ic_my_orders} alt="" />
            </div>

            <Link to="/MyOrders">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>My Orders</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div>

          

         




          <div className="account-list ">
            <div className="ac-icon">
              <img src={help1} alt="" />
            </div>

            <Link to="/ContactUs">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>Contact Us</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div>

          
          {/* <div className="account-list ">
            <div className="ac-icon">
              <img src={ic_track_order} alt="" />
            </div>

            <Link to="#">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>Track Order</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "8px", width: "8px" }}
                  />
                </div>
              </div>
            </Link>
          </div> */}
          
          <div className="account-list ">
            <div className="ac-icon">
              <img src={about1} alt="" />
            </div>
            <Link to="/HowWeWork">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>How we work</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div>
          {/* <div className="account-list ">
            <div className="ac-icon">
              <img src={about1} alt="" />
            </div>
            <Link to="/TermsConditions">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>Terms & Conditions</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="account-list ">
            <div className="ac-icon">
              <img src={about1} alt="" />
            </div>
            <Link to="/PrivacyPolicy">
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>Privacy Policy</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div> */}
          <div className="account-list ">
            <div className="ac-icon">
              <img src={logout1} alt="" />
            </div>

            <Link to="#"  onClick={()=>logOut()}>
              <div className="inner-ac-list">
                <div className="ac-list-name">
                  <p>Logout</p>
                </div>

                <div className="arrow-icon">
                  <img
                    src={back1}
                    alt=""
                    style={{ height: "10px", width: "12px" }}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
