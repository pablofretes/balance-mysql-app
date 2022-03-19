import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom'
import Card from '../Card';

describe('Card component', () => {
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
          <Card title="Balance" text="5000" number={null}/>
        </BrowserRouter>
      </Provider>
    );
  
    const element = screen.getByText('Balance');
    expect(element).toBeDefined();
  });

  test('if the card title equals Balance, then number is null and text is the amount of money', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Card title="Balance" text="5000" number={null}/>
        </BrowserRouter>
      </Provider>
    );
  
    const elementTitle = screen.getByTestId('card-title').textContent;
    const elementText = screen.getByTestId('card-text').textContent;
    expect(elementTitle).toBeDefined();
    expect(elementText).toBeDefined();
    expect(elementText).toEqual('$ 5000');
    expect(elementTitle).toEqual('Balance');
  });

  test('if the card title equals negative or positive, then title is Egreso/Ingreso and number is not null', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Card title="negative" text="5000" number={5000}/>
        </BrowserRouter>
      </Provider>
    );
  
    const elementTitle = screen.getByTestId('card-title').textContent;
    const elementNumber = screen.getByTestId('card-money').textContent;
    expect(elementTitle).toBeDefined();
    expect(elementNumber).toBeDefined();
    expect(elementNumber).toEqual('$ 5000');
    expect(elementTitle).toEqual('Egreso');
  });

  test('Card buttons exist', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Card title="positive" />
        </BrowserRouter>
      </Provider>
    );
  
    const elementDelete = screen.getByTestId('card-delete').textContent;
    const elementUpdate = screen.getByTestId('card-update').textContent;
    expect(elementDelete).toBeDefined();
    expect(elementUpdate).toBeDefined();
    expect(elementUpdate).toEqual('Cambiar');
    expect(elementDelete).toEqual('Eliminar');
  });

  test('Card dates exist', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter history={history}>
          <Card title="positive" created={'someverylongdate'} updated={'someverylongdateyes'}/>
        </BrowserRouter>
      </Provider>
    );
  
    const elementDelete = screen.getByTestId('card-created').textContent;
    const elementUpdate = screen.getByTestId('card-updated').textContent;
    expect(elementDelete).toBeDefined();
    expect(elementUpdate).toBeDefined();
  });
});