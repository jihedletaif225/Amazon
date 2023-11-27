import React from "react";
import { useState } from "react";
import "./AuthPage.css";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";

const AuthPage = () => {
  const [status, setStatus] = useState(false);
  const changeStatus = () => {
    setStatus(!status);
  };
  return (
    <div className="auth-page">
      {status ? (
        <Signup changeStatus={changeStatus} />
      ) : (
        <Signin changeStatus={changeStatus} />
      )}
    </div>
  );
};

export default AuthPage;
