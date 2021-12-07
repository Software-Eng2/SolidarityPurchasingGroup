import React from 'react';
import { render, cleanup, findByTestId, getByTestId, fireEvent, getByText, screen } from "@testing-library/react";
import { shallow, configure, mount } from 'enzyme';
import RegisterInterface from "../components/RegisterInterface";
import Adapter from 'enzyme-adapter-react-16';
import { useLocation, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';



jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/registerform"
  })
}));




afterEach(() => {
  cleanup();
});

configure({ adapter: new Adapter() });
const fakeUserRole= "";


//avviene il render della pag?

describe("Render", () => {

  it("Check registerpageRender", () => {
    const page = shallow(<RegisterInterface userRole={fakeUserRole}/>);
    expect(page).toBeTruthy();
  });

  

  it("Check all components", () => {
    const  wrapper = shallow(<RegisterInterface  userRole={fakeUserRole}/>);
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('Form').exists()).toBeTruthy();
    expect(wrapper.find('Button')).toHaveLength(2);

  })



  it("check button submit ", () => {
    const wrapper = shallow(<RegisterInterface />)
    const btn = <Button
      className="mt-5"
      data-testid="submit-Button"
      variant="success"
      type="submit"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}
    >
      submit
    </Button>;
    expect(wrapper.contains(btn)).toEqual(true);

  });

  it("check button back ", () => {
    const wrapper = shallow(<RegisterInterface />)
    const btn = <Button
      className="mt-5"
      data-testid="back-Button"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} onClick={() => {
        
      }}>
      back
    </Button>
    expect(wrapper.contains(btn)).toEqual(false);

  });

});


describe("changeInput", () => {
  //Click bottone
  it('Button submit', () => {
    let onButtonClickMock = jest.fn();
    render( 
     <Button
      className="mt-5"
      data-testid="submit-Button"
      variant="success"
      type="submit"
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }}
      onSubmit={onButtonClickMock}
    >
      submit
    </Button>
    );
    

    fireEvent.click(screen.getByTestId('submit-Button'));
    expect(onButtonClickMock).toHaveBeenCalledTimes(0);

  });


  it('Button back', () => {
    let onButtonClickMock = jest.fn();
    render( 
      <Button className="mt-5" 
      data-testid="back-Button"  
      style={{ backgroundColor: '#247D37', border: '0px', borderRadius: '4px' }} 
      onClick={() => onButtonClickMock}>back</Button>

    );
    
    fireEvent.click(screen.getByTestId('back-Button'));
    expect(onButtonClickMock).toHaveBeenCalledTimes(0);

  });


});





// it('includes link to clienlist', () => {
//   const wrapper = shallow(<RegisterInterface />);
//   expect(wrapper.find(Link).at(0).props().to).toStrictEqual({ pathname: '/clientlist' });
// });