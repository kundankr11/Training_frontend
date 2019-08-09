import { DATA_LOAD_COMPLETE} from '../actions/types';

const initialState = true;

export default function(state = initialState, action ) {
    
    switch(action.type) {

        case DATA_LOAD_COMPLETE:{
            return {...state, dataLoading:action.payload};

        }
        default: 
            return state;
    }
}

