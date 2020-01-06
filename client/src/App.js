import React from "react";

import Init from "./components/Init";

import AuthState from "./context/auth/AuthState";
import FastingState from "./context/fastings/FastingState";

function App() {
  return (
    <AuthState>
      <FastingState>
        <Init />
      </FastingState>
    </AuthState>
  );
}

export default App;
