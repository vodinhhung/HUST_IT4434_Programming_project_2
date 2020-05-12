import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const initStore = (initState = {}) => {
    const store = createStore(
        reducers,   
        initState,
        compose(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(thunkMiddleware),
            typeof window !== 'undefined' &&
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
                : f => f,
        ),
    );

    return store;
};