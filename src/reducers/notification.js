import { SET_ICON, ADD_NOTIFICATION, CLEAR_NOTIFICATION, NOTIFICATION_ADDED } from "../actions/types";

const initialState = {
    notification_count: 0,
    notification_data: [],
    flag:false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTIFICATION: {
            const previous_count = state.notification_count + 1;
            const new_data = action.payload;

            return {
                ...state,
                notification_count: previous_count,
                notification_data: [...state.notification_data, action.payload],
                flag:true,
            };
        }
        case CLEAR_NOTIFICATION: {
             return {
                ...state,
                notification_count: 0,
                notification_data: []
            };
        }
        case NOTIFICATION_ADDED: {
             return {
                ...state,
                flag:false,
            };
        }
        default:
            return state;
    }
}
