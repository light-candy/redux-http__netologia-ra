import { createStore, combineReducers } from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceEditReducer from '../reducers/serviceEdit';

const reducer = combineReducers({
    serviceList: serviceListReducer,
    serviceEdit: serviceEditReducer
});

const store = createStore(reducer);

export default store;
