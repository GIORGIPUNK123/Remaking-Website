import React, { useEffect } from 'react';
import { HomeSection } from './components/important-components/HomeSection';
import { AdminPanel } from './components/adminPanel/AdminPanel';
import { AdminPanelEdit } from './components/adminPanel/AdminPanelEdit';
import { BuildPage } from './components/important-components/BuildPage';
import { Loading } from './components/Loading';
import { DeadServer } from './components/DeadServer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Login } from './components/important-components/user-related/Login';
import { Register } from './components/important-components/user-related/Register';
import { CartPage } from './components/important-components/CartPage';
import { ShopSection } from './components/important-components/ShopSection';
import { Profile } from './components/important-components/user-related/Profile';
import { GeneralItemType, ItemType, UserType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneralItems } from './store/slices/generalItemsSlice';
import { AppDispatch } from './store/store';
import { ProtectedRoute } from './components/wrapper-components/ProtectedRoute';
import { RouteWrapper } from './components/wrapper-components/RouteWrapper';
import { getItems } from './store/slices/itemsSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const generalItemsObj = useSelector(
    (state: {
      generalItems: {
        generalItems: GeneralItemType[];
        error: boolean;
        loading: boolean;
      };
    }) => state.generalItems
  );
  const itemsObj = useSelector(
    (state: {
      items: {
        items: ItemType[];
        error: boolean;
        loading: boolean;
      };
    }) => state.items
  );
  const currentUserObj = useSelector(
    (state: {
      currentUser: {
        currentUser: UserType | null;
        error: boolean;
        loading: boolean;
      };
    }) => state.currentUser
  );

  useEffect(() => {
    dispatch(getGeneralItems());
    dispatch(getItems());
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <RouteWrapper loading={generalItemsObj.loading}>
              <HomeSection />
            </RouteWrapper>
          }
        />
        <Route
          path='/shop'
          element={
            <RouteWrapper loading={generalItemsObj.loading}>
              <ShopSection />
            </RouteWrapper>
          }
        />
        <Route
          path='/login'
          element={
            <RouteWrapper loading={currentUserObj.loading}>
              <Login />
            </RouteWrapper>
          }
        />
        <Route
          path='/register'
          element={
            <RouteWrapper loading={currentUserObj.loading}>
              <Register />
            </RouteWrapper>
          }
        />
        <Route
          path='/profile'
          element={
            <RouteWrapper loading={currentUserObj.loading}>
              <Profile />
            </RouteWrapper>
          }
        />
        <Route
          path='/cart'
          element={
            <RouteWrapper loading={itemsObj.loading}>
              <CartPage />
            </RouteWrapper>
          }
        />
        <Route
          path='/build/:category/:type'
          element={
            <RouteWrapper
              loading={
                itemsObj.loading === true && generalItemsObj.loading === true
              }
            >
              <BuildPage />
            </RouteWrapper>
          }
        />
        <Route
          path='/adminpanel'
          element={
            <RouteWrapper loading={itemsObj.loading}>
              <ProtectedRoute
                isAdmin={currentUserObj?.currentUser?.rank === 'admin'}
              >
                <AdminPanel />
              </ProtectedRoute>
            </RouteWrapper>
          }
        />
        <Route
          path='/adminpanel/edit/:id'
          element={
            <ProtectedRoute
              isAdmin={currentUserObj?.currentUser?.rank === 'admin'}
            >
              <AdminPanelEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
