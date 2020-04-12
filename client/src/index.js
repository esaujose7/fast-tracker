import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Normalize } from 'styled-normalize'

import { AuthContextProvider } from "./context/auth/context";

ReactDOM.render(
  <AuthContextProvider>
      <Normalize />
      <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
