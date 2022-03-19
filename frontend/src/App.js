import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import { retrieveBalance } from './reducers/movementsReducer';
import { existingLogin } from './reducers/loginReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updatedMovementToNull } from './reducers/updatedMovementReducer';
import UpdateConfirm from './components/balance-form/MovementUpdate/UpdateConfirm';
import BalanceUpdateConfirm from './components/balance-form/BalanceUpdate/BalanceUpdateConfirm';
import LoginSubmit from './components/login/LoginSubmit';
import RegisterSubmit from './components/signUp/RegisterSubmit';
import MovementFormSubmit from './components/balance-form/MovementForm/MovementFormSubmit';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);

  useEffect(() => {
		dispatch(existingLogin());
	}, [dispatch]);

  useEffect(() => {
    if(user !== null){
      dispatch(retrieveBalance(user.userId));
    }
	}, [dispatch, user]);

  useEffect(() => {
    dispatch(updatedMovementToNull());
  }, [dispatch]);

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path="/api/movements/movement/:id" element={<UpdateConfirm />}/>
        <Route path="/api/movements/add/:id" element={<MovementFormSubmit />} />
        <Route path="/api/balance/update/:id" element={<BalanceUpdateConfirm />} />
        <Route path="/api/user/register" element={<RegisterSubmit />}/>
        <Route path="/api/user/login" element={<LoginSubmit />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
};

export default App;
