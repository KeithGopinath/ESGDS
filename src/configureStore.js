import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootWatchers from './sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});
export default function configureStore(preloadedState = {}) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
  );
  sagaMiddleware.run(rootWatchers);
  return store;
}

