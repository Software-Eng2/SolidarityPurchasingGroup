/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, cleanup, getByText, fireEvent, screen} from "@testing-library/react";
import ReactDOM from 'react-dom';

import OrdersList from '../components/OrdersList';
import {OrderTable, TableDropdown} from '../components/OrdersList';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "jest-fetch-mock";

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
        status: 'ACCEPTED'
    }
];

it('renders OrdersList without crashing', () => {
    shallow(<OrdersList orders={fakeOrders} setOrders={''} loggedIn={true} dirty={true} setDirty={''} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>) 
});

it("renders OrdersList components without crashing", () => {  
    const wrapper = shallow(<OrdersList orders={fakeOrders} setOrders={''} loggedIn={true} dirty={true} setDirty={''} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>) 
    
    expect(wrapper.find('Container').exists()).toBeTruthy();
    expect(wrapper.find('OrderTable').exists()).toBeTruthy();
});

it("accept props correctly", () => {
    const wrapper = shallow(<OrdersList orders={fakeOrders} setOrders={''} loggedIn={true} dirty={true} setDirty={''} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>) 
    
    expect(wrapper.find('OrderTable').props().orders).toBe(fakeOrders);
});

it("render OrderTable components correctly", () =>{
    const changeStatus = jest.fn();
    const wrapper = shallow(<OrderTable orders={fakeOrders} changeStatus={changeStatus} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>); 
    
    //expect(wrapper.find('Table').exists()).toBeTruthy();
    expect(wrapper.find('thead').exists()).toBeTruthy();
    expect(wrapper.find('tbody').exists()).toBeTruthy();
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('td').exists()).toBeTruthy();
    expect(wrapper.find('TableDropdown').exists()).toBeTruthy();
});

it("render TableDropdown components correctly", () =>{
    const changeStatus = jest.fn();
    const wrapper = shallow(<TableDropdown changeStatus={changeStatus} id={fakeOrders[0].id} status={fakeOrders[0].status}/>); 

    expect(wrapper.find('Dropdown').exists()).toBeTruthy();
});

it("render TableDropdown props correctly", () =>{
    const changeStatus = jest.fn();
    const wrapper = shallow(<OrderTable orders={fakeOrders} changeStatus={changeStatus} setSelectedOrder={''} setModalShow={false} setDate={''} setTime={''}/>); 
    
    expect(wrapper.find('TableDropdown').at(0).props().status).toBe(fakeOrders[0].status);
    expect(wrapper.find('TableDropdown').at(1).props().status).toBe(fakeOrders[1].status);
});

