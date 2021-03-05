import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import ticketReducer from './reducers/TicketReducer';
import statusReducer from './ducks/statusDuck';
import userReducer from './ducks/userDuck';

export const middlewares = [thunk, logger];

export const createStoreWithMiddlewares = applyMiddleware(...middlewares)(
  createStore
);

export const rootReducer = combineReducers({
  user: userReducer,
  tickets: ticketReducer,
  statuses: statusReducer
});

const store = createStoreWithMiddlewares(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
