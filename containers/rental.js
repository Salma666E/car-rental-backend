var express = require("express")
var routerrental = express.Router()
const db = require('../modules/config.js');

// get rental list
routerrental.get('/list', function (req, res) {
    let sql = `SELECT * FROM rental`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "rental lists retrieved successfully"
        })
    })
});
// Strrt test
routerrental.get('/listbyagency/:id', function (req, res) {
    let sql = `SELECT rental.create_at,customerName, type_of_contract, customer_type,plate_number, startdate, enddate, car_image, typerental, confirmed
     FROM rental,car
     WHERE car.id=car_id AND agency_id=${req.params.id}`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "rental lists retrieved successfully"
        })
    })
});
// get rental list
routerrental.get('/customlist', function (req, res) {
    let sql = `SELECT rental.create_at, startdate, enddate, name, car_image, typerental, confirmed
     FROM rental,car,agency
     WHERE car.id=car_id AND agency.id=agency_id`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "rental lists retrieved successfully"
        })
    })
});
// End test
// create new rental by all Info.
routerrental.post('/new', function (req, res) {
    let sql = `INSERT INTO rental(startdate, enddate, agency_id, car_id, typerental, create_at, customerName, type_of_contract, customer_type) VALUES (?)`;
    let values = [
        req.body.startdate,
        req.body.enddate,
        req.body.agency_id,
        req.body.car_id,
        req.body.typerental,
        req.body.create_at,
        req.body.customerName,
        req.body.type_of_contract,
        req.body.customer_type
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New mail added successfully"
        })
        return;
    })
});
//search rental by id.
routerrental.get('/findrentalid/:id', function (req, ress) {
    let sql = `SELECT * FROM rental WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "rental's details retrieved successfully"
            })
            console.log("found rental: ", res[0]);
            return res[0];
        }
    });
});
//search rental by typerental.
routerrental.get('/findrentaltype/:id', function (req, ress) {
    let sql = `SELECT * FROM rental WHERE typerental = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "rental's details retrieved successfully"
            })
            console.log("found rental: ", res[0]);
            return res[0];
        }
    });
});

//update rental info by id
routerrental.post('/updaterental/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE rental SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated rental successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete rental by id.
routerrental.delete('/deleterental/:id', function (req, ress) {
    let sql = `DELETE FROM rental WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found rental with the id
            return;
        }
        console.log("deleted rental with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted rental successfully"
        })
        return;
    });
});

module.exports = routerrental