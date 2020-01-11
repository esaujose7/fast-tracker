import React, { useContext, useEffect } from "react";
import Login from "../Login";
import Dashboard from "../Dashboard";

import authContext from "../../context/auth/authContext";

const Init = () => {
  const { loading, isAuthenticated, loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Dashboard />;
};

export default Init;
