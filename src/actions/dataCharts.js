import axios from 'axios';
import {ADD_TASK, GET_ERRORS, RESET_ERRORS,SET_CURRENT_USER, SEARCH, PAGE_RESET, PAGE_NEXT, PAGE_PREV, INFO, DELETE_USER, PIE_DATA, DATA_LOAD_COMPLETE,RESET_LOADER,} from './types';
import { connect } from 'react-redux';

export const pieData = (data) => dispatch => {

	dispatch({
		type: RESET_LOADER,
		payload: true
	});
	setTimeout(()=>{
		axios
		.get('http://localhost:8000/api/datapie', { params: data })
		.then(res => {
			const datapie = res.data.data;
			dispatch({
				type: RESET_LOADER,
				payload: true
			});
			dispatch(setPieData(datapie));
			dispatch(setDataLoading("true"));
			dispatch({
				type: RESET_LOADER,
				payload: true
			});
		})
		.catch(err => console.log(err));
	},3000);
}

export const dataLoadingReset = () => dispatch => {

	dispatch(setDataLoading(false));

}

export const setPieData = datapie => {
	return {
		type: PIE_DATA,
		payload: datapie
	}
}


export const setDataLoading = data => {

	return {
		type: DATA_LOAD_COMPLETE,
		payload: data
	}
}