import * as api from "../api/requests";
import {
  SIGNUP,
  SIGNIN,
  LOGOUT,
  FETCH_USER,
  ADD_TO_SAVED,
  REMOVE_FROM_SAVED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QTE,
  DECREMENT_QTE,
  ADD_ORDER,
  DELETE_ACCOUNT,
} from "../constants";

// signup a user
export const signup = (body, setSnackStatus) => async (dispatch) => {
  try {
    const { data } = await api.signup(body);
    dispatch({ type: SIGNUP, payload: data });
  } catch (e) {
    setSnackStatus({
      status: true,
      severity: "error",
      message: e.response.data.error,
    });
  }
};

// signout a user
export const signin = (body, setSnackStatus) => async (dispatch) => {
  try {
    const { data } = await api.signin(body);
    dispatch({ type: SIGNIN, payload: data });
  } catch (e) {
    setSnackStatus({
      status: true,
      severity: "error",
      message: e.response.data.error,
    });
  }
};

// logout a user
export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT });
  } catch (e) {
    console.log(e.message);
  }
};

// get a user

export const getUser = (setLoading) => async (dispatch) => {
  try {
    const { data } = await api.getUser();
    dispatch({ type: FETCH_USER, payload: data });
  } catch (e) {
    console.log(e.message);
  } finally {
    setLoading(false);
  }
};

// delete a user
export const deleteUser = () => async (dispatch) => {
  try {
    await api.deleteUser();
    dispatch({ type: DELETE_ACCOUNT });
  } catch (e) {
    console.log(e.message);
  }
};

/****** Saved actions ******/
// add to saved
export const addToSaved = (pid) => async (dispatch) => {
  try {
    const { data } = await api.addToSaved(pid);
    dispatch({ type: ADD_TO_SAVED, payload: data });
  } catch (e) {}
};

// remove from saved
export const removeFromSaved = (pid) => async (dispatch) => {
  try {
    const { data } = await api.removeFromSaved(pid);
    dispatch({ type: REMOVE_FROM_SAVED, payload: data });
  } catch (e) {}
};

/***** actions for the cart *****/
// add to cart
export const addToCart = (pid) => async (dispatch) => {
  try {
    const { data } = await api.addToCart(pid);
    dispatch({ type: ADD_TO_CART, payload: data });
  } catch (e) {}
};

// remove from cart
export const removeFromCart = (pid) => async (dispatch) => {
  try {
    const { data } = await api.removeFromCart(pid);
    dispatch({ type: REMOVE_FROM_CART, payload: data });
  } catch (e) {}
};

// increment product qte
export const incrementQte = (pid) => async (dispatch) => {
  try {
    const { data } = await api.incrementQte(pid);
    dispatch({ type: INCREMENT_QTE, payload: data });
  } catch (e) {}
};

// decrment product qte

export const decrementQte = (pid) => async (dispatch) => {
  try {
    const { data } = await api.decrementQte(pid);
    dispatch({ type: DECREMENT_QTE, payload: data });
  } catch (e) {}
};

/******* User orders *******/
export const addOrder = (body) => async (dispatch) => {
  try {
    const { data } = await api.addOrder(body);
    dispatch({ type: ADD_ORDER, payload: data });
  } catch (e) {}
};
