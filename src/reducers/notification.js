import { SET_ICON} from '../actions/types';

const initialState = 0;

export default function(state = initialState, action ) {

    
    switch(action.type) {

        case SET_ICON:{
            return action.payload+1;
        }
        default: 
            return 0;
    }
}