import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { newLogin } from '../../reducers/loginReducer';
import './login.css';

const validate = values => {
	const errors = {};
	if(!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
		errors.email = 'Invalid Email';
	}

	if(!values.password){
		errors.password = 'Required';
	}
} 

const Login = () => {
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
		},
		validate,
		onSubmit: onSubmit
	});

	return(
		<Container className='login-form'>
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
				<button type='submit' className="btn btn-primary" disabled={disabled} style={{ marginBottom: 7 }}>Entrar</button>
			</Form>
		</Container>
	)
}

export default Login;