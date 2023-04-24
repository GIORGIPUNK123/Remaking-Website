import { Header } from "./components/important-components/Header";
import axios from "axios";
import { HomeSection } from "./components/important-components/HomeSection";
import { AdminPanel } from "./components/adminPanel/AdminPanel";
import { AdminPanelEdit } from "./components/adminPanel/AdminPanelEdit";
import { BuildPage } from "./components/important-components/buildPage";
import { Loading } from "./components/Loading";
import { DeadServer } from "./components/DeadServer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { currentUserState, generalMacsState, macsState } from "./atoms";
import { Login } from "./components/important-components/user-related/Login";
import { Register } from "./components/important-components/user-related/Register";
import { Cart } from "./components/inside-components/Cart";
import { ShopSection } from "./components/important-components/ShopSection";
import { Profile } from "./components/important-components/user-related/Profile";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [macs, setMacs] = useRecoilState(macsState);
  const [generalMacs, setGeneralMacs] = useRecoilState(generalMacsState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  // console.log(currentUser);
  useEffect(() => {
    if (cookies.accessToken !== undefined) {
      axios({
        url: "https://geolab-project-backend.onrender.com/userInfo",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
        .then((res: any) => {
          setCurrentUser(res.data);
        })
        .catch((err: any) => {
          console.log("Error: ", err);
        });
    }
  }, []);
  const getMacsFunction = () => {
    fetch(
      // "https://geolab-project-backend.onrender.com/macs"
      "http://localhost:3006/macs"
    )
      .then((response) => response.json())
      .then((data) => {
        setMacs(data);
        // console.log("fetched");
      })
      .catch((err) => console.log(err));
  };
  const getGeneralMacsFunction = () => {
    fetch(
      // "https://geolab-project-backend.onrender.com/generalmacs"
      "http://localhost:3006/generalmacs"
    )
      .then((response) => response.json())
      .then((data) => {
        setGeneralMacs(data);
        // console.log("fetched");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMacsFunction();
    getGeneralMacsFunction();
  }, []);
  // console.log("MACS ==> ", macs);
  // console.log("GENERAL MACS ==> ", generalMacs);
  const ifMacsAreRendered = !!macs.length;
  if (!ifMacsAreRendered) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Loading />}></Route>
          <Route path="/shop" element={<Loading />}></Route>
          <Route path="/build/:type/:product" element={<Loading />}></Route>
          <Route path="/adminpanel" element={<Loading />}></Route>
          <Route path="/adminpanel/edit/:id" element={<Loading />}></Route>
          <Route path="/cart" element={<Loading />}></Route>
          <Route path="/login" element={<Loading />}></Route>
          <Route path="/register" element={<Loading />}></Route>
          <Route path="/profile" element={<Loading />}></Route>
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeSection />}></Route>
          <Route path="/shop" element={<ShopSection />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/build/:type/:product" element={<BuildPage />}></Route>
          <Route
            path="/adminpanel"
            element={<AdminPanel getMacsFunction={getMacsFunction} />}
          ></Route>
          <Route
            path="/adminpanel/edit/:id"
            element={<AdminPanelEdit />}
          ></Route>

          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    );
  }
};

export default App;
