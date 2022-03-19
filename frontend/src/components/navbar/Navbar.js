import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeLoggedUser } from '../../reducers/loginReducer';

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector(store => store.login);
  
  const handleLogOut = () => {
		dispatch(removeLoggedUser());
  }

  return (
  <nav className='nav' data-cy='navbar'>
  <div className='container-navbar'>
    <ul className='nav-list'>
    	<li className='nav-item' data-testid='home-link'>
        <Link to="/" data-cy='home-button' className='button-nav'>
        Inicio
        </Link>
    	</li>
    	{user !== null ? 
        <li>
          <Link to="/api/user/login" onClick={handleLogOut} className='button-nav' data-testid='logout-link'>
          Salir
          </Link>
        </li>
     	:
        <li>
          <Link  to="/api/user/login" className='button-nav' data-testid='login-link'>Entrar</Link>
        </li>
      }
      {user == null ?
        <li>
          <Link to="/api/user/register" className='button-nav' data-testid='register-link'>
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