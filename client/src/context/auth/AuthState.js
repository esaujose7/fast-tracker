import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { LOGIN_SUCCESS, LOAD_USER } from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    const response = await fetch("http://localhost:3001/users", {
      headers: {
        Authorization: state.token
      }
    });

    if (!response.ok) return { msg: "Error fetching shit" };

    const { user } = await response.json();

    dispatch({ type: LOAD_USER, payload: user });
  };

  const login = async formData => {
    const response = await fetch("http://localhost:3001/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) return { msg: "Error fetching shit" };

    const data = await response.json();
    const { token, user } = data;

    localStorage.setItem("token", token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        login,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
