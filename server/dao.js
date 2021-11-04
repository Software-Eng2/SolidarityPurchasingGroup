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
            const clients = rows.map((c) => ({ ID: c.ID, NAME: c.NAME, SURNAME: c.SURNAME, AGE: c.AGE, SEX: c.SEX, WALLET_ID: c.WALLET_ID }));
            resolve(clients);
        });
    })
};