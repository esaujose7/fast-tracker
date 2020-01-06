import React, { useContext, useEffect } from "react";
import Login from "../Login";
import Dashboard from "../Dashboard";

import authContext from "../../context/auth/authContext";

const Init = () => {
  const { loading, isAuthenticated, loadUser } = useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Dashboard /> : <Login />;
};

export default Init;
