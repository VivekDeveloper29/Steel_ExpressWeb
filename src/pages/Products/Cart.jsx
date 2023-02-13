import React, { useEffect, useState } from "react";
import Navbar from "../../SharedComponents/Navbar";
import pic3 from "../../assets/images/product_image_01-1.png";
import min from "../../assets/images/ic_minus.png";
import plus from "../../assets/images/ic_plus.png";
import delete1 from "../../assets/images/ic_delete.svg";
import Footer from "../../SharedComponents/Footer";
import { Link, useNavigate } from "react-router-dom";
import ApiConfig from "../../api/ApiConfig";
import {
  deleteWithAuthCall,
  postWithAuthCall,
  putWithAuthCall,
  simpleGetCallWithErrorResponse,
  simplePostCall,
} from "../../api/ApiServices";
import swal from "sweetalert";
import { ScaleLoader } from "react-spinners";

function Cart() {
  const [cart_displya, setCartDisplay] = useState([]);
  const [cart_id, setCartId] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [current, setCurrent] = useState({});
  const [product, setProduct] = useState([]);
  const [cart_view, setCartView] = useState([]);
  const [update_cart, setUpdateCart] = useState([]);
  const [cartcount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCartDisplay();
    getProduct();
  }, []);
  useEffect(() => {
    if (current.id) {
      let dataWithQ = cart_displya.filter((item) => item.id === current.id)[0];
      setCurrent(dataWithQ);
    }
  }, [cart_displya]);

  let getCartDisplay = () => {
    setLoading(true)
    fetch(ApiConfig.CARTDISPLAY, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("auth_token"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        setLoading(false)
        console.log("cart_display", resp);
        setCartDisplay(resp.cart_items);
        setCartCount(resp.cart_items_count); 
        setCartId(resp.cart_id);
      });
    });
  };

  let getProduct = () => {
    fetch(ApiConfig.PRODUCT, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log("Product", resp);
        setProduct(resp.products);
      });
    });
  };
  console.log(product);

  //cart Delete

  const CartDelete = (id) => {
    // e.preventDefault();// The preventDefault() method cancels the event if it is cancelable,
    {
      let data = { id }; 
      deleteWithAuthCall(
        ApiConfig.CARTDISPLAY,
        JSON.stringify({ item_id: id }) //yaha se product_id=1 aisa jayega ye product_id wishlist ki api me delete me pass karna haii
      ).then((res) => {
        console.log(res);

        swal(res.message).then(() => {
          getCartDisplay();
        });
      });
    }
  };

  const getCartView=(id)=>{
    console.log("id",id)
    simpleGetCallWithErrorResponse(
      ApiConfig.CART + id , 
      // JSON.stringify({ expert_id:id, request_to:"Chat"}) 
    ).then((res) => {
      console.log("res",res);
      // setCartView(res);
      // if (res) {
        // navigate("/Detailslist/",{state:res})
      // }
    
    });
  }


  // const updateCart = (e) => {
  //   let data = JSON.stringify({ item_id:current.id,quantity:current.quantity})

  //   console.log("data",data);
  //   putWithAuthCall(ApiConfig.CARTDISPLAY, data).then((res) => {
  //     console.log(res)
  //     navigate("/Getquote/" + cart_id)
  //   })

  //   // e.preventDeafalt()

  //   console.log("clicked");

  // }

  const updateCart = (e) => {
    let data = JSON.stringify({ cart_id });

    console.log("data", data);
    simplePostCall(ApiConfig.MYORDER, data).then((res) => {
      console.log(res);
      swal(res.message);
      navigate("/home/");
    });

    // e.preventDeafalt()

    console.log("clicked");
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="cart-bg-main">
          <div className="cart-main-wrapper">
            <div className="outer-heading">
              <div className="left">
                <p className="out-heading">Product Details</p>
                <p className="out-heading qty">Quantity</p>
              </div>
              <div></div>
            </div>
            {loading ? (
      <ScaleLoader

        color={"#ff3e6c"}
        loading={loading}
        size={10}
        className="loading d-flex justify-content-center"
        style={{ left: "70%" }}
      />
    ) : (
            <>
            
            {cart_displya &&
              cart_displya.map((cart_items) => {
                console.log(cart_items);
                
              
                return(


                <div className="d-flex">
                  <div className="me-2 font-bold" ></div>
                  <div className="cart-box">
                    <div className="prdct-qty">
                      <div className="left-content ">
                        <div className="image">
                      
                        {/* <Link to={"/Detailslist/" + cart_items.product_number[1].product_id} state={cart_items}> */}
                        <img src={cart_items.product_image} alt=""/>
                        {/* </Link> */}
                        
                        </div>
                        <div className="content">
                          <Link to={"/Detailslist/" + cart_items.product_id} state={cart_items}>
                            {/* <Link onClick={()=>getProfilData(cart_items.id)}> */}
                          <p className="top-par" >{cart_items.product_name}</p>
                          </Link>
                          
                        </div>
                      </div>
                      <div className="card-add-btn-main">
                        <button
                          className="minus-btn"
                          onClick={() => {
                            let dataWithQ = cart_displya.map((item) => {
                              if (item.id === cart_items.id)
                                return {
                                  ...item,
                                  quantity:
                                    item.quantity > 1
                                      ? item.quantity - 1
                                      : item.quantity,
                                };
                              else return item;
                            });
                            setCartDisplay(dataWithQ);
                          }}
                        >
                          <img src={min} alt="" />
                        </button>
                        <input
                          type="text"
                          className="qty-input"
                          size="2"
                          maxLength="2"
                          value={cart_items.quantity}
                        />
                        <button
                          className="plus-btn"
                          onClick={() => {
                            let dataWithQ = cart_displya.map((item) => {
                              if (item.id === cart_items.id)
                                return { ...item, quantity: item.quantity + 1 };
                              else return item;
                            });
                            setCurrent(cart_items);
                            setCartDisplay(dataWithQ);
                          }}
                        >
                          <img src={plus} alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="delete-btn-main ">
                      <button className="table-btn">
                        <img
                          src={delete1}
                          alt=""
                          onClick={() => CartDelete(cart_items.id)}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                
                )
                        })}

                        </>
    )}

        
          </div>

          <div className="count-cart-bottom-main">
            <div className="inner">
              <div className="left">
                <label className="me-2">Number of items in the cart</label>
                <label>{cartcount}</label>
              </div>
              <div className="right">
                <Link
                  to={"/products"}
                 
                >
                  Add more 
                </Link>
                <Link
                  to={"#"}
                  onClick={(e) => {
                    updateCart(e);
                  }}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default Cart;
