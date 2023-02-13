const BASE_URL = "https://admin.steelexpress.co.in/api/";
const ApiConfig = {
  // BASE_URL:BASE_URL,
  // BASE_URL_FOR_IMAGES:"http://steel.redbytes.in",
  
  REGISTER:BASE_URL+"register/",
  LOGIN:BASE_URL+"login/",
  FORGAT_PASSWORD: BASE_URL + "forgot_password/",
  CATEGORY_LIST: BASE_URL + "categories/",
  UPDATE_PROFILE: BASE_URL + "edit_profile/",
  SUB_CATAGORY_ONE:BASE_URL+"sub_categories_one/",
  SUB_CATAGORY_TWO:BASE_URL+"sub_categories_two/",
  PRODUCT:BASE_URL+ "products",
  CONTACTUS:BASE_URL+ "contact_us",
  TERMS_CONDITION:BASE_URL+ "terms_and_conditions",
  PRIVACY_POLICY:BASE_URL+"privacy_policy",
  ABOUT_US:BASE_URL+"about_us",
  PRODUCT_SEARCH : BASE_URL + "product_search/",
  PRODUCT_DETAILS : BASE_URL + "product_details/?id=",
  OFFERS : BASE_URL + "offers/",
  WISHLIST : BASE_URL + "wishlist/",
  NOTIFICATION : BASE_URL + "notifications/",
  CARTDISPLAY : BASE_URL + "cart/",
  MYORDER:BASE_URL + "orders/",
  GETQUOTE:BASE_URL+"get_quote",
  FILTERORDER:BASE_URL+"filter_orders",
  MYORDERDETAIL:BASE_URL+"order_details?id=",
  FetchAdditionalDetails:BASE_URL+"fetch_additional_details",
  QUOTSTATUS:BASE_URL+"quote_update",
  VERIFYOTP:BASE_URL+"verify_otp",
  RESERTPASSWORD:BASE_URL+"reset_password",
  CATAGORY:BASE_URL+"categories",
  CART:BASE_URL+"cart/?item_id=",
  SENDGRID_PDF_GENRATE:BASE_URL+"sendgrid_data_pdf_generate/?id=",
  SENDGRID_PRO_FORMA_GENRATE:BASE_URL+"sendgrid_pro_forma_generate/?id=",
  SENDGRID_INOVICE_GENRATE:BASE_URL+"sendgrid_inovice_generate/?id="
 

};
export default ApiConfig;