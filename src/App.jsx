import { Header } from "./components/Header";
import { HomeSection } from "./components/HomeSection";
import { AdminPanel } from "./components/adminPanel/AdminPanel";
import { AdminPanelEdit } from "./components/adminPanel/AdminPanelEdit";
import { ItemPage } from "./components/ItemPage";
import { Loading } from "./components/Loading";
import { DeadServer } from "./components/DeadServer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

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

import { itemsState } from "./atoms";
import { Login } from "./components/Login";
import { Cart } from "./components/Cart";

const App = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const getItemsFunction = (setState) => {
    fetch("http://localhost:3006/items")
      .then((response) => response.json())
      .then((data) => {
        setState(data);
        console.log("fetched");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getItemsFunction(setItems);
  }, []);

  const ifItemsAreRendered = !!items.length;

  if (!ifItemsAreRendered) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Loading />}></Route>
          <Route path="/item/:id" element={<Loading />}></Route>
          <Route path="/adminpanel" element={<Loading />}></Route>
          <Route path="/adminpanel/edit/:id" element={<Loading />}></Route>
          <Route path="/cart" element={<Loading />}></Route>
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeSection />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/item/:id" element={<ItemPage />}></Route>
          <Route
            path="/adminpanel"
            element={
              <AdminPanel items={items} getItemsFunction={getItemsFunction} />
            }
          ></Route>
          <Route
            path="/adminpanel/edit/:id"
            element={<AdminPanelEdit />}
          ></Route>

          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    );
  }
};

export default App;
