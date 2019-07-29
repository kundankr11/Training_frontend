import { DELETE_USER } from '../actions/types';


const initialState = "";

export default function(state = initialState, action ) {
    console.log(action.payload); 
    switch(action.type) {
        case DELETE_USER:
            return {...state, loader:true, deleteInfo:action.payload};
        default: 
            return state;
    }
}