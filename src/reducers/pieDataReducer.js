import { PIE_DATA } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {};

export default function(state = initialState, action ) {
	switch(action.type) {
		case PIE_DATA:{
			console.log("hii. asdsadf", action.payload);
		return action.payload;
	}
		default: 
		return state;
	}
}