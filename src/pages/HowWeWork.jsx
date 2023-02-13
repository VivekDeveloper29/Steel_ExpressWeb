import React from "react";
import Footer from "../SharedComponents/Footer";
import Navbar from "../SharedComponents/Navbar";
import how_it_works_image from "../assets/images/how_it_works_image.svg";

const HowWeWork = () => {
  return (
    <main>
      <Navbar />
      <div className="main-howWeWork">
        <div className="img-how-work style-img" id="img-style">
          <img src={how_it_works_image} alt="" />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default HowWeWork;
