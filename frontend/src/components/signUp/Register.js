import React from 'react';
import './register.css';
import { Form, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor incluir un formato de email aceptable').required('Este campo es obligatorio'),
  username: yup
    .string()
    .required('Este campo es obligatorio'),
  password: yup
    .string()
    .required('Este campo es obligatorio'),
  passwordConfirmation: yup
    .string()
    .required('Este campo es obligatorio')
    .oneOf([yup.ref('password'), null], 'Password must be the same!'),
});

const Register = ({ onSubmit, disabled }) => {
	const formik = useFormik({
		initialValues: {
			email: '',
      username: '',
			password: '',
      passwordConfirmation: '',
		},
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return(
		<Container className='register-form' sm="6">
			<Form onSubmit={formik.handleSubmit}>
        <h1 className='register-h1'>Registrarse</h1>
				<Form.Group controlId="formBasicEmail" className="mb-3">
					<Form.Label column sm="2">Email</Form.Label>
					<Form.Control 
						type='email'
						name='email'
            data-testid='register-form-email'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}
				</Form.Group>
        <Form.Group className="mb-3">
					<Form.Label column sm="2">Username</Form.Label>
					<Form.Control 
						type='text'
						name='username'
            data-testid='register-form-username'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
					/>
					{formik.touched.username && formik.errors.username ? <div className='errors'>{formik.errors.username}</div> : null}
				</Form.Group>
				<Form.Group controlId="formBasicPassword" className="mb-3">
					<Form.Label column sm="2">Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
            data-testid='register-form-password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}
				</Form.Group>
        <Form.Group className="mb-3">
					<Form.Label column sm="2">Password Confirmation</Form.Label>
					<Form.Control
						type='password'
						name='passwordConfirmation'
            data-testid='register-form-password-confirmation'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.passwordConfirmation}
					/>
					{formik.touched.password && formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}
				</Form.Group>
				<button type='submit' className="btn btn-primary" disabled={disabled} style={{ marginBottom: 7 }} data-testid='register-form-button'>Registrarse</button>
			</Form>
		</Container>
	)
}

export default Register;