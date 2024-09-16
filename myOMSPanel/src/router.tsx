import React from "react";
import { Navigate, createBrowserRouter, RouteObject } from "react-router-dom";
import AuthLayout from "./ui/layouts/auth/auth";
import LandingLayout from "./ui/layouts/landing/landing";
import SignInPage from "./views/auth/signin";
import SignUpPage from "./views/auth/signup";
import PanelLayout from "./ui/layouts/dashboard/dash";
import { Home } from "./pages/Home/Home";
import { NoPageFound } from "./pages/NoPageFound";
import DashBoard from "./views/dashboard/DashBoard";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import { MyApps } from "./views/myApps/MyApps";
import AddProduct from "./views/inventory/AddProduct";
import ProductListing from "./views/inventory/ProductListing";
import MarketPlace from "./views/marketplcae/MarketPlace";
import DateFilter from "./views/appLogs/DateFilter";
// import {AddProduct}  from "./views/inventory/addProduct";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="myApps" replace />,
  },
  {
    path: "/auth",
    element: <Navigate to="sign-in" replace />,
  },
  {
    path: "/auth/*",
    element: (
      <AuthProvider>
        {" "}
        <AuthLayout />{" "}
      </AuthProvider>
    ),
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/marketplace/*",
    element: (
      <AuthProvider>
        <PrivateRoute children={<PanelLayout />}></PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <MarketPlace />,
      },
    ],
  },
  {
    path: "/inventory/*",
    element: (
      <AuthProvider>
        <PrivateRoute children={<PanelLayout />}></PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <ProductListing />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
      {
        path: "product/edit/:sku",
        element: <AddProduct />,
      },
      {
        path: "product/view/:sku",
        element: <AddProduct />,
      },
      {
        path: "pageNotFound",
        element: <NoPageFound />,
      },
      {
        path: "*",
        element: <Navigate to="pageNotFound" replace />,
      },
    ],
  },
  {
    path: "/myApps",
    element: (
      <AuthProvider>
        <PrivateRoute children={<PanelLayout />}></PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <MyApps />,
      },
    ],
  },
  {
    path: "/logs",
    element: (
      <AuthProvider>
        <PrivateRoute children={<PanelLayout />}></PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <DateFilter />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/pageNotFound" replace />,
  },
];

const router = createBrowserRouter(routes);

export default router;
