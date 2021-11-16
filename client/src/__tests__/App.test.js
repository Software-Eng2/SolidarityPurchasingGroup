/**
* @jest-environment node
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import API from '../API';
import {Order, OrdersList } from '../Order';
const client = require('../Client');
const product = require('../Product');

let clientObject = new client.ClientsList();
let productObject = new product.ProductsList();

/* -------------- CLIENT -------------- */

test('c-getClients', () => {
    //for now only 3 clients present in DB. Modify the toEqual if more clients are stored
    return clientObject.initialize().then(() => expect(clientObject.getClients().length).toEqual(3));
});

//adding one more client -> testing the createUser API
test('c-addClient', () => {
    clientObject.addClient('Andrea', 'Di Mauro', '11/03/1998', 'andrea@email.com', 'pass',1).then(() =>
    expect(clientObject.getClients().length).toEqual(4));
})

//testing the getFromId
test('c-getFromId', () => {
    expect(clientObject.getClientFromId(2)[0].name).toEqual('Marco');
})

/* ---------------------------------- */

/* ---------- PRODUCTS ---------- */

test('p-getProducts', () => {
    //WARNING: for now only 20 clients present in DB. Modify the toEqual if more products are stored
    return productObject.initialize().then(() => expect(productObject.getProducts().length).toEqual(20))
})

//adding one more client -> testing the createUser API
test('p-addProduct', () => {
    return productObject.addProduct("boh", "boh", 0.78, "Fruits", 0,12,"boh", 4).then(() =>
    expect(productObject.getProducts().length).toEqual(21));
})

test('p-getProductsFromCategory', () => {
    return expect(productObject.getProductsFromCategory("Fruits").length).toEqual(6);
})

//updating confirmed status test
test('p-updateConfirmed', () =>{
    return productObject.updateConfirm(21,1).then(() => productObject.initialize().then(() => expect(productObject.getProductsFromId(21)[0].confirmed).toEqual(1)))
})

/* ---------------------------------- */

/* ---------- ORDER ---------- */
test('o-getAllOrders',()=>{
    API.logIn("mariorossi@gmail.com","mariorossi");
    const orders = new OrdersList();
    return orders.initialize().then(()=>{expect(orders.getOrders().length).toEqual(5)})
});

test('o-createOrder',()=>{
    const fakeOrder = new Order('21/01/2021',2,10, 'pending',0,'Corso Castelfidardo 2','23/01/2021','16:00');
    expect(API.createOrder(fakeOrder)).toBeTruthy();
});

/* test('o-changeStatusTrue',()=>{
    const fakeIdOrder = 2;
    const fakeStatus = 'accepted';
    return expect(API.changeStatus(fakeIdOrder,fakeStatus)).toBe(true);
});
test('o-changeStatusFalse',()=>{
    const fakeIdOrder = 30000;
    const fakeStatus = 'accepted';
    return expect(API.changeStatus(fakeIdOrder,fakeStatus)).toBe(false);
});

test('o-changeDateTimeTrue',()=>{
    const fakeIdOrder = 2;
    const fakeDate = '30/01/2021';
    const fakeTime = '17:00';
    return expect(API.changeDateTime(fakeIdOrder,fakeDate,fakeTime)).toBe(true);
});

test('o-changeDateTimeFalse',()=>{
    const fakeIdOrder = 30000;
    const fakeDate = '30/01/2021';
    const fakeTime = '17:00';
    return expect(API.changeDateTime(fakeIdOrder,fakeDate,fakeTime)).toBe(false);
});
 */







