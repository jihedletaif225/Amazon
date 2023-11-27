import React, { useRef, useState } from "react";
import { signin } from "../../../actions/user";
import { useDispatch } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./Signin.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialSnack = {
  status: false,
  severity: "success",
  message: "no message here",
};

const Signin = ({ changeStatus }) => {
  const [snackStatus, setSnackStatus] = useState(initialSnack);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (password.length < 6) {
      setSnackStatus({
        status: true,
        severity: "warning",
        message: "Password must be at least 6 chacaters",
      });
      return;
    }
    const body = {
      email,
      password,
    };
    dispatch(signin(body, setSnackStatus));
  };

  const closeHandler = () => {
    setSnackStatus({
      ...snackStatus,
      status: false,
    });
  };
  return (
    <form className="signin" onSubmit={submitHandler}>
      <h1>Signin</h1>
      <input type="email" placeholder="Email" required ref={emailRef} />
      <input
        type="password"
        placeholder="Password"
        required
        ref={passwordRef}
      />
      <p>
        Dont have an account? <span onClick={() => changeStatus()}>Signup</span>
      </p>
      <button type="submit">Signin</button>
      <Snackbar
        open={snackStatus.status}
        autoHideDuration={6000}
        onClose={closeHandler}
      >
        <Alert
          severity={snackStatus.severity}
          sx={{ width: "100%" }}
          onClose={closeHandler}
        >
          {snackStatus.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Signin;
