import React, { useState } from 'react';
import BalanceForm from './BalanceForm';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { postNewBalance, retrieveBalance } from '../../../reducers/movementsReducer';
import '../../balance-form/balanceForm.css';

const BalanceSubmit = () => {
  const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
  const user = useSelector(state => state.login);
	const MySwal = withReactContent(Swal);
	let navigate = useNavigate();

	const handleSubmit = async (event) => {
		setDisabled(true);
    
    const newMovement = {
      amount: Number(event.amount),
    };

		try {
      if(user){
        dispatch(postNewBalance(user.userId, newMovement));
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
    <BalanceForm onSubmit={handleSubmit} disabled={disabled}/>
  )
};

export default BalanceSubmit;