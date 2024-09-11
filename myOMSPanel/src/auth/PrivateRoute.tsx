// src/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Center, Spinner, VStack, Text, Box } from "@chakra-ui/react";
import { GetNavMenuConfig } from "../utils/app/services/appServices";
import Loader from "../ui/components/Loader/Loader";
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

 
  const { authInfo, loading } = useAuth();
 

  if (loading) {
    return (
      <Loader/>
    ); // Or a loading spinner
  }

  if (!authInfo && !authInfo?.success) {
    // setRedirectUrl(location.pathname);
    return <Navigate to={elseNavigation} replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
