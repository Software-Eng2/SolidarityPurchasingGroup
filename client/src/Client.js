import { getAllClients } from "./API";

/**
 * Client object
 * 
 * Params to pass to the constructor of the object:
 * @param {number} id - id of the client
 * @param {string} name - name of the client
 * @param {string} surname - surname of the client
 * @param {string} sex - sex of the client
 * @param {number} age - age of the client
 * @param {number} walletID - id of the wallet linked to this client
 */
class Client{
    constructor(id, name, surname, age, sex, walletID){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.walletID = walletID;
        this.sex = sex;
        this.age = age;
    }

    getId = () => {
        return this.id;
    }

}

/**
 * ClientList object -- used to manage clients of the shop 
 * WARNING: object must be initialized with initialize() method
 * after being created
 * 
 * @param {Function} initialize - load data from the DB
 * @param {Function} getClients - returns an array of Clients objects
 * @param {Function} getClientFromId - returns a Client object matching the specified id
 */
class ClientsList{

    constructor(){
        this.init = false;
        this.clientsList = [];
    }

    /**
     * Retreive data from the database
     * 
     * @return {boolean} return true if the clientsList is correctly initialized with DB data, false otherwise
     */
    async initialize(){
        this.clientsList = await getAllClients();

        if(this.clientsList === undefined){
            return false;
        }

        this.init = true;
        return true;
    }

    /**
     * Retreive all clients
     * 
     * @return {Array} array with Clients type objects, returns undefined if the object as not correctly initialized
     */
    getClients(){

        if(!this.init){
            return undefined;
        }

        return this.clientsList;
    }

    /**
     * Get a client with a specific ID
     * 
     * @param {number} id - id of the client
     * @return {Client} return Client object with the specified id, undefined in case of non initialized object, [] in case of client not found
     */
    getClientFromId(id){

        if(!this.init){
            return undefined;
        }

        return this.clientsList.filter((c) => c.getId() === id);

    }
}

export {Client, ClientsList}