
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore, combineReducers } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
    combineReducers({
        form: formReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);
