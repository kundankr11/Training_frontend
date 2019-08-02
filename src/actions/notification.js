import { SET_ICON } from "./types";

export const setIcon = value => {
    return {
        type: SET_ICON,
        payload: value
    };
};