import {
  FETCH_FASTINGS,
  START_FASTING,
  STOPPED_FASTING,
  FAILED_FETCHING_FASTINGS,
  FAILED_START_FASTING,
  FAILED_STOPPED_FASTING,
  START_LOADING
} from "../types";

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
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case START_FASTING:
      return {
        fastings: state.fastings.concat([action.payload]),
        lastFast: action.payload,
        loading: false
      };
    case STOPPED_FASTING:
      return {
        fastings: state.fastings.map((item, index) => (state.fastings.length - 1) === index ? action.payload : item),
        lastFast: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
