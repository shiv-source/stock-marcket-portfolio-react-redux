import { createStore , combineReducers , applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Stock } from './reducers/stocks';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            stock : Stock,
        }),
        applyMiddleware(thunk, logger)

    );

    return store;
}
