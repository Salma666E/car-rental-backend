var express = require("express")
var routerhistory = express.Router()
const db = require('../modules/config.js');

// get history list
routerhistory.get('/list', function (req, res) {
    let sql = `SELECT * FROM history`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "history lists retrieved successfully"
        })
    })
});
// create new history by all Info.
routerhistory.post('/new', function (req, res) {
    let sql = `INSERT INTO history(num_of_vehicle, repaire_amount, name_garage_managers, date, manager_id, description) VALUES (?)`;
    let values = [
        req.body.num_of_vehicle,
        req.body.repaire_amount,
        req.body.name_garage_managers,
        req.body.date,
        req.body.manager_id,
        req.body.description
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
//search history by id.
routerhistory.get('/findhistoryspecial/:id', function (req, ress) {
    let sql = `SELECT * FROM history WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "history's details retrieved successfully"
            })
            console.log("found history: ", res[0]);
            return res[0];
        }
    });
});
routerhistory.get('/findhistoryid/:id', function (req, ress) {
    let sql = `SELECT * FROM history WHERE manager_id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "history's details retrieved successfully"
            })
            console.log("found history: ", res[0]);
            return res[0];
        }
    });
});

//update history info by id
routerhistory.post('/updatehistory/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE history SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated history successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete history by id.
routerhistory.delete('/deletehistory/:id', function (req, ress) {
    let sql = `DELETE FROM history WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found history with the id
            return;
        }
        console.log("deleted history with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted history successfully"
        })
        return;
    });
});

module.exports = routerhistory