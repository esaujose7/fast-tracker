import { FETCH_FASTINGS, FAILED_FETCHING_FASTINGS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_FASTINGS:
      return {
        loading: false,
        fastings: action.payload,
        lastFast: action.payload.slice(-1)[0]
      };
    case FAILED_FETCHING_FASTINGS:
      return {
        fastings: [],
        lastFast: null,
        loading: false
      };
    default:
      return state;
  }
};
