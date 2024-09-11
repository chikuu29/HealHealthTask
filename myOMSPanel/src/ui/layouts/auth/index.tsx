import { Box, useColorModeValue } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "../../../views/auth/signin";

export default function Auth() {
  console.log("auth Inde");

  const authBg = useColorModeValue("white", "navy.900");
  return (
    <Box
      bg={authBg}
      float="right"
      minHeight="100vh"
      height="100%"
      position="relative"
      w="100%"
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      transitionDuration=".2s, .2s, .35s"
      transitionProperty="top, bottom, width"
      transitionTimingFunction="linear, linear, ease"
    >
      {true ? (
        <Box mx="auto" minH="100vh">
          <Routes>
            <Route
              path="/auth"
              element={<Navigate to="/auth/sign-in" replace />}
            />
             <Route path="/auth/sign-in" element={<SignInPage />} />
            {/* <Route path="sign-in" element={<SignInPage />} /> */}
          </Routes>
        </Box>
      ) : null}
    </Box>
  );
}
