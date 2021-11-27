/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, fireEvent, screen} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import AlertCancellingOrders from '../components/AlertCancellingOrders';
import { Button} from 'react-bootstrap';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Client } from '../Client';


afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });


it("renders button correctly", () => {
    const { getByTestId } = render(  <Button 
        data-testid="button-top-up"
          className="text-center mt-5"
          variant="success"
          disabled={0}
          onClick={()=>{}}>
            Top up now
        </Button>);
    expect(getByTestId('button-top-up')).toHaveTextContent("Top up now");
});

 test('calls onClick prop when clicked', () => {
    const updateWallet = jest.fn()
    render( <Button 
        data-testid="button-top-up"
          className="text-center mt-5"
          variant="success"
          disabled={0}
          onClick={updateWallet}>
            Top up now
        </Button>);
    fireEvent.click(screen.getByText(/Top up now/i))
    expect(updateWallet).toHaveBeenCalledTimes(1)
  })
;

test('top up alert', ()=>{
    const history = createMemoryHistory();
    history.push = jest.fn();
    const show = jest.fn();
    const topUp = jest.fn();
    const setNotificationFlag = jest.fn();
    const currentClient = new Client(5,'Luca','Neri','2012-10-24','lucaneri@gmail.com',1,0);
    const cancelOrders = [ {id: 1, creation_date: '2021-11-22', client_id: 5, total: 8, wallet: 4}]
    render(
      <MemoryRouter history={history}>
          <AlertCancellingOrders show={show} setAlertWalletShow={false} topUp={topUp} setTopUp={0} onHide={() => {}} currentClient={currentClient} cancelOrders={cancelOrders} notificationFlag={0} setNotificationFlag={setNotificationFlag} amountCancellingOrders={10}/>
      </MemoryRouter>
    );
    const topUpLater = screen.getByText('Top up later');
    const boxAmount = screen.getByTestId('boxTopUp');
    const topUpNow = screen.getByText('Top up now');
    expect(topUpLater).toBeInTheDocument();
    expect(boxAmount).toBeInTheDocument();
    expect(topUpNow).toBeInTheDocument();

    act(() => {
        fireEvent.click(screen.getByText('Top up later'));
      });
    expect(screen.getByText('Status of orders: CANCELLING!'));
    
})