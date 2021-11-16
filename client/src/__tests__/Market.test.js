import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import { render, fireEvent, getByTestId} from "@testing-library/react";
import{ Container } from "react-bootstrap";
import Market from '../views/Market';
import Adapter from 'enzyme-adapter-react-16';
/**
* @jest-environment node
*/

configure({ adapter: new Adapter() });
// Fake variables
const fakeProducts = [{id: "0", 
    name: "name1", 
    description: "description1", 
    category: "category1", 
    quantity: 100, 
    price: 100, 
    farmer_id: 4, 
    img_path: "some-img-path-1", 
    confirmed: 1},
    {id: "2", 
    name: "name2", 
    description: "description2", 
    category: "category2", 
    quantity: 100, 
    price: 100, 
    farmer_id: 4, 
    img_path: "some-img-path-2", 
    confirmed: 1},
    {id: "3", 
    name: "name3", 
    description: "description3", 
    category: "category3", 
    quantity: 100, 
    price: 100, 
    farmer_id: 4, 
    img_path: "some-img-path-3", 
    confirmed: 1}];
const fakeClient = {id: "0", 
    role: "Client", 
    name: "John", 
    surname: "Doe", 
    birthdate: "01/01/2001", 
    email: "somemail@email.com", 
    password: "someHashedPassword", 
    isConfirmed: 1 };

it("renders market without crashing", () => {
    shallow(<Market products={fakeProducts} client={fakeClient}/>);
});

it("renders market components without crashing", () => {
    const wrapperMarket = shallow(<Market products={fakeProducts} client={fakeClient}/>);
    expect(wrapperMarket.find('Basket').exists()).toBeTruthy();
    expect(wrapperMarket.find('AlertWallet').exists()).toBeTruthy();
    expect(wrapperMarket.find('Container').exists()).toBeTruthy();
    expect(wrapperMarket.find('SideBar').exists()).toBeTruthy();
    expect(wrapperMarket.find('Product').exists()).toBeTruthy();
});




it("accepts products and client props", () => {
    const wrapperMarket = shallow(<Market products={fakeProducts} client={fakeClient}/>);
    expect(wrapperMarket.props().products).toBe(fakeProducts);
    expect(wrapperMarket.props().client).toBe(fakeClient);
});
