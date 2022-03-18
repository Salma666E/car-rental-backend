var express = require("express")
var routerrequest_repair_service = express.Router()
const db = require('../modules/config.js');

// get request_repair_service list
routerrequest_repair_service.get('/list', function (req, res) {
    let sql = `SELECT * FROM request_repair_service`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "request_repair_service lists retrieved successfully"
        })
    })
});
// create new request_repair_service by all Info.
routerrequest_repair_service.post('/new', function (req, res) {
    let sql = `INSERT INTO request_repair_service(maintenanceManager_id, car_id) VALUES (?)`;
    let values = [
        req.body.maintenanceManager_id,
        req.body.car_id
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
//search request_repair_service by id.
routerrequest_repair_service.get('/findrequest_repair_serviceid/:id', function (req, ress) {
    let sql = `SELECT * FROM request_repair_service WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "request_repair_service's details retrieved successfully"
            })
            console.log("found request_repair_service: ", res[0]);
            return res[0];
        }
    });
});

//update request_repair_service info by id
routerrequest_repair_service.post('/updaterequest_repair_service/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE request_repair_service SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated request_repair_service successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete request_repair_service by id.
routerrequest_repair_service.delete('/deleterequest_repair_service/:id', function (req, ress) {
    let sql = `DELETE FROM request_repair_service WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found request_repair_service with the id
            return;
        }
        console.log("deleted request_repair_service with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted request_repair_service successfully"
        })
        return;
    });
});

module.exports = routerrequest_repair_service