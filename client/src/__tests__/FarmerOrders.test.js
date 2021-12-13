import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
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
    },
    {
    id: "1", 
    name: "name2", 
    quantity: 100, 
    price: 1000, 
    totalOrdered: 40, 
    updated: 0},
    { id: "2", 
    name: "name3", 
    quantity: 10, 
    price: 100, 
    totalOrdered: 40, 
    updated: 0}];

it("renders farmer orders", () => {
    shallow(<FarmerOrders userid={4} orderedProducts={fakeProducts} clock={clock}/>);
});

test('Test error LoginForm', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <MemoryRouter history={history}>
       <FarmerOrders userid={4} orderedProducts={fakeProducts} clock={clock}/>
      </MemoryRouter>
    );
    //Click on the "Log In" button without empty fields
    act(() => {
      fireEvent.click(screen.getByText('Log In'));
    });

});