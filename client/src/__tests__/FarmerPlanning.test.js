import React, {
  useState as useStateMock
} from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import FarmerPlanning from '../components/FarmerPlanning';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import { FaPlus } from "react-icons/fa";
import { Button } from 'react-bootstrap';





configure({ adapter: new Adapter() });

const fakeFarmer = {
  id: 4,
  role: "farmer",
  name: "Maria",
  surname: "Marroni",
  birthdate: "01/01/2001",
  email: "somemail@email.com",
  password: "someHashedPassword",
  isConfirmed: 1
};


describe("Render", () => {

  it('Render Page', () => {
    const page = shallow(<FarmerPlanning />);
    expect(page).toBeTruthy();
  })

  it("Check components", () => {
    const wrapper = shallow(<FarmerPlanning />);
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('FormTable').exists()).toBeTruthy();
    expect(wrapper.find('PlanningModal').exists()).toBeTruthy();
  })

  it("Check components FormTable", () => {
    const page = shallow(<FarmerPlanning />);
    const wrapper = page.find('FormTable').dive();
    expect(wrapper.find('BsFillInfoCircleFill').exists()).toBeTruthy();
    expect(wrapper.find('Button').exists()).toBeTruthy();
    expect(wrapper.find('ConfirmModal').exists()).toBeTruthy();

  })

});

describe("changeInput", () => {

  it('Button back', () => {
    //let onButtonClickMock = jest.fn();
    render(<Button
      size="lg"
      data-testid="back-Button"  
      className="mt-5"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}>
      Back</Button>

    );


    fireEvent.click(screen.getByTestId('back-Button'));
    expect().toHaveBeenCalledTimes(0);

  });

});