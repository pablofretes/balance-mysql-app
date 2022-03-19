import '@testing-library/jest-dom/extend-expect';
import movementsReducer from '../movementsReducer';

//test movements

const allMovements = [
  {
    concept: 'impuesto',
    type: 'negative',
    amount: 500,
    id: 4,
  },
  {
    concept: 'sueldo',
    type: 'positive',
    amount: 50000,
    id: 2,
  },
];

const movement = {
  concept: 'transporte',
  type: 'negative',
  amount: 2000,
  id: 3,
};

const updatedMovement = {
  concept: 'transporte',
  type: 'negative',
  amount: 2800,
  id: 3,
};

const newAllMovements = [...allMovements, movement];

const updatedMovements = [...allMovements, updatedMovement];

//test balances

const balance = {
  total: 55500,
  initialAmount: 5000,
};

//test states

const state = {
  balance: balance,
  moves: allMovements
};

const newState = {
  balance: balance,
  moves: newAllMovements
};

const initialState = {
  balance: {},
  moves: [],
};

describe('movements reducer', () => {

  it('should return the initial state', () => {
    expect(movementsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle INIT_MOVEMENTS', () => {
    const action = {
      type: 'INIT_MOVEMENTS',
      payload: state
    };

    expect(movementsReducer({}, action)).toEqual(state);
  });

  it('should handle POST_MOVEMENT', () => {
    const action = {
      type: 'POST_MOVEMENT',
      payload: movement
    };

    expect(movementsReducer(state, action)).toEqual(newState);
  });

  it('should handle DELETE_MOVEMENT', () => {
    const action = {
      type: 'DELETE_MOVEMENT',
      payload: movement
    };

    expect(movementsReducer(newState, action)).toEqual(state);
  });

  it('should handle UPDATE_MOVEMENT', () => {
    const updatedStateMovement = {
      balance: balance,
      moves: updatedMovements
    };

    const action = {
      type: 'UPDATE_MOVEMENT',
      payload: updatedMovement
    };

    expect(movementsReducer(newState, action)).toEqual(updatedStateMovement);
  });

  it('should handle UPDATE_BALANCE', () => {
    const updatedBalance = {
      total: 60000,
      initialAmount: 9500
    };
    
    const updatedStateBalance = {
      balance: updatedBalance,
      moves: allMovements
    };

    const action = {
      type: 'UPDATE_BALANCE',
      payload: { balance: updatedBalance }
    };

    expect(movementsReducer(state, action)).toEqual(updatedStateBalance);
  });

  it('should handle POST_BALANCE', () => {
    const postBalance = {
      initialAmount: 1000
    };
    
    const stateAfterBalancePost = {
      balance: postBalance,
      moves: []
    };

    const action = {
      type: 'POST_BALANCE',
      payload: { balance: postBalance, moves: [] }
    };

    expect(movementsReducer(initialState, action)).toEqual(stateAfterBalancePost);
  });
});