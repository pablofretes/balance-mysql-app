import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import './balanceForm.css';
import * as yup from 'yup';
import { changeMovement, retrieveBalance } from '../../reducers/movementsReducer';

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

const UpdateForm = ({ movementToChange }) => {
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
  // If we are editing a movement we want the initial values to be the original values
  // Otherwise we want some default values

  let typeFromOrigin = movementToChange.type === 'positive' ? 'Ingreso' : 'Egreso';
  let amountFromOrigin = movementToChange.amount.toString();

  const initialValues = {
    concept: movementToChange.concept,
    typeOfMovement: typeFromOrigin,
    amount: amountFromOrigin,
  };

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return(
		<Container className='balance-form'>
			<Form onSubmit={formik.handleSubmit}>
        {movementToChange !== null && <h1>Cambiar</h1>}
				<Form.Group controlId="formBasicText" className="mb-3">
					<Form.Label column sm="2">Concepto</Form.Label>
					<Form.Select 
						type='select'
						name='concept'
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

export default UpdateForm;