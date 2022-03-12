import { getBalance, postBalance, postNewMovement, deleteMovement, updateMovement } from "../services/movementsServices";

const initialState = {
  balance: {},
  moves: [],
};

const movementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_MOVEMENTS":{
      const stateBalanceMoves = {
        balance: action.payload.balance,
        moves: action.payload.moves
      }
      return stateBalanceMoves;
    };
    case "POST_BALANCE":{
      const stateBalanceMoves = {
        balance: action.payload.balance,
        moves: action.payload.moves
      };
      return stateBalanceMoves
    };
    case "UPDATE_BALANCE":{
      const newMoves = [...state.moves, action.payload]
      const stateBalanceMoves = {
        balance: state.balance,
        moves: newMoves
      };
      return stateBalanceMoves;
    };
    case "UPDATE_MOVEMENT": {
      const movementToUpdate = state.moves.find(move => move.id === action.payload.id);
      const newMovement = {
        ...movementToUpdate,
        concept: action.payload.concept,
        amount: action.payload.amount,
        type: action.payload.type
      };

      const newMoves = state.moves.map(move => move.id === action.payload.id ? newMovement : move);

      const stateBalanceMoves = {
        balance: state.balance,
        moves: newMoves,
      };

      return stateBalanceMoves;
    };
    case "DELETE_MOVEMENT":{
      const newMoves = state.moves.filter(move => move.id !== action.payload.id);

      const stateBalanceMoves = {
        balance: state.balance,
        moves: newMoves,
      };

      return stateBalanceMoves;
    }
    default: 
      return state;
  }
};

export const retrieveBalance = (id) => {
  return async dispatch => {
    try {
      const movements = await getBalance(id);
      dispatch({
        type: "INIT_MOVEMENTS",
        payload: movements,
      });
    } catch (error) {
      console.error(error);
    }
  }

};

export const postNewBalance = (id, newBalance) => {
  return async dispatch => {
    try {
      const balance = await postBalance(id, newBalance);
      dispatch({
        type: "POST_BALANCE",
        payload: balance,
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const changeBalance = (id, newBalance) => {
  return async dispatch => {
    try {
      const balance = await postNewMovement(id, newBalance);
      dispatch({
        type: "UPDATE_BALANCE",
        payload: balance
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const removeMovement = (movement) => {
  return async dispatch => {
    await deleteMovement(movement.id);
    dispatch({
      type: "DELETE_MOVEMENT",
      payload: movement,
    });
  }
};

export const changeMovement = (content) => {
  return async dispatch => {
    const updatedMovement = await updateMovement(content);
    dispatch({
      type: "UPDATE_MOVEMENT",
      payload: updatedMovement,
    });
  }
};

export default movementsReducer;