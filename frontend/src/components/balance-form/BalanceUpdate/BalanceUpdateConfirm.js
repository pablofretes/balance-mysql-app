import React, { useState }  from 'react';
import BalanceUpdate from './BalanceUpdate';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { changeBalance, retrieveBalance } from '../../../reducers/movementsReducer';
import { useNavigate } from 'react-router-dom';

const BalanceUpdateSubmit = () => {
  const balanceToChange = useSelector(state => state.updated);
  const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
  const user = useSelector(state => state.login);
	const MySwal = withReactContent(Swal);
	let navigate = useNavigate();

	const onSubmit = async (event) => {
		setDisabled(true);
    
    const newMovement = {
      amount: Number(event.amount),
    };

		try {
      if(user){
        dispatch(changeBalance(user.userId, newMovement));
        navigate('/');
        dispatch(retrieveBalance(user.userId));
      }
		} catch (error) {
			await MySwal.fire({
				title: 'Error',
				icon: 'error',
				text: 'Hubo un error',
			});
		}
		setDisabled(false);
	}


  return (
    <div>
      {balanceToChange == undefined ? (
        <h1>Loading...</h1>
      ) : (
        <BalanceUpdate balanceToChange={balanceToChange} onSubmit={onSubmit} disabled={disabled}/>
      )}
    </div>
  );
};

export default BalanceUpdateSubmit;