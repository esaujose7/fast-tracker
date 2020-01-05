import React, { useEffect, useContext } from "react";

import Init from "./components/Init";

import AuthState from "./context/auth/AuthState";

function App() {
  return (
    <AuthState>
      <Init />
    </AuthState>
  );
}

export default App;
