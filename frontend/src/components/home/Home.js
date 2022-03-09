import React from 'react';
import { useSelector } from 'react-redux';
import BalanceForm from '../balance-form/BalanceForm';
import { postNewBalance } from '../../reducers/movementsReducer';
import Card from '../balance-card/Card';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const loggedUser = useSelector(state => state.login);
  const movements = useSelector(state => state.movements);
  console.log(movements)

  return (
    <div>
      {loggedUser == null ? <h1>Debe estar logeado para usar esta app</h1> : (
        <div>
          {movements.length === 0 || movements.balance === null ? (
            <Container>
              <h2>Por Favor Introduzca Un Monto</h2>
              <BalanceForm dispatchFunction={postNewBalance}/>
            </Container>
          ) : (
            <div >
              {movements.length !== 0 && movements.balance.total !== undefined && (
                <div className='container'>
                  <Card title="Balance" text={movements.balance.total} number={null}/>
                  <Container className='container-no-shadow'>
                    <p>Últimos movimientos</p>
                    {movements.moves.map((m) => (
                      <Card title={m.type} text={m.concept} number={m.amount} key={m.id}/>
                    ))}
                  </Container>
                    <p>Agregar un movimiento de dinero</p>
                  <button type="button" className="btn btn-secondary">
                    <Link className="button-link" to={`/api/movements/update/${movements.moves[0].fk_user}`}>Agregar</Link>
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