import { getBalance, postBalance, updateBalance } from "../services/movementsServices";

const movementsReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_MOVEMENTS": 
      return action.payload;
    case "POST_BALANCE":
      return action.payload;
    case "UPDATE_BALANCE":
      return action.payload;
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
      const balance = await updateBalance(id, newBalance);
      dispatch({
        type: "UPDATE_BALANCE",
        payload: balance
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default movementsReducer;