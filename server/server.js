'use strict';

const express = require('express');
const dao = require('./dao');

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

//get all products
app.get('/api/products',
  (req, res) => {
    dao.getAllProducts()
      .then((products) => { res.json(products)})
      .catch((err) => res.status(500).json({ error: "Error " + err }));
});

/*** End APIs ***/

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

