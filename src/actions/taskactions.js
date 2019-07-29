import axios from "axios";
import {
	ADD_TASK,
	GET_ERRORS,
	RESET_ERRORS,
	SET_CURRENT_USER,
	SEARCH,
	PAGE_RESET,
	PAGE_NEXT,
	PAGE_PREV,
	INFO,
	DELETE_USER,
	PIE_DATA,
	SEARCH1,
	SET_LOADER,
	RESET_LOADER,
	GET_DATA_REQUEST,
	GET_DATA_SUCCESS,
	GET_DATA_FAILURE,

} from "./types";

export const addTask = (task, history) => dispatch => {
	axios
	.post("http://localhost:8000/api/newtask", task)
	.then(res => {
		history.push("/newtask");
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: null
		});
	});
};

export const taskUpdate = (task, history) => dispatch => {
	axios
	.post("http://localhost:8000/api/updatetask", task)
	.then(res => {
		history.push("/taskdash");
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: null
		});
	});
};

export const taskDelete = (task, history) => dispatch => {
	axios
	.post("http://localhost:8000/api/deletetask", task)
	.then(res => {
		history.push("/taskdash");
		history.push("/taskdelete");
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: null
		});
	});
};

export const statusUpdate = (task, history) => dispatch => {
	axios
	.post("http://localhost:8000/api/updatestatus", task)
	.then(res => {
		history.push("/statusupdate");
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: null
		});
	});
};

export const taskSearch = task => dispatch => {
	dispatch({
		type: GET_DATA_REQUEST,
		payload:true
	});
	setTimeout(() => {
		axios
		.get("http://localhost:8000/api/tasklist?", { params: task })
		.then(res => {
			const searchResult = res.data.table.data;
			const info = res.data.table;
			dispatch({
				type:GET_DATA_SUCCESS,
				payload:searchResult
			});
			dispatch(setCurrentInfo(info));				
		})
		.catch(err => console.log(err.response));
	}, 1800);
};

export const updateSearch = task => dispatch => {
	dispatch({
		type: GET_DATA_REQUEST,
		payload: true
	});
	setTimeout(() => {
		axios
		.get("http://localhost:8000/api/updatelist?", { params: task })
		.then(res => {

			const searchResult = res.data.table.data;
			const info = res.data.table;
			dispatch({
				type: GET_DATA_SUCCESS,
				payload: searchResult
			});
			dispatch(setCurrentInfo(info));
		})
		.catch(err => console.log(err.response));
	}, 3000);
};

export const statusSearch = task => dispatch => {
	dispatch({
		type: GET_DATA_REQUEST,
		payload: true
	});
	setTimeout(() => {
		axios
		.get("http://localhost:8000/api/statuslist?", { params: task })
		.then(res => {
			const searchResult = res.data.table.data;
			const info = res.data.table;
			dispatch({
				type:GET_DATA_SUCCESS,
				payload:searchResult
			});
			dispatch(setCurrentInfo(info));

		})
		.catch(err => console.log(err.response));
	}, 3000);
};

export const setCurrentResult = searchResult => {
	return {
		type: SEARCH,
		payload: searchResult
	};
};
export const setLoader = () => {
	return {
		type: RESET_LOADER,
		payload: true
	};
};

export const resetLoader = () => {
	return {
		type: RESET_LOADER,
		payload: false
	};
};

export const setCurrentResult1 = searchResult => {
	return {
		type: SEARCH1,
		payload: searchResult
	};
};

export const setCurrentInfo = info => {
	return {
		type: INFO,
		payload: info
	};
};
