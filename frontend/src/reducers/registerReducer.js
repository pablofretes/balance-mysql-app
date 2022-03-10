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
			dispatch({
				type: "NEW_USER",
				payload: userLog
			});
		} catch (error) {
			console.error(error);
			dispatch({
				type: "LOG_OUT"
			});
		}
	}
}

export default usersReducer;