import React, { useContext, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import authContext from "./context/auth/authContext";

function App() {
  const { loading, isAuthenticated, loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Dashboard />;
}

export default App;
