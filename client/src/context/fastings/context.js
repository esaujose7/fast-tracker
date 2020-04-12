import React, { useReducer, createContext } from "react";
import reducer from "./reducer";
import { FETCH_FASTINGS, START_FASTING, STOPPED_FASTING, START_LOADING, FAILED_FETCHING_FASTINGS, FAILED_START_FASTING, FAILED_STOPPED_FASTING } from "../types";

const FastingContext = createContext();

const initialState = {
  fastings: [],
  lastFast: null,
  loading: true
};

const FastingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getFastings = async () => {
    dispatch({ type: START_LOADING });

    const response = await fetch("http://localhost:3001/fastings", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (!response.ok) return dispatch({ type: FAILED_FETCHING_FASTINGS });

    const payload = await response.json();
    return dispatch({ type: FETCH_FASTINGS, payload });
  };

  const startFasting = async () => {
    dispatch({ type: START_LOADING });

    const response = await fetch("http://localhost:3001/fastings", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (!response.ok) return dispatch({ type: FAILED_START_FASTING });

    const payload = await response.json();
    return dispatch({ type: START_FASTING, payload });
  };

  const stopFasting = async id => {
    dispatch({ type: START_LOADING });

    const response = await fetch(`http://localhost:3001/fastings/${id}`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (!response.ok) return dispatch({ type: FAILED_STOPPED_FASTING });

    const payload = await response.json();
    return dispatch({ type: STOPPED_FASTING, payload });
  }

  return (
    <FastingContext.Provider
      value={{
        fastings: state.fastings,
        lastFast: state.lastFast,
        loading: state.loading,
        getFastings,
        startFasting,
        stopFasting
      }}
    >
      {children}
    </FastingContext.Provider>
  );
};

export { FastingContextProvider, FastingContext as default };
