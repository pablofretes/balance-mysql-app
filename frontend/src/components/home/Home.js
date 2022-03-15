import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BalanceForm from '../balance-form/BalanceForm';
import { removeMovement, retrieveBalance } from '../../reducers/movementsReducer';
import Card from '../balance-card/Card';
import { useNavigate } from 'react-router';
import './home.css';
import { selectMovementToUpdate, selectBalanceToUpdate } from '../../reducers/updatedMovementReducer';

const Home = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.login);
  const movements = useSelector(state => state.movements);
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

  const selectBalance = (id) => {
    dispatch(selectBalanceToUpdate(id));
    navigate(`/api/balance/update/${id}`);
  }

  const addMovement = (id) => {
    if(typeof id === 'number'){
      navigate(`/api/movements/add/${id}`);
    };
  }

  return (
    <div>
      {loggedUser == null ? <h1 className='home-h1'>Debe estar logeado para usar esta app</h1> : (
        <div>
          {movements == undefined || movements.balance == undefined || Object.keys(movements.balance).length === 0 ? (
            <div>
              <h2 className='home-h2'>Por Favor Introduzca Un Balance Inicial</h2>
              <BalanceForm />
            </div>
          ) : (
            <div >
              {movements != undefined && movements.balance != undefined && movements.balance.total != undefined && (
                <div className='container'>
                  <Card title="Balance" text={movements.balance.total} number={null}/>
                  <div className='buttons-card'>
                          <button className='btn btn-warning' onClick={() => selectBalance(movements.balance.fk_user)}>Cambiar</button>
                  </div>
                  <div className='container-no-shadow'>
                    <p>Últimos movimientos</p>
                    {movements.moves.map((m) => (
                      <div key={m.id}>
                        <Card title={m.type} text={m.concept} number={m.amount} moveId={m.id} created={m.createdAt} updated={m.updatedAt} />
                        <div className='buttons-card'>
                          <button className='btn btn-warning' onClick={() => selectMove(m.id)}>Cambiar</button>
                          <button className='btn btn-danger' onClick={() => deleteOneMovement(m)}>Eliminar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                    <p>Agregar un movimiento de dinero</p>
                  <button type="button" className="btn btn-secondary" onClick={() => addMovement(movements.balance["fk_user"])}>
                    Agregar
                  </button>
              </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;