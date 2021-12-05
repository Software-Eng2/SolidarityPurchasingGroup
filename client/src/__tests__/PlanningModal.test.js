import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import PlanningModal from '../components/PlanningModal';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import  {FaPlus} from "react-icons/fa";

/**
* @jest-environment node
*/

configure({ adapter: new Adapter() });

const fakeFarmer = {id: 4, 
    role: "farmer", 
    name: "Maria", 
    surname: "Marroni", 
    birthdate: "01/01/2001", 
    email: "somemail@email.com", 
    password: "someHashedPassword", 
    isConfirmed: 1 };


    describe("Render", () => {

        it('Render Page', () =>{
            const page = shallow(<PlanningModal />);
            expect(page).toBeTruthy();
        })

        it("Check components", () => {
            const  wrapper = shallow(<PlanningModal  />);
            expect(wrapper.find('Modal').exists()).toBeTruthy();
            expect(wrapper.find('FormPlanning').exists()).toBeTruthy();

            
          })

          

    });