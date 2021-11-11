"use strict";
const db = require('./db');

//const { logIn } = require('../client/src/API');


// get all the clients
exports.getAllClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT USERS.id, USERS.name, USERS.surname, USERS.birthdate, USERS.email, USERS.isConfirmed FROM USERS WHERE USERS.role = "client"';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const clients = rows.map((c) => ({ id: c.id, name: c.name, surname: c.surname, birthdate: c.birthdate, email: c.email, isConfirmed: c.isConfirmed }));
            resolve(clients);
        });
    })
};

// add a new client TODO = chiedere andrea la modalità di scelta della password
 exports.createClient = (client) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO USERS (role,name,surname,birthdate,email,password,isConfirmed) VALUES(?,?,?,?,?,?,?)';
      
      db.run(sql, [client.role, client.name, client.surname, client.birthdate, client.email, client.password], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  }; 

// get all the products
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM PRODUCTS';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const products = rows.map((p) => ({ id: p.id, name: p.name,description: p.description, category: p.category, quantity: p.quantity, price: p.price, farmer_id: p.farmer_id, img_path: p.img_path, confirmed: p.confirmed }));
            resolve(products);
        });
    })
};

// add a new product 
exports.createProduct = (product) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO PRODUCTS(name,description,category,quantity, price, farmer_id, img_path, confirmed) VALUES(?,?,?,?,?,?,?,?)';
      
      db.run(sql, [product.name, product.description, product.category, product.quantity, p.price, p.farmer_id, p.img_path, p.confirmed,], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

//update the confirmed field of a product
exports.updatedConfirmedProduct = (confirmed, id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE PRODUCTS SET confirmed = ? WHERE id = ?';
        db.run(sql, [confirmed, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};