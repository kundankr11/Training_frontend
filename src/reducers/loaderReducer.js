import { SET_LOADER, RESET_LOADER} from '../actions/types';

const initialState = false;

export default function(state = initialState, action ) {

    
    switch(action.type) {

        case RESET_LOADER:{
 console.log("Reset Loader", action.payload);

            return action.payload;
        }
        default: 
            return false;
    }
}