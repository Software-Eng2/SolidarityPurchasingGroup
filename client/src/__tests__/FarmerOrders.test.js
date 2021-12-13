import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import API from '../API';
import FarmerOrders from '../components/FarmerOrders';
import { Clock } from '../Clock';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/**
* @jest-environment node
*/

configure({ adapter: new Adapter() });
// Fake variables
let clock = new Clock();
const fakeProducts = [{
    id: "0", 
    name: "name1", 
    quantity: 10, 
    price: 100, 
    totalOrdered: 40, 
    updated: 0
    }];

it("renders farmer orders", () => {
    shallow(<FarmerOrders userid={4} orderedProducts={fakeProducts} clock={clock}/>);
});

test('Farmer confirms quantity', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    API.logIn("andreabruno@gmail.com","andreabruno");
    render(
      <MemoryRouter history={history}>
       <FarmerOrders userid={4} orderedProducts={fakeProducts} clock={clock}/>
      </MemoryRouter>
    );
    act(() => {
        fireEvent.click(screen.getByText('Confirm orders'));
      });
    expect(screen.getByText('Confirm orders')).toHaveAttribute('disabled');
});