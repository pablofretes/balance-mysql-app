import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeMovement, retrieveBalance } from '../../reducers/movementsReducer';
import { selectMovementToUpdate } from '../../reducers/updatedMovementReducer';
import { useNavigate } from 'react-router';
import './card.css';

const Card = ({ title, text, number, created, updated, moveId, movement }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.login);
  const navigate = useNavigate();

  const deleteOneMovement = (movement) => {
    const result = window.confirm('¿Estás seguro/a de querer eliminar este movimiento?');
    if(result){
      dispatch(removeMovement(movement));
      dispatch(retrieveBalance(loggedUser.userId));
    }
  };

  const selectMove = (id) => {
    dispatch(selectMovementToUpdate(id));
    navigate(`/api/movements/movement/${id}`)
  };
  return (
      <div className="card">
        <h2 className='card-h2' data-testid="card-title">{title === "negative" ? "Egreso" : title === "positive" ? "Ingreso" : title}</h2>
        <p className="card-text" data-testid="card-text">{title === "Balance" ? `$ ${text}` : text}</p>
        {number !== null && (
          <p className="card-text" data-testid="card-money">
            $ {number}
          </p>
        )}
        <div className="dates-card">
          {created !== undefined && <p className="card-text" data-testid="card-created">Creado: {created.substr(0,10)}</p>}
          {updated !== created && <p className="card-text" data-testid="card-updated">Último cambio: {updated.substr(0,10)}</p>}
        </div>
        {number !== null && (
          <div className='buttons-card' data-testid="card-buttons">
            <button className='btn btn-warning' onClick={() => selectMove(moveId)} data-testid="card-update">Cambiar</button>
            <button className='btn btn-danger' onClick={() => deleteOneMovement(movement)} data-testid="card-delete">Eliminar</button>
          </div>
        )}
      </div>
  )
};

export default Card;