import { PAGE_RESET, PAGE_NEXT, PAGE_PREV } from '../actions/types';

const initialState = 1;

export default function(state = initialState, action ) {
    switch(action.type) {
        case PAGE_RESET:{
        	console.log("Pagination Reducer", action.type);
        	return { ...state, loader: true, paginationPage: 1}
        }
        case PAGE_NEXT:
             if((action.payload.curr_page + 1 < action.payload.max_page) ){
             	return action.payload.curr_page + 1;
             }
             else{
             	return action.payload.curr_page;
             }            
        case PAGE_PREV:
            if(action.payload.curr_page   > 1){
             	return action.payload.curr_page -1;
             }
             else{
             	return action.payload.curr_page;
             }
        default: 
            return state;
    }
}		