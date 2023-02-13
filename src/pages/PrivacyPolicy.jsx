import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ApiConfig from '../api/ApiConfig';
import { getWithAuthCallWithtext } from '../api/ApiServices';
import Footer from '../SharedComponents/Footer'
import Navbar from '../SharedComponents/Navbar'
import { ScaleLoader } from "react-spinners";

const PrivacyPolicy = () => {
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTerms();
  }, []);


  const getTerms = () => {
    setLoading(true)
    getWithAuthCallWithtext(ApiConfig.PRIVACY_POLICY)
      .then((data) => {
        setLoading(false)
        setTerms(data.text);
        console.log(data.text)
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
          <h3 className="TermsConditions-title">Privacy Policy</h3>
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

export default PrivacyPolicy;
