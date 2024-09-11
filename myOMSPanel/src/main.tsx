import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/App.css";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./ui/chakraUI/theme/theme.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Loader from "./ui/components/Loader/Loader.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* <AuthProvider> */}
      <Provider store={store} >
        <Loader></Loader>
        <App />
      </Provider>
      {/* </AuthProvider> */}
    </ChakraProvider>
  // </React.StrictMode>
);
