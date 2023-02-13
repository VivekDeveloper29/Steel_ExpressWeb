import React from "react";
import pic3 from "../../assets/images/product_image_01-1.png";
import { Link } from "react-router-dom";

const Completed = () => {
  return (
    <main className="mayOrder-status-main">
      <div className="order-box">
        <div className="inner-content completed-inner">
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
                <label className="status-completed">
                  Delivered on 25-0-2022
                </label>
              </div>
            </div>
          </div>
          <div className="right completed-right">
            <Link to="/MyOrderDetails" className="completed-btn">
              <button>View Order Details</button>
            </Link>

            <Link to="#" className="completed-btn dark-color">
              <button>Buy Again</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="order-box">
        <div className="inner-content completed-inner">
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
                <label className="status-completed">
                  Delivered on 25-0-2022
                </label>
              </div>
            </div>
          </div>
          <div className="right completed-right">
            <Link to="/MyOrderDetails" className="completed-btn">
              <button>View Order Details</button>
            </Link>

            <Link to="#" className="completed-btn dark-color">
              <button>Buy Again</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="order-box">
        <div className="inner-content completed-inner">
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
                <label className="status-completed">
                  Delivered on 25-0-2022
                </label>
              </div>
            </div>
          </div>
          <div className="right completed-right">
            <Link to="/MyOrderDetails" className="completed-btn ">
              <button>View Order Details</button>
            </Link>

            <Link to="#" className="completed-btn dark-color">
              <button>Buy Again</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Completed;
