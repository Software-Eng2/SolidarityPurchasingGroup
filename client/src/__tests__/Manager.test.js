import React, {
    useState as useStateMock
} from 'react';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { shallow, configure } from 'enzyme';
import Manager from '../components/Manager';
import Adapter from 'enzyme-adapter-react-16';
import { screen, fireEvent, render, cleanup } from "@testing-library/react";
import { FaPlus } from "react-icons/fa";
import { Button } from 'react-bootstrap';


afterEach(() => {
    cleanup();
});

configure({ adapter: new Adapter() });

describe("Render", () => {

    it('Render Page', () => {
        const page = shallow(<Manager />);
        expect(page).toBeTruthy();
    })

    it("Check components", () => {
        const wrapper = shallow(<Manager />);
        expect(wrapper.find('Container').exists()).toBeTruthy();
        expect(wrapper.find('OrderTable').exists()).toBeTruthy();
        expect(wrapper.find('OrderModal').exists()).toBeTruthy();

    })

    it("renders button correctly", () => {
        const { getByTestId } = render(
            <Button data-testid="button-close" variant="danger" onClick={() => { }}>
                Close
            </Button>);
        expect(getByTestId('button-close')).toHaveTextContent("Close");
    });



});

describe("OrderModal", () => {
    it('includes link to orders', () => {
        const order = { id: '28', creation_date: '2021-11-16', client_id: 2, client_name: 'Marco', client_surname: 'Bianchi', total: 0.75, pick_up: 1, address: 'Corso Duca degli Abruzzi, 24', date: '', time: '' }
        const page = shallow(<Manager />)
        const wrapper = page.find('OrderModal').children();
        const prova = shallow(<wrapper
            show={true}
            setModalShow={false}
            date={order.date}
            time={order.time}
            onHide={() => { setModalShow(false); setDate(''); setTime('') }}
            selectedOrder={order}
            basket=""
        />);
        expect(prova.props().selectedOrder).toBe(order);
    });

    /*it("renders OrderModal components without crashing", () => {
        const order = { id: '28', creation_date: '2021-11-16', client_id: 2, client_name: 'Marco', client_surname: 'Bianchi', total: 0.75, pick_up: 1, address: 'Corso Duca degli Abruzzi, 24', date: '', time: '' }
        const page = shallow(<Manager />)
        const wrapper = page.find('OrderModal').children(); 
        const prova = shallow(<wrapper
            show={true}
            setModalShow={false}
            date={order.date}
            time={order.time}
            onHide={() => { setModalShow(false); setDate(''); setTime('') }}
            selectedOrder={order}
            basket=""
        />);

        expect(prova.find('Modal').exists()).toBeTruthy();
        expect(prova.find('Container').exists()).toBeTruthy();
        expect(prova.find('Row').exists()).toBeTruthy();
        expect(prova.find('Col').exists()).toBeTruthy();
    });*/


    test('calls onHide when Close Button is clicked', () => {
        const onHide = jest.fn();
        render(
            <Button data-testid="button-close" variant='danger' onClick={onHide}>
                Close
            </Button>);
        fireEvent.click(screen.getByText(/Close/i));
        expect(onHide).toHaveBeenCalledTimes(1);
    });

});