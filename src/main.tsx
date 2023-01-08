import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/reset.css";
import "./styles/header.css";
import "./styles/shopbox.css";
import "./styles/bestseller.css";
import "./styles/adminpanel.css";
import "./styles/itempage.css";
// import "./styles/responsive.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ChakraProvider>
);
