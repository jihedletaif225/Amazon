import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../actions/user";
import "./Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAccountHandler = () => {
    dispatch(deleteUser());
    navigate("/");
  };
  return (
    <div className="profile">
      <img src={user.image} alt="" />
      <h3>Username : {user.username}</h3>
      <h4>Email : {user.email}</h4>
      <button onClick={deleteAccountHandler}>Delete Account</button>
    </div>
  );
};

export default Profile;
