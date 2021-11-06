'use strict';

const express = require('express');
const dao = require('./dao');
const { check, validationResult, body } = require('express-validator');

// init express
const app = new express();
const port = 3001;

/* Set-up the middlewares */
app.use(express.json());
app.use(express.static("./client/build"));



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
    check('NAME').isString(),
    check('SURNAME').isString(),
    check('ROLE').isString(),
    check('BIRTHDATE').isString(),
    check('EMAIL').isString(),
    check('PASSWORD').isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(422).json({ errors: errors.array() })
    }
    const client = {
      NAME: req.body.NAME,
      SURNAME: req.body.SURNAME,
      ROLE: req.body.ROLE,
      BIRTHDATE: req.body.BIRTHDATE,
      EMAIL: req.body.EMAIL,
      PASSWORD: req.body.PASSWORD
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

/*** End APIs ***/

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

