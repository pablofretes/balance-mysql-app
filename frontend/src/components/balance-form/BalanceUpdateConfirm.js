import React from 'react';
import { useSelector } from 'react-redux';
import BalanceUpdate from './BalanceUpdate';

const UpdateConfirm = () => {
  const balanceToChange = useSelector(state => state.updated);
  console.log(balanceToChange)

  return (
    <div>
      {balanceToChange == undefined ? (
        <h1>Loading...</h1>
      ) : (
        <BalanceUpdate balanceToChange={balanceToChange}/>
      )}
    </div>
  );
};

export default UpdateConfirm;