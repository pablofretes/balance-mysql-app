import { login } from '../services/loginServices';
import { setToken } from '../services/movementsServices';

const loginReducer = (state = null, action) => {
	switch (action.type) {
		case "LOG_IN": 
			return action.payload;
		case "LOGGED_IN":
			return action.payload;
		case "LOG_OUT":
			return null;
		default:
			return state;
	};
}

export const existingLogin = () => {
	const loggedUserJSON = window.localStorage.getItem('user-balance-token');
	if(loggedUserJSON){
		const userLog = JSON.parse(loggedUserJSON);
    setToken(userLog.token);
    console.log(userLog.token)
		return {
			type: "LOGGED_IN",
			payload: userLog,
		};
	};

	return { type: "LOG_OUT" };
}

export const removeLoggedUser = () => {
	window.localStorage.removeItem('user-balance-token');
	return { type: "LOG_OUT" };
}

export const newLogin = (credentials) => {
	return async dispatch => {
		try {
			const userLog = await login(credentials);
      console.log(userLog)
			window.localStorage.setItem('user-balance-token', JSON.stringify(userLog));
      setToken(userLog.token);
      console.log(userLog.token)
			dispatch({
				type: "LOG_IN",
				payload: userLog,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: "LOG_OUT"
			});
		}
	}
}

export default loginReducer;