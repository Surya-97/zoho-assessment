import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

function configureStoreProd(initialState) {
  const middlewares = [thunk];
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

const configureStore = configureStoreProd;
export default configureStore;
