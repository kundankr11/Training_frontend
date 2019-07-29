import { GET_ERRORS, RESET_ERRORS } from '../actions/types';

const initialState = "";

export default function(state = initialState, action ) {
    
    switch(action.type) {
        case GET_ERRORS:
        {console.log("In the error reducer", action.payload);
            return action.payload;
        }
        case RESET_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}