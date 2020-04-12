import {
  LOGIN_SUCCESS,
  LOAD_USER,
  FAILED_LOAD_USER,
  FAILED_AUTHENTICATION,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case FAILED_AUTHENTICATION:
      return {
        ...state,
        loading: false,
        token: null,
        error: action.payload
      };
    case FAILED_LOAD_USER:
      return {
        ...state,
        loading: false,
        token: null,
        error: null
      };
    case LOGOUT: {
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null
      };
    }
    default:
      return state;
  }
};
