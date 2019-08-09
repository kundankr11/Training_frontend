import { PIE_DATA_REQUEST, PIE_DATA_SUCCESS, PIE_DATA_FAILURE } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
	pie_dataloading: false,
	pie_fetched_data: [],
	pie_errors:[],
};

export default function(state = initialState, action ) { 
    switch(action.type) {
        case PIE_DATA_REQUEST:{
            return {...state, pie_dataloading:true};
        }
        case PIE_DATA_SUCCESS:{
            return {...state, pie_dataloading:false, pie_fetched_data: action.payload};
        }
        case PIE_DATA_FAILURE:{
        	return {...state, pie_dataloading:false,  pie_errors: action.payload};
        }
        default:{
        	return state;
        }
    }
}