import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login component', () => {
  const mockStore = configureStore();
  const initialState = { login: { userId: 1 } };
  const history = createMemoryHistory();
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');


  beforeEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  test('renders content', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  
    const elementPassword = screen.getByTestId('login-form-password');
    const elementEmail = screen.getByTestId('login-form-email');
    const elementButton = screen.getByTestId('login-form-button');
    expect(elementPassword).toBeDefined();
    expect(elementEmail).toBeDefined();
    expect(elementButton).toBeDefined();
  });
  
  test('form submit', async () => {
    const handleSubmit = jest.fn();
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Login onSubmit={handleSubmit}/>
        </BrowserRouter>
      </Provider>
    );
  
    const elementPassword = screen.getByTestId('login-form-password');
    const elementEmail = screen.getByTestId('login-form-email');
    const elementButton = screen.getByTestId('login-form-button');
    fireEvent.change(elementEmail, { target: { value: 'testing@testmail.com' } });
    fireEvent.change(elementPassword, { target: { value: 'testPassword' } });
    fireEvent.click(elementButton);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});