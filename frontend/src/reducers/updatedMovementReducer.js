import { getMovement } from '../services/movementsServices';

const updatedMovementReducer = (state = null, action) => {
  switch (action.type) {
    case "SELECT_MOVEMENT": 
      return action.payload;
    case "UPDATED_MOVEMENT_NULL":
      return null;
    default:
      return state;
  }
};

export const selectMovementToUpdate = (id) => {
  return async dispatch => {
    try {
      const movement = await getMovement(id);
      dispatch({
        type: "SELECT_MOVEMENT",
        payload: movement
      });
    } catch (error) {
      console.error(error)
    }
  };
};

export const updatedMovementToNull = () => {
  return { type: "UPDATED_MOVEMENT_NULL" };
};

export default updatedMovementReducer;