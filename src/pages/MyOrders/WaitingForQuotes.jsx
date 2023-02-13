import React, { useState, useEffect } from "react";
import ApiConfig from "../../api/ApiConfig";
import { postWithAuthCall, simpleGetCallWithErrorResponse } from "../../api/ApiServices";
import pic3 from "../../assets/images/product_image_01-1.png";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import swal from "sweetalert";
// import ApiConfig from "../api/ApiConfig";

const WaitingForQuotes = ({ waiting_quits }) => {

  const [quote_status, setQuoteStatusUpdate] = useState([]);
  const navigate = useNavigate();


  const generatePDF = () => {

    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector(("#cont")), {
      callback: function (pdf) {
        // var pageCount=doc.internal.getNumberOfPages();
        // pdf.deletePage(pageCount);
        pdf.save("mypdf.pdf");
      }

    });
  };

  const QuoteStatusUpdate = (id) => {
    console.log()
    postWithAuthCall(
      ApiConfig.QUOTSTATUS,
      JSON.stringify({ quote_id: id, quote_status: "Quote Accepted" })
    ).then((res) => {
      console.log(res);
      setQuoteStatusUpdate(res);
      swal(res.message);
      // navigate("/PopularExperts/",{state:res})


    });
  }
  const QuoteStatusRejected = (id) => {
    console.log()
    postWithAuthCall(
      ApiConfig.QUOTSTATUS,
      JSON.stringify({ quote_id: id, quote_status: "Quote Rejected" })
    ).then((res) => {
      console.log(res);
      setQuoteStatusUpdate(res);
      swal(res.message);
      // navigate("/PopularExperts/",{state:res})


    });
  }



  return (
    <main className="mayOrder-status-main">
      {waiting_quits && waiting_quits.map((order_items) => (




        <div className="order-box" id="cont">
          <div className="inner-content" >
            <div className="left-content" >
              <div className="image ">
                <img src={order_items.order_image[0]} alt="" />
              </div>
              <div className="content">
                
                <p className="top-par">
                  {order_items.order_items && order_items.order_items.length > 0 && [0].product_name}
                </p>
                <p className="number">{order_items.order_items && order_items.order_items.length > 0 && [0].product_number}</p>
                {/* <div>
                <label className="key-name">Thickness</label>
                <label className="key-value">{order_items.order_items && order_items.order_items.length >0 && [0] .product_thickness}</label>
              </div>
              <div>
                <label className="key-name">Width</label>
                <label className="key-value">{order_items.order_items &&  order_items.order_items.length >0 && [0].product_width}</label>
              </div> */}
               <div>
                  <label className="key-name">Quote ID</label>
                  <label className="status-waiting">{order_items.order_items &&  order_items.order_items.length >0 && order_items.order_items[0].id}</label>
                </div>
               <div>
                  <label className="key-name">Product name</label>
                  <label className="status-waiting">{order_items.order_items &&  order_items.order_items.length >0 && order_items.order_items[0].product_name}</label>
                </div>
                <div>
                  <label className="key-name">Status</label>
                  <label className="status-waiting">{order_items && order_items.current_order_status}</label>
                </div>
              </div>
            </div>
            <div className="right">
              <p className="placed-date">Quote Order on  {order_items.order_date}</p>
              {/* "Quote Rejected" */}
              {
                order_items.current_order_status === "Quote Accepted" ? (
                  <div className="onGoing_btnMain" id="btn-acc-rej">
                    {/* <Link to={"/PerfomaInvice/" + order_items.id} > */}
                    <Link to={"/MyOrderDetails/" + order_items.id} >
                      <button className="ongoing-btn view " >View details</button>
                    </Link>

{/* 
                    <Link to={"/sendinovice/" + order_items.id} >
                      <button className="ongoing-btn view " >Send invoice</button>
                    </Link> */}
                  </div>

                ) : (order_items.current_order_status === "Quote Rejected" ? (
                   <div className="onGoing_btnMain" id="btn-acc-rej">
                    {/* <Link to={"/PerfomaInvice/" + order_items.id} > */}
                    <Link to={"/MyOrderDetails/" + order_items.id} >
                      <button className="ongoing-btn view " >View details</button>
                    </Link>

{/* 
                    <Link to={"/sendinovice/" + order_items.id} >
                      <button className="ongoing-btn view " >Send invoice</button>
                    </Link> */}
                  </div>

                ) : (
                  <div className="onGoing_btnMain" id="btn-acc-rej">
                    <Link to={"#"} >
                      <button onClick={() => QuoteStatusUpdate(order_items.id)} className="ongoing-btn view "  >Accept</button>
                    </Link>

                    <Link to={"#"} >
                      <button onClick={() => QuoteStatusRejected(order_items.id)} className="ongoing-btn view">Reject</button>
                    </Link>
                  </div>
                )

                )
              }


            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default WaitingForQuotes;
