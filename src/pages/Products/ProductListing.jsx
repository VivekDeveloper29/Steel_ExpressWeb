import React, { useEffect } from "react";
import Footer from "../../SharedComponents/Footer";
import Navbar from "../../SharedComponents/Navbar";
import ic_search_input from "../../assets/images/ic_search_pink.svg";

import product_image_01 from "../../assets/images/product_image_01.png";
import ic_cart from "../../assets/images/ic_cart.svg";
import ic_heart from "../../assets/images/ic_heart.svg";
import ic_heart_active from "../../assets/images/ic_heart_active.svg";
import product_image_02 from "../../assets/images/product_image_01-1.png";
import product_image_04 from "../../assets/images/product_image_04.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiConfig from "../../api/ApiConfig";
import {
  PostCallWithErrorResponse,
  postWithAuthCall,
  postWithAuthCallWithErrorResponse,
  simpleGetCallWithErrorResponse,
  simplePostCall,
} from "../../api/ApiServices";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext ";
import swal from "sweetalert";
import { ScaleLoader } from "react-spinners";

const ProductListing = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [sub_category, setSubCategory] = useState([]);
  const [sub_categoryCopy, setSubCategoryCopy] = useState([]);
  const [sub_category_two, setSubCategoryTWO] = useState([]);
  const [sub_category_twoCopy, setSubCategoryTWOCopy] = useState([]);
  const [product, setProduct] = useState(null);
  const [showDis, setShowDis] = useState(false);
  const [showDis1, setShowDis1] = useState(false);
  const { customerData } = useContext(AppContext);
  const [product_id, setProductId] = useState("");
  console.log(customerData);
  // const { logedIn, setLoggedIn } = useContext(AppContext);
  const { logedIn, setLoggedIn, setCurrentProduct } = useContext(AppContext);
  const [selectedcategory, setSelectedcategory] = useState({});
  const [loading, setLoading] = useState(false);

  const getCategories = () => {
    fetch(ApiConfig.CATAGORY).then((result) => {
      result.json().then((resp) => {
        console.log("result", resp);
        setCategory(resp.categories);
      });
    });
  };
  useEffect(() => {
    getSubCategories();
    getSubCategoriesTwo();
    getCategories();
    getProduct();
  }, []);

  useEffect(() => {
    console.log(selectedcategory);
    getSelectCategory();
    if (selectedcategory.categories && selectedcategory.categories.length > 0) {
      let sub_categories_oneData = sub_categoryCopy.filter((data) => {
        return selectedcategory.categories === data.category;
      });
      setSubCategory(sub_categories_oneData);
    } else setSubCategory(sub_categoryCopy);
    if (
      selectedcategory.sub_categories_one &&
      selectedcategory.sub_categories_one.length > 0
    ) {
      let sub_categories_twoData = sub_category_twoCopy.filter(
        (data) => data.sub_category_one === selectedcategory.sub_categories_one
      );
      setSubCategoryTWO(sub_categories_twoData);
    }
  }, [selectedcategory]);
  const getQuote = (product, e) => {
    e.preventDefault();
    console.log("clesdsdf", product);
    setCurrentProduct(product);
    if (logedIn) {
      navigate("/Getquote/");
    } else {
      navigate("/Login");
    }
  };

  const getSelectCategory = () => {
    PostCallWithErrorResponse(ApiConfig.PRODUCT, selectedcategory)
      .then((result) => {
        console.log(result);
        setProduct(result.json.products);
        // result.json().then((resp)=>
        // {
        //   console.log("selectcategory",resp)

        // })
      })
      .catch((err) => console.log(err));
  };

  const getSubCategories = () => {
    fetch(ApiConfig.SUB_CATAGORY_ONE).then((result) => {
      result.json().then((resp) => {
        setSubCategory(resp.sub_categories_one);
        setSubCategoryCopy(resp.sub_categories_one);
      });
    });
  };

  const getSubCategoriesTwo = () => {
    fetch(ApiConfig.SUB_CATAGORY_TWO).then((result) => {
      result.json().then((resp) => {
        // setSubCategoryTWO(resp.sub_categories_two);
        setSubCategoryTWOCopy(resp.sub_categories_two);
      });
    });
  };

  const [offer, setOffer] = useState(null);
  useEffect(() => {
    getProductOffers();
  }, []);
  let getProductOffers = () => {
    fetch(ApiConfig.OFFERS, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log("offers", resp);
        setOffer(resp.offers);
      });
    });
  };
  console.log(offer);

  let getProduct = () => {
    setLoading(true)
    fetch(ApiConfig.PRODUCT, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        setLoading(false)
        console.log("Product", resp);
        setProduct(resp.products);
      });
    });
  };
  console.log(product);

  //SEARCH  Api
  const [search, setSearch] = useState("");
  const SearchProduct = (e) => {
    e.preventDefault(); 
    {
      console.log({ search });

      let data = { search };


      postWithAuthCall(
        ApiConfig.PRODUCT_SEARCH, 
        JSON.stringify({ ...data }) 
      ).then((res) => {
        console.log(res);
        if (res.result) {
          setProduct(res.products); 
        }
      });
    }
  };

  const discount = () => setShowDis(!showDis);
  const discount1 = () => setShowDis1(!showDis1);
  const settings = {
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          centerMode: false,
        },
      },
    ],
  };

  //WishList

  const WishList = (id) => {
    // e.preventDefault();// The preventDefault() method cancels the event if it is cancelable,
    {
      let data = { id }; //yaha id define ki hiiii product ki
      simplePostCall(
        ApiConfig.WISHLIST, //apiconfig file me jo endpoint add kiya haii usko inherite kiya haii
        JSON.stringify({ product_id: id }) //yaha se product_id=1 aisa jayega
      ).then((res) => {
        console.log(res);

        swal(res.message);
      });
    }
  };

  const bannerSlidea = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,

    cssEase: "linear",
    beforeChange: function (currentSlide, nextSlide) {},
    afterChange: function (currentSlide) {},
  };

   //Search
 const searchHandler = (e) => {
  setSearch(e.target.value);
  let value = e.target.value;
  setTimeout(() => {
    console.log(value);
    if (value.length) {
      let Category = product.filter((item) => {
        console.log("item",item)
       
        return(
          item.brand_name.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase()) ||

          item.description.toLowerCase().includes(value.toLowerCase()) ||
          item.name.toLowerCase().includes(value.toLowerCase())||
          item.number.toLowerCase().includes(value.toLowerCase()) ||
          item.sub_category_one.toLowerCase().includes(value.toLowerCase())||
          item.sub_category_two.toLowerCase().includes(value.toLowerCase()) ||
          item.supply_condition.toLowerCase().includes(value.toLowerCase()) || 

          item.color.includes(value.toLowerCase()) ||
          item.diameter.includes(value.toLowerCase()) ||
          item.grade.includes(value.toLowerCase()) ||
          item.information.includes(value.toLowerCase()) ||
          item.length.includes(value.toLowerCase()) ||
          item.size.includes(value.toLowerCase()) ||
          item.thickness.includes(value.toLowerCase()) ||
          item.width.includes(value.toLowerCase())

        )
      });
      setProduct(Category);
    } 
    else {
      getProduct();
    }
  }, 1000);
};

  return (
    <main>
      <Navbar />
      <div className="background-product">
        <div className="main-product-page " id="main-product-page">
          
          <div className="product-section-page">

            <div className="left-catagory-main" >
              <div>
                {/* {product.map((allproduct) =>{
                <div> {allproduct.name}</div>

                })} */}

                <p className="heading-category style-sub-category">Category</p>
                {category &&
                  category.map((item, id) => (
                    <div className="check-category-main">
                      <input
                        id={"item" + id}
                        class="form-check-input me-3"
                        type="checkbox"
                        checked={
                          selectedcategory.categories === item.name
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          setSelectedcategory({
                            ...selectedcategory,
                            categories: e.target.checked ? item.name : "",
                          });
                        }}
                      />
                      <label htmlFor={"item" + id}>{item.name}</label>
                    </div>
                  ))}

                <p className="heading-category style-sub-category mt-3">
                  Sub Category One
                </p>
                {sub_category &&
                  sub_category.map((subcategory, id_subcategory) => (
                    <div className="check-category-main">
                      <input
                        id={"item_subcategory" + id_subcategory}
                        class="form-check-input me-3"
                        type="checkbox"
                        checked={
                          selectedcategory.sub_categories_one ===
                          subcategory.name
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          setSelectedcategory({
                            ...selectedcategory,
                            sub_categories_one: e.target.checked
                              ? subcategory.name
                              : "",
                          });
                        }}
                        // id="flexCheckDefault"
                      />
                      <label htmlFor={"item_subcategory" + id_subcategory}>
                        {subcategory.name}
                      </label>
                    </div>
                  ))}

                {sub_category_two.length > 0 ? (
                  <>
                    <p className="heading-category mt-5 style-sub-category">
                      Sub Category 2
                    </p>

                    {sub_category_two.map(
                      (subcategory, id_sub_category_two) => (
                        <div className="check-category-main">
                          <input
                            id={"item_sub_category_two" + id_sub_category_two}
                            class="form-check-input me-3"
                            type="checkbox"
                            checked={
                              selectedcategory.sub_categories_two ===
                              subcategory.name
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              setSelectedcategory({
                                ...selectedcategory,
                                sub_categories_two: e.target.checked
                                  ? subcategory.name
                                  : "",
                              });
                            }}
                            // id="flexCheckDefault"
                          />
                          <label
                            htmlFor={
                              "item_sub_category_two" + id_sub_category_two
                            }
                          >
                            {subcategory.name}
                          </label>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  ""
                )}

                {/* <Link to="#" >
                  <button className="btn-gray-common ">Get Quote</button>
                </Link> */}
              </div>
            </div>
            <div className="right-card  " id="right-card">
            <div className="search-wrap ">
                <form>
                  <button onClick={SearchProduct} className="search-btn-input">
                    {/* <img src={ic_search_input} alt="" /> */}
                  </button>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Product"
                    // value={search}
                    // onChange={(e) => {
                    //   setSearch(e.target.value);
                    // }}

                    value={search}
                    onChange={(e) => searchHandler(e)}
                  />
                  {/* <button onClick={SearchProduct}>send</button> */}
                </form>
              </div>

              {loading ? (
      <ScaleLoader

        Color={"#E27A7A"}
        loading={loading}
        size={10}
        className="loading d-flex justify-content-center"
        style={{ left: "70%" }}
      />
    ) : (

              <div className="">
                <div className="main-card-listing" id="main-card-listing">
                  <div className="product-cards">
                    {product &&
                      product.map((allproduct) => (
                        <div className="tab-card ">
                          <div className="image">
                          <Link to={"/Detailslist/" + allproduct.id}>
                            <img
                              src={allproduct.images[0]}
                              alt=""
                            />
                             </Link>
                          </div>

                          <div className="product-detail">
                            <Link to={"/Detailslist/" + allproduct.id}>
                              <p className="detail-top">{allproduct.name}</p>
                            </Link>

                            {/* <p>
                              <label htmlFor="" className="number">
                                {allproduct.number}
                              </label>
                            </p> */}
                            {/* <div>
                              <label htmlFor="" className="key-name">
                                Thickness
                              </label>
                              <label htmlFor="" className="key-value">
                                {allproduct.thickness}
                              </label>
                            </div>
                            <div>
                              <label htmlFor="" className="key-name">
                                Width
                              </label>
                              <label htmlFor="" className="key-value">
                                {allproduct.width}
                              </label>
                            </div> */}

                            <div className="amt-add-card-main">
                              <div className="price">
                                <Link to={"/Detailslist/" + allproduct.id}>
                                  <button className="btn-gray-common ">
                                    Get Quote
                                  </button>
                                </Link>
                              </div>
                              <div className="price"></div>
                              <div className="like-img">
                                <img
                                  src={ic_heart}
                                  onClick={() => WishList(allproduct.id)}
                                  alt=""
                                />
                                <Link to={"/Detailslist/" + allproduct.id}>
                                  <img src={ic_cart} alt="" />
                                </Link>
                              </div>
                            </div>
                            <div className="red-line"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

)}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductListing;
