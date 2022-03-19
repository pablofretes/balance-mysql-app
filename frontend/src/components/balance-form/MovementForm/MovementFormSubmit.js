import React, { useState } from 'react';
import MovementForm from './MovementForm';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { newMovement as postNewMovement, retrieveBalance } from '../../../reducers/movementsReducer';
import { useNavigate } from 'react-router-dom';

const MovementFormSubmit = () => {
  const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
  const user = useSelector(state => state.login);
	const MySwal = withReactContent(Swal);
	let navigate = useNavigate();

	const onSubmit = async (event) => {
		setDisabled(true);
    const typeMoney = event.typeOfMovement === 'Ingreso' ? 'positive' : 'negative';
    
    const newMovement = {
      concept: event.concept,
      type: typeMoney,
      amount: Number(event.amount),
    };

		try {
      if(user){
        await dispatch(postNewMovement(user.userId, newMovement));
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
    <MovementForm onSubmit={onSubmit} disabled={disabled} />
  );
};

export default MovementFormSubmit;