import { SET_LOADER, RESET_LOADER} from '../actions/types';

const initialState = false;

export default function(state = initialState, action ) {

    
    switch(action.type) {

        case RESET_LOADER:{
            return {...state, loader: action.payload};
        }
        default: 
            return state;
    }
}