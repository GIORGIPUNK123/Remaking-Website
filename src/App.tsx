import React from "react";
import { HomeSection } from "./components/important-components/HomeSection";
import { AdminPanel } from "./components/adminPanel/AdminPanel";
import { AdminPanelEdit } from "./components/adminPanel/AdminPanelEdit";
import { BuildPage } from "./components/important-components/BuildPage";
import { Loading } from "./components/Loading";
import { DeadServer } from "./components/DeadServer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Login } from "./components/important-components/user-related/Login";
import { Register } from "./components/important-components/user-related/Register";
import { CartPage } from "./components/important-components/CartPage";
import { ShopSection } from "./components/important-components/ShopSection";
import { Profile } from "./components/important-components/user-related/Profile";
import { GeneralItemType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralItems } from "./store/slices/generalItemsSlice";
import { AppDispatch } from "./store/store";
// import { getCurrentUser } from './store/slices/currentUserSlice';
import { getItems } from "./store/slices/itemsSlice";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const generalItemsObj = useSelector(
    (state: {
      generalItems: { generalItems: GeneralItemType[] };
      error: boolean;
      loading: boolean;
    }) => state.generalItems
  );
  useEffect(() => {
    // dispatch(getCurrentUser(cookies.accessToken));
    dispatch(getGeneralItems());
    dispatch(getItems());
  }, []);
  // ROUTES
  if (!!!generalItemsObj.generalItems.length) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/shop" element={<Loading />} />
          <Route path="/build/:type/:product" element={<Loading />} />
          <Route path="/adminpanel" element={<Loading />} />
          <Route path="/adminpanel/edit/:id" element={<Loading />} />
          <Route path="/login" element={<Loading />} />
          <Route path="/register" element={<Loading />} />
          <Route path="/profile" element={<Loading />} />
          <Route path="/cartpage" element={<Loading />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/shop" element={<ShopSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/build/:category/:type" element={<BuildPage />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/adminpanel/edit/:id" element={<AdminPanelEdit />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    );
  }
};

export default App;
