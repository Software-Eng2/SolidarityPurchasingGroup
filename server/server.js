'use strict';

const express = require('express');
const dao = require('./dao');
const { check, validationResult, body } = require('express-validator');
const userDao = require('./user-dao'); // module for accessing the users in the DB
const session = require('express-session'); // enable sessions
const passportLocal = require('passport-local'); // username and password for login
const passport = require('passport'); // auth middleware
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');

// init express
const app = new express();
const port = 3001;

/* Set-up the middlewares */
app.use(express.json());
app.use(express.static("./client/build"));

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'qzwsxedcrfvtgbyhnujmikol',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new passportLocal.Strategy((email, password, done) => {
  userDao.getUser(email, password).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false, { message: 'Wrong email or password' });
    }
  }).catch((err) => {
    done(err);
  });
}));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(null, err);
    });
});

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'User not authenticated' });
}

/***  APIs ***/

//get all clients
app.get('/api/clients',
  (req, res) => {
    dao.getAllClients()
      .then((clients) => { res.json(clients) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
  });

// get client by id
app.get('/api/clients/:id',
  (req, res) => {
    const client_id = req.params.id;
    dao.getClientById(client_id)
      .then((client) => { res.json(client) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
  });

// add a new client 
app.post('/api/users',
  [
    check('role').isIn(['client', 'farmer', 'rider']),
    check('name').isString(),
    check('surname').isString(),
    check('birthdate').isString(),
    check('email').isString(),
    check('password').isString(),
    check('isConfirmed').isInt()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }

    const client = {
      role: req.body.role,
      name: req.body.name,
      surname: req.body.surname,
      birthdate: req.body.birthdate,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
      isConfirmed: req.body.isConfirmed
    }

    function createWallet(id) {
      if (client.role === 'client') {
        dao.createWallet(id).then(
          res.status(201).json({ id: id }))
          .catch((err) => res.status(500)
            .json({ error: "Error " + err, }))
          .catch((err) =>
            res.status(500).
              json({ error: "Error " + err, })
          );
      }
    }

    dao.createUser(client).then((id) => createWallet(id));
  });

app.put('/api/wallets/',
  [check('amount').isInt({ min: 0 }), check('id').isInt({ min: 0 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    dao.updateWallet(req.body.amount, req.body.id).then((id) => res.status(201).json({ id: id }))
      .catch((err) => res.status(500).json({
        error: "error " + err
      }));
  })

//get all products
app.get('/api/products',
  (req, res) => {
    dao.getAllProducts()
      .then((products) => { res.json(products) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
  });

// get all products from a farmer
app.get('/api/farmer/:farmer_id/products',
  (req, res) => {
    const farmer_id = req.params.farmer_id;
    dao.getProductsByFarmer(farmer_id)
    .then((products) => { res.json(products) })
    .catch((err) => res.status(500).json({ error: "Error " + err }));
  });

// add a new product
app.post('/api/products',
  [
    check('name').isString(),
    check('description').isString(),
    check('category').isString(),
    check('quantity').isInt({ min: 0 }),
    check('price').isFloat({ min: 0 }),
    check('farmer_id').isInt(),
    check('img_path').isString(),
    check('confirmed').isInt({ min: 0, max: 1 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    const product = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      farmer_id: req.body.farmer_id,
      img_path: req.body.img_path,
      confirmed: req.body.confirmed
    }
    dao.createProduct(product).then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  });

//update confirmed status of a product
app.put('/api/products',
  [
    check('confirmed').isInt({ min: 0, max: 1 }),
    check('id').isInt({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    dao.updatedConfirmedProduct(req.body.confirmed, req.body.id)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  })

//get all orders
app.get('/api/orders',
  (req, res) => {
    dao.getAllOrders()
      .then((orders) => { res.json(orders) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
  });

// add a new order
app.post('/api/orders',
  [
    check('creation_date').isString(),
    check('client_id').isInt(),
    check('total').isNumeric(),
    check('status').isString(),
    check('pick_up').isInt({ min: 0, max: 1 }),
    check('address').isString(),
    check('date').isString(),
    check('time').isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    const order = {
      creation_date: req.body.creation_date,
      client_id: req.body.client_id,
      total: req.body.total,
      status: req.body.status,
      pick_up: req.body.pick_up,
      address: req.body.address,
      date: req.body.date,
      time: req.body.time
    }
    dao.createOrder(order).then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  });

//change status of an order
app.put('/api/orders/status',
  [
    check('status').isIn(['PENDING', 'ACCEPTED', 'CANCELLING', 'FAILED', 'READY', 'DELIVERED']),
    check('order_id').isInt({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    dao.changeStatus(req.body.order_id, req.body.status)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  });

//change date & time of an order
app.put('/api/orders/datetime',
  [
    check('date').isString(),
    check('time').isString(),
    check('order_id').isInt({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    dao.changeDateTime(req.body.order_id, req.body.date, req.body.time)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  });

//reduce quantity of a product
app.put('/api/products/quantity',
  [
    check('product_id').isInt({ min: 0 }),
    check('order_quantity').isInt({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    dao.changeQuantity(req.body.product_id, req.body.order_quantity)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) => { res.status(500).json({ error: "Error" + err, }) })
  }
)




// Login --> POST /sessions 
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});
// Logout --> DELETE /sessions/current 
app.delete('/api/sessions/current', isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', isLoggedIn, (req, res) => {
  res.json(req.user);
});


// add a new basket
app.post('/api/basket',
  [
    check('order_id').isInt({ min: 0 }),
    check('product_id').isInt({ min: 0 }),
    check('quantity').isInt({ min: 0 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    const basket = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    }
    dao.createBasket(basket).then((inserted) => res.status(201).json({ inserted: inserted }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  });

//get a basket from an order_id
app.get('/api/basket/:order_id',
  (req, res) => {
    const order_id = req.params.order_id;
    dao.getBasket(order_id)
      .then((products) => { res.json(products) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
  });
/*** End APIs ***/


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//get all notifications for a user
app.get('/api/notifications/:id',
  [
    check('id').isInt({min:0})
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    dao.getNotifications(req.params.id)
      .then((notifications) => { res.json(notifications) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
  });


// add a new notification
app.post('/api/notifications/',
  [
    check('description').isString(),
    check('client_id').isInt({min: 0})
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    dao.createNotification(req.body.description, req.body.client_id).then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  });

  app.delete('/api/notifications/:id', 
    [
      check('id').isInt({min:0})
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(422).json({ errors: errors.array() })
      }

      dao.deleteNotification(req.params.id).then((id) => res.status(200).json({ id: id }))
        .catch((err) =>
          res.status(500).json({
            error: "Error " + err,
          })
        );
    }
  ),

// get cancelling orders by client_id
app.get('/api/orders/:id',
(req, res) => {
  const client_id = req.params.id;
  dao.getCancellingOdersByClientId(client_id)
    .then((orders) => { res.json(orders) })
    .catch((err) => res.status(500).json({ error: "Error " + err }));
});

//delete a product by its id
app.delete('/api/products/:id', 
  [
    check('id').isInt({min:0})
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }

    dao.deleteProduct(req.params.id).then((id) => res.status(200).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  }
);

//delete an order by its id
app.delete('/api/orders/:id', 
  [
    check('id').isInt({min:0})
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }

    dao.deleteOrder(req.params.id).then((id) => res.status(200).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  }
);

//delete a client and their wallet by client_id 
app.delete('/api/clients/:id',
  [
    check('id').isInt({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    dao.deleteWallet(req.params.id).then(() => {
      dao.deleteClient(req.params.id).then((id) => res.status(200).json({ id: id }))
        .catch((err) =>
          res.status(500).json({
            error: "Error " + err,
          })
        )
    }).catch((err) =>
      res.status(500).json({
        error: "Error " + err,
      })
    );
  }
);

//get a product for next week from an id_user
app.get('/api/productsNW/:id_user',
  (req, res) => {
    const id = req.params.id_user;
    dao.getProductsForNextWeek(id)
      .then((products) => { res.json(products)})
      .catch((err) => res.status(500).json({ error: "Error " + err }));
});

//insert Product for Next Week
app.post('/api/productNW',
  [
    check('id_user').isInt(),
    check('id_product').isString(),
    check('quantity').isNumeric(),
    
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    const product = {
      id_user: req.body.id_user,
      id_product: req.body.id_product,
      quantity: req.body.quantity,
      price: req.body.price
      
    }
    
    dao.createProductForNextWeek(product).then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  });

  app.put('/api/productsNW/quantity',
  [
    check('id').isInt(),
    check('quantity').isNumeric({min:0})
  ],
  (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors:errors.array()})
    }
    dao.updateProductForNextWeek(req.body.id, req.body.quantity)
    .then((id)=>res.status(201).json({id:id}))
    .catch((err)=>{res.status(500).json({error: "Error" + err,})})
  }
);

app.put('/api/product/quantity',
  [
    check('farmer_id').isInt(),
    check('name').isString(),
    check('quantity').isNumeric({min:0})
  ],
  (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors:errors.array()})
    }
    
    dao.updateProduct(req.body.farmer_id, req.body.name, req.body.quantity)
    .then((id)=>res.status(201).json({id:id}))
    .catch((err)=>{res.status(500).json({error: "Error" + err,})})
  }
);

  app.delete('/api/productsNW/:id',  async (req, res) => {
    try {
        const result = await dao.deleteProductForNextWeek(req.params.id);
        if (result && result.errors)
            res.status(404).json(result);
        else
            res.status(204).end();
    } catch (err) {
        res.status(503).json({ errors: `Database error during the deletion of the task.` });
    }
});

//delete all products for a user
app.delete('/api/allProductsNW/:id_user',  async (req, res) => {
  try {
      const result = await dao.deleteUserProductForNextWeek(req.params.id_user);
      if (result && result.errors)
          res.status(404).json(result);
      else
          res.status(204).end();
  } catch (err) {
      res.status(503).json({ errors: `Database error during the deletion of the task.` });
  }
});

//delete all products
app.delete('/api/allProductsNW',  async (req, res) => {
  try {
      const result = await dao.deleteAllProductForNextWeek();
      if (result && result.errors)
          res.status(404).json(result);
      else
          res.status(204).end();
  } catch (err) {
      res.status(503).json({ errors: `Database error during the deletion of the task.` });
  }
});

//get all client pending orders
app.get('/api/pending/:client_id',
  (req, res) => {
    const client_id = req.params.client_id;
    dao.getClientPendingOrders(client_id)
      .then((orders) => { res.json(orders) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
  });
