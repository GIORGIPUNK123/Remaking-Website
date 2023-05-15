import React from 'react';
import { HomeSection } from './components/important-components/HomeSection';
import { AdminPanel } from './components/adminPanel/AdminPanel';
import { AdminPanelEdit } from './components/adminPanel/AdminPanelEdit';
import { BuildPage } from './components/important-components/buildPage';
import { Loading } from './components/Loading';
import { DeadServer } from './components/DeadServer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Login } from './components/important-components/user-related/Login';
import { Register } from './components/important-components/user-related/Register';
import { Cart } from './components/inside-components/Cart';
import { ShopSection } from './components/important-components/ShopSection';
import { Profile } from './components/important-components/user-related/Profile';
import { GeneralItemType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneralItems } from './store/slices/generalItemsSlice';
import { AppDispatch } from './store/store';
import { getCurrentUser } from './store/slices/currentUserSlice';
import { getItems } from './store/slices/itemsSlice';
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const generalItemsObj = useSelector(
    (state: {
      generalItems: { generalItems: GeneralItemType[] };
      error: boolean;
      loading: boolean;
    }) => state.generalItems
  );
  useEffect(() => {
    if (cookies.accessToken !== undefined) {
      dispatch(getCurrentUser(cookies.accessToken));
    }
    dispatch(getGeneralItems());
    dispatch(getItems());
  }, []);
  // ROUTES

  if (!!!generalItemsObj.generalItems.length) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Loading />}></Route>
          <Route path='/shop' element={<Loading />}></Route>
          <Route path='/build/:type/:product' element={<Loading />}></Route>
          <Route path='/adminpanel' element={<Loading />}></Route>
          <Route path='/adminpanel/edit/:id' element={<Loading />}></Route>
          <Route path='/cart' element={<Loading />}></Route>
          <Route path='/login' element={<Loading />}></Route>
          <Route path='/register' element={<Loading />}></Route>
          <Route path='/profile' element={<Loading />}></Route>
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<HomeSection />}></Route>
          <Route path='/shop' element={<ShopSection />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/build/:type/:product' element={<BuildPage />}></Route>
          <Route path='/adminpanel' element={<AdminPanel />}></Route>
          <Route
            path='/adminpanel/edit/:id'
            element={<AdminPanelEdit />}
          ></Route>

          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </Router>
    );
  }
};

export default App;
