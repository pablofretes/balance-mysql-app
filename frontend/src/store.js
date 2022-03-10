import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from './reducers/loginReducer';
import usersReducer from './reducers/registerReducer';
import movementsReducer from './reducers/movementsReducer';

const reducer = combineReducers({
  login: loginReducer,
  users: usersReducer,
  movements: movementsReducer,
});

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store;