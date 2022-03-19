import React from 'react';
import { useFormik } from 'formik';
import { Form, Container } from 'react-bootstrap';
import '../balanceForm.css';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  amount: yup
    .string()
    .required('Este campo es obligatorio'),
});

const BalanceForm = ({ onSubmit, disabled }) => {
	const formik = useFormik({
		initialValues: {
      amount: '0',
    },
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return(
		<Container className='balance-form-short'>
			<Form onSubmit={formik.handleSubmit} data-testid='balance-form'>
        <Form.Group controlId="formBasicText" className="mb-3">
					<Form.Label column sm="2">Monto</Form.Label>
					<Form.Control 
						type='text'
						name='amount'
            data-testid='balance-form-input'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.amount}
					/>
					{formik.touched.amount && formik.errors.amount ? <div className='errors'>{formik.errors.amount}</div> : null}
				</Form.Group>
				<button type='submit' className="btn btn-primary" disabled={disabled} style={{ marginBottom: 7 }} data-testid="submit-button">Enviar</button>
			</Form>
		</Container>
	)
}

export default BalanceForm;