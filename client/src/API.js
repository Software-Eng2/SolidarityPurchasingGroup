import {Client} from './Client'
import { Order } from './Order';
import { Product } from './Product';
import "jest-fetch-mock" //decommentare per il testing

//const BASEURL = '/api';

/*
//TO UNCOMMENT IN CASE OF TESTING
*/
const BASEURL = 'http://localhost:3001/api';

function getAllClients(){
    return new Promise((resolve,reject) => {
      fetch(BASEURL+'/clients').then((response)=>{
        if(response.ok){
          response.json().then((json)=>{
            const clients = json.map((clientJson) => Client.from(clientJson));
            resolve(clients);
          }).catch((err)=>reject(err));
        } else reject();
      }).catch((err) => reject(err));
    });
}

async function createUser(u) {

    try {
      const response = await fetch(BASEURL + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {role: u.role, name: u.name, surname: u.surname, birthdate: u.birthdate, 
            email: u.email, password: u.password, isConfirmed : u.isConfirmed }
          )
      })
      const newID = await response.json();
  
      if (!response.ok) {
        console.log(response);
        throw response;
      }
  
      return newID.id;
    }
    catch {
      return false;
    }
}

async function getAllProducts(){

    const response = await fetch(BASEURL + '/products');
  
    const products = await response.json();
  
    if (response.ok) {
        return products.map((p) => new Product(p.id, p.name, p.description, p.category, p.quantity, p.price, p.farmer_id, p.img_path, p.confirmed));
    } else {
        return undefined;
    }
}

async function createProduct(p) {
    try {
      const response = await fetch(BASEURL + '/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            { name: p.name,description: p.description, category: p.category, quantity: p.quantity, price: p.price , 
              farmer_id: p.farmer_id, img_path: p.img_path, confirmed: p.confirmed}
        )
      })
      const newID = await response.json();
  
      if (!response.ok) {
        console.log(response);
        throw response;
      }
  
      return newID.id;
    }
    catch {
      return false;
  }

}

async function getAllOrders() {

  const response = await fetch(BASEURL + '/orders');

  const orders = await response.json();

  if (response.ok) {
    return orders.map((o) => new Order(o.id, o.creation_date, o.client_id, o.name, o.surname, o.total, o.date, o.time, o.pick_up, o.address, o.status));
  } else {
    return undefined;
  }
}

async function createOrder(o) {
  try {
    const response = await fetch(BASEURL + '/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          creation_date: o.creation_date,
          client_id: o.client_id,
          total: o.total,
          status: 'PENDING',
          pick_up: o.pick_up,
          address: o.address,
          date: o.date,
          time: o.time
        }
      )
    })
    const newID = await response.json();

    if (!response.ok) {
      throw response;
    }

    return newID;
  }
  catch {
    return false;
  }

}

async function updateConfirmedProduct(confirmed, id) {

    const response = await fetch(BASEURL + '/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmed: confirmed,
          id:id
        })
      });
  
    return response.ok;
    
}

async function changeStatus(order_id, status) {

  const response = await fetch(BASEURL + '/orders/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: order_id,
        status: status
      })
    });

    return response.ok;
}

async function changeDateTime(order_id, date, time) {

  const response = await fetch(BASEURL + '/orders/datetime', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: order_id,
        date: date,
        time: time
      })
    });

  return response.ok;

}

async function updateWallet(amount, clientID){
  const response = await fetch(BASEURL + '/wallets', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: amount,
      id: clientID
    })
  });
  return response.ok;
}

function logIn(username, password) {
  return new Promise((resolve, reject) => {
    fetch(BASEURL+'/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          resolve([user.name,user.id]);
        }).catch((err) => reject(err));
      } else {
        reject();
      }
    }).catch((err) => reject(err));
  });
};

async function logOut() {
  await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    fetch(BASEURL+'/sessions/current')
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            resolve(userInfo);
          }).catch((err) => reject(err));
        } else {
          reject();
        }
      }).catch((err) => reject(err));
  })
}

async function createBasket(b) {
  try {
    const response = await fetch(BASEURL + '/basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          order_id: b.order_id,
          product_id: b.product_id,
          quantity: b.quantity
        }
      )
    })
    const inserted = await response.json();

    if (!response.ok) {
      throw response;
    }

    return inserted;
  }
  catch {
    return false;
  }

}

async function getBasket(order_id) {

  const response = await fetch(BASEURL + '/basket/' + order_id);

  const products = await response.json();

  if (response.ok) {
    return products/* .map((p) =>{new Product(p.id, p.name,'' ,'' ,p.quantity, p.price,'','','')}) */;
  } else {
    return undefined;
  }
}


const API = {
  getAllClients,
  getAllProducts,
  updateConfirmedProduct,
  createUser,
  createProduct,
  getAllOrders,
  createOrder,
  changeStatus,
  changeDateTime,
  logIn,
  logOut,
  getUserInfo,
  updateWallet,
  createBasket,
  getBasket
}

export default API;