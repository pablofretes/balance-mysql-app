import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar component', () => {
  const mockStore = configureStore();
  const initialState = { login: null };
  const initialStateWithUser = { login: { userId: 1 } };
  const history = createMemoryHistory();
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  test('renders content when there is no logged user', () => {
    useSelectorMock.mockImplementation(callback => callback(initialState));
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
  

    const elementHome = screen.getByTestId('home-link');
    const elementLogin = screen.getByTestId('login-link');
    const elementRegister = screen.getByTestId('register-link');
    expect(elementHome).toBeDefined();
    expect(elementLogin).toBeDefined();
    expect(elementRegister).toBeDefined();
  });

  test('renders content when there is a logged user', () => {
    useSelectorMock.mockImplementation(callback => callback(initialStateWithUser));
    render(
      <Provider store={mockStore(initialStateWithUser)}>
        <BrowserRouter history={history}>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
  

    const elementHome = screen.getByTestId('home-link');
    const elementLogout = screen.getByTestId('logout-link');
    expect(elementHome).toBeDefined();
    expect(elementLogout).toBeDefined();
  });
});