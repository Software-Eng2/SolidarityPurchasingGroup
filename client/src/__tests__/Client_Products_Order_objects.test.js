/**
* @jest-environment node
*/
import API from '../API';
import {Order} from '../Order';
const client = require('../Client');
const product = require('../Product');
const order = require('../Order');

let clientObject = new client.ClientsList();
let productObject = new product.ProductsList();
let orders = new order.OrdersList();


afterAll(async () => {
    const order_id = orders.getOrderFromId(orders.ordersList[0].id)[0].id;
    const product_id = productObject.getProducts()[productObject.getProducts().length-1].id;
    const client_id1 = clientObject.getClients()[clientObject.getClients().length-1].id;
    const client_id2 = client_id1-1;
    await API.deleteOrder(order_id).then(()=>console.log('test order deleted'));
    await API.deleteProduct(product_id).then(()=>console.log('test product deleted'));
    await API.deleteClient(client_id1).then(()=>console.log('test client ' + client_id1 + ' deleted'));
    //await API.deleteClient(client_id2).then(()=>console.log('test client ' + client_id2 + ' deleted')); 
});

/* -------------- CLIENT -------------- */

/* Testing when object is not initialized */
test('c- addClient', async () => {
    const result = await clientObject.addClient();
    expect(result).toEqual(undefined)
})

test('c- getCLients', () => {
    expect(clientObject.getClients()).toEqual(undefined)
})

test('c- getClientFromId', () => {
    expect(clientObject.getClientFromId()).toEqual(undefined)
})
/* -------------------------------------- */

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

test('c-Client.updateWallet', async () => {
    const response = await clientObject.getClientFromId(2)[0].updateWallet(20);
    expect(response).toEqual(true);
})

/* ---------------------------------- */

/* ---------- PRODUCTS ---------- */

/* Testing when object is not initialized */
test('p-getProducts', () => {
    expect(productObject.getProducts()).toEqual(undefined);
})

test('p-addProduct', async () => {
    const result = await productObject.addProduct();
    expect(result).toEqual(undefined);
})

test('p-getProductsFromCategory', () => {
    expect(productObject.getProductsFromCategory("Fruits")).toEqual(undefined);
})

test('p-updateConfirmed', async () =>{
    const result = await productObject.updateConfirm();
    expect(result).toEqual(undefined);
})
/*---------------------------------------- */

test('p-getProducts', () => {
    //WARNING: for now only 20 clients present in DB. Modify the toEqual if more products are stored
    return productObject.initialize().then(() => expect(productObject.getProducts().length).toEqual(20))
})

//adding one more product -> testing the createUser API
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
    return orders.initialize().then(()=>{expect(orders.getOrders().length).toEqual(6)})
});

test('o-createOrder',()=>{
    const fakeOrder = new Order(38,'21/01/2021',2, 'testName', 'testSurname',10,'23/01/2021','16:00', 0, 'Via dei Test, 0, Test, 00000', 'PENDING');
    expect(API.createOrder(fakeOrder)).toBeTruthy();
});

test('o-changeStatusTrue',()=>{
    const fakeStatus = 'ACCEPTED';
    return orders.initialize().then(()=>{
        const order_id = orders.getOrderFromId(orders.ordersList[orders.getOrders().length-1].id)[0].id;
        expect((API.changeStatus(order_id, fakeStatus))).toBeTruthy();
    });
});

test('o-changeDateTimeTrue',()=>{
    const fakeDate = '30/01/2021';
    const fakeTime = '17:00';

    return orders.initialize().then(()=>{
        const order_id = orders.getOrderFromId(orders.ordersList[orders.getOrders().length-1].id)[0].id;
        expect((API.changeDateTime(order_id,fakeDate,fakeTime))).toBeTruthy();
    });
});
