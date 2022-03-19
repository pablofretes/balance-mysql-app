import React, { useState } from 'react';
import UpdateForm from './UpdateMovement';
import { changeMovement, retrieveBalance } from '../../../reducers/movementsReducer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateConfirm = () => {
  const movementToChange = useSelector(state => state.updated);
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
      id: movementToChange.id,
    };

		try {
      if(user){
        dispatch(changeMovement(newMovement));
        navigate('/');
        dispatch(retrieveBalance(user.userId));
      }
		} catch (error) {
			await MySwal.fire({
				title: 'Error',
				icon: 'error',
				text: error,
			});
		}
		setDisabled(false);
	}

  return (
    <div>
      {movementToChange == undefined ? (
        <h1>Loading...</h1>
      ) : (
        <UpdateForm movementToChange={movementToChange} onSubmit={onSubmit} disabled={disabled} />
      )}
    </div>
  );
};

export default UpdateConfirm;