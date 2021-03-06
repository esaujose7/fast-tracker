import React, { useReducer, createContext } from "react";
import reducer from "./reducer";
import {
  LOGIN_SUCCESS,
  LOAD_USER,
  FAILED_AUTHENTICATION,
  FAILED_LOAD_USER,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  error: null,
  user: null
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // This is triggered when the app mounts, to load the user with the token and proceed to fast page or login page
  const loadUser = async () => {
    const response = await fetch("http://localhost:3001/users", {
      headers: {
        Authorization: state.token
      }
    });

    // It may fails if the token expires/not available in localStorage
    if (!response.ok) {
      localStorage.removeItem("token");
      return dispatch({ type: FAILED_LOAD_USER });
    }

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
    const data = await response.json();

    if (!response.ok) {
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 5000);
      return dispatch({ type: FAILED_AUTHENTICATION, payload: data.msg });
    }

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

  const logout = async () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };

  const register = async userData => {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();

    if (!response.ok) {
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 5000);
      return dispatch({ type: FAILED_AUTHENTICATION, payload: data.msg });
    }

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
        loadUser,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext as default };
