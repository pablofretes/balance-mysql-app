import '@testing-library/jest-dom/extend-expect';
import updatedMovementReducer from "../updatedMovementReducer";

const movement = {
  concept: 'transporte',
  type: 'negative',
  amount: 2000,
  id: 3,
};

describe('updated movement reducer', () => {
  it('should return the initial state', () => {
    expect(updatedMovementReducer(undefined, {})).toEqual(null);
  });

  it('should handle SELECT_MOVEMENT', () => {
    const action = {
      type: 'SELECT_MOVEMENT',
      payload: movement
    };

    expect(updatedMovementReducer({}, action)).toEqual(movement);
  });

  it('should handle UPDATED_MOVEMENT_NULL', () => {
    const action = {
      type: 'UPDATED_MOVEMENT_NULL'
    };

    expect(updatedMovementReducer(movement, action)).toEqual(null);
  });
})