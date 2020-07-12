import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import history from '../history';

import rootSaga from './saga';
import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();


const getEnhancers = () => {
  return applyMiddleware(sagaMiddleware, routerMiddleware(history));
};

const persistConfig = {
  key: 'root',
  whitelist: ['app'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(getEnhancers()));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type IGlobalState = ReturnType<typeof rootReducer>;

export { store, persistor };
