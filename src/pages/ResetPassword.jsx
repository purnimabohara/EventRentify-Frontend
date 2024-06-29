// ResetPassword.js

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { resetPasswordApi } from '../apis/Api';
import { toast } from "react-toastify";
import forget from "../assets/Images/forgetPassword.png";
import "./ResetPassword.css";



const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = () => {
    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Redirect to the login page after successful password reset
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal server error");
        navigate("/login");
      });
  };

  return (
    <>
    <Navbar/>
    <div style={{marginTop:'7%'}}className="container">
   
   <div className="content">
     
     <div className="form-container">
     <a href="/login" style={{color:'#985157',fontSize:'1.5rem', textDecoration:'none',marginTop:'13%'}}>Back to Login</a>
       <h2 style={{marginBottom:'4%',marginTop:'10%', fontWeight:'bolder'}}>Set a Password?</h2>
       <p className='fp' style={{fontSize:'1.1rem',marginBottom:'8%'}}>Your previous password has been reseted. Please set a new password for your account.</p>
       
     <div className="reset-div">
         <input className="input-reset" onChange={handleNewPassword} type="password" placeholder="Create a new password" />

        
         <button className='button-reset' onClick={handleResetPassword} style={{fontSize:'20px',marginTop:'10%'}}>Update Password</button>
       </div>  
     
     </div>
     <div className="image-containerr">
     <img style={{marginLeft:'15%'}} src={forget} alt="Eventique" />
     </div>
   </div>
 </div>
    {/* <div className="background-img4 d-flex justify-content-center">
    <div className="cardr">
      <h2 className="lock-iconr">&#x1F512;</h2>
      <h2 className="rh2">Reset Password</h2>
      <p className="rp">Enter your new password below:</p>
      <input
        type="password"
        className="rpassInput"
        placeholder="Enter your new password"
        onChange={handleNewPassword}
      />
      <button type="button" className="rbutton" onClick={handleResetPassword}>
        Update Password
      </button>
    </div>
    </div> */}
    </>
  );
  
};

export default ResetPassword;
