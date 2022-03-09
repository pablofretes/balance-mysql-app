import { registerUser } from '../services/registerServices';

const usersReducer = (state = null, action) => {
	switch (action.type) {
		case "NEW_USER": 
			return action.payload;
		default:
			return state;
	};
}

export const newUser = (credentials) => {
	return async dispatch => {
		try {
			const userLog = await registerUser(credentials);
			window.localStorage.setItem('user-balance-token', JSON.stringify(userLog));
			dispatch({
				type: "NEW_USER",
				payload: userLog
			});
      dispatch({
        type: "LOG_IN",
        payload: userLog
      })
		} catch (error) {
			console.log(error);
			dispatch({
				type: "LOG_OUT"
			});
		}
	}
}

export default usersReducer;