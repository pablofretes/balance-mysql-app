import React from 'react';
import { useFormik } from 'formik';
import { Form, Container } from 'react-bootstrap';
import './login.css';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor incluir un formato de email aceptable').required('Este campo es obligatorio'),
  password: yup
    .string()
    .required('Este campo es obligatorio'),
});

const Login = ({ onSubmit, disabled }) => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return(
		<Container className='login-form'>
			<Form onSubmit={formik.handleSubmit}>
        <h1 className='login-h1'>Entrar</h1>
				<Form.Group controlId="formBasicEmail" className="mb-3">
					<Form.Label column sm="2">Email</Form.Label>
					<Form.Control 
						type='email'
						name='email'
            data-testid='login-form-email'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}
				</Form.Group>
				<Form.Group controlId="formBasicPassword" className="mb-3">
					<Form.Label column sm="2">Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
            data-testid='login-form-password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}
				</Form.Group>
				<button type='submit' className="btn btn-primary" disabled={disabled} style={{ marginBottom: 7 }} data-testid="login-form-button">Entrar</button>
			</Form>
		</Container>
	)
}

export default Login;