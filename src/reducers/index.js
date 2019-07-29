import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import paginationReducer from './paginationReducer';
import infoReducer from './infoReducer';
import deleteReducer from './deleteReducer';
import pieDataReducer from './pieDataReducer';
import loaderReducer from './loaderReducer';
import newred from './new';
import dataLoadingCompleteReducer from './dataLoadingCompleteReducer'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    result: searchReducer,
    paginationPage: paginationReducer,
    resultInfo: infoReducer,
    deleteInfo: deleteReducer,
    pieData: pieDataReducer,
    result1: newred,
    dataLoading: dataLoadingCompleteReducer,
    loader: loaderReducer,
});