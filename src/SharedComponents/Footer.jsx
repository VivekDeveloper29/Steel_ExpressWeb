import React from "react";
import instagram from "../assets/images/ic_instagram.png";
import ic_linkedin from "../assets/images/ic_linkedin.svg";
import ic_fb from "../assets/images/ic_fb.svg";
import ic_youtube from "../assets/images/ic_youtube.svg";
import ic_twitter from "../assets/images/ic_twitter.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <main className="main-footer ">
      <div className="top-div">
        <div className="term-policy">
          <label htmlFor="" className="policy">
          <Link to="/PrivacyPolicy" className="about">
            Privacy Policy
            </Link>
          </label>
          <label htmlFor="" className="term">
            <Link to="/TermsConditions" className="about">
            Terms & Conditions
            </Link>
            
          </label>
          {/* <Link to="/About" htmlFor="" className="about">
            About Us
          </Link> */}
        </div>
      </div>
      <div className="bottom-div">
        <div className="social-media-icons">
          <a href="https://www.facebook.com/steelexpress.in/" target="_blank">
            <img src={ic_fb} alt="facebook" className="icon-social" />
          </a>
          <a href="https://twitter.com/" target="_blank">
            <img src={ic_twitter} alt="facebook" className="icon-social" />
          </a>
          <a href="https://www.instagram.com/steelexpress.in//" target="_blank">
            <img src={instagram} alt="facebook" className="icon-social" />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <img src={ic_youtube} alt="facebook" className="icon-social" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank">
            <img src={ic_linkedin} alt="facebook" className="icon-social" />
          </a>
        </div>
        <div>
          <label htmlFor="">Powered by SteelExpress@2022</label>
        </div>
      </div>
    </main>
  );
};

export default Footer;
