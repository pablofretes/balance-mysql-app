import loginReducer from '../loginReducer';
import '@testing-library/jest-dom/extend-expect';

const user = {
    userId: 1,
    token: 'testToken',
};

const newUser = {
    userId: 2,
    token: 'testToken1',
};

describe('login reducer', () => {

    it('should return the initial state', () => {
        expect(loginReducer(undefined, {})).toEqual(null);
    });

    it('should handle LOG_IN', () => {
        const action = {
            type: 'LOG_IN',
            payload: user,
        };

        expect(loginReducer(null, action)).toEqual(user);
    });

    it('should handle LOG_OUT', () => {
        const action = {
            type: 'LOG_OUT',
        };

        expect(loginReducer(user, action)).toEqual(null);
    });

    it('should handle LOGGED_IN', () => {
        const action = {
            type: 'LOGGED_IN',
            payload: newUser
        };

        expect(loginReducer({}, action)).toEqual(newUser);
    });
});