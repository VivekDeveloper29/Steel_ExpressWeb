import React, { useContext, useState } from "react";
import Navbar from "../SharedComponents/Navbar";
import Slider from "react-slick";
import banner_slide1 from "../assets/images/banner_slide_01.png";
import banner_slide2 from "../assets/images/banner_bg_03@2x.png";
import banner_bg_03 from "../assets/images/banner_bg_02@2x.png";

import banner_bg_04 from "../assets/images/banner_slide_01@2x.png";
import product_image_04 from "../assets/images/product_image_04.png";

import image_01 from "../assets/images/image_01.png";
import graphic_about from "../assets/images/graphic_about.svg";
import image_02 from "../assets/images/image_02.png";
import arrow_white from "../assets/images/view_all_arrow.svg";
import product_image_01 from "../assets/images/product_image_01.png";
import ic_cart from "../assets/images/ic_cart.svg";
import ic_heart from "../assets/images/ic_heart.svg";
import ic_heart_active from "../assets/images/ic_heart_active.svg";
import product_image_02 from "../assets/images/product_image_01-1.png";
import Footer from "../SharedComponents/Footer";
import how_it_works_image from "../assets/images/how_it_works_image.svg";
import { Link, useNavigate } from "react-router-dom";
import ic_search_input from "../assets/images/ic_search_pink.svg";

import ic_call_red from "../assets/images/ic_call_red.svg";
import { useEffect } from "react";
import ApiConfig from "../api/ApiConfig";
import {
  getWithAuthCallWithtext,
  PostCallWithErrorResponse,
  postWithAuthCall,
  simplePostCall,
} from "../api/ApiServices";
import swal from "sweetalert";
import { AppContext } from "../context/AppContext ";

import { ScaleLoader } from "react-spinners";
const Home = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [sub_category, setSubCategory] = useState([]);
  const [sub_categoryCopy, setSubCategoryCopy] = useState([]);
  const [sub_category_two, setSubCategoryTWO] = useState([]);
  const [sub_category_twoCopy, setSubCategoryTWOCopy] = useState([]);
  const [product, setProduct] = useState([]);
  const [showDis, setShowDis] = useState(false);
  const [showDis1, setShowDis1] = useState(false);
  const { logedIn, setLoggedIn, setCurrentProduct,setAddProductCart } = useContext(AppContext);
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
    setAddProductCart({})
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
    // else  setSubCategoryTWO(sub_category_twoCopy)
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

  //filter api
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
        Authorization: "Token " + localStorage.getItem("auth_token"),
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
    e.preventDefault(); // The preventDefault() method cancels the event if it is cancelable,
    {
      console.log({ search });

      let data = { search };
      // postWithAuthCall(ApiConfig.PRODUCT_SEARCH,

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

  const Products = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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

  const [terms, setTerms] = useState("");
 
  useEffect(() => {
    getTerms();
  }, []);


  const getTerms = () => {
    getWithAuthCallWithtext(ApiConfig.ABOUT_US)
      .then((data) => {
        setTerms(data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
        
        
        //  item.name.toLowerCase().includes(value.toLowerCase());
        //    item.sub_category_one.toLowerCase().includes(value.toLowerCase());
        //    item.size.toLowerCase().includes(value.toLowerCase());
        //     item.diameter.toLowerCase().includes(value.toLowerCase());
        //        item.width.toLowerCase().includes(value.toLowerCase());
        //       item.length.toLowerCase().includes(value.toLowerCase());
      });
      setProduct(Category);
    } 
    else {
      getProduct();
    }
  }, 1000);
};

  return (
    <>
    {/* {loading ? (
      <ScaleLoader

        color={"#E27A7A"}
        loading={loading}
        size={10}
        className="loading"
        style={{ left: "70%" }}
      />
    ) : ( */}

    <div>
      <Navbar />
      <main className="home-main-section">
        <Link to="">
          <div className="sliding-image">
            <div className="btn-on-slide">
              <Link to="/products">Get Quote</Link>
            </div>
            <Slider
              {...bannerSlidea}
              className="d-flex justify-content-between"
            >
              {/* <Link to="/Getquote">
                <div className="img-slide-inner">
                  <img src={banner_slide1} alt="" />
                </div>
              </Link> */}
              <div>
                <img src={banner_slide2} alt="" />
              </div>
              <div className="img-slide me-4">
                <img src={banner_bg_03} alt="" />
              </div>
              <div className="img-slide">
                <img src={banner_bg_04} alt="" />
              </div>
            </Slider>
          </div>
        </Link>
        <div className="main-below-slide">
          {/* ===== About Section ===== */}
          <section className="bckground-color-about">
            <div className=" about-section">
              <div className="left-about">
                <div>
                  <label htmlFor="" className="heading-black">
                    About
                  </label>{" "}
                  <label htmlFor="" className="heading-red">
                    Steel Express
                  </label>
                     <div className="aboutText">
                     <p dangerouslySetInnerHTML={{ __html:terms}} ></p>
                     {/* We are experienced in steel trading for the last 20 years having a strong presence in western and southern regions. 
                    ishal Mehta, our promoter is a pioneer who started from scratch. His hard work, dedication, and commitment is noticeable in everything he does. */}
                               
                    </div>
                  
                  <Link to="/About">
                    <button className="btn-gray-common">Read More</button>
                  </Link>
                </div>
              </div>
              <div className="right-about">
                <div className="right-img-main">
                  <div className="img-dsn-top"></div>
                  <div className="main-img">
                    <img src={image_01} alt="" className="" />
                  </div>

                  <img src={graphic_about} alt="" className="graphics-img" />
                </div>
              </div>
            </div>
          </section>

          {/* Shop section */}

          <section className="bckground-color-shop">
            <div className="shop-section">
              <div className="top-heading" style={{ marginBottom: "15px" }}>
                <label htmlFor="" className="heading-black">
                  Shop By
                </label>{" "}
                <label htmlFor="" className="heading-red">
                  Category
                </label>
              </div>

              <div className="main-product-page " id="HomeShopByCategoryMain">
                <div className="search-wrap ">
                  <form>
                    <button
                      onClick={SearchProduct}
                      className="search-btn-input"
                    >
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
                  </form>
                </div>

                <div className="product-section-page ">
                  <div className="left-catagory-main ">
                    <div>
                      <p className="heading-category style-sub-category">
                        Category
                      </p>
                      {category.length &&
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

                      <p className="heading-category  style-sub-category mt-3">
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
                            <label
                              htmlFor={"item_subcategory" + id_subcategory}
                            >
                              {subcategory.name}
                            </label>
                          </div>
                        ))}

                      {sub_category_two.length > 0 ? (
                        <>
                          <p className="heading-category mt-2 style-sub-category">
                            Sub Category 2
                          </p>

                          {sub_category_two.map(
                            (subcategory, id_sub_category_two) => (
                              <div className="check-category-main">
                                <input
                                  id={
                                    "item_sub_category_two" +
                                    id_sub_category_two
                                  }
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
                                    "item_sub_category_two" +
                                    id_sub_category_two
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

                      {/* <div className="check-category-main">
                        <input
                          class="form-check-input me-3"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label htmlFor="">Coils</label>
                      </div> */}
                    </div>
                  </div>


               
                  {loading ? (
      <ScaleLoader

        color={"#E27A7A"}
        loading={loading}
        // size={10}
        className="loading"
        style={{ left: "100%" }}
      />
    ) : (
                  <div className="right-card  ">
                    <div className="">
                      <div className="main-card-listing">
                        <div className="product-cards">

                          {product &&
                            product.map((allproduct) => (

                              <div className="tab-card ">
                                <div className="image">
                                <Link to={"/Detailslist/" + allproduct.id+"/details"}>
                                  <img
                                    src={allproduct.images[0]}
                                    alt=""                                   
                                  />
                                   </Link>
                                </div>
                                <div className="product-detail">
                                  <Link to={"/Detailslist/" + allproduct.id+"/details"}>
                                    <p className="detail-top">
                                      {allproduct.name}
                                    </p>
                                  </Link>
                                  {/* <p>
                                    <label htmlFor="" className="number">
                                      {allproduct.number}
                                    </label>
                                  </p> */}
                              

                                  <div className="amt-add-card-main">
                                    <div className="price">
                                      <Link
                                        to={"/Detailslist/" + allproduct.id}
                                      >
                                        <button className="btn-gray-common ">
                                          Get Quote
                                        </button>
                                      </Link>
                                    </div>
                                    <div className="price"></div>
                                    <div className="like-img">
                                      {!allproduct.is_wishlist ? (
                                        <img
                                          src={ic_heart}
                                          onClick={() =>
                                            WishList(allproduct.id)
                                          }
                                          alt=""
                                        />
                                      ) : (
                                        <img
                                          src={ic_heart_active}
                                          //  onClick={()=>WishList(allproduct.id)}
                                          alt=""
                                        />
                                      )}

                                      <Link
                                        to={"/Detailslist/" + allproduct.id}
                                      >
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
                  </div>
    )}


                </div>
              </div>

              <div className="btn-shop-home">
                <Link to="/products">
                  <button className="btn-gray-common">
                    View All <img src={arrow_white} alt="" className="ms-2" />
                  </button>
                </Link>
              </div>
              {/* <div className="main-tab-card">
                <div className="main-scroll-hide">
                  <div className="tab tab-scroll">
                    <div class="d-flex align-items-start tab-fix-width">
                      <div
                        class="nav flex-md-column nav-pills me-3"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <button
                          class="nav-link active"
                          id="v-pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-home"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-home"
                          aria-selected="true"
                        >
                          Hot Rolled
                        </button>
                        <button
                          class="nav-link"
                          id="v-pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-profile"
                          aria-selected="false"
                        >
                          Cold Rolled
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-card ">
                  <div class="tab-content" id="v-pills-tabContent">
                    <div className="right-card-top">
                      <div className="left-input">
                        <div className="search me-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                        </div>
                        <div className="select me-3">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select Sub Category</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>

                      <div className="view-all">
                        <Link to="/products">
                          <button className="btn-gray-common">
                            View All{" "}
                            <img src={arrow_white} alt="" className="ms-2" />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade show active col-lg-6"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <div className="main-hot-rolled">
                        <div className="tab-card">
                          <div className="image">
                            <img src={product_image_01} alt="" />
                          </div>
                          <div className="product-detail">
                            <p className="detail-top">
                              HP Filter Holder, 25 mm, stainless steel
                            </p>
                            <p>
                              <label htmlFor="" className="number">
                                XX4502500
                              </label>
                            </p>
                            <div>
                              <label htmlFor="" className="key-name">
                                Thickness
                              </label>
                              <label htmlFor="" className="key-value">
                                3-6 mm
                              </label>
                            </div>
                            <div>
                              <label htmlFor="" className="key-name">
                                Width
                              </label>
                              <label htmlFor="" className="key-value">
                                800 - 1500 mm
                              </label>
                            </div>
                            <div className="amt-add-card-main">
                              <div className="price">₹51,740.00</div>
                              <div className="like-img">
                                <img src={ic_heart} alt="" />
                                <img src={ic_cart} alt="" />
                              </div>
                            </div>
                            <div className="red-line"></div>
                          </div>
                        </div>
                        <div className="tab-card ms-4">
                          <div className="image">
                            <img src={product_image_02} alt="" />
                          </div>
                          <div className="product-detail">
                            <p className="detail-top">
                              HP Filter Holder, 25 mm, stainless steel
                            </p>
                            <p>
                              <label htmlFor="" className="number">
                                XX4502500
                              </label>
                            </p>
                            <div>
                              <label htmlFor="" className="key-name">
                                Thickness
                              </label>
                              <label htmlFor="" className="key-value">
                                3-6 mm
                              </label>
                            </div>
                            <div>
                              <label htmlFor="" className="key-name">
                                Width
                              </label>
                              <label htmlFor="" className="key-value">
                                800 - 1500 mm
                              </label>
                            </div>
                            <div className="amt-add-card-main">
                              <div className="price">₹51,740.00</div>
                              <div className="like-img">
                                <img src={ic_heart_active} alt="" />
                                <img src={ic_cart} alt="" />
                              </div>
                            </div>
                            <div className="red-line"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade col-lg-6"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      <div className="main-hot-rolled">
                        <div className="tab-card">
                          <div className="image">
                            <img src={product_image_01} alt="" />
                          </div>
                          <div className="product-detail">
                            <p className="detail-top">
                              HP Filter Holder, 25 mm, stainless steel
                            </p>
                            <p>
                              <label htmlFor="" className="number">
                                XX4502500
                              </label>
                            </p>
                            <div>
                              <label htmlFor="" className="key-name">
                                Thickness
                              </label>
                              <label htmlFor="" className="key-value">
                                3-6 mm
                              </label>
                            </div>
                            <div>
                              <label htmlFor="" className="key-name">
                                Width
                              </label>
                              <label htmlFor="" className="key-value">
                                800 - 1500 mm
                              </label>
                            </div>
                            <div className="amt-add-card-main">
                              <div className="price">₹51,740.00</div>
                              <div className="like-img">
                                <img src={ic_heart} alt="" />
                                <img src={ic_cart} alt="" />
                              </div>
                            </div>
                            <div className="red-line"></div>
                          </div>
                        </div>
                        <div className="tab-card ms-5">
                          <div className="image">
                            <img src={product_image_02} alt="" />
                          </div>
                          <div className="product-detail">
                            <p className="detail-top">
                              HP Filter Holder, 25 mm, stainless steel
                            </p>
                            <p>
                              <label htmlFor="" className="number">
                                XX4502500
                              </label>
                            </p>
                            <div>
                              <label htmlFor="" className="key-name">
                                Thickness
                              </label>
                              <label htmlFor="" className="key-value">
                                3-6 mm
                              </label>
                            </div>
                            <div>
                              <label htmlFor="" className="key-name">
                                Width
                              </label>
                              <label htmlFor="" className="key-value">
                                800 - 1500 mm
                              </label>
                            </div>
                            <div className="amt-add-card-main">
                              <div className="price">₹51,740.00</div>
                              <div className="like-img">
                                <img src={ic_heart_active} alt="" />
                                <img src={ic_cart} alt="" />
                              </div>
                            </div>
                            <div className="red-line"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </section>
          {/* Offer Section */}
          <section className="bckground-color-offer">
            <div className="offer-section">
              <div className="top-offer">
                <div className="left">
                  <label htmlFor="" className="heading-black">
                    Offers
                  </label>
                  <p className="paragraph">
                    Get amazing offers from wide variety of products
                  </p>
                </div>
                <div className="right">
                  <Link to="/offers">
                    <button className="btn-gray-common" id="hover-red-on-pink">
                      View All <img src={arrow_white} alt="" className="ms-2" />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="sliding-horizontal">
                <Slider {...settings}>
                  {offer &&
                    offer.map((offers) => (
                      <div className="slide-img-main" onClick={discount1}>
                        <img src={offers.image[0]} alt="" />
                        <div className="date-on-img">{offers.expiry_date}</div>
                        {showDis1 && (
                          <div className="discount-card">
                            <div className="red-line"></div>
                            <div>
                              <label htmlFor="" className="steel-name">
                                {offers.offer_on_product}
                              </label>
                            </div>
                            <div>
                              <label htmlFor="" className="percent-content">
                                {offers.offer_name}
                              </label>
                            </div>
                            <div>
                              {/* <p className="paragraph">
                                Buy any steel for the first time and receive
                                flat
                                {offers.discount_percent} discount.
                              </p> */}
                            </div>
                            <div>
                              <Link
                                to={
                                  "/Detailslist/" + offers.offer_on_product_id
                                }
                              >
                                <button>Get Quote</button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                  <div></div>
                </Slider>
              </div>
            </div>
          </section>

          {/* popular Product Section */}

          {/* <section className="bckground-color-popular-product">
            <div className="popular-product-section">
              <div className="d-flex align-items-center ">
                <div className="heding-btn-left">
                  <p>
                    <label htmlFor="" className="heading-black">
                      Popular{" "}
                    </label>{" "}
                    <label htmlFor="" className="heading-red">
                      Products
                    </label>
                  </p>
                  <p className="paragraph">
                    Buy from wide range of popular products!
                  </p>

                  <div className="view-all">
                    <Link to="/products">
                      <button className="btn-gray-common">View All</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="main-product">
                <div className="popular-product-card">
                  <div className="tab-card">
                    <div className="image">
                      <img src={product_image_01} alt="" />
                    </div>
                    <div className="product-detail">
                      <p className="detail-top">
                        HP Filter Holder, 25 mm, stainless steel
                      </p>
                      <p>
                        <label htmlFor="" className="number">
                          XX4502500
                        </label>
                      </p>
                      <div>
                        <label htmlFor="" className="key-name">
                          Thickness
                        </label>
                        <label htmlFor="" className="key-value">
                          3-6 mm
                        </label>
                      </div>
                      <div>
                        <label htmlFor="" className="key-name">
                          Width
                        </label>
                        <label htmlFor="" className="key-value">
                          800 - 1500 mm
                        </label>
                      </div>
                      <div className="amt-add-card-main">
                        <div className="price">₹51,740.00</div>
                        <div className="like-img">
                          <img src={ic_heart} alt="" />
                          <img src={ic_cart} alt="" />
                        </div>
                      </div>
                      <div className="red-line"></div>
                    </div>
                  </div>
                  <div className="tab-card ms-4">
                    <div className="image">
                      <img src={product_image_02} alt="" />
                    </div>
                    <div className="product-detail">
                      <p className="detail-top">
                        HP Filter Holder, 25 mm, stainless steel
                      </p>
                      <p>
                        <label htmlFor="" className="number">
                          XX4502500
                        </label>
                      </p>
                      <div>
                        <label htmlFor="" className="key-name">
                          Thickness
                        </label>
                        <label htmlFor="" className="key-value">
                          3-6 mm
                        </label>
                      </div>
                      <div>
                        <label htmlFor="" className="key-name">
                          Width
                        </label>
                        <label htmlFor="" className="key-value">
                          800 - 1500 mm
                        </label>
                      </div>
                      <div className="amt-add-card-main">
                        <div className="price">₹51,740.00</div>
                        <div className="like-img">
                          <img src={ic_heart_active} alt="" />
                          <img src={ic_cart} alt="" />
                        </div>
                      </div>
                      <div className="red-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* How it works It */}
          <section className="background-how-it-works">
            <div className="how-it-works-section">
              <div className="top-heading">
                <p>
                  <label htmlFor="" className="heading-black">
                    How we
                  </label>{" "}
                  <label htmlFor="" className="heading-red">
                    work ?
                  </label>
                </p>
                <p className="paragraph">Steel express work flow</p>
              </div>
              <div className="img">
                <img src={how_it_works_image} alt="" />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
    {/* )} */}
   </>
  );
};

export default Home;
