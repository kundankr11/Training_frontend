import axios from 'axios';
import { GET_ERRORS, RESET_ERRORS,SET_CURRENT_USER, SEARCH, PAGE_RESET, PAGE_NEXT, PAGE_PREV, INFO, DELETE_USER, RESET_LOADER} from './types';
import jwt_decode from 'jwt-decode';


export const resetErrors = () => dispatch => {

    dispatch({
        type: RESET_ERRORS,
        payload: ""
    })
}
export const registerUser = (user, history) => dispatch => {
    axios.post('http://localhost:8000/api/register', user)
    .then(res =>{ 
        history.push('/');
    })
    .catch(err => {
        console.log(err.response);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data.email
        });
    });
}
export const createUser = (user, history) => dispatch => {
    return axios.post('http://localhost:8000/api/createuser',  user  )

    .then(res =>{ 
         dispatch({
            type: GET_ERRORS,
            payload: res.data.data
        });


        history.push('/search');
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    });
}


export const loginUser = (user, history, cookies) => dispatch => {
    axios.post('http://localhost:8000/api/auth/login', user)
    .then(res => {

        const Token = cookies.get('token');
        const decoded = jwt_decode(Token);
        const role = decoded.role;
        localStorage.setItem('role', role);
        dispatch(setCurrentUser(decoded)); 
        history.push('/dash'); 
         
    })
    .catch(err => {
        console.log(err.response);
        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    });
}

export const forgetUser = (user, history) => dispatch => {
    axios.post('http://localhost:8000/api/forget', user)
    .then(res => {
        history.push('/login');  
    })
    .catch(err => {

        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    });
}

export const sendEmail = (user, history) => dispatch => {
    axios.get('http://localhost:8000/resetpassword', { params: user})
    .then(res => {
        dispatch({
            type: GET_ERRORS,
            payload: "Check your Email for Reset Link"
        });
         
    })
    .catch(err => {
        console.log("asfsdgfd",err.response.data.error);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data.error
        });
    });
}


export const DeleteUser = (user) => dispatch => {
axios
.post('http://localhost:8000/api/delete?', user )
.then(res => {
    dispatch({
        type: RESET_ERRORS,
        payload: ""
    });
    dispatch({
        type: DELETE_USER,
        payload: res.data.table
    })
})
.catch(err => {
 dispatch({
    type: GET_ERRORS,
    payload: null
})
});
}

export const UpdateUser = (user) => dispatch => {
axios
.post('http://localhost:8000/api/update?',  user )
.then(res => {
 dispatch({
    type: RESET_ERRORS,
    payload: ""
});
 dispatch({
    type: DELETE_USER,
    payload: res.data.table
})
})
.catch(err => {
 dispatch({
    type: GET_ERRORS,
    payload: err.response.data.error
})
});
}


export const Search = (user) => dispatch => {

    axios
    .get('http://localhost:8000/api/userlist?', { params: user})
    .then(res => {
       dispatch({
        type: RESET_ERRORS,
        payload: ""
    });
       const searchResult = res.data.table.data;
       const info = res.data.table;
       console.log("During Action", info);
       localStorage.setItem('Results', searchResult);
       dispatch(setCurrentResult(searchResult));
       dispatch(setCurrentInfo(info));
   })
    .catch(err => console.log(err));
}


export const paginatePageReset = (pageData) => dispatch => {

 dispatch({
    type: PAGE_RESET,
    payload: pageData
});


}

export const paginatePageNext = (pageData) => dispatch => {

 dispatch({
    type: PAGE_NEXT,
    payload: pageData
});
   dispatch({
    type: RESET_LOADER,
    payload: true
});
}


export const paginatePagePrev = (pageData) => dispatch => {

 dispatch({
    type: PAGE_PREV,
    payload: pageData
});
   dispatch({
    type: RESET_LOADER,
    payload: true
});
}

export const setCurrentResult = (searchResult) => {
    return {
        type: SEARCH,
        payload: searchResult
    }
}

export const setCurrentInfo = (info) => {
    return {
        type: INFO,
        payload: info
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');  
    localStorage.removeItem('role');    
    history.push('/login');

    // disspatch(setCurrentUser({}));
    dispatch({
        type: RESET_ERRORS,
        payload: ""
    });
    dispatch({
        type: DELETE_USER,
        payload: ""
    })
    
}


