import { LOGIN_SUCCESS, LOAD_USER } from "../types";

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
    default:
      return state;
  }
};
