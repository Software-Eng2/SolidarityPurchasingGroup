/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, cleanup, fireEvent, screen} from "@testing-library/react";
import {Button, Col, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import MonthlyReports from "../components/MonthlyReports";
import {MonthlyReport, ProductTable, UnretrievedFoodReport} from "../components/MonthlyReports";
import OrdersList, {OrderTable} from "../components/OrdersList";

afterEach(() => {
    cleanup();
});
configure({ adapter: new Adapter() });
// Fake variables
const fakeProducts = [{id: "0",
    name: "name1",
    description: "description1",
    category: "category1",
    quantity: 100,
    price: 100,
    farmer_id: 4,
    img_path: "some-img-path-1",
    confirmed: 1},
    {id: "2",
        name: "name2",
        description: "description2",
        category: "category2",
        quantity: 100,
        price: 100,
        farmer_id: 4,
        img_path: "some-img-path-2",
        confirmed: 1},
    {id: "3",
        name: "name3",
        description: "description3",
        category: "category3",
        quantity: 100,
        price: 100,
        farmer_id: 4,
        img_path: "some-img-path-3",
        confirmed: 1}];

const fakeOrders = [
    {
        id: 28,
        creation_date: '2021-11-16',
        client_id: 2,
        client_name: 'Marco',
        client_surname: 'Bianchi',
        total: 0.75,
        date: '2021-11-30',
        time: '10:00',
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
        date: '',
        time: '',
        pick_up: 0,
        address: 'Via dei Test, 0',
        status: 'ACCEPTED'
    }
];

const fakeClock = "Mon Jan 10 2022 11:40:44 GMT+0100 (Ora standard dell’Europa centrale)";

it('renders WeeklyReports without crashing', () => {
    const page = shallow(<MonthlyReports orders={fakeOrders}/>);
    expect(page).toBeTruthy();
    expect(page.find('div').exists()).toBeTruthy();
    expect(page.find('MonthlyReport').exists()).toBeTruthy();
});

it("renders button correctly", () => {
    const { getByTestId } = render(
        <Button data-testid="button-back" size="md" className="mb-5 ml-5">Back</Button>
    );
    expect(getByTestId('button-back')).toHaveTextContent("Back");
});

it('includes link to monthly reports', () => {
    const wrapper = shallow(<MonthlyReports orders={fakeOrders}/>);
    expect(wrapper.find(Link).at(0).props().to).toStrictEqual({ pathname: '/manager' });
});

it("accept props correctly", () => {
    const wrapper = shallow(<MonthlyReports orders={fakeOrders}/>)

    expect(wrapper.find('MonthlyReport').at(0).props().orders).toBe(fakeOrders);
    expect(wrapper.find('MonthlyReport').at(1).props().orders).toBe(fakeOrders);
});

it("render ProductTable components correctly", () =>{
    const wrapper = shallow(<ProductTable products={fakeProducts}/>);

    expect(wrapper.find('thead').exists()).toBeTruthy();
    expect(wrapper.find('tbody').exists()).toBeTruthy();
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('td').exists()).toBeTruthy();
});


it("render UnretrievedFoodReport components correctly", () =>{
    const getTotalFoodEuro= jest.fn();
    const getTotalFood= jest.fn();
    const filterProducts= jest.fn();

    const wrapper = shallow(<UnretrievedFoodReport getTotalFoodEuro={getTotalFoodEuro} getTotalFood={getTotalFood} filterProducts={filterProducts} month={1} monthString={"01"} year={"2021"}/>);

    expect(wrapper.find('h6').at(0).exists()).toBeTruthy();
    expect(wrapper.find('h6').at(1).exists()).toBeTruthy();
    expect(wrapper.find('ProductTable').exists()).toBeTruthy();
});

