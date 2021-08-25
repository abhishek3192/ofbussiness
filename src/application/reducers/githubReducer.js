import { GET_DATA } from "../constants/types";

const initialState = {
   issue: []
}
export const issueReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        issue: action.payload
      };
    default:
      return state;
  }
};
