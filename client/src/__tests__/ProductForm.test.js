import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import ProductForm from '../components/ProductForm';
import { findByTestId } from "@testing-library/react";
import Adapter from 'enzyme-adapter-react-16';
/**
* @jest-environment node
*/
configure({ adapter: new Adapter() });

it("renders product form without crashing", () => {
    const handleShow = jest.fn();
    shallow(<ProductForm userid={1} show={true} handleShow={handleShow} />);
});

it("renders product form components without crashing", () => {
    const handleShow = jest.fn();
    const wrappedProduct = shallow(<ProductForm userid={1} show={true} handleShow={handleShow} />);
    expect(wrappedProduct.find('Modal').exists()).toBeTruthy();
    expect(wrappedProduct.find('Form').exists()).toBeTruthy();
    expect(wrappedProduct.find('Container').exists()).toBeTruthy();
    expect(wrappedProduct.find('Row').exists()).toBeTruthy();
    expect(wrappedProduct.find('Col').exists()).toBeTruthy();
    expect(wrappedProduct.find('div').exists()).toBeTruthy();
    expect(wrappedProduct.find('button').exists()).toBeTruthy();
});


it("accepts props", () => {
    const handleShow = jest.fn();
    const wrappedProduct = shallow(<ProductForm userid={1} show={true} handleShow={handleShow} />);
    expect(wrappedProduct.props().userid).toBe(1);
    expect(wrappedProduct.props().show).toBeTruthy();
    expect(wrappedProduct.props().handleShow).toBe(handleShow);
});

it("renders button of form correctly", () => {
  const button = findByTestId('add-new-product');
  expect(button).toBeTruthy();
})