import API from "../API";

/* ------------------------------------------------ */

/*
 * Tested functions: getClientAcceptedOrders
 *                   getClientPendingOrders
 *                   getCancellingOrdersByClientId
*/

var fakeOrder = {
    creation_date: '2021-12-8',
    client_id: 2,
    total: 3.55,
    pick_up: 1,
    address: 'prova',
    date: 'prova',
    time: 'prova'
  };

var fakeOrder2 = {
    creation_date: '2021-12-8',
    client_id: 2,
    total: 4.19,
    pick_up: 0,
    address: 'prova',
    date: 'prova',
    time: 'prova'
  };

  var fakeOrder3 = {
    creation_date: '2021-12-8',
    client_id: 2,
    total: 6.12,
    pick_up: 1,
    address: 'prova',
    date: 'prova',
    time: 'prova'
  };

test('', async () => {

    //Create an order
    const orderId =  await API.createOrder(fakeOrder);
    const orderId1 =  await API.createOrder(fakeOrder2);
    const orderId2 =  await API.createOrder(fakeOrder3);

    //Change status 
    await API.changeStatus(orderId.id, 'ACCEPTED');
    await API.changeStatus(orderId2.id, 'CANCELLING');

    //Verify correct insertion
    const ordersAccepted = await API.getClientAcceptedOrders(2);
    const ordersPending = await API.getClientPendingOrders(2);
    const ordersCancelling = await API.getCancellingOrdersByClientId(2);
    expect(ordersAccepted.length >= 1).toEqual(true);
    expect(ordersPending.length >= 1).toEqual(true);
    expect(ordersCancelling.length >= 1).toEqual(true);


    await API.deleteOrder(orderId.id);
    await API.deleteOrder(orderId1.id);
    await API.deleteOrder(orderId2.id);
})

/* ------------------------------------------------------------------- */

/* ------------------------------------------------------------------- */

/**
 * Tested functions: createBasket
 *                   getOrderedByFarmerByDate
 */

test('', async () =>  {

    //Create an order
    const orderId =  await API.createOrder(fakeOrder3);

    //Create basket
    const basketCreated = await API.createBasket({order_id : orderId.id, product_id: 20, quantity: 5, updated: 0});
    expect(basketCreated.inserted).toEqual(true);

    const ordersOfProduct20 = await API.getOrderedByFarmerByDate(20);

    var totQuant = 0;
    ordersOfProduct20.map((o) => {
        totQuant = totQuant + o.quantity;
    })

    expect(totQuant >=5 ).toEqual(true);

    const basket = await API.getBasket(orderId.id);
    expect(basket[0].id).toEqual(20);
    expect(basket[0].quantity).toEqual(5);

    await API.deleteOrder(orderId.id);

})

/* ------------------------------------------------------------------- */

/* ------------------------------------------------------------------- */

/**
 * Tested functions: getProductsByFarmer
 */


test('', async () => {

    const productOfFarmer6 = await API.getProductsByFarmer(6);

    expect( productOfFarmer6[0].id).toEqual(21);
    expect( productOfFarmer6[1].id).toEqual(22);
})



/* ------------------------------------------------------------------- */

/* ------------------------------------------------------------------- */

/**
 * Tested functions: createProductNW,
  changeProductNW,
  deleteProductNW,
  deleteAllUserProductNW,
  deleteAllProductNW,
 */

  test('', async () => {

    await API.createProductNW({id_user:2, id_product:"prova", quantity:7,price:3});

    let productNW = await API.getProductNW(2);

    expect( productNW[0].id_user).toEqual(2);
    expect( productNW[0].id_product).toEqual('prova');
    expect( productNW[0].quantity).toEqual(7);
    expect( productNW[0].price).toEqual(3);

    await API.changeProductNW(1, 10);

    productNW = await API.getProductNW(2);

    expect( productNW[0].quantity).toEqual(10);

    await API.deleteProductNW(1);

    await API.createProductNW({id_user:2, id_product:"prova", quantity:7,price:3});
    await API.createProductNW({id_user:2, id_product:"prova2", quantity:10 ,price:3});
    await API.createProductNW({id_user:3, id_product:"prova3", quantity:15 ,price:5});


    await API.deleteAllUserProductNW(2);

    productNW = await API.getProductNW(2);

    expect((productNW)).toEqual([]);

    productNW = await API.getProductNW(3);
    expect((productNW)).toEqual([{"id": 3, "id_product": "prova3", "id_user": 3, "price": 5, "quantity": 15}]);
    await API.deleteAllUserProductNW(3);

    

});