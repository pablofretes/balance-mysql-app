import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { newUser } from '../../reducers/registerReducer';
import './register.css';
import { newLogin } from '../../reducers/loginReducer';

const validate = values => {
	const errors = {};
	if(!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
		errors.email = 'Invalid Email';
	}

  if(!values.username){
		errors.username = 'Required';
	}

	if(!values.password){
		errors.password = 'Required';
	}

  if(values.password !== values.passwordConfirmation){
		errors.password = 'Passwords must match';
	}
} 

const Register = () => {
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

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
      passwordConfirmation: '',
		},
		validate,
		onSubmit: onSubmit
	});

	return(
		<Container className='register-form' sm="6">
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group controlId="formBasicEmail" className="mb-3">
					<Form.Label column sm="2">Email</Form.Label>
					<Form.Control 
						type='email'
						name='email'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
				</Form.Group>
        <Form.Group className="mb-3">
					<Form.Label column sm="2">Username</Form.Label>
					<Form.Control 
						type='text'
						name='username'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
					/>
					{formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
				</Form.Group>
				<Form.Group controlId="formBasicPassword" className="mb-3">
					<Form.Label column sm="2">Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
				</Form.Group>
        <Form.Group className="mb-3">
					<Form.Label column sm="2">Password Confirmation</Form.Label>
					<Form.Control
						type='password'
						name='passwordConfirmation'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.passwordConfirmation}
					/>
					{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
				</Form.Group>
				<button type='submit' className="btn btn-primary" disabled={disabled} style={{ marginBottom: 7 }}>Registrarse</button>
			</Form>
		</Container>
	)
}

export default Register;