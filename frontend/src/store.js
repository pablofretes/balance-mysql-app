import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from './reducers/loginReducer';
import usersReducer from './reducers/registerReducer';
import movementsReducer from './reducers/movementsReducer';
import updatedMovementReducer from './reducers/updatedMovementReducer';

const reducer = combineReducers({
  login: loginReducer,
  users: usersReducer,
  movements: movementsReducer,
  updated: updatedMovementReducer,
});

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;