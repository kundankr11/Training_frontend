import { INFO } from '../actions/types';

const initialState = [];

export default function(state = initialState, action ) {
    
    switch(action.type) {
        case INFO:
            return action.payload;
        default: 
            return state;
    }
}