import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Register from './components/signUp/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { retrieveBalance } from './reducers/movementsReducer';
import { existingLogin } from './reducers/loginReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updatedMovementToNull } from './reducers/updatedMovementReducer';
import UpdateConfirm from './components/balance-form/UpdateConfirm';
import BalanceUpdateConfirm from './components/balance-form/BalanceUpdateConfirm';
import MovementForm from './components/balance-form/MovementForm';

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
    <div>
      <Navbar />
      <Routes>
        <Route path="/api/movements/movement/:id" element={<UpdateConfirm />}/>
        <Route path="/api/movements/add/:id" element={<MovementForm />} />
        <Route path="/api/balance/update/:id" element={<BalanceUpdateConfirm />} />
        <Route path="/api/user/register" element={<Register />}/>
        <Route path="/api/user/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
};

export default App;
