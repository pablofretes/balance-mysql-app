import React from 'react';
import { useFormik } from 'formik';
import { Form, Container } from 'react-bootstrap';
import '../balanceForm.css';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  concept: yup
    .string()
    .required('Este campo es obligatorio'),
  typeOfMovement: yup
    .string()
    .required('Este campo es obligatorio'),
  amount: yup
    .string()
    .required('Este campo es obligatorio'),
});

const MovementForm = ({ onSubmit, disabled }) => {
	const formik = useFormik({
		initialValues: {
      concept: 'Comida',
      typeOfMovement: 'Ingreso',
      amount: '0',
    },
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return(
		<Container className='balance-form'>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group controlId="formBasicText" className="mb-3">
					<Form.Label column sm="2">Concepto</Form.Label>
					<Form.Select 
						type='select'
						name='concept'
            data-testid='concept-movement-form-input'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.concept}
					>
            <option value='Comida'>Comida</option>
            <option value='Impuestos'>Impuestos</option>
            <option value='Ocio'>Ocio</option>
            <option value='Sueldo'>Sueldo</option>
            <option value='Transporte'>Transporte</option>
            <option value='Medicación'>Medicación</option>
            <option value='Psicólogo'>Psicólogo</option>
            <option value='Obra Social'>Obra Social</option>
          </Form.Select>
					{formik.touched.concept && formik.errors.concept ? <div className='errors'>{formik.errors.concept}</div> : null}
				</Form.Group>
				<Form.Group controlId="formBasicText" className="mb-3">
					<Form.Label column sm="2">Tipo</Form.Label>
					<Form.Select 
						type='select'
						name='typeOfMovement'
            data-testid='type-movement-form-input'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.typeOfMovement}
					>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </Form.Select>
					{formik.touched.typeOfMovement && formik.errors.typeOfMovement ? <div className='errors'>{formik.errors.typeOfMovement}</div> : null}
				</Form.Group>
        <Form.Group controlId="formBasicText" className="mb-3">
					<Form.Label column sm="2">Monto</Form.Label>
					<Form.Control 
						type='text'
						name='amount'
            data-testid='amount-movement-form-input'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.amount}
					/>
					{formik.touched.amount && formik.errors.amount ? <div className='errors'>{formik.errors.amount}</div> : null}
				</Form.Group>
				<button type='submit' className="btn btn-primary" disabled={disabled} style={{ marginBottom: 7 }}>Enviar</button>
			</Form>
		</Container>
	)
}

export default MovementForm;