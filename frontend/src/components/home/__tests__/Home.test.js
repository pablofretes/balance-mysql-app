import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home component', () => {
  const mockStore = configureStore();
  const initialStateNoBalance = { login: { userId: 1 } };
  const initialStateComplete = {
    login: {
      userId: 1
    },
    movements: { 
      balance: { 
        initialAmount: 5000,
        total: 5000,
        fk_user: 1
      },
      moves: [
        {
          concept: 'Comida',
          type: 'negative',
          amount: 500,
        }
      ]
    } 
  };
  const history = createMemoryHistory();
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  test('renders content when there is no balance', () => {
    useSelectorMock.mockReturnValue(initialStateNoBalance);
    render(
      <Provider store={mockStore(initialStateNoBalance)}>
        <BrowserRouter history={history}>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  

    const elementTitle = screen.getByTestId('home-h2-title');
    expect(elementTitle).toBeDefined();
  });

  test('renders content when there is balance', () => {
    useSelectorMock.mockImplementation(callback => callback(initialStateComplete));
    render(
      <Provider store={mockStore(initialStateComplete)}>
        <BrowserRouter history={history}>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  

    const elementContainer = screen.getByTestId('container-home');
    const elementChangeButton = screen.getByTestId('home-change-button');
    const elementAddText = screen.getByTestId('home-add-text');
    const elementAddButton = screen.getByTestId('home-add-button');
    expect(elementContainer).toBeDefined();
    expect(elementChangeButton).toBeDefined();
    expect(elementAddText).toBeDefined();
    expect(elementAddButton).toBeDefined();
  });
});