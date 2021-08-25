import { GET_DATA } from "../constants/types";

export const setData = (issue) => {
    return {
        type: GET_DATA,
        payload: issue
    }
}