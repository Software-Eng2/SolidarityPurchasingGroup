'use strict';

const express = require('express');
const dao = require('./dao');
const { check, validationResult, body } = require('express-validator');
const userDao = require('./user-dao'); // module for accessing the users in the DB
const session = require('express-session'); // enable sessions
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const passport = require('passport'); // auth middleware
const dayjs = require('dayjs');

// init express
const app = new express();
const port = 3001;

/* Set-up the middlewares */
app.use(express.json());
app.use(express.static("./client/build"));

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function(email, password, done) {
    userDao.getUser(email, password).then((user) => {
      if (!user)
        return done(null, false, { error: 'Wrong email and/or password.' });
      return done(null, user);
    });
  }
));

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
          done(err, null);
      });
});

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
      return next();

  return res.status(401).json({ error: 'User not authenticated' });
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


/***  APIs ***/

//get all clients
app.get('/api/clients',
  (req, res) => {
    dao.getAllClients()
      .then((clients) => { res.json(clients)})
      .catch((err) => res.status(500).json({ error: "Error " + err }));
});

// add a new client 
app.post('/api/clients',
  [
    check('role').isString(),
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
      password: req.body.password,
      isConfirmed: req.body.isConfirmed
    }
    dao.createClient(client).then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  }); 

//get all products
app.get('/api/products',
  (req, res) => {
    dao.getAllProducts()
      .then((products) => { res.json(products)})
      .catch((err) => res.status(500).json({ error: "Error " + err }));
});

// add a new product
app.post('/api/products',
  [
    check('NAME').isString(),
    check('DESCRIPTION').isString(),
    check('CATEGORY').isString(),
    check('QUANTITY').isInt({min:0}),
    check('PRICE').isInt({min:0}),
    check('FARMER_ID').isInt(),
    check('IMG_PATH').isString(),
    check('CONFIRMED').isInt({min:0, max:1})
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    const product = {
      NAME: req.body.NAME,
      DESCRIPTION: req.body.DESCRIPTION,
      CATEGORY: req.body.CATEGORY,
      QUANTITY: req.body.QUANTITY,
      PRICE: req.body.PRICE,
      FARMER_ID: req.body.FARMER_ID,
      IMG_PATH: req.body.IMG_PATH,
      CONFIRMED: req.body.CONFIRMED
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
    check('confirmed').isInt({min:0, max:1}),
    check('id').isInt({min:0})
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
      .then((orders) => { res.json(orders)})
      .catch((err) => res.status(500).json({ error: "Error " + err }));
});

// add a new product
app.post('/api/orders',
  [
    check('creation_date').isString(),
    check('client_id').isInt(),
    check('total').isNumeric(),
    check('status').isString(),
    check('pick_up').isInt({min:0, max:1}),
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


 // Login --> POST /sessions 
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});

// Logout --> DELETE /sessions/current 
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    console.log(req);
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});
}); 
/*** End APIs ***/


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});



