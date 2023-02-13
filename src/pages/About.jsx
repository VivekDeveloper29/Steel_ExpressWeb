import React from "react";
import Footer from "../SharedComponents/Footer";
import Navbar from "../SharedComponents/Navbar";
import About_us_page_amico from "../assets/images/About_us_page_amico.svg";
import { getWithAuthCallWithtext } from "../api/ApiServices";
import ApiConfig from "../api/ApiConfig";
import { useState } from "react";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";

const About = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTerms();
  }, []);


  const getTerms = () => {
    setLoading(true)
    getWithAuthCallWithtext(ApiConfig.ABOUT_US)
      .then((data) => {
        setLoading(false)
        setTerms(data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  }
 return (
    <main>
      <Navbar />
      <div className="main-howWeWork TermsConditions-main">
        <div className="img-how-work">
          <h3 className="TermsConditions-title">About Us</h3>

          {loading ? (
      <ScaleLoader

        color={"#ff3e6c"}
        loading={loading}
        size={10}
        className="loading d-flex justify-content-center"
        style={{ left: "70%" }}
      />
    ) : (
   
          <div className="TermsConditions-para">
          <p dangerouslySetInnerHTML={{ __html:terms }}></p>
          <div>
            
          
            </div>
          </div>
    )}
         

        </div>
      </div>
      <Footer />
    </main>
  );
};
export default About;
