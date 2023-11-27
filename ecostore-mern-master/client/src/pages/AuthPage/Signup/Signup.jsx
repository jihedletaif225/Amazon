import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../actions/user";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./Signup.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialSnack = {
  status: false,
  severity: "success",
  message: "no message here",
};

const Signup = ({ changeStatus }) => {
  const [snackStatus, setSnackStatus] = useState(initialSnack);

  const dispatch = useDispatch();
  // Define refs
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCnfRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordCnf = passwordCnfRef.current.value;

    if (password !== passwordCnf) {
      setSnackStatus({
        status: true,
        severity: "warning",
        message: "Passwords are not the same",
      });
      return;
    }
    const body = {
      username,
      email,
      password,
    };
    dispatch(signup(body, setSnackStatus));
  };

  const closeHandler = () => {
    setSnackStatus({
      ...snackStatus,
      status: false,
    });
  };
  return (
    <form className="signup" onSubmit={submitHandler}>
      <h1>Signup</h1>
      <input type="text" placeholder="Username" required ref={usernameRef} />
      <input type="email" placeholder="Email" required ref={emailRef} />
      <input
        type="password"
        placeholder="Password"
        required
        ref={passwordRef}
      />
      <input
        type="password"
        placeholder="Confirm password"
        required
        ref={passwordCnfRef}
      />
      <p>
        Already have an account?{" "}
        <span onClick={() => changeStatus()}>Signin</span>
      </p>
      <button type="submit">Signup</button>

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

export default Signup;
