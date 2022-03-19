import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import BalanceForm from '../BalanceForm';

describe('BalanceForm component', () => {
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
          <BalanceForm />
        </BrowserRouter>
      </Provider>
    );
  
    const elementAmount = screen.getByText('Monto');
    const elementInput = screen.getByTestId('balance-form-input');
    const elementButton = screen.getByText('Enviar');
    expect(elementAmount).toBeDefined();
    expect(elementInput).toBeDefined();
    expect(elementButton).toBeDefined();
  });
  
  test('form submit', async () => {
    const handleSubmit = jest.fn();
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <BalanceForm onSubmit={handleSubmit}/>
        </BrowserRouter>
      </Provider>
    );
  
    const elementInput = screen.getByTestId('balance-form-input');
    const elementButton = screen.getByTestId('submit-button');
    fireEvent.change(elementInput, { target: { value: '5000' } });
    fireEvent.click(elementButton);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});