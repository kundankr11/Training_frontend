import { SET_ICON, ADD_NOTIFICATION, NOTIFICATION_ADDED, CLEAR_NOTIFICATION } from "./types";

export const setIcon1 = () => {
    return {
        type: SET_ICON,
    };
};


export const addNotification = (data) => {
    return {
        type: ADD_NOTIFICATION,
        payload: data
    };
};

export const notificationAdded = () => {
    return {
        type: NOTIFICATION_ADDED,
    };
};

export const clearNotification = () => {
    return {
        type: CLEAR_NOTIFICATION,
    };
};
