import React, {
  useState as useStateMock
} from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import FarmerPlanning from '../components/FarmerPlanning';
import FormTable from '../components/FarmerPlanning';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import { FaPlus } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { MdSecurityUpdate } from 'react-icons/md';
import { BsFillPlusCircleFill, BsTrash, BsPencilSquare, BsFillInfoCircleFill } from "react-icons/bs";






configure({ adapter: new Adapter() });

const fakeFarmer = [{
  id: 4,
  role: "farmer",
  name: "Maria",
  surname: "Marroni",
  birthdate: "01/01/2001",
  email: "somemail@email.com",
  password: "someHashedPassword",
  isConfirmed: 1
}];

const farmerProduct = [{
  id: "1",
  name: "name1",
  description: "description1",
  category: "category1",
  quantity: 100,
  price: 100,
  farmer_id: 4,
  img_path: "some-img-path-1",
  confirmed: 1
}];

const productNW = [{
  id:1,
  id_user: 4,
  id_product: "description1",
  quantity: 100
}];







describe("Render", () => {

  it('Render Page', () => {
    const page = shallow(<FarmerPlanning />);
    expect(page).toBeTruthy();
  })

  it("Check components", () => {
    const wrapper = shallow(<FarmerPlanning />);
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('FormTable').exists()).toBeTruthy();
    expect(wrapper.find('BsFillPlusCircleFill').exists()).toBeTruthy();

  })

  it("Check  FormTable", () => {
    const page = shallow(<FormTable farmerProduct={farmerProduct} productNW={productNW}/>);
    const wrapper = page.find('FormTable').dive();
    expect(wrapper.find('BsFillInfoCircleFill').exists()).toBeTruthy();
    expect(wrapper.find('Button').exists()).toBeTruthy();
    expect(wrapper.find('ConfirmModal').exists()).toBeTruthy();
    expect(wrapper.find('thead').exists()).toBeTruthy();
    expect(wrapper.find('tbody').exists()).toBeTruthy();
    expect(wrapper.find('tr').exists()).toBeTruthy();
  })

});

describe("changeInput", () => {

  it('Button back', () => {
    let onButtonClickMock = jest.fn();
    render(<Button
      size="lg"
      data-testid="back-Button"
      className="mt-5"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>
      Back</Button>

    );
    
    fireEvent.click(screen.getByTestId('back-Button'));
    expect(onButtonClickMock).toHaveBeenCalledTimes(0);

  });


  
});



it('includes  product', () => {
  const page = shallow(<FarmerPlanning />);
  const prova = page.find('PlanningModal').children();

  const wrapper = shallow(<prova
    show={true}
    onHide={() => { setModalShow(false); setUpdate(false); }}
    products={""}
    farmerProducts={farmerProduct}
    userid={1}
    update={""}
    setUpdate={""}
    setDirty={false}
    id={productNW.id}
    productNW={productNW}
  />);
  
  expect(wrapper.props().farmerProducts).toBe(farmerProduct);
  expect(wrapper.props().productNW).toBe(productNW);

});

it('delete BsTrash', () => {
  const  deleteTask= jest.fn();
  render(
    <BsTrash data-testid='BsTrash' className="pointer" fill="red" 
    onClick={deleteTask}/>);

  
  
    fireEvent.click(screen.getByTestId(/BsTrash/i));
    expect(deleteTask).toHaveBeenCalledTimes(1);

});

it('update pencil', () => {
  const  setModalShow= jest.fn();
  

  render(
    <BsPencilSquare data-testid='BsPencilSquare'   className="pointer" 
    onClick={ setModalShow}/>);
  
    fireEvent.click(screen.getByTestId(/BsPencilSquare/i));
    expect(setModalShow).toHaveBeenCalledTimes(1);
    

});

it('try', () => {
  const  shallow= shallow(<FarmerPlanning />);
  
  component.instance().handleChange('someName')({target: { value }});
  expect(component.state('someName')).toEqual(value);
  

    

});




