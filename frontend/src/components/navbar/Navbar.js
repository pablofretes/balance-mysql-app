import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeLoggedUser } from '../../reducers/loginReducer';

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector(store => store.login);
	console.log(user);
	
  const handleLogOut = () => {
		dispatch(removeLoggedUser());
  }

  return (
  <nav className='nav' data-cy='navbar'>
  <div className='container-navbar'>
    <ul className='nav-list'>
    	<li className='nav-item'>
        <Link to="/" data-cy='home-button' className='button-nav'>
        Inicio
        </Link>
    	</li>
    	{user !== null ? 
        <li>
          <Link to="/api/user/login" onClick={handleLogOut}  data-cy="logout-button" className='button-nav'>
          Salir
          </Link>
        </li>
     	:
        <li>
          <Link  to="/api/user/login" className='button-nav' data-cy="login-button">Entrar</Link>
        </li>
      }
      {user == null ?
        <li>
          <Link to="/api/user/register" data-cy="register-button" className='button-nav'>
          Registrar
          </Link>
        </li>
      :
        null
      }
    </ul>
  </div>
  </nav>
  );
}

export default Navbar;