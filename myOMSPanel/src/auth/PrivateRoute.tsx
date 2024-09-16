// src/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Center, Spinner, VStack, Text, Box } from "@chakra-ui/react";
import { GetNavMenuConfig } from "../utils/app/services/appServices";
import Loader from "../ui/components/Loader/Loader";
import { useSelector } from "react-redux";
// import isAuthenticated from './auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  elseNavigation?: string;
  redirection?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  elseNavigation,
  redirection = true,
}) => {
  console.log("%c===EXCECUTE PRIVATE ROUTE===","color:red")
  GetNavMenuConfig()
  const location = useLocation();
  elseNavigation =
    elseNavigation && elseNavigation !== ""
      ? redirection
        ? elseNavigation + `?redirect=${encodeURIComponent(location.pathname)}`
        : elseNavigation
      : `/auth/sign-in?redirect=${encodeURIComponent(location.pathname)}`;

  const roleConfig:any={
    'SELLER':['auth','myApps','inventory'],
    'USER':['auth','myApps','marketplace'],
    'ADMINSTRATOR':['auth','myApps','logs','marketplace','inventory']
  }
  console.log("location",location);
  
  const { authInfo, loading } = useAuth();
  console.log("auth",authInfo);
  const auth= useSelector((state: any) => state.auth);
  console.log("auth",auth);
  if (loading) {
    return (
      <Loader/>
    ); // Or a loading spinner
  }
  // const permission:any=roleConfig[auth.loginInfo.role] || []

  // const isMatch = permission.some((keyword:any) => {location.pathname.includes(keyword)});

  if (!authInfo && !authInfo?.success) {
    // alert("Permission Denie");
    // setRedirectUrl(location.pathname);
    return <Navigate to={elseNavigation} replace />;
  }

    // if(permission.)
    return <>{children}</>;
  
 
};

export default PrivateRoute;
