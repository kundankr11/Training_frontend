import { SEARCH } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = [];

export default function(state = initialState, action ) {
    console.log(action.payload); 
    switch(action.type) {
        case SEARCH:
            return action.payload;
        default: 
            return state;
    }
}