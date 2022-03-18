var express = require("express")
var routerClient = express.Router()
const db = require('../modules/config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// get client list
routerClient.get('/list', function (req, res) {
    let sql = `SELECT * FROM client`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "client lists retrieved successfully"
        })
    })
});
// create new client by all Info.
routerClient.post('/new', async function (req, res) {
    let sql = `INSERT INTO client(name, type, password, address, email, cin, contact) VALUES (?)`;
    //hashedPassword
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hashedPassword: "+hashedPassword);
    let values = [
        req.body.name,
        req.body.type,
        hashedPassword, //req.body.password,
        req.body.address,
        req.body.email,
        req.body.cin,
        req.body.contact
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New user added successfully"
        })
        return;
    })
});
//search client by id.
routerClient.get('/findclientid/:id', function (req, ress) {
    let sql = `SELECT * FROM client WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "client's details retrieved successfully"
            })
            console.log("found client: ", res[0]);
            return res[0];
        }
    });
});
//search client by name.
routerClient.get('/findclientname/:id', function (req, ress) {
    let sql = `SELECT * FROM client WHERE name = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "client's details retrieved successfully"
            })
            console.log("found client: ", res[0]);
            return res[0];
        }
    });
});
//search client by cin.
routerClient.get('/findclientcin/:id', function (req, ress) {
    let sql = `SELECT * FROM client WHERE cin = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "client's details retrieved successfully"
            })
            console.log("found client: ", res[0]);
            return res[0];
        }
    });
});

//search client by type.
routerClient.get('/findclientname/:id', function (req, ress) {
    let sql = `SELECT * FROM client WHERE type = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "client's details retrieved successfully"
            })
            console.log("found client: ", res[0]);
            return res[0];
        }
    });
});

//update client info by id
routerClient.post('/updateclient/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE client SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "deleted client successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete client by id.
routerClient.delete('/deleteclient/:id', function (req, ress) {
    let sql = `DELETE FROM client WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            return;
        }
        console.log("deleted client with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted client successfully"
        })
        return;
    });
});

module.exports = routerClient