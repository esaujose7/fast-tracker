import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Login from "../Login";

import authContext from "../../context/auth/authContext";

const Init = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const { loadUser } = useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    loadUser();
  }, []);

  return isAuthenticated ? <div>jej</div> : <Login />;
};

export default Init;
