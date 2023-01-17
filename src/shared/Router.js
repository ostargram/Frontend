import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Write from "../pages/Write";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Router = () => {
  return (
    // 쿠키 provider
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="Detail" element={<Detail />} />
        <Route path="Write" element={<Write />} />
        <Route path="Home" element={<Home />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Detail/id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
