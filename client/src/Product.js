import { getAllProducts } from "./API";

/**
 * Product object
 * 
 * Params to pass to build the object:
 * @param {number} id - id of the product
 * @param {string} name - name of the product
 * @param {string} description - description of the product
 * @param {string} category - category of the prodct
 * @param {number} quantity - number of units of products present
 * @param {string} expire - expiration date if present in string "dd/mm/aaaa"
 * @param {number} farmer_id - id of the farmer who sells the product
 * @param {string} img_path - path of the image relative to the product
 * 
 */
class Product{
    constructor(id, name, description, category, quantity, expire, farmer_id, img_path){
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.expire = expire;
        this.farmer_id = farmer_id;
        this.img_path = img_path;
    }
}

/**
 * ProductsList object -- used to manage products of the shop 
 * WARNING: object must be initialized with initialize() method
 * after being created
 * 
 * @param {Function} initialize - load data from DB
 * @param {Function} getProducts - return an array of Product objects
 * @param {Function} getProductsFromId - return an array with the Product object with the specified id
 * @param {Function} getProductsFromCategory - return an array of Product objects with the specified category
 */
class ProductsList{

    constructor(){
        this.init = false;
        this.productsList = [];
    }

    /**
     * Retreive data from the database
     * 
     * @return {boolean} return true if the productsList is correctly initialized with DB data, false otherwise
     */
    async initialize(){

        this.productsList = await getAllProducts();

        if(this.productsList === undefined){
            return false;
        }

        this.init = true;
        return true;
    }

    /**
     * Retreive all products
     * 
     * @return {Array} array with Product type objects, returns undefined if the object as not correctly initialized
     */
    getProducts(){

        if(!this.init){
            return undefined;
        }

        return this.productsList;
    }

    /**
     * Get a product with a specific ID
     * 
     * @param {number} id - id of the product
     * @return {Array} return an array with the Product object with the specified id, undefined in case of non initialized object
     */
    getProductsFromId(id){

        if(!this.init){
            return undefined;
        }

        return this.productsList.filter((p) => p.id === id);

    }

    /**
     * Get products belonging to the specified category
     * 
     * @param {number} category - id of the product
     * @return {Array} return an array with the Products objects with the specified id, undefined in case of non initialized object
     */
    getProductsFromCategory(category){

        if(!this.init){
            return undefined;
        }

        return this.productsList.filter((p) => p.category === category);
    }

}

export {Product, ProductsList}