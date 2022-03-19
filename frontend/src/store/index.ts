import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import {articlesReducer} from './articles';
import {pinnedReducer} from './pinnedArticle';

const rootReducer = combineReducers({
  session: sessionReducer,
  news : articlesReducer,
  pins: pinnedReducer
});

let enhancer:any;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState:any) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
