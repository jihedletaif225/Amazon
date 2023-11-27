import axios from "./axios";

export const getCategories = () => axios.get("/category/categories");

export const getCategory = (cid) => axios.get(`/category/category/${cid}`);

export const getProduct = (pid) => axios.get(`/category/product/${pid}`);

/******* This is for the authentication *******/
export const signup = (body) => axios.post("/auth/signup", body);

export const signin = (body) => axios.post("/auth/signin", body);

export const logout = () => axios.delete("/auth/logout");

export const getUser = () => axios.get("/user/user");

export const deleteUser = () => axios.delete("/user/user");

/****** This is for the saved  *******/
export const addToSaved = (pid) => axios.patch(`/saved/add/${pid}`);

export const removeFromSaved = (pid) => axios.delete(`/saved/remove/${pid}`);

/****** Add product to a cart *******/
export const addToCart = (pid) => axios.patch(`/cart/add/${pid}`);

export const removeFromCart = (pid) => axios.delete(`/cart/remove/${pid}`);

export const incrementQte = (pid) => axios.patch(`/cart/increment/${pid}`);

export const decrementQte = (pid) => axios.patch(`/cart/decrement/${pid}`);

/****** Add order to a user *******/
export const addOrder = (body) => axios.post("/order/add", body);

export const getOrders = () => axios.get("/order/orders");

export const getOrder = (oid) => axios.get(`/order/order/${oid}`);

/***** Search for products *******/
export const searchProducts = (search) =>
  axios.get(`/category/search?search=${search}`);
