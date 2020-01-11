import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  LOGIN_SUCCESS,
  LOAD_USER,
  FAILED_AUTHENTICATION,
  FAILED_LOAD_USER,
  LOGOUT
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // This is only triggered if there is a token in the localStorage
  const loadUser = async () => {
    const response = await fetch("http://localhost:3001/users", {
      headers: {
        Authorization: state.token
      }
    });

    // It may fails if the token expires
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

    if (!response.ok) return dispatch({ type: FAILED_AUTHENTICATION });

    const { token, user } = await response.json();

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
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
