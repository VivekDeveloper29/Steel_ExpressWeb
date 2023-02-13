import React, { useContext, useEffect, useState } from "react";
import Footer from "../../SharedComponents/Footer";
import Navebar from "../../SharedComponents/Navbar";
import pic3 from "../../assets/images/product_image_01-1.png";
import { useParams } from "react-router-dom";
import tick_completed from "../../assets/images/tick_completed.svg";
import in_progress from "../../assets/images/in_progress.svg";
import logo_new from "../../assets/images/logo_new.svg";

import { simpleGetCall, simpleGetCallWithErrorResponse } from "../../api/ApiServices";
import ApiConfig from "../../api/ApiConfig";
import Base64 from 'base-64'
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import domtoimage from 'dom-to-image';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Stepper } from "react-form-stepper";
import Table from 'react-bootstrap/Table';
import { AppContext } from "../../context/AppContext ";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import html2canvas from "html2canvas";
const MyOrderDetails = () => {
  const [my_order_detail, setMyOrderDetail] = useState("");
  const [sendgrid_detail, setSendgridOrderDetail] = useState("");
  console.log("sendgrid_detail", sendgrid_detail)

  const { logedIn, setLoggedIn, userDetails } = useContext(AppContext);


  let params = useParams();
  let id = params.id;
  console.log("id", id);
  useEffect(() => {
    getMyOrderDetail();
    getSendgridDetail();
  }, []);

  let getMyOrderDetail = () => {
    simpleGetCall(
      ApiConfig.MYORDERDETAIL + id
    ).then((res) => {
      console.log(res);
      // if (res.result) {
      setMyOrderDetail(res.order);
    });
  };



  let getSendgridDetail = () => {
    simpleGetCallWithErrorResponse(
      ApiConfig.SENDGRID_PDF_GENRATE + id
    ).then((res) => {
      console.log(res);
      setSendgridOrderDetail(res.json);
      console.log("res.sendgrid_detail", res.json)
    });
  };


 

const createPdf=()=>{
  html2canvas(document.querySelector("#my-node")).then(canvas => {
  var imgData = canvas.toDataURL('image/png');              
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    doc.addImage(imgData, 'PNG', 10, 10);
    doc.save('Order-quote.pdf');
});
}







  return (
    <main >
      <Navebar />
      <div className="main-order-details"  >
        <section className="product-summery" >
          <div className="order-box">
            <div className="summery-heading-top" >
              {/* <label htmlFor="">Product Summary</label> */}
            </div>
            <div className="inner-content"  >
              <div className="left-content ">
                <div className="image " >
                  <img
                    src={
                      my_order_detail.order_image &&
                      my_order_detail.order_image[0]
                    }
                    alt=""
                  />
                </div>
                <div className="content"  >
                  <p className="top-par">
                    {my_order_detail &&
                      my_order_detail.order_items &&
                      my_order_detail.order_items[0].product_name}
                  </p>
                  <p className="number">
                    {my_order_detail &&
                      my_order_detail.order_items &&
                      my_order_detail.order_items[0].product_number}
                  </p>
                  <div>
                    <label className="key-name">Thickness:</label>
                    <label className="key-value">
                      {my_order_detail &&
                        my_order_detail.order_items &&
                        my_order_detail.order_items[0].product_thickness}
                    </label>
                  </div>
                  <div >
                    <label className="key-name">Width:</label>
                    <label className="key-value">
                      {my_order_detail &&
                        my_order_detail.order_items &&
                        my_order_detail.order_items[0].product_width}
                    </label>
                  </div>
                  <div >
                    <label className="key-name">Quantity:</label>
                    <label className="key-value">
                      {my_order_detail &&
                        my_order_detail.order_items &&
                        my_order_detail.order_items[0].quantity}
                    </label>
                  </div>
                  <div>
                    <label className="key-name">Grade:</label>
                    <label className="key-value">
                      {my_order_detail &&
                        my_order_detail.order_items &&
                        my_order_detail.order_items[0].product_grade}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="order-stepper" >

          <div style={{ "margin-left": "700px" }}>
            <button class="btn" onClick={createPdf}><i class="fa fa-download"></i> Download Quote </button>
          </div>

          <div id="table" >
            <div style={{ "background-color": "white" ,padding: "20px"}}  id="my-node">
              <img style={{ "margin-left": "300px" }} src={logo_new} alt height={100} width={200} />
              <br></br>

              <b> Dear {userDetails.full_name} , </b>
              <p> Please find Quote below for your reference. </p><hr></hr>

              <Table  >
                <thead style={{ "background-color": "red", "color": "white" }}>
                  <tr>
                    <th>Product Number</th>
                    <th>Product Name</th>
                    <th>Specification (Size)</th>
                    <th>Qty in MT</th>
                    <th>Price in MT</th>
                    <th>Net Value (Rs.)</th>
                  </tr>
                </thead>
                <tbody style={{ "background-color": "white" }}>
                  {
                    sendgrid_detail.order_item_detail && sendgrid_detail.order_item_detail.map((item) =>
                    (
                      <tr>
                        <td>{item.product_number}</td>
                        <td>{item.product_name}</td>
                        <td>

                          <p>Coating: {item.product_coating}</p>
                          <p>Thickness: {item.product_thickness}</p>
                          <p>Length: {item.product_length}</p>
                          <p>Width: {item.product_width}</p>
                          <p>Size: {item.product_size}</p>
                          <p>Diameter: {item.product_diameter}</p>
                          <p>Grade: {item.product_grade}</p>
                          <p>color: {item.product_color}</p>

                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.price_quantity}</td>
                        <td>{item.net_value}</td>
                      </tr>
                    )
                    )
                  }



                </tbody>
              </Table>

              <Table style={{ "width": "50%", "marginLeft": "500px", "background-color": "white" }}>
                <tbody>
                  <tr>
                    <td><b>Loading : </b> <span style={{ "marginLeft": "200px" }}>{sendgrid_detail.loading_cost}</span> </td>
                  </tr>
                  <tr>
                    <td><b>Transport :</b><span style={{ "marginLeft": "190px" }}> {sendgrid_detail.transport_cost} </span></td>
                  </tr>

                  <tr>
                    <td><b>Total Value (Rs) : </b> <span style={{ "marginLeft": "148px" }}>{sendgrid_detail.total_cost_value}</span> </td>
                  </tr>
                  <tr>
                    <td><b>CGST : </b> <span style={{ "marginLeft": "220px" }}>{sendgrid_detail.cgst_percentage}</span> </td>
                  </tr>
                  <tr>
                    <td><b>SGST : </b> <span style={{ "marginLeft": "220px" }}>{sendgrid_detail.sgst_percentage}</span> </td>
                  </tr>
                  <tr style={{ "background-color": "red", "color": "white" }}>
                    <td><b>Total Value : </b> <span style={{ "marginLeft": "170px" }}>{sendgrid_detail.Total_Estimate}</span> </td>
                  </tr>

                </tbody>
              </Table>
            </div>
          </div>



          <div className="order-box">
            <div className="d-flex justify-content-between">
              <div className="summery-heading-top">
                <label htmlFor="">Order</label>
              </div>
              {/* <div className="right"> */}
              {/* onClick={onButtonClick} */}
              {/* onClick={this.generatePDF} */}
              {/* <button className="status-name" id="download-button" onClick={generatePDF} type="primary"> */}
              {/* Download Quote */}
              {/* </button> */}
              {/* </div> */}
            </div>

            <div className="inner-content-stepper" >

              {my_order_detail &&
                my_order_detail.order_status_summary.length &&
                my_order_detail.order_status_summary.map(
                  (order_details, index) => {
                    return (
                      <>
                        <div id="stepper">
                          <div class="d-flex justify-content-between" >
                            <div className="left d-flex ">
                              <div class="d-flex flex-column  align-items-center">
                                <div class="rounded-circle  px-3  ">
                                  <img src={tick_completed} alt height={25} width={25} />
                                </div>

                                <div class="line h-100  "></div>
                              </div>
                              <div className="stepper-content content ">
                                <p>{order_details.order_status}</p>
                                <label htmlFor="">{order_details.status_on}</label>
                              </div>
                            </div>

                            <div className="right">
                              <label className="status-name">Completed</label>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}






              {/* <div class="d-flex justify-content-between">
                  <div className="left d-flex ">
                    <div class="d-flex flex-column  align-items-center">
                      <div class="rounded-circle  px-3  ">
                        <img src={tick_completed} alt height={25} width={25} />
                      </div>

                      <div class="line h-100  "></div>
                    </div>
                    <div className="stepper-content content ">
                      <p>Quote sent</p>
                      <label htmlFor="">26-03-2022, 10:30 AM</label>
                    </div>
                  </div>

                  <div className="right">
                    <label className="status-name">Completed</label>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div className="left d-flex ">
                    <div class="d-flex flex-column  align-items-center">
                      <div class="rounded-circle  px-3  ">
                        <img src={tick_completed} altheight={25} width={25} />
                      </div>

                      <div class="remaining-step-line h-100  "></div>
                    </div>
                    <div className="stepper-content content ">
                      <p>Quote sent</p>
                      <label htmlFor="">26-03-2022, 10:30 AM</label>
                    </div>
                  </div>

                  <div className="right">
                    <label className="status-name">Completed</label>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <div className="left d-flex ">
                    <div class="d-flex flex-column  align-items-center">
                      <div class="rounded-circle  px-3  ">
                        <img src={in_progress} alt height={25} width={25} />
                      </div>

                      <div class="remaining-step-line h-100  "></div>
                    </div>
                    <div className="stepper-content content ">
                      <p>Order Placed</p>
                    </div>
                  </div>

                  <div className="right">
                    <label className="status-name">In Progress</label>
                  </div>
                </div>

                <div class="d-flex ">
                  <div class="d-flex flex-column  align-items-center">
                    <div class="rounded-circle  px-3  ">
                      <div className="remaining-step"></div>
                    </div>
                  </div>
                  <div className="stepper-content content">
                    <p>Out for delivery</p>
                  </div>
                </div> */}
              {/* </div> */}

            </div>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
};

export default MyOrderDetails;
