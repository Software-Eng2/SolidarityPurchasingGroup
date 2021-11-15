import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure, mount } from 'enzyme';
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

describe("passing props", () => {
    const wrapperMarket = shallow(<Market products={fakeProducts} client={fakeClient}/>);
    it("accepts products and client props", () => {
        expect(wrapperMarket.props().products).toBe(fakeProducts);
        expect(wrapperMarket.props().client).toBe(fakeClient);
    })

})

// describe("click on product card", () => {
//     const wrapperMarket = shallow(<Market products={fakeProducts} client={fakeClient}/>);
//     it("accepts products and client props", () => {
//         expect(wrapperMarket.props().products).toBe(fakeProducts);
//         expect(wrapperMarket.props().client).toBe(fakeClient);
//     })

// })