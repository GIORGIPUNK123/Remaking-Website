import { Header } from "./components/important-components/Header";
import axios from "axios";
import { HomeSection } from "./components/important-components/HomeSection";
import { AdminPanel } from "./components/adminPanel/AdminPanel";
import { AdminPanelEdit } from "./components/adminPanel/AdminPanelEdit";
import { ItemPage } from "./components/important-components/ItemPage";
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
import { itemsState, currentUserState } from "./atoms";
import { Login } from "./components/important-components/Login";
import { Register } from "./components/important-components/Register";
import { Cart } from "./components/inside-components/Cart";
import { ShopSection } from "./components/important-components/ShopSection";
import { Profile } from "./components/important-components/Profile";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [items, setItems] = useRecoilState(itemsState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  console.log(currentUser);
  useEffect(() => {
    if (cookies.accessToken !== undefined) {
      axios({
        url: "http://localhost:3006/userInfo",
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
  const getItemsFunction = () => {
    fetch("http://localhost:3006/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        console.log("fetched");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getItemsFunction();
  }, []);
  console.log(items);
  const ifItemsAreRendered = !!items.length;
  if (!ifItemsAreRendered) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Loading />}></Route>
          <Route path="/shop" element={<Loading />}></Route>
          <Route path="/item/:id" element={<Loading />}></Route>
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
          <Route path="/item/:id" element={<ItemPage />}></Route>
          <Route
            path="/adminpanel"
            element={<AdminPanel getItemsFunction={getItemsFunction} />}
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
