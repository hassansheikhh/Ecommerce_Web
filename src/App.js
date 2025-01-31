import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Shop from "../src/Pages/Shop";
import Contact from "../src/Pages/Contact";
import Dashboard from "../src/Pages/Dashboard";
import OrdersPage from "../src/Pages/OrderPage";

import Header from "../src/Components/Header/Navbar";
import Footer from "../src/Components/Footer/Footer";
import ProductDetails from "./Pages/ProductDetails";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Authentication from "./Pages/Authentication";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails";
import TermsConditions from "./Pages/TermsConditions";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import { Toaster } from "react-hot-toast";
import AddProduct from "./Pages/AddProduct";
import Products from "./Pages/Products";
import Product from "./Components/Product/ProductMain/Product";
import LoginSignUp from "./Components/Authentication/LoginSign/LoginSignUp";

const App = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("UserInfo")) || null);
  const [headerKey, setHeaderKey] = useState(0);

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        setHeaderKey((prev) => prev + 1);
      }, 2000);
    }
  }, [userInfo]);

  const ProtectedRoute = ({ children }) => {
    if (!userInfo || userInfo.UserId !== 7) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Header key={headerKey} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product" element={<Product />} />
          <Route path="/loginSignUp" element={<LoginSignUp setUserInfo={setUserInfo} />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
