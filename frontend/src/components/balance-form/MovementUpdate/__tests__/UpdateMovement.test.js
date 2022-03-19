import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import UpdateMovement from '../UpdateMovement';

describe('UpdateMovement component', () => {
  const mockStore = configureStore();
  const initialState = { login: { userId: 1 } };
  const history = createMemoryHistory();
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  const movementToChange = {
    concept: 'Comida',
    type: 'negative',
    amount: 500
  };

  beforeEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  test('renders content', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <UpdateMovement movementToChange={movementToChange} />
        </BrowserRouter>
      </Provider>
    );
  

    const elementType = screen.getByTestId('type-movement-form-input');
    const elementAmount = screen.getByTestId('amount-movement-form-input');
    const elementConcept = screen.getByTestId('concept-movement-form-input');
    const elementButton = screen.getByText('Enviar');
    expect(elementType).toBeDefined();
    expect(elementConcept).toBeDefined();
    expect(elementAmount).toBeDefined();
    expect(elementButton).toBeDefined();
  });
  
  test('form submit', async () => {
    const handleSubmit = jest.fn();
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <UpdateMovement onSubmit={handleSubmit} movementToChange={movementToChange}/>
        </BrowserRouter>
      </Provider>
    );
  
    const elementType = screen.getByTestId('type-movement-form-input');
    const elementAmount = screen.getByTestId('amount-movement-form-input');
    const elementConcept = screen.getByTestId('concept-movement-form-input');
    const elementButton = screen.getByText('Enviar');
    fireEvent.change(elementType, { target: { value: 'Egreso' } });
    fireEvent.change(elementAmount, { target: { value: '500' } });
    fireEvent.change(elementConcept, { target: { value: 'Comida' } });
    fireEvent.click(elementButton);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});