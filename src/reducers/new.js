import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
	dataloading: false,
	fetched_data: [],
	errors:[],
};

export default function(state = initialState, action ) {
    console.log(action.payload); 
    switch(action.type) {
        case GET_DATA_REQUEST:{
            return {...state, dataloading:true};
        }
        case GET_DATA_SUCCESS:{
        	let newState = state
        	newState.fetched_data=action.payload;
        	newState.dataloading = false;
        	// return newState
            // return {...state, dataloading:false, fetched_data: action.payload};
        }
        case GET_DATA_FAILURE:{
        	return {...state, dataloading:false, errors: action.payload};
        }
        default:{
        	return state;
        }
    }
}