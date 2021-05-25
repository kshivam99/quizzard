import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { GrClose } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Logout() {
  const { setAuth } = useAuth();
  const history = useHistory();

  function handleLogout() {
    setAuth(null);
    localStorage.clear();
    toast("Logged out Successfully", {
      type: "success",
    });
    history.goBack();
  }

  return (
    <div className="login--container">
      <div className="login--modal">
        <GrClose onClick={() => history.goBack()} className="close--btn" />
        <div className="login--title">
          <h1>ARE YOU SURE YOU WANT TO </h1>
          <h1>
            <span style={{ color: "#ef4444" }}>LOG OUT</span>
          </h1>
        </div>
        <div style={{display:"flex", width:"80%"}}>
        <button style={{backgroundColor:"#fff", color:"#000"}} onClick={()=>history.goBack()} className="login--btn">
          No
        </button>
        <button onClick={handleLogout} className="login--btn">
          Yes
        </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
