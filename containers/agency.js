var express = require("express")
var routeragency = express.Router()
const bcrypt = require('bcryptjs');
const db = require('../modules/config.js');

// get agency list
routeragency.get('/list', function (req, res) {
    let sql = `SELECT * FROM agency`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "agency lists retrieved successfully"
        })
    })
});
// create new agency by all Info.
routeragency.post('/new', async function (req, res) {
    let sql = `INSERT INTO agency(name, password, address, email, contact, booking_confirmed, booking_not_confirmed, num_brokendown_car, create_at) VALUES (?)`;
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hashedPassword: "+hashedPassword);
    let values = [
        req.body.name,
        hashedPassword, //req.body.password,
        req.body.address,
        req.body.email,
        req.body.contact,
        req.body.booking_confirmed,
        req.body.booking_not_confirmed,
        req.body.num_brokendown_car,
        req.body.create_at
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
//search agency by id.
routeragency.get('/findagencyid/:id', function (req, ress) {
    let sql = `SELECT * FROM agency WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "agency's details retrieved successfully"
            })
            console.log("found agency: ", res[0]);
            return res[0];
        }
    });
});
//search agency by name.
routeragency.get('/findagencyname/:id', function (req, ress) {
    let sql = `SELECT * FROM agency WHERE name = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "agency's details retrieved successfully"
            })
            console.log("found agency: ", res[0]);
            return res[0];
        }
    });
});
//search agency by email.
routeragency.get('/findagencyemail/:id', function (req, ress) {
    let sql = `SELECT * FROM agency WHERE email = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "agency's details retrieved successfully"
            })
            console.log("found agency: ", res[0]);
            return res[0];
        }
    });
});

//update agency info by id
routeragency.post('/updateagency/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE agency SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated agency successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete agency by id.
routeragency.delete('/deleteagency/:id', function (req, ress) {
    let sql = `DELETE FROM agency WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found agency with the id
            return;
        }
        console.log("deleted agency with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted agency successfully"
        })
        return;
    });
});

module.exports = routeragency