import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Normalize } from 'styled-normalize'

import AuthState from "./context/auth/AuthState";
import FastingState from "./context/fastings/FastingState";

ReactDOM.render(
  <AuthState>
    <FastingState>
      <Normalize />
      <App />
    </FastingState>
  </AuthState>
  , document.getElementById("root"));
