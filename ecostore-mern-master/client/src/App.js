import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user";
import Navbar from "./components/Navbar/Navbar";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SearchPage from "./pages/SearchPage/SearchPage";

import "./App.css";
import SimpleBackdrop from "./components/SimpleBackdrop/SimpleBackdrop";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(setLoading));
  }, [dispatch]);

  return (
    <div className="app">
      {isLoading ? (
        <SimpleBackdrop />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/auth"
              element={!isLoggedIn ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/product" element={<Product />} />
            {isLoggedIn && (
              <>
                <Route path="/profile/*" element={<ProfilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </>
            )}
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<p>Error 404 Page not found!</p>} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
