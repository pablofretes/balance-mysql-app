import React, { useState } from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { newUser } from '../../reducers/registerReducer';
import { newLogin } from '../../reducers/loginReducer';

const RegisterSubmit = () => {
  const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
	const MySwal = withReactContent(Swal);
	let navigate = useNavigate();
	const onSubmit = async (event) => {
		setDisabled(true)
		const credentials = {
      username: event.username,
			email: event.email,
			password: event.password,
		};
		try {
			await dispatch(newUser(credentials));
      const login = { email: credentials.email, password: credentials.password };
      dispatch(newLogin(login));
			navigate('/');
		} catch (error) {
			await MySwal.fire({
				title: 'Error',
				icon: 'error',
				text: 'Something went wrong!',
			});
			window.localStorage.removeItem('user-balance-token');
		}
		setDisabled(false)
	}

  return (
    <Register onSubmit={onSubmit} disabled={disabled} />
  )
}

export default RegisterSubmit;