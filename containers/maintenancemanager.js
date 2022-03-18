var express = require("express")
var routermaintenancemanager = express.Router()
const bcrypt = require('bcryptjs');
const db = require('../modules/config.js');

// get maintenancemanager list
routermaintenancemanager.get('/list', function (req, res) {
    let sql = `SELECT * FROM maintenancemanager`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "maintenancemanager lists retrieved successfully"
        })
    })
});
// create new maintenancemanager by all Info.
routermaintenancemanager.post('/new', async function (req, res) {
    let sql = `INSERT INTO maintenancemanager(email, password, name, address, contact ) VALUES (?)`;
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hashedPassword: "+hashedPassword);
    let values = [
        req.body.email,
        hashedPassword, //req.body.password,
        req.body.name,
        req.body.address,
        req.body.contact
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New maintenancemanager added successfully"
        })
        return;
    })
});
//search maintenancemanager by id.
routermaintenancemanager.get('/findmanagerid/:id', function (req, ress) {
    let sql = `SELECT * FROM maintenancemanager WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "maintenancemanager's details retrieved successfully"
            })
            console.log("found maintenancemanager: ", res[0]);
            return res[0];
        }
    });
});
//search maintenancemanager by email.
routermaintenancemanager.get('/findmanageremail/:id', function (req, ress) {
    let sql = `SELECT * FROM maintenancemanager WHERE email = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "maintenancemanager's details retrieved successfully"
            })
            console.log("found maintenancemanager: ", res[0]);
            return res[0];
        }
    });
});

//update maintenancemanager info by id
routermaintenancemanager.post('/updatemaintenancemanager/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE maintenancemanager SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated maintenancemanager successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete maintenancemanager by id.
routermaintenancemanager.delete('/deletemaintenancemanager/:id', function (req, ress) {
    let sql = `DELETE FROM maintenancemanager WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found maintenancemanager with the id
            return;
        }
        console.log("deleted maintenancemanager with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted maintenancemanager successfully"
        })
        return;
    });
});

module.exports = routermaintenancemanager