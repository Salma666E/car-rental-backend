var express = require("express")
var routerrental_client = express.Router()
const db = require('../modules/config.js');

// get rental_client list
routerrental_client.get('/list', function (req, res) {
    let sql = `SELECT * FROM rental_client`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "rental_client lists retrieved successfully"
        })
    })
});
// Strrt test
// get rental list
routerrental_client.get('/customlist', function (req, res) {
    let sql = `SELECT rental_client.create_at, startdate, enddate, name, car_image, typerental, confirmed
     FROM rental_client,car,client
     WHERE  car.id=car_id AND client.id=client_id`;
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
// create new rental_client by all Info.
routerrental_client.post('/new', function (req, res) {
    let sql = `INSERT INTO rental_client(startdate, enddate, client_id, car_id, typerental, create_at, customerName, type_of_contract, customer_type) VALUES (?)`;
    let values = [
        req.body.startdate,
        req.body.enddate,
        req.body.client_id,
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
//search rental_client by id.
routerrental_client.get('/findrental_clientid/:id', function (req, ress) {
    let sql = `SELECT * FROM rental_client WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "rental_client's details retrieved successfully"
            })
            console.log("found rental_client: ", res[0]);
            return res[0];
        }
    });
});
//search rental_client by typerental_client.
routerrental_client.get('/findrental_clienttype/:id', function (req, ress) {
    let sql = `SELECT * FROM rental_client WHERE typerental_client = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "rental_client's details retrieved successfully"
            })
            console.log("found rental_client: ", res[0]);
            return res[0];
        }
    });
});

//update rental_client info by id
routerrental_client.post('/updaterental_client/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE rental_client SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated rental_client successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete rental_client by id.
routerrental_client.delete('/deleterental_client/:id', function (req, ress) {
    let sql = `DELETE FROM rental_client WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found rental_client with the id
            return;
        }
        console.log("deleted rental_client with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted rental_client successfully"
        })
        return;
    });
});

module.exports = routerrental_client