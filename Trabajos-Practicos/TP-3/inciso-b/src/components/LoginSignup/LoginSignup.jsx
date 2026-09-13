import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "./Assets/user.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

export const LoginSignup = ({ onLoginSuccess }) => {
  const [action, setAction] = useState("Sign Up");

  const handleSubmit = (buttonName) => {
    if (action !== buttonName) {
      setAction(buttonName);
    } else {
      onLoginSuccess();
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="Email Id" />
          <input type="email" placeholder="Email Id" />
        </div>

        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      {action === "Sign Up" ? null : (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => handleSubmit("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => handleSubmit("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};
