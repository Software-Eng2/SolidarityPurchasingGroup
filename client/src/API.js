import {Client} from './Client'
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

export {getAllClients}