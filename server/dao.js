"use strict";
const db = require('./db');

//const { logIn } = require('../client/src/API');


// get all the clients
exports.getAllClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT USERS.id, USERS.name, USERS.surname, USERS.birthdate, USERS.email, USERS.isConfirmed, WALLETS.amount FROM USERS INNER JOIN WALLETS ON USERS.id = WALLETS.client_id WHERE USERS.role = "client" ';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const clients = rows.map((c) => ({ id: c.id, name: c.name, surname: c.surname, birthdate: c.birthdate, email: c.email, isConfirmed: c.isConfirmed, amount: c.amount }));
            resolve(clients);
        });
    })
};

// add a new user
 exports.createUser = (user) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO USERS (role,name,surname,birthdate,email,password,isConfirmed) VALUES(?,?,?,?,?,?,?)';
      
      db.run(sql, [user.role, user.name, user.surname, user.birthdate, user.email, user.password, user.isConfirmed], function (err) {
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
      
      db.run(sql, [product.name, product.description, product.category, product.quantity, product.price, product.farmer_id, product.img_path, product.confirmed], function (err) {
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
//retrieve all orders
exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ORDERS.id, ORDERS.creation_date, ORDERS.client_id, USERS.name, USERS.surname, ORDERS.total, ORDERS.status, ORDERS.pick_up, ORDERS.address, ORDERS.date, ORDERS.time FROM ORDERS INNER JOIN USERS ON ORDERS.client_id = USERS.id ORDER BY ORDERS.id DESC';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const orders = rows.map((o) => ({ id: o.id, creation_date: o.creation_date, client_id: o.client_id, name: o.name, surname: o.surname, total: o.total, status: o.status, pick_up: o.pick_up, address: o.address, date: o.date, time: o.time }));
      resolve(orders);
    });
  })
};

//add a new order in db
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

//change status of an order
exports.changeStatus = (order_id, status) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE ORDERS SET status = ? WHERE id = ?';
    db.run(sql, [status, order_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
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
      const sql = 'UPDATE WALLETS SET amount = ? WHERE client_id = ?';

      db.run(sql, [value, client_id], function (err) {
          if (err) {
              reject(err);
              return;
          }
          resolve(this.lastID);
      });

  });
};

// add a new basket
exports.createBasket = (basket) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO BASKETS (order_id, product_id, quantity) VALUES(?,?,?)';
    
    db.run(sql, [basket.order_id, basket.product_id, basket.quantity], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
};