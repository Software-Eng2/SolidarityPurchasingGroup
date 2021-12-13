import React, {
    useState as useStateMock
 } from 'react';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import ConfirmModal from '../components/ConfirmModal';
import CardRiepilogo from '../components/ConfirmModal';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render } from "@testing-library/react";
import  {FaPlus} from "react-icons/fa";
import { Button } from 'react-bootstrap';



configure({ adapter: new Adapter() });

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

const productNW=[
{id_user:2, id_product:"prova", quantity:7,price:3},
{id_user:2, id_product:"prova2", quantity:10 ,price:3},
{id_user:3, id_product:"prova3", quantity:15 ,price:5}];


    describe("Render", () => {

        it('Render Page', () =>{
            const page = shallow(<ConfirmModal />);
            expect(page).toBeTruthy();
        })

        it("Check components", () => {
            const  wrapper = shallow(<ConfirmModal  />);
            expect(wrapper.find('Modal').exists()).toBeTruthy();
            expect(wrapper.find('CardRiepilogo').exists()).toBeTruthy();
            expect(wrapper.find('Button').exists()).toBeTruthy();



            
          })

          it("Check CardRiepilogo", () => {
            const  page = shallow(<ConfirmModal productNW={productNW} farmerProducts={farmerProduct}/> );
            const wrapper = page.find('CardRiepilogo').dive();
                
            
            
            expect(wrapper.find({props : 'Card'}).exists).toBeTruthy();
            expect(wrapper.find({props : 'Col'}).exists).toBeTruthy();

            


            
          })

          

    });


    describe("behaviour", () => {

        it('list Product', () =>{
            const deleteUpdateProduct = jest.fn();
            render(
                <Button data-testid='list_product' style={{ backgroundColor: '#b4e6e2', border: '0px', borderRadius: '4px', color: 'red' }} onClick={deleteUpdateProduct} >
                    List Product
                </Button>);

            fireEvent.click(screen.getByText(/List Product/i));
            expect(deleteUpdateProduct).toHaveBeenCalledTimes(1);

        })

        it('Close', () =>{
            const onHide = jest.fn();
            render(
                <Button data-testid="close" variant="secondary" onClick={onHide} >
                Close
              </Button>);

            fireEvent.click(screen.getByText(/close/i));
            expect(onHide).toHaveBeenCalledTimes(1);

        })
    });