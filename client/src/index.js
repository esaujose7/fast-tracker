import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import AuthState from "./context/auth/AuthState";
import FastingState from "./context/fastings/FastingState";

ReactDOM.render(
  <AuthState>
    <FastingState>
      <App />
    </FastingState>
  </AuthState>
  , document.getElementById("root"));
