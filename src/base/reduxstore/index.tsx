import { legacy_createStore as createStore, combineReducers } from 'redux';
//import {createStore, combineReducers} from 'redux';
import jwttokenreducer from './reducers/jwttoken';
import showToastreducer from './reducers/showToast';
const reducers = combineReducers({
    jwttoken: jwttokenreducer,
    showToast: showToastreducer
});

const store = createStore(reducers);

export default store;
