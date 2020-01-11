import React, { useReducer } from "react";
import FastingContext from "./fastingContext";
import fastingReducer from "./fastingReducer";
import { FETCH_FASTINGS, FAILED_FETCHING_FASTINGS } from "../types";

const AuthState = props => {
  const initialState = {
    fastings: [],
    lastFast: null,
    loading: true
  };

  const [state, dispatch] = useReducer(fastingReducer, initialState);

  const getFastings = async () => {
    const response = await fetch("http://localhost:3001/fastings", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (!response.ok) return dispatch({ type: FAILED_FETCHING_FASTINGS });

    const payload = await response.json();
    return dispatch({ type: FETCH_FASTINGS, payload });
  };

  return (
    <FastingContext.Provider
      value={{
        fastings: state.fastings,
        lastFast: state.lastFast,
        loading: state.loading,
        getFastings
      }}
    >
      {props.children}
    </FastingContext.Provider>
  );
};

export default AuthState;
