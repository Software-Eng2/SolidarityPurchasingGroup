/**
* @jest-environment node
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

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







