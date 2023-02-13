import React, { useState, useEffect } from "react";
import ApiConfig from "../../api/ApiConfig";
import { postWithAuthCall, simpleGetCallWithErrorResponse } from "../../api/ApiServices";
import pic3 from "../../assets/images/product_image_01-1.png";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import swal from "sweetalert";
// import ApiConfig from "../api/ApiConfig";
import Table from 'react-bootstrap/Table';

const WaitingForQuotes = ({ waiting_quits }) => {
  // console.log("ordeitems",waiting_quits[0].order_items[0].product_number)
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
      {/* start the table of order */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Status</th>
            {/* <th>Description</th> */}
            <th>Order placed on</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {
            waiting_quits && waiting_quits.map((order_items, i) => {
              console.log("object==>,", order_items);
              return (
                <tr>
                  <td>
                    <img style={{ width: "100px", height: "80px" }} src={order_items.order_image[0]} alt="" />
                  </td>
                  <td className="order-status-style">

                    <label className="key">Order ID:</label>

                    <label htmlFor="" className="status-waiting">{order_items.order_items &&  order_items.order_items.length >0 && order_items.order_items[0].id}</label><br />

                    <label className="key">Product name:</label>
                    <label htmlFor="" className="status-waiting">{order_items.order_items &&  order_items.order_items.length >0 && order_items.order_items[0].product_name}</label><br />
                    
                    <label className="key">Status:</label>
                    <label htmlFor="" className="status-waiting">{order_items && order_items.current_order_status}</label>

                  </td>

                  {/* <td>{order_items.product_name}</td> */}
                  {/* <td>
                {
                  order_items.order_items.length > 0 && order_items.order_items.map((item, index) => {
                                      return (
                    <>
                    <ul>
                    <li> Size: {item?.product_number}</li>
                    </ul>

                    </>
                                      )
                  }) 
                }
                </td> */}

                  {/* <td>{order_items.order_items.length > 0 ? order_items.order_items[0].product_number : null}</td> */}

                  <td>{order_items.order_date}</td>
                  <td>
                    <div className="onGoing_btnMain">
                      <Link to={"/PerfomaInvice/" + order_items.id} >
                        <button className="ongoing-btn view" >
                        Proforma Invoice
                        </button>
                      </Link>
                      &nbsp; &nbsp;

                      <Link to={"/sendinovice/" + order_items.id} >
                        <button className="ongoing-btn view" >
                        Invoice
                        </button>
                      </Link>
                    </div>

                  </td>
                </tr>
              )
            })}
          {/* <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>View Quote</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>View Quote</td>
            
          </tr> */}
        </tbody>
      </Table>

      {/* end the table of order */}




      {/* {waiting_quits && waiting_quits.map((order_items) => (
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
              <p className="number">{order_items.order_items && order_items.order_items.length > 0 && [0] .product_number}</p>
             
              <div>
                <label className="key-name">Status</label>
                <label className="status-waiting">{order_items && order_items.current_order_status}</label>
              </div>
            </div>
          </div>
          <div className="right">
            <p className="placed-date">Order placed on  {order_items.order_date}</p>
          <div className="onGoing_btnMain">
            <Link to={"/MyOrderDetails/" + order_items.id} className="ongoing-btn">
              <button>View Quote</button>
            </Link>
          </div>
          </div>
        </div>
      </div>
       ))} */}
    </main>
  );
};

export default WaitingForQuotes;
