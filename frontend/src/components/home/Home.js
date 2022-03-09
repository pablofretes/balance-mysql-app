import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BalanceForm from '../balance-form/BalanceForm';
import { changeBalance, postNewBalance } from '../../reducers/movementsReducer';
import Card from '../balance-card/Card';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.login);
  const movements = useSelector(state => state.movements);
  console.log(movements)

  return (
    <div>
      {loggedUser == null ? <h1>Debe estar logeado para usar esta app</h1> : (
        <div>
          {movements.length === 0 || movements.balance.total === null ? (
            <Container>
              <h1>Por Favor Introduzca Un Monto</h1>
              <BalanceForm dispatchFunction={postNewBalance}/>
            </Container>
          ) : (
            <div>
              {movements.length !== 0 && movements.balance.total !== undefined && (
                <Container>
                <Card title="Balance" text={movements.balance.total} number={null}/>
                <Container>
                  Últimos movimientos
                  {movements.moves.map((m) => (
                    <Card title={m.type} text={m.concept} number={m.amount} key={m.id}/>
                  ))}
                </Container>
                Agregar un movimeinto de dinero
                <button type="button" className="btn btn-primary" style={{ textDecoration: 'none' } }>
                  <Link to={`/api/movements/update/${movements.moves[0].fk_user}`} style={{ textDecoration: 'none' } }>Agregar</Link>
                  </button>
              </Container>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;