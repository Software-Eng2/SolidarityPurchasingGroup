"use strict";
const db = require('./db');

db.get("PRAGMA foreign_keys = ON")

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

// get specific client by id

exports.getClientById = (client_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT USERS.id, USERS.name, USERS.surname, USERS.birthdate, USERS.email, USERS.isConfirmed, WALLETS.amount FROM USERS INNER JOIN WALLETS ON USERS.id = WALLETS.client_id WHERE WALLETS.client_id = ? AND USERS.role = "client" ';
    db.get(sql, [client_id], (err, row) => {
        if (err) {
            reject(err);
            return;
        }
        const client = { id: row.id, name: row.name, surname: row.surname, birthdate: row.birthdate, email: row.email, isConfirmed: row.isConfirmed, amount: row.amount };
        console.log(client);
        resolve(client);
    });
})
}

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
//get the quantity ordered of a products filtered by farmer id
exports.getOrderedProducts = (farmer_id) => {
  return new Promise((resolve,reject)=>{
    const sql = 'SELECT product_id, name, sum(BASKETS.quantity) AS totalOrdered FROM BASKETS INNER JOIN PRODUCTS ON BASKETS.product_id = PRODUCTS.id WHERE PRODUCTS.farmer_id = ? GROUP BY product_id';
    db.all(sql, [farmer_id], (err,rows) => {
      if(err){
        reject(err);
        return;
      }
      const orderedProducts = rows.map((op)=>({id: op.id, name: op.name, amount: op.totalOrdered }));
      resolve(orderedProducts);
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
//update date and time of an order
exports.changeDateTime = (order_id, date, time) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE ORDERS SET date = ?, time = ? WHERE id = ?';
    db.run(sql, [date, time, order_id], function (err) {
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

// retrieve a basket from a order id
exports.getBasket = (order_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT BASKETS.product_id, PRODUCTS.name, PRODUCTS.price, BASKETS.quantity FROM BASKETS INNER JOIN PRODUCTS ON BASKETS.product_id = PRODUCTS.id WHERE BASKETS.order_id = ?';
    db.all(sql, [order_id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const products = rows.map((p) => ({ id: p.product_id, name: p.name, price: p.price, quantity: p.quantity }));
      resolve(products);
    });
  })
};

//update avaiability of product when an order is issued
exports.changeQuantity = (product_id, order_quantity) => {
  return new Promise((resolve,reject)=>{
    const sql = 'UPDATE PRODUCTS SET quantity = quantity - ? WHERE id = ?';
    db.run(sql,[order_quantity,product_id], function(err){
      if(err){
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// add a new notification
exports.createNotification = (description, client_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO NOTIFICATIONS(description, client_id) VALUES(?,?)';
    
    db.run(sql, [description,client_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// get all the products
exports.getNotifications = (id) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM NOTIFICATIONS WHERE client_id = ?';
      db.all(sql, [id], (err, rows) => {
          if (err) {
              reject(err);
              return;
          }
          const notifications = rows.map((n) => ({ id: n.id, description: n.description, client_id: n.client_id }));
          resolve(notifications);
      });
  })
};

// delete a notification
exports.deleteNotification = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM NOTIFICATIONS WHERE client_id = ?';
    
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// get cancelling orders by client id

exports.getCancellingOdersByClientId = (client_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ORDERS.id, ORDERS.creation_date, ORDERS.client_id, ORDERS.total, WALLETS.amount FROM ORDERS JOIN USERS JOIN WALLETS WHERE USERS.id = WALLETS.client_id AND USERS.role = "client" AND USERS.id = ORDERS.client_id AND USERS.id = ? AND ORDERS.status =  "CANCELLING"  ';
    db.all(sql, [client_id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const orders = rows.map((o) => ({ id: o.id, creation_date: o.creation_date, client_id: o.client_id, total: o.total, wallet: o.amount }));
      resolve(orders);
    });
})
}


// get products by farmer id
exports.getProductsByFarmer = (farmer_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM PRODUCTS WHERE farmer_id = ?';
        db.all(sql, [farmer_id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const products = rows.map((p) => ({ id: p.id, name: p.name,description: p.description, category: p.category, quantity: p.quantity, price: p.price, farmer_id: p.farmer_id, img_path: p.img_path, confirmed: p.confirmed }));
            resolve(products);
        });
  })
}

// delete a product by id
exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM PRODUCTS WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// delete a order by id
exports.deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM ORDERS WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// delete a client by id
exports.deleteWallet = (client_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM WALLETS WHERE client_id = ?';
    db.run(sql, [client_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// delete a client by id
exports.deleteClient = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM USERS WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

//get all product for next week
exports.getProductsForNextWeek = (id) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM PRODUCTS_NEXT_WEEK WHERE id_user = ?';
      db.all(sql, [id], (err, rows) => {
          if (err) {
              reject(err);
              return;
          }
          const products = rows.map((p) => ({ id: p.id, id_user: p.id_user, id_product: p.id_product, quantity: p.quantity, price: p.price}));
          resolve(products);
      });
  })
};

//add a new product for next week
exports.createProductForNextWeek = (product) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO PRODUCTS_NEXT_WEEK (id_user, id_product, quantity, price) VALUES(?,?,?,?)';
    
    db.run(sql, [product.id_user, product.id_product, product.quantity, product.price], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
};

//Update quantity for next week
exports.updateProductForNextWeek = (id, quantity) => {
  return new Promise((resolve, reject) => {
      const sql = 'UPDATE PRODUCTS_NEXT_WEEK SET quantity = ? WHERE id = ?';

      db.run(sql, [quantity, id], function (err) {
          if (err) {
              reject(err);
              return;
          }
          resolve(this.lastID);
      });

  });
};

exports.updateProduct = (farmer_id, name,  quantity) => {
  return new Promise((resolve, reject) => {
    console.log(quantity)
      const sql = 'UPDATE PRODUCTS SET quantity = quantity + ? WHERE farmer_id = ? and name = ?';

      db.run(sql, [quantity, farmer_id, name], function (err) {
          if (err) {
              reject(err);
              return;
          }
          resolve(this.lastID);
      });

  });
};

//Delete product for next week
exports.deleteProductForNextWeek = (id) => {
  return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM PRODUCTS_NEXT_WEEK WHERE id = ? ';
      db.run(sql, [id], function (err) {
          if (err) {
              reject(err);
              return;
          } else {
              if (this.changes === 0) {
                  resolve({ errors: 'Product not found.' });
              }
              resolve(null);
          }
      });
  });
}

exports.deleteUserProductForNextWeek = (id_user) => {
  return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM PRODUCTS_NEXT_WEEK WHERE id_user = ? ';
      db.run(sql, [id_user], function (err) {
          if (err) {
              reject(err);
              return;
          } else {
              if (this.changes === 0) {
                  resolve({ errors: 'Product not found.' });
              }
              resolve(null);
          }
      });
  });
}

exports.deleteAllProductForNextWeek = () => {
  return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM PRODUCTS_NEXT_WEEK  ';
      db.run(sql, [], function (err) {
          if (err) {
              reject(err);
              return;
          } else {
              if (this.changes === 0) {
                  resolve({ errors: 'Product not found.' });
              }
              resolve(null);
          }
      });
  });
}

//retrieve all pending orders of a defined client
exports.getClientPendingOrders = (client_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ORDERS.id, ORDERS.creation_date, ORDERS.client_id, USERS.name, USERS.surname, ORDERS.total, ORDERS.status, ORDERS.pick_up, ORDERS.address, ORDERS.date, ORDERS.time FROM ORDERS INNER JOIN USERS ON ORDERS.client_id = USERS.id WHERE client_id = ? AND status = "PENDING" ORDER BY ORDERS.id DESC';
    db.all(sql, [client_id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      };
      const orders = rows.map((o) => ({ id: o.id, creation_date: o.creation_date, client_id: o.client_id, name: o.name, surname: o.surname, total: o.total, status: o.status, pick_up: o.pick_up, address: o.address, date: o.date, time: o.time }));
      resolve(orders);
    });
  })
};

//retrieve all accepted orders of a defined client
exports.getClientAcceptedOrders = (client_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ORDERS.id, ORDERS.creation_date, ORDERS.client_id, USERS.name, USERS.surname, ORDERS.total, ORDERS.status, ORDERS.pick_up, ORDERS.address, ORDERS.date, ORDERS.time FROM ORDERS INNER JOIN USERS ON ORDERS.client_id = USERS.id WHERE client_id = ? AND status = "ACCEPTED" ORDER BY ORDERS.id DESC';
    db.all(sql, [client_id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      };
      const orders = rows.map((o) => ({ id: o.id, creation_date: o.creation_date, client_id: o.client_id, name: o.name, surname: o.surname, total: o.total, status: o.status, pick_up: o.pick_up, address: o.address, date: o.date, time: o.time }));
      resolve(orders);
    });
  })
};
