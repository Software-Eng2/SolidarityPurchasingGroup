"use strict";
const db = require('./db');

//const { logIn } = require('../client/src/API');


// get all the clients
exports.getAllClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM CLIENTS';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const clients = rows.map((c) => ({ ID: c.ID, NAME: c.NAME, SURNAME: c.SURNAME, ROLE: c.ROLE, BIRTHDATE: c.BIRTHDATE, EMAIL: c.EMAIL, PASSWORD: c.PASSWORD }));
            resolve(clients);
        });
    })
};

// add a new client
exports.createClient = (client) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO CLIENTS(NAME,SURNAME,ROLE,BIRTHDATE,EMAIL,PASSWORD) VALUES(?,?,?,?,?,?)';
      
      db.run(sql, [client.NAME, client.SURNAME, client.ROLE, client.BIRTHDATE, client.EMAIL, client.PASSWORD], function (err) {
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
            const products = rows.map((p) => ({ ID: p.ID, NAME: p.NAME,DESCRIPTION: p.DESCRIPTION, CATEGORY: p.CATEGORY, QUANTITY: p.QUANTITY, CONFIRMED: p.CONFIRMED, FARMER_ID: p.FARMER_ID, IMG_PATH: p.IMG_PATH, PRICE: p.PRICE }));
            resolve(products);
        });
    })
};

// add a new product
exports.createProduct = (product) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO CLIENTS(NAME,DESCRIPTION,CATEGORY,QUANTITY, CONFIRMED, FARMER_ID, IMG_PATH, PRICE) VALUES(?,?,?,?,?,?,?,?)';
      
      db.run(sql, [product.NAME, product.DESCRIPTION, product.CATEGORY, product.QUANTITY,  p.CONFIRMED, p.FARMER_ID, p.IMG_PATH, p.PRICE], function (err) {
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
        const sql = 'UPDATE PRODUCTS SET CONFIRMED = ? WHERE id = ?';
        db.run(sql, [confirmed, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};