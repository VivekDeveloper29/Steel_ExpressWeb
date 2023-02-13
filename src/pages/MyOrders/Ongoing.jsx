import React from "react";
import { Link } from "react-router-dom";
import pic3 from "../../assets/images/product_image_01-1.png";
const Ongoing = () => {
  return (
    <main className="mayOrder-status-main">
      <div className="order-box">
        <div className="inner-content">
          <div className="left-content ">
            <div className="image ">
              <img src={pic3} alt="" />
            </div>
            <div className="content">
              <p className="top-par">
                HP Filter Holder, 25 mm, stainless steel
              </p>
              <p className="number">XX4502500</p>
              <div>
                <label className="key-name">Thickness</label>
                <label className="key-value">3-6 mm</label>
              </div>
              <div>
                <label className="key-name">Width</label>
                <label className="key-value">800 - 1500 mm</label>
              </div>
              <div>
                <label className="key-name">Status</label>
                <label className="status-ongoing">On the way</label>
              </div>
            </div>
          </div>
          <div className="right">
          <p className="placed-date">
          Order placed on 26-09-2022
          </p>
          <div className="onGoing_btnMain">
          <Link to="/MyOrderDetails" className="ongoing-btn">
              <button>View Order Details</button>
            </Link>
          </div>
          
          </div>
        </div>
      </div>
      <div className="order-box">
        <div className="inner-content">
          <div className="left-content ">
            <div className="image ">
              <img src={pic3} alt="" />
            </div>
            <div className="content">
              <p className="top-par">
                HP Filter Holder, 25 mm, stainless steel
              </p>
              <p className="number">XX4502500</p>
              <div>
                <label className="key-name">Thickness</label>
                <label className="key-value">3-6 mm</label>
              </div>
              <div>
                <label className="key-name">Width</label>
                <label className="key-value">800 - 1500 mm</label>
              </div>
              <div>
                <label className="key-name">Status</label>
                <label className="status-ongoing">On the way</label>
              </div>
            </div>
          </div>
          <div className="right">
          <p className="placed-date">
          Order placed on 26-09-2022
          </p>
          <div className="onGoing_btnMain">
          <Link to="/MyOrderDetails" className="ongoing-btn">
              <button>View Order Details</button>
            </Link>
          </div>
          
          </div>
        </div>
      </div>
      <div className="order-box">
        <div className="inner-content">
          <div className="left-content ">
            <div className="image ">
              <img src={pic3} alt="" />
            </div>
            <div className="content">
              <p className="top-par">
                HP Filter Holder, 25 mm, stainless steel
              </p>
              <p className="number">XX4502500</p>
              <div>
                <label className="key-name">Thickness</label>
                <label className="key-value">3-6 mm</label>
              </div>
              <div>
                <label className="key-name">Width</label>
                <label className="key-value">800 - 1500 mm</label>
              </div>
              <div>
                <label className="key-name">Status</label>
                <label className="status-ongoing">On the way</label>
              </div>
            </div>
          </div>
          <div className="right">
          <p className="placed-date">
          Order placed on 26-09-2022
          </p>
          <div className="onGoing_btnMain">
          <Link to="/MyOrderDetails" className="ongoing-btn">
              <button>View Order Details</button>
            </Link>
          </div>
          
          </div>
        </div>
      </div>
    </main>
  );
};

export default Ongoing;
