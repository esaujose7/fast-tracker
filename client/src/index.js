import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Normalize } from 'styled-normalize'

import { AuthContextProvider } from "./context/auth/context";
import { FastingContextProvider } from "./context/fastings/context";

ReactDOM.render(
  <AuthContextProvider>
    <FastingContextProvider>
      <Normalize />
      <App />
    </FastingContextProvider>
  </AuthContextProvider>
  , document.getElementById("root"));
