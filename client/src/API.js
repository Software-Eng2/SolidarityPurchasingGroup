import {Client} from './Client'
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
  logIn,
  logOut,
  getUserInfo
}

export default API;