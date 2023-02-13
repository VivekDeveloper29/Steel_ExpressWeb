import React, { useEffect } from "react";
import Footer from "../SharedComponents/Footer";
import Navbar from "../SharedComponents/Navbar";
import profile_banner_bg from "../assets/images/profile_banner_bg.svg";
import ertugul from "../assets/images/accountp.png";
import edit from "../assets/images/edit.svg";
import { useContext } from "react";
import { AppContext } from "../context/AppContext ";
import swal from "sweetalert";
import { postMultipartWithAuthCall, simplePostCall } from "../api/ApiServices";
import ApiConfig from "../api/ApiConfig";
import { Navigate } from "react-router-dom";
import ertugul_profile from "../assets/images/profile-icon.png";


const Profile = () => {
  const { logedIn, setLoggedIn ,userDetails,SetUserDetails,} = useContext(AppContext);
  console.log(userDetails)
  const logOut = (e) =>{ //jab user logout pe click karega tab sara data clene ho jayega storage se or login page pe redirect ho jayega 
    // e.preventDefault()
    localStorage.clear();
    setLoggedIn(false);
    
  }
  // const { userDetails } = useContext(AppContext);

useEffect(() => {
  console.log("userDetails",userDetails);
}, [userDetails])

  const UpdateProfile = () => {
    console.log("userDetails",userDetails);
    let formdata = new FormData();
    // formdata.append("auth_token", customerData.auth_token);
    formdata.append("full_name", userDetails.full_name);
    formdata.append("phone_number", userDetails.phone_number);
    formdata.append("email", userDetails.email);
    formdata.append("address", userDetails.address);
    formdata.append("profile_pic", userDetails.profile_pic);
    
    postMultipartWithAuthCall(ApiConfig.UPDATE_PROFILE, formdata)
    // postWithAuthCallWithErrorResponse(ApiConfig.REGISTER,JSON.stringify({...user}))
      .then((res) => {
        console.log(res);
        if (res.result) {
          SetUserDetails(res.user_details)
          localStorage.setItem("userDetails",JSON.stringify(res.user_details))
          swal(res.message)
          // swal(res.json.message);
          Navigate("/profile");
        }
        // if (res.json.result) {
        //   swal(res.json.message);
        //   Navigate("/Profile");
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <main>
      <Navbar />
      <div className="main-profile">
        <div className="banner">
          <img src={profile_banner_bg} alt="" />
        </div>
        <div className="outer">
          <div className="main-profile-card">
            
            {/* <p className="u-name ">{userDetails.full_name}</p> */}
            <div className="img">
              <div onClick={()=>{
                let elem=document.getElementById("profilePic")
                if(elem) elem.click();
              }}>
                <img src={ userDetails.profile_pic && userDetails.profile_pic.name  ?URL.createObjectURL(userDetails.profile_pic) :  userDetails.profile_pic || ertugul_profile }   alt="" />
              </div>
              <input type={"file" }id="profilePic" style={{display:"none"}}  onChange={(e)=>SetUserDetails({...userDetails,profile_pic:e.target.files[0]})}/>
            </div>

            <div className="form-profile row">
              <div class="mb-3 col-12">
                <label class="form-label">Full Name  <img src={edit} alt="" className="ms-2" width={12} /></label>
                <input
                  type="text"
                  value={userDetails.full_name}
                  onChange={(e) => {
                    // setErrMsg({ ...errMsg, email: "" });
                    SetUserDetails({
                      ...userDetails,
                      full_name: e.target.value,
                    });
                  }}
                 
                  class="form-control"
                  id="exampleFormControlInput1"
                  
                />
              </div>

              <div class="mb-3 col-md-6">
                <label class="form-label">Mobile Number  <img src={edit} alt="" className="ms-2" width={12} /></label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails.phone_number}
                  onChange={(e) => {
                    // setErrMsg({ ...errMsg, email: "" });
                    SetUserDetails({
                      ...userDetails,
                      phone_number: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="mb-3 col-md-6">
                <label class="form-label">Email  <img src={edit} alt="" className="ms-2" width={12} /></label>
                <input
                  type="email"
                
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails.email}
                  onChange={(e) => {
                    // setErrMsg({ ...errMsg, email: "" });
                    SetUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="mb-3 col-12">
                <label class="form-label">Address 
                            <img src={edit} alt="" className="ms-2" width={12} />

                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails.address}
                  onChange={(e) => {
                    // setErrMsg({ ...errMsg, email: "" });
                    SetUserDetails({
                      ...userDetails,
                      address: e.target.value,
                    });
                  }}
                  
                />
              </div>
            </div>
            <div className="edit-btn">
            <button type="button" onClick={UpdateProfile} className="btn-gray-common btn-sm " style={{backgroundColor:"gray" }}>Update Profile</button>
              {/* <button onClick={UpdateProfile} type="button"className="btn btn-danger ">Update Profile</button> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Profile;
