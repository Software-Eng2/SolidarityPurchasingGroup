/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup,  findByText, getByText, fireEvent, screen} from "@testing-library/react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {PendingList, AcceptedList} from '../components/ClientOrders/ClientOrders'

import ClientPage from '../components/ClientOrders/ClientPage';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });

const fakeOrders = [
    {
        id: 28,
        creation_date: '2021-11-16',
        client_id: 2, 
        client_name: 'Marco',
        client_surname: 'Bianchi',
        total: 0.75,
        date: '',
        time: '',
        pick_up: 1,
        address: 'Corso Duca degli Abruzzi, 24',
        status: 'PENDING'
    },
    {
        id: 24,
        creation_date: '2021-11-26',
        client_id: 3, 
        client_name: 'Luca',
        client_surname: 'Neri',
        total: 3.40,
        date: '2021-11-30',
        time: '10:00',
        pick_up: 1,
        address: 'Corso Duca degli Abruzzi, 24',
        status: 'PENDING'
    }
];

const fakeAccepted = [
    {
        id: 29,
        creation_date: '2021-11-23',
        client_id: 3, 
        client_name: 'Isabella',
        client_surname: 'Verdi',
        total: 0.80,
        date: '2021-12-01',
        time: '12:00',
        pick_up: 1,
        address: 'Corso Duca degli Abruzzi, 25',
        status: 'ACCEPTED'
    }
];


it('client page aaaaaq',async  () => {
    const component = render(<Router><ClientPage clientOrders={fakeOrders} clientAcceptedOrders={fakeAccepted}/></Router>);

    //Default view --> order 28 and 24 should be visible
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Pending')).toHaveClass('tab-pane active');
    expect(await findByText(component.container, 'Order #28')).toBeVisible();
    expect(await findByText(component.container, 'Order #24')).toBeVisible();
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Accepted')).toHaveClass('tab-pane');

    //Click on 'Accepted' tab
    const button = screen.getByText('Accepted');
    fireEvent.click(button);

    //Accepted view --> only order 29 should be visible
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Pending')).toHaveClass('tab-pane');
    expect(await findByText(component.container, 'Order #29')).toBeVisible();
    expect(component.container.querySelector('#uncontrolled-tab-example-tabpane-Accepted')).toHaveClass('tab-pane active');
})