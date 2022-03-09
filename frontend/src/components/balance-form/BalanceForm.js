import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';

const validate = values => {
	const errors = {};
	if(!values.concept) {
		errors.concept = 'Concepto es Obligatorio';
	}

	if(!values.typemoney){
		errors.typemoney = 'Tipo es Obligatorio';
	}

  if(!values.amount){
		errors.amount = 'Monto es Obligatorio';
	}
} 

const BalanceForm = ({ dispatchFunction }) => {
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
  const user = useSelector(state => state.login);
	const MySwal = withReactContent(Swal);
	let navigate = useNavigate();

	const onSubmit = async (event) => {
		setDisabled(true)
    console.log(event)
    const typeMoney = event.typemoney === 'Ingreso' ? 'positive' : 'negative';
    console.log(event.typemoney, typeMoney, 'sdasdads')
    console.log(event.concept)
		const newMovement = {
			concept: event.concept,
			type: typeMoney,
      amount: Number(event.amount),
		};
		try {
      if(user){
        dispatch(dispatchFunction(user.user.id, newMovement));
        navigate('/');
      }
		} catch (error) {
			await MySwal.fire({
				title: 'Error',
				icon: 'error',
				text: 'Something went wrong!',
			});
			window.localStorage.removeItem('user-balance-token');
		}
		setDisabled(false);
	}

	const formik = useFormik({
		initialValues: {
			concept: 'Comida',
			typemoney: 'Ingreso',
      amount: '',
		},
		validate,
		onSubmit: onSubmit
	});

	return(
		<Container className='login-form'>
			<Form onSubmit={formik.handleSubmit}>
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
					{formik.touched.concept && formik.errors.concept ? <div>{formik.errors.concept}</div> : null}
				</Form.Group>
				<Form.Group controlId="formBasicText" className="mb-3">
					<Form.Label column sm="2">Tipo</Form.Label>
					<Form.Select 
						type='select'
						name='typemoney'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.typemoney}
					>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </Form.Select>
					{formik.touched.typemoney && formik.errors.typemoney ? <div>{formik.errors.typemoney}</div> : null}
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
					{formik.touched.amount && formik.errors.amount ? <div>{formik.errors.amount}</div> : null}
				</Form.Group>
				<button type='submit' className="btn btn-primary" disabled={disabled} style={{ marginBottom: 7 }}>Enviar</button>
			</Form>
		</Container>
	)
}

export default BalanceForm;