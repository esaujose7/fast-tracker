import {
  LOGIN_SUCCESS,
  LOAD_USER,
  FAILED_LOAD_USER,
  FAILED_AUTHENTICATION,
  LOGOUT
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
        error: "Couldn't login."
      };
    case FAILED_LOAD_USER:
      return {
        ...state,
        loading: false,
        token: null,
        error: "Couldn't authenticate."
      };
    case LOGOUT: {
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
      };
    }
    default:
      return state;
  }
};
