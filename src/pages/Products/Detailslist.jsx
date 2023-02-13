import React, { useContext } from "react";
import Navbar from "../../SharedComponents/Navbar";
import detailspic from "../../assets/images/details-big.png";
import { Detailsimages } from "../../SharedComponents/Detailsimages";
import Slider from "react-slick";
import heart from "../../assets/images/ic_heart.svg";
import Footer from "../../SharedComponents/Footer";
import bullet from "../../assets/images/ic_bullet_pt.svg";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ApiConfig from "../../api/ApiConfig";
import {
  postWithAuthCall,
  simpleGetCall,
  simplePostCall,
} from "../../api/ApiServices";
import swal from "sweetalert";
import { AppContext } from "../../context/AppContext ";
// import ic_heart_active from "../assets/images/ic_heart_active.svg";

function Detailslist() {
  const location= useLocation().state
  const [cart_detail] = useState(location?location:{});

  const [product_detail, setProductDetail] = useState({thickness :""});
  const [sendgrid_detail, setSendgridOrderDetail] = useState({thickness :""});
  const navigate = useNavigate();
 
  useEffect(() => {
    console.log("quantity",cart_detail)

    // .toString()
    setAddProductCart({
      product_id:id.toString(),
      product_coating:cart_detail.product_coating,
      quantity: cart_detail.quantity,
      product_size:cart_detail.product_size,
      transportation:cart_detail.transportation,
      product_thickness:cart_detail.product_thickness,
      product_color:cart_detail.product_color,
      product_length:cart_detail.product_length,
      product_width:cart_detail.product_width,
      product_grade:cart_detail.product_grade,
      product_diameter:cart_detail.product_diameter,
      other_details:cart_detail.other_details,
      pickup_location:cart_detail.pickup_location,
     
    })
  },[])
 
  const { logedIn, setLoggedIn, addproductcart, setAddProductCart } =
    useContext(AppContext);
    console.log("addproductcart",addproductcart)
  const [errMsg, setErrMsg] = useState({
    product_id: "",
    product_thickness: "",
    product_width: "",
    product_grade: "",
    quantity: "",
    other_details: "",
    
  });
  let params = useParams();
  let id = Number(params.id);
  console.log("id",typeof(id))
  let details=params.details

  
  useEffect(() => {
    getProductDetails();
    getSendgridDetail();
  }, []);

  let getProductDetails = () => {
    simpleGetCall(
      ApiConfig.PRODUCT_DETAILS + id 
      
    ).then((res) => {
      console.log(res);
      if (res.result) {
        setProductDetail(res.product); 
        console.log("res.product",res.product)
      }
    });
  };


  let getSendgridDetail = () => {
    simpleGetCall(
      ApiConfig.SENDGRID_PDF_GENRATE + id 
    ).then((res) => {
      console.log(res);
      if (res.result) {
        setSendgridOrderDetail(res.sendgrid_detail); 
        console.log("res.sendgrid_detail",res.sendgrid_detail)
      }
    });
  };



  const AddToCart = (e) => {
    console.log("product_id",id)
    if (logedIn) {
      const formdata=new FormData()
      
      e.preventDefault(); // The preventDefault() method cancels the event if it is cancelable,
      simplePostCall(
        ApiConfig.CARTDISPLAY, 
        // formdata
        
        JSON.stringify({ ...addproductcart,product_id:id,product_size:addproductcart.product_size =="if_others" ? addproductcart.size:addproductcart.product_size,
        product_thickness:addproductcart.product_thickness =="if_others" ? addproductcart.thickness:addproductcart.product_thickness,
        product_width:addproductcart.product_width =="if_others" ? addproductcart.width:addproductcart.product_width, 
        product_grade:addproductcart.product_grade =="if_others" ? addproductcart.grade:addproductcart.product_grade,   
        product_length:addproductcart.product_length =="if_others" ? addproductcart.length:addproductcart.product_length, 
        product_coating:addproductcart.product_coating =="if_others" ? addproductcart.coating:addproductcart.product_coating,
        
        product_diameter:addproductcart.product_diameter =="if_others" ? addproductcart.diameter:addproductcart.product_diameter, 
        product_color:addproductcart.product_color =="if_others" ? addproductcart.color:addproductcart.product_color
     
      })
      ).then((res) => {
        console.log(res);
        setAddProductCart({});
        if (res.result) {
          navigate("/home/");
        }
        swal(res.message);
      });
    } else {
      setAddProductCart({ ...addproductcart, cart: true });
      swal("Please Register").then(() => {
        navigate("/Registration");
      });
    }
  };
console.log("addproductcart",addproductcart)
  const Getquote = (e) => {
    if (logedIn) {
      console.log(addproductcart)
      let data = JSON.stringify({ ...addproductcart,product_size:addproductcart.product_size =="if_others" ? addproductcart.size:addproductcart.product_size,
      product_thickness:addproductcart.product_thickness =="if_others" ? addproductcart.thickness:addproductcart.product_thickness,
      product_width:addproductcart.product_width =="if_others" ? addproductcart.width:addproductcart.product_width, 
      product_grade:addproductcart.product_grade =="if_others" ? addproductcart.grade:addproductcart.product_grade,   
      product_length:addproductcart.product_length =="if_others" ? addproductcart.length:addproductcart.product_length, 
      product_coating:addproductcart.product_coating =="if_others" ? addproductcart.coating:addproductcart.product_coating,
      
      product_diameter:addproductcart.product_diameter =="if_others" ? addproductcart.diameter:addproductcart.product_diameter, 
      product_color:addproductcart.product_color =="if_others" ? addproductcart.color:addproductcart.product_color,
    
    });
      
      console.log("data", data);
      simplePostCall(ApiConfig.GETQUOTE, data).then((res) => {
        console.log(res);
        setAddProductCart({});
        swal(res.message);
        navigate("/home/");
      });
      // e.preventDeafalt()
      console.log("clicked");
    } else {
      swal(
        "To send a quote we would require few of the details, it will hardly take a minute."
      ).then(() => {
        navigate("/Registration");
      });
    }
  };

  const WishList = (id) => {
    // e.preventDefault();// The preventDefault() method cancels the event if it is cancelable,
    {
      let data = { id }; 
      simplePostCall(
        ApiConfig.WISHLIST, 
        JSON.stringify({ product_id: id }) 
      ).then((res) => {
        console.log(res);
        swal(res.message);
      });
    }
  };

  console.log("product_detail",product_detail)

  return (
    <>
      <Navbar />
      <main className="details-lists-main">
        <div className="details-bg ">
          <div className="inner-section-cart">
            <div className="row">
              <div className="col-lg-4">
                <div>
                  {/* <img src={detailspic} alt="" style={{height:"375px",width:"375px"}} /> */}
                  <div className="slider_container">
                    <Slider
                      autoplay
                      dots
                      customPaging={(i) => {
                        return (
                          <div className="small-img-slide">
                            <img
                              src={
                                product_detail.images &&
                                product_detail.images[i]
                              }
                              alt={i}
                              className="detail-small-img"
                              style={{
                                width: "60px",
                                height: "64px",
                                objectFit: "contain",
                                border: "none",
                                // marginBottom: "20px",
                              }}
                            />
                          </div>
                        );
                      }}
                      dotsClass="slick-dots custom-dots"
                    >
                      {product_detail.images &&
                        product_detail.images.map((image) => {
                          return (
                            <>
                              <div
                                className="big-image-slide mt-4 "
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={image}
                                  alt="image"
                                  style={{ height: "370px", width: "370px" }}
                                />
                              </div>
                            </>
                          );
                        })}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mt-4 right-col">
                <div className="row right-form">
                  <div className="top-heading-heart heart-divide">
                    <div className="hot-text">
                      <p>{product_detail.name}</p>
                      <label className="steel-text">
                        {product_detail.brand_name}
                      </label>
                    </div>

                    <div className="heart ">
                      {/* <img src={heart} alt="" className="me-3" /> */}
                      {
                        // !product_detail.is_wishlist ?
                        <img
                          src={heart}
                          onClick={() => WishList(product_detail.id)}
                          alt=""
                        />
                        // :
                        // <img src={ic_heart_active}

                        //   alt="" />
                      }
                    </div>
                  </div>
                  {product_detail.thickness &&
                    product_detail.thickness.length > 0 && (
                      <div className="col-sm-4 ">
                        <label>Thickness(mm) <span className="fill-img-star ms-1">*</span></label>

                        <select
                          className="input-details form-select"
                          value={addproductcart.product_thickness}
                          onChange={(e) => {
                            setAddProductCart({
                              ...addproductcart,
                              product_thickness: e.target.value,
                            });
                          }}
                        >
                          <option>Select Thickness </option>
                          {product_detail.thickness.map((data, index) => {
                            return (
                              <option value={data} key={"thikness" + index}>
                                {data}
                              </option>
                            );
                          })}
                          <option value={"if_others"}>
                             If others
                        </option>
                        </select>
                      </div>
                    )}

                  {
                    addproductcart.product_thickness=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter Thickness <span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          thickness: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  }


                    {/* {
                   (addproductcart.product_thickness && (product_detail.thickness && product_detail.thickness.length&&  !product_detail.thickness.includes(addproductcart.product_thickness)) || addproductcart.product_thickness=="if_others") &&        
                    <div className="col-sm-4 ">
                    <label>Enter Thickness <span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      // value={addproductcart.product_thickness}
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          // product_thickness: e.target.value,
                          thickness: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  } */}
                    

                  {product_detail.width && product_detail.width.length > 0 && (
                    <div className="col-sm-4 ">
                      <label>Width(mm) <span className="fill-img-star ms-1">*</span></label>

                      <select
                        className="input-details form-select"
                        value={addproductcart.product_width}
                        onChange={(e) => {
                          setAddProductCart({
                            ...addproductcart,
                            product_width: e.target.value,
                          });
                        }}
                      >
                        <option>Select Width</option>
                        {product_detail.width.map((data, index) => {
                          return (
                            <option value={data} key={"width" + index}>
                              {data}
                            </option>
                          );
                        })}
                         <option value={"if_others"}>
                             If others
                        </option>
                      </select>
                    </div>
                  )}
                   {
                    addproductcart.product_width=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter Width <span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          width: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  }

                  <div className="col-sm-4 ">
                    <label>Quantity(MT) <span className="fill-img-star ms-1">*</span></label>
                    <input
                      type="number"
                      required="required"
                      value={addproductcart.quantity}
                      onChange={(e) => {
              
                          // setErrMsg({...errMsg,quantity:""})
                          setAddProductCart({
                            ...addproductcart,
                            quantity: e.target.value,
                          });
                        
                        
                      }}
                      className="input-details form-control"
                    />
                    {/* {errMsg.quantity && errMsg.quantity.length > 0 && (
                  <span className="text-danger">{errMsg.quantity}</span>
                )} */}
                  </div>

                  {product_detail.grade && product_detail.grade.length > 0 && (
                    <div className="col-sm-4">
                      <label>Grade <span className="fill-img-star">*</span></label>
                      <select
                        className="input-details form-select"
                        value={addproductcart.product_grade}
                        onChange={(e) => {
                          setAddProductCart({
                            ...addproductcart,
                            product_grade: e.target.value,
                          });
                        }}
                      >
                        <option>Select Grade</option>
                        {product_detail.grade.map((data, index) => {
                          return (
                            <option value={data} key={"width" + index}>
                              {data}
                            </option>
                          );
                        })}
                          <option value={"if_others"}>
                             If others
                          </option>
                      </select>
                    </div>
                  )}
                  {
                    addproductcart.product_grade=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter Grade<span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          grade: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  }


                  {product_detail.length && product_detail.length.length > 0 && (
                    <div className="col-sm-4">
                      <label>Length<span className="fill-img-star ms-1">*</span></label>
                      <select
                        className="input-details form-select"
                        value={addproductcart.product_length}
                        onChange={(e) => {
                          setAddProductCart({
                            ...addproductcart,
                            product_length: e.target.value,
                          });
                        }}
                      >
                        <option>Select length </option>
                        {product_detail.length &&
                          product_detail.length.length &&
                          product_detail.length.map((data, index) => {
                            return (
                              <option value={data} key={"width" + index}>
                                {data}
                              </option>
                            );
                          })}

                          <option value={"if_others"}>
                             If others
                          </option>


                      </select>
                    </div>
                  )}
                  {
                    addproductcart.product_length=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter length<span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          length: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  }


                  {product_detail.coating && product_detail.coating.length > 0 && (
                    <div className="col-sm-4 ">
                      <label>Coating<span className="fill-img-star ms-1">*</span></label>
                      <select
                        className="input-details form-select"
                        value={addproductcart.product_coating}
                        onChange={(e) => {
                          setAddProductCart({
                            ...addproductcart,
                            product_coating: e.target.value,
                          });
                        }}
                      >
                        <option>Select Coating</option>
                        {product_detail.coating.map((data, index) => {
                          return (
                            <option value={data} key={"width" + index}>
                              {data}
                            </option>
                          );
                        })}
                        <option value={"if_others"}>
                             If others
                          </option>
                      </select>
                    </div>
                  )}
                  {
                    addproductcart.product_coating=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter Coating<span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          coating: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  }

                  {product_detail.diameter &&
                    product_detail.diameter.length > 0 && (
                      <div className="col-sm-4 ">
                        <label>Enter Diameter<span className="fill-img-star ms-1">*</span></label>
                        <select
                          className="input-details form-select"
                          value={addproductcart.product_diameter}
                          onChange={(e) => {
                            setAddProductCart({
                              ...addproductcart,
                              product_diameter: e.target.value,
                            });
                          }}
                          
                        >
                          <option>Select Diameter</option>
                          {product_detail.diameter.map((data, index) => {
                            return (
                              <option value={data} key={"width" + index}>
                                {data}
                              </option>
                              
                            );
                          })}
                          <option value={"if_others"}>
                             If others
                          </option>
                        </select>
                      </div>
                    )}
                     {
                    addproductcart.product_diameter=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter Diameter<span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          diameter: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  }

                  {product_detail.color && product_detail.color.length > 0 && (
                    <div className="col-sm-4 ">
                      <label>Color<span className="fill-img-star ms-1">*</span></label>
                      <select
                        className="input-details form-select"
                        value={addproductcart.product_color}
                        onChange={(e) => {
                          setAddProductCart({
                            ...addproductcart,
                            product_color: e.target.value,
                          });
                        }}
                      >
                        <option>Select color</option>
                        {product_detail.color.map((data, index) => {
                          return (
                            <option value={data} key={"width" + index}>
                              {data}
                            </option>
                          );
                        })}
                         <option value={"if_others"}>
                             If others
                          </option>
                        
                      </select>
                    </div>
                  )}
                   {
                    addproductcart.product_color=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter Color<span className="fill-img-star ms-1">*</span></label>
                    <input 
                      type="text"
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          color: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                  </div>
                  }

                  {product_detail.size && product_detail.size.length > 0 && (
                    <div className="col-sm-4 ">
                      <label>Size <span className="fill-img-star">*</span></label>
                      <select
                        className="input-details form-select"
                        // value={addproductcart.product_size}
                        onChange={(e) => {
                          
                          setAddProductCart({
                            ...addproductcart,
                            product_size: e.target.value,
                          });
                          // setErrMsg({...errMsg,size:""})
                        }}
                      >
                 
                        <option selected>Select size</option>
                        {product_detail.size.map((data, index) => {
                          return (
                            <>
                            <option value={data} key={"width" + index}>
                              {data}
                            </option>
                            
                          </>
                          );
                        })}
                        <option value={"if_others"}>
                             If others
                        </option>
                      </select>
                      {/* {errMsg.size && errMsg.size.length > 0 && (
                        <span className="text-danger">{errMsg.size}</span>
                   )} */}
                    </div>
                  )}  
                  {
                    addproductcart.product_size=="if_others" && 
                    <div className="col-sm-4 ">
                    <label>Enter size <span className="fill-img-star ms-1">*</span></label>
                    <input
                      type="text"
                      onChange={(e) => {

                        setAddProductCart({
                          ...addproductcart,
                          size: e.target.value,
                        });
                      }}
                      className="input-details form-control"
                    />
                   
                  </div>
                  }

                  <div className="col-12">
                    <label htmlFor="" className="email-label ">
                      Transportation <span className="fill-img-star">*</span>
                    </label>
                    <br />

                    <select
                      className="input-details form-select"
                      value={addproductcart.transportation}
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          transportation: e.target.value,
                        });
                        // setErrMsg({...errMsg,transportation:""})
                      }}
                    >
                      <option value="select">Select</option>
                      <option value="Inclusive">Inclusive</option>
                      <option value="Self Pick up">Self Pick up</option>
                      <option value="At Actual">At Actual</option>
                    </select>
                    {/* {errMsg.transportation && errMsg.transportation.length > 0 && (
                  <span className="text-danger">{errMsg.transportation}</span>
                   )} */}
                    
                  </div>

                  {addproductcart.transportation === "Inclusive" && (
                    <div className="col-12">
                      <label>Location</label>

                      <textarea
                        className="form-control input-details"
                        value={addproductcart.pickup_location}
                       
                        onChange={(e) => {
                          setAddProductCart({
                            ...addproductcart,
                            pickup_location: e.target.value,
                          });
                        }}
                        cols="30"
                        rows="3"
                      ></textarea>
                      
                    </div>
                    
                  )}

                

                  <div className="col-12">
                    <label>Description</label>

                    <textarea
                      className="form-control input-details"
                      value={addproductcart.other_details }
                      onChange={(e) => {
                        setAddProductCart({
                          ...addproductcart,
                          other_details: e.target.value,
                        });
                      }}
                      cols="30"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="btn-detalil-products mt-5 ">
                  {/* <Link to="/Cart">{"/Detailslist/" + allproduct.id} */}
                  <button className="addcart-btn" onClick={AddToCart}  id="hover-red-on-pink">
                    Add to Cart
                  </button>
                  {/* </Link> */}
                  {/* <Link to="/Getquote" onClick={Getquote}> */}
                  <button className="getquote-btn1 ms-4" onClick={Getquote}  id="hover-red-on-pink">
                    Get Quote
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Detailslist;
