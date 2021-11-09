import {Client} from './Client'
import { Order } from './Order';
import { Product } from './Product';
const BASEURL = '/api';

function getAllClients(){
    return new Promise((resolve,reject) => {
      fetch(BASEURL+'/clients').then((response)=>{
        if(response.ok){
          response.json().then((json)=>{
            const clients = json.map((clientJson) => Client.from(clientJson));
            console.log(clients);
            resolve(clients);
          }).catch((err)=>reject(err));
        } else reject();
      }).catch((err) => reject(err));
    });
}

async function createClient(c) {
    try {
      const response = await fetch(BASEURL + '/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role: c.role, name: c.name, surname: c.surname, birthdate: c.birthdate, 
            email: c.email, password: c.password })
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

async function getAllProducts(){

    const response = await fetch(BASEURL + '/products');
  
    const products = await response.json();
  
    if (response.ok) {
        return products.map((p) => new Product(p.ID, p.NAME, p.DESCRIPTION, p.CATEGORY, p.QUANTITY, p.EXPIRE, p.FARMER_ID));
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
        {
          NAME: p.NAME, DESCRIPTION: p.DESCRIPTION, CATEGORY: p.CATEGORY, QUANTITY: p.QUANTITY, CONFIRMED: p.CONFIRMED,
          FARMER_ID: p.FARMER_ID, IMG_PATH: p.IMG_PATH, PRICE: p.PRICE
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

async function getAllOrders() {

  const response = await fetch(BASEURL + '/orders');

  const orders = await response.json();

  if (response.ok) {
    return orders.map((o) => new Order(o.id, o.creation_date, o.client_id, o.total, o.status, o.pick_up, o.address, o.date, o.time));
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
          status: o.status,
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
  
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  
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

if (response.ok) {
  return true;
} else {
  return false;
}
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
  });
};

const API = {
  getAllClients,
  getAllProducts,
  updateConfirmedProduct,
  createClient,
  createProduct,
  getAllOrders,
  createOrder,
  logIn,
  logOut,
  getUserInfo,
  updateWallet
}

export default API;