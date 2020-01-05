import { LOGIN, LOAD_USER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case LOGIN:
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
