import React, { useState } from 'react';
import Login from './Login';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { newLogin } from '../../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';

const LoginSubmit = () => {
  const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
	const MySwal = withReactContent(Swal);
	let navigate = useNavigate();
	const onSubmit = async (event) => {
		setDisabled(true)
		const credentials = {
			email: event.email,
			password: event.password,
		};
		try {
			dispatch(newLogin(credentials));
			navigate('/');
		} catch (error) {
			await MySwal.fire({
				title: 'Error',
				icon: 'error',
				text: 'Hubo un problema entrando',
			});
			window.localStorage.removeItem('user-balance-token');
		}
		setDisabled(false)
	}

  return (
    <Login onSubmit={onSubmit} disabled={disabled} />
  )
}

export default LoginSubmit;