import React from 'react';
import { useSelector } from 'react-redux';
import UpdateForm from './UpdateBalance';

const UpdateConfirm = () => {
  const movementToChange = useSelector(state => state.updated);

  return (
    <div>
      {movementToChange == undefined ? (
        <h1>Loading...</h1>
      ) : (
        <UpdateForm movementToChange={movementToChange}/>
      )}
    </div>
  );
};

export default UpdateConfirm;