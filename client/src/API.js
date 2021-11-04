import {Client} from './Client'
import { Product } from './Product';
const BASEURL = '/api';

async function getAllClients(){

    const response = await fetch(BASEURL + '/clients');
  
    const clients = await response.json();
  
    if (response.ok) {
        return clients.map((c) => new Client(c.ID, c.NAME, c.SURNAME, c.AGE, c.SEX, c.WALLET_ID));
    } else {
        return undefined;
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

export {getAllClients, getAllProducts}