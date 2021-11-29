import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import{ Container} from "react-bootstrap";
import FarmerProduct from '../components/FarmerProduct';
import { screen, fireEvent, render } from "@testing-library/react";
import Adapter from 'enzyme-adapter-react-16';
import FarmerCard from '../components/FarmerCard/FarmerCard';
/**
* @jest-environment node
*/
configure({ adapter: new Adapter() });

const fakeProduct = {id: "1", 
    name: "name1", 
    description: "description1", 
    category: "category1", 
    quantity: 100, 
    price: 100, 
    farmer_id: 4, 
    img_path: "some-img-path-1", 
    confirmed: 1};
// const fakeProductNotConfirmed = {id: "22", 
//     name: "name2", 
//     description: "description2", 
//     category: "category2", 
//     quantity: 100, 
//     price: 100, 
//     farmer_id: 4, 
//     img_path: "some-img-path-2", 
//     confirmed: 0};
    

it("renders product without crashing", () => {
    shallow(<FarmerProduct product={fakeProduct} />);
});

it("renders farmer product components without crashing", () => {
    const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
    expect(wrappedProduct.find('Container').exists()).toBeTruthy();
    expect(wrappedProduct.find('FarmerCard').exists()).toBeTruthy();
    expect(wrappedProduct.find('Modal').exists()).toBeTruthy();
    expect(wrappedProduct.find('Form').exists()).toBeTruthy();
    expect(wrappedProduct.find('Alert').exists()).toBeTruthy();
    expect(wrappedProduct.find('Button').exists()).toBeTruthy();
    expect(wrappedProduct.find('input').exists()).toBeTruthy();
    expect(wrappedProduct.find('p').exists()).toBeTruthy();
});


it("accepts props", () => {
    const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
    expect(wrappedProduct.childAt(0).props().product).toBe(fakeProduct);
});

it("clicking container works", () => {
    const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
    expect(wrappedProduct.childAt(0).props().product).toBe(fakeProduct);
    const handleShow = jest.fn()
    render( <Container  
            data-testid="product-container"
            onClick={handleShow}>
            <FarmerCard confirmed={true} img={''} title={'This is a title'} body={'This is a body'} subinfo={0.00}/>
        </Container>);
    fireEvent.click(screen.getByTestId('product-container'));
    expect(handleShow).toHaveBeenCalledTimes(1);
});


// it("product renders  with empty basket", () => {
//     const wrappedProduct = shallow(<FarmerProduct product={fakeProduct} />);
//     expect(wrappedProduct.childAt(0).props().basket).toEqual([]);
//     expect(wrappedProduct.childAt(0).props().basket).toHaveLength(0);
// });


// it(`after click it will increase the quantity of product`, () => {
//     const wrappedProduct = shallow(<FarmerProduct product={fakeProduct}/>);
//     expect(wrappedProduct.find("input").props().value).toEqual(1);
//     wrappedProduct.find(`button`).find(`[data-test="increment"]`).simulate(`click`);
//     expect(wrappedProduct.find("input").props().value).toEqual(2);
//   });

// it(`after click it will decrease the quantity of product`, () => {
//     const wrappedProduct = shallow(<FarmerProduct product={fakeProduct} basket={[]}/>);
//     expect(wrappedProduct.find("input").props().value).toEqual(1);
//     wrappedProduct.find(`button`).find(`[data-test="decrement"]`).simulate(`click`);
//     expect(wrappedProduct.find("input").props().value).toEqual(0);
//   });
