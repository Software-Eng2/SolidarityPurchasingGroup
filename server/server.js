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

/*** End APIs ***/

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

