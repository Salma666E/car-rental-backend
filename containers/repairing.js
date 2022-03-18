var express = require("express")
var routerrepairing = express.Router()
const db = require('../modules/config.js');

// get repairing list
routerrepairing.get('/list', function (req, res) {
    let sql = `SELECT * FROM repairing`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "repairing lists retrieved successfully"
        })
    })
});
// create new repairing by all Info.
routerrepairing.post('/new', function (req, res) {
    let sql = `INSERT INTO repairing(maintenanceManager_id, car_id, car_name, car_mdl, car_marked, garage_name, operations_description ) VALUES (?)`;
    let values = [
        req.body.maintenanceManager_id,
        req.body.car_id,
        req.body.car_name,
        req.body.car_mdl,
        req.body.car_marked,
        req.body.garage_name,
        req.body.operations_description

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
//search repairing by maintenanceManager_id.
routerrepairing.get('/findrepairingid/:id', function (req, ress) {
    let sql = `SELECT * FROM repairing WHERE maintenanceManager_id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "repairing's details retrieved successfully"
            })
            console.log("found repairing: ", res[0]);
            return res[0];
        }
    });
});

//search repairing by plate_number.
routerrepairing.get('/findplate_number/:id', function (req, ress) {
    let sql = `SELECT * FROM repairing WHERE car_name = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "repairing's details retrieved successfully"
            })
            console.log("found repairing: ", res[0]);
            return res[0];
        }
    });
});
//search repairing by garage_name.
routerrepairing.get('/findgarage_name/:id', function (req, ress) {
    let sql = `SELECT * FROM repairing WHERE garage_name = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "repairing's details retrieved successfully"
            })
            console.log("found repairing: ", res[0]);
            return res[0];
        }
    });
});
//update repairing info by id
routerrepairing.post('/updaterepairing/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE repairing SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated repairing successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete repairing by id.
routerrepairing.delete('/deleterepairing/:id', function (req, ress) {
    let sql = `DELETE FROM repairing WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found repairing with the id
            return;
        }
        console.log("deleted repairing with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted repairing successfully"
        })
        return;
    });
});

module.exports = routerrepairing