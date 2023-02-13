import  { Routes, Route, Navigate , useNavigate, useLocation }  from "react-router-dom";
import "./assets/style/main.scss";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Products from "./pages/Products";
import Login from "./pages/Auth_Components/Login";
import Navbar from "./SharedComponents/Navbar";
import Registration from "./pages/Auth_Components/Registration.jsx";
import Getquote from "./pages/Products/Getquote";
import Detailslist from "./pages/Products/Detailslist";
import Cart from "./pages/Products/Cart";
import Account from "./SharedComponents/Account";
import ProductListing from "./pages/Products/ProductListing";
import Wishlist from "./pages/Wishlist";
import ContactUs from "./pages/ContactUs";
import ForgotPassword from "./pages/Auth_Components/ForgotPassword";
import NewPassword from "./pages/Auth_Components/NewPassword";
import PasswordOTP from "./pages/Auth_Components/PasswordOTP";
import MyOrders from "./pages/MyOrders/MyOrders";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import About from "./pages/About";
import MyOrderDetails from "./pages/MyOrders/MyOrderDetails";
import Pi from "./pages/MyOrders/PerfomaInvice";
import HowWeWork from "./pages/HowWeWork";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext ";
import MyQuets from "./pages/MyOrders/MyQuets";
import PerfomaInvice from "./pages/MyOrders/PerfomaInvice";
import Sendinovice from "./pages/MyOrders/Sendinovice";

function App() {
   const currentRoute = useLocation().pathname;
   const { logedIn, setLoggedIn } = useContext(AppContext);
   const navigate = useNavigate();
   
   // console.log(role);
 //jab local storage me data hoga tab else condition halege nhi to login page pe hi rahega
   useEffect(() => {
     console.log(logedIn);
 
     if (!logedIn) {
       navigate("/");
     } else {
       navigate("/home");
     }
   }, [logedIn]);
 
  return (
    <>
      <div className="full-width-page"></div>
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="Registration" element={<Registration />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
        <Route path="NewPassword" element={<NewPassword />} />
        <Route path="PasswordOTP" element={<PasswordOTP />} />
      </Routes>

      <div className="App container">
        <Routes>
          <Route path="navbar" element={<Navbar />} />

          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />}>
            <Route path="ProductListing" element={<ProductListing />} />
          </Route>
          <Route path="offers" element={<Offers />} />
          <Route path="Getquote/" element={<Getquote />} >
            <Route path=":id/" element={<Getquote />} />
          </Route>

          <Route path="Detailslist" element={<Detailslist />} >
            <Route path=":id" element={<Detailslist />}/>
            <Route path=":id/:details" element={<Detailslist />}/>
          </Route>
          <Route path="Cart" element={<Cart />} />
          <Route path="Account" element={<Account />} />
          <Route path="Wishlist" element={<Wishlist />} />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="MyOrders" element={<MyOrders />} />
          <Route path="MyQutoes" element={<MyQuets />} />

          <Route path="Notifications" element={<Notifications />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="About" element={<About />} />
          <Route path="MyOrderDetails/" element={<MyOrderDetails />} >
          <Route path=":id" element={<MyOrderDetails />}/>
          </Route>
          <Route path="HowWeWork" element={<HowWeWork />} />
          <Route path="TermsConditions" element={<TermsConditions />} />
          <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="PerfomaInvice/" element={<PerfomaInvice/>} >
          <Route path=":id" element={<PerfomaInvice />}/>
          </Route>
          <Route path="sendinovice" element={<Sendinovice/>} >
          <Route path=":id" element={<sendinovice />}/>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
