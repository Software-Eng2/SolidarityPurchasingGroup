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
            const products = rows.map((p) => ({ ID: p.ID, NAME: p.NAME,DESCRIPTION: p.DESCRIPTION, CATEGORY: p.CATEGORY, QUANTITY: p.QUANTITY, CONFIRMED: p.CONFIRMED, FARMER_ID: p.FARMER_ID, IMG_PATH: p.IMG_PATH, PRICE: p.PRICE }));
            resolve(products);
        });
    })
};

// add a new product 
exports.createProduct = (product) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO PRODUCTS(NAME,DESCRIPTION,CATEGORY,QUANTITY, CONFIRMED, FARMER_ID, IMG_PATH, PRICE) VALUES(?,?,?,?,?,?,?,?)';
      
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

exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ORDERS';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const orders = rows.map((o) => ({ id: o.id, creation_date: o.creation_date, client_id: o.client_id, total: o.total, status: o.status, pick_up: o.pick_up, address: o.address, date: o.date, time: o.time }));
      resolve(orders);
    });
  })
};

exports.createOrder = (order) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ORDERS (creation_date, client_id, total, status, pick_up, address, date, time) VALUES(?,?,?,?,?,?,?,?)';
    db.run(sql, [order.creation_date, order.client_id, order.total, order.status, order.pick_up, order.address, order.date, order.time], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  })
};

// add a new wallet 
exports.createWallet = (clientID) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO WALLETS(AMOUNT, CLIENT_ID) VALUES(?,?)';
    
    db.run(sql, [0, clientID], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};


//update the amount on a wallet
exports.updateWallet = (value, client_id) => {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE WALLETS SET AMOUNT = ? WHERE CLIENT_ID = ?';

      db.run(sql, [value, client_id], function (err) {
          if (err) {
              reject(err);
              return;
          }
          resolve(this.lastID);
      });

  });
};