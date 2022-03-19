import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

describe('Register component', () => {
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
          <Register />
        </BrowserRouter>
      </Provider>
    );
  
    const elementPassword = screen.getByTestId('register-form-password');
    const elementEmail = screen.getByTestId('register-form-email');
    const elementUsername = screen.getByTestId('register-form-username');
    const elementPasswordConfirmation = screen.getByTestId('register-form-password-confirmation');
    const elementButton = screen.getByTestId('register-form-button');
    expect(elementPassword).toBeDefined();
    expect(elementEmail).toBeDefined();
    expect(elementUsername).toBeDefined();
    expect(elementPasswordConfirmation).toBeDefined();
    expect(elementButton).toBeDefined();
  });
  
  test('form submit', async () => {
    const handleSubmit = jest.fn();
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Register onSubmit={handleSubmit}/>
        </BrowserRouter>
      </Provider>
    );
  
    const elementPassword = screen.getByTestId('register-form-password');
    const elementEmail = screen.getByTestId('register-form-email');
    const elementUsername = screen.getByTestId('register-form-username');
    const elementPasswordConfirmation = screen.getByTestId('register-form-password-confirmation');
    const elementButton = screen.getByTestId('register-form-button');
    fireEvent.change(elementEmail, { target: { value: 'testing@testmail.com' } });
    fireEvent.change(elementPassword, { target: { value: 'testPassword' } });
    fireEvent.change(elementUsername, { target: { value: 'testUsername' } });
    fireEvent.change(elementPasswordConfirmation, { target: { value: 'testPassword' } });
    fireEvent.click(elementButton);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});