import React, { useEffect, useState } from "react";
import ApiConfig from "../../api/ApiConfig";
import { postWithAuthCallWithErrorResponse, simpleGetCallWithErrorResponse, simplePostCall } from "../../api/ApiServices";
import Footer from "../../SharedComponents/Footer";
import Navbar from "../../SharedComponents/Navbar";
import Completed from "./Completed";
import Ongoing from "./Ongoing";
import OrderViewQuote from "./OrderViewQuote";
import { ScaleLoader } from "react-spinners";

const MyOrders = () => {
  const [waiting_quits, setWaitingQuits] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getWaitingQuits("Quote Accepted");
  }, []);

  const getWaitingQuits = (text) => {
    setLoading(true)
    simplePostCall(ApiConfig.FILTERORDER, JSON.stringify({ type: text })).then((res) => {
      setLoading(false)
      console.log(res)
      if (res.result)
        setWaitingQuits(res.order)
        else
        setWaitingQuits([])
    });
  };
  return (
    <>
    <main>
      <Navbar />
      <div className="main-my-orders">
        <div className="tab-my-order">
          <ul
            class="nav nav-pills  "
            id="pills-tab"
            role="tablist"
            style={{ minWidth: "390px" }}
          >
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                onClick={() => getWaitingQuits("Quote Accepted")}
              >
                Order Status
              </button>
            </li>
            {/* <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                onClick={() => getWaitingQuits("Ongoing")}
              >
                Ongoing
              </button>
            </li> */}
            {/* <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                onClick={() => getWaitingQuits("Completed")}
              >
                Completed
              </button>
            </li> */}
          </ul>
        </div>

        {/* =================BODY=============== */}
        {loading ? (
      <ScaleLoader

        color={"#ff3e6c"}
        loading={loading}
        size={10}
        className="loading d-flex justify-content-center"
        style={{ left: "70%" }}
      />
    ) : (

        <div class="tab-content tab-body" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <OrderViewQuote waiting_quits={waiting_quits} />
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <OrderViewQuote waiting_quits={waiting_quits} />
          </div>
          <div
            class="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <OrderViewQuote waiting_quits={waiting_quits} />
          </div>
        </div>
         )}

      </div>
      <Footer />
    </main>
    </>
  );
};

export default MyOrders;
