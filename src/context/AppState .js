import { AppContext } from "./AppContext ";

import React, { useState } from "react";

const AppState = (props) => {
  const [currentProduct, setCurrentProduct] = useState([])
  const [addproductcart, setAddProductCart] = useState("");
  const [customerData, setCustomerData] = useState({
    id: localStorage.getItem("id") ? localStorage.getItem("id") : null,

    auth_token: localStorage.getItem("auth_token")
      ? localStorage.getItem("auth_token")
      : null,
  });
  const [userDetails, SetUserDetails] = useState(
    localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null
  );
const [logedIn, setLoggedIn]=useState(localStorage.getItem("logedIn") ? localStorage.getItem("logedIn") : false)
  return (
    <AppContext.Provider
      value={{
        customerData,
        setCustomerData,
        SetUserDetails,
        userDetails,
        logedIn, setLoggedIn,
        currentProduct, setCurrentProduct,
        addproductcart, setAddProductCart
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
