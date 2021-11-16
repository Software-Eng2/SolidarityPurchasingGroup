/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, getByText, fireEvent, screen} from "@testing-library/react";
import ReactDOM from 'react-dom';

import OrderModal from '../components/OrderModal';
import { Button} from 'react-bootstrap';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';


afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });

it('includes link to orders', () => {
    const order = {id:'28', creation_date:'2021-11-16',client_id: 2, client_name:'Marco', client_surname:'Bianchi', total: 0.75, pick_up:1, address:'Corso Duca degli Abruzzi, 24', date:'', time:''}
    const wrapper = shallow(<OrderModal 
        show={true} 
        setModalShow={false} 
        setDirty={true} 
        date={''}
        setDate={'2021-11-20'}
        time={''}
        setTime={'12:29'}
        onHide={() => {setModalShow(false); setDate(''); setTime('')}} 
        selectedOrder={order}
    />);
    expect(wrapper.props().selectedOrder).toBe(order);
});

it("renders button correctly", () => {
    const { getByTestId } = render(
        <Button data-testid="button-confirm" variant="success" disabled={0} onClick={()=>{}}>
            Confirm
        </Button>);
    expect(getByTestId('button-confirm')).toHaveTextContent("Confirm");
});


 test('calls onClick prop when clicked', () => {
     const updateOrder = jest.fn()
     render(
         <Button data-testid="button-confirm" variant="success" disabled={0} onClick={updateOrder}>
             Confirm
         </Button>);
    fireEvent.click(screen.getByText(/Confirm/i));
    expect(updateOrder).toHaveBeenCalledTimes(1);
  });