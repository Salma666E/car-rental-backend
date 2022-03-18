var express = require("express")
var routerdeal = express.Router()
const db = require('../modules/config.js');

// get deal list
routerdeal.get('/list', function (req, res) {
    let sql = `SELECT * FROM deal`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "deal lists retrieved successfully"
        })
    })
});
// create new deal by all Info.
routerdeal.post('/new', function (req, res) {
    let sql = `INSERT INTO deal(name, description, agency_id) VALUES (?)`;
    let values = [
        req.body.name,
        req.body.description,
        req.body.agency_id
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
//search deal by id.
routerdeal.get('/finddealid/:id', function (req, ress) {
    let sql = `SELECT * FROM deal WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "deal's details retrieved successfully"
            })
            console.log("found deal: ", res[0]);
            return res[0];
        }
    });
});
//search deal by name.
routerdeal.get('/finddealname/:id', function (req, ress) {
    let sql = `SELECT * FROM deal WHERE name = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "deal's details retrieved successfully"
            })
            console.log("found deal: ", res[0]);
            return res[0];
        }
    });
});

//update deal info by id
routerdeal.post('/updatedeal/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE deal SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated deal successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete deal by id.
routerdeal.delete('/deletedeal/:id', function (req, ress) {
    let sql = `DELETE FROM deal WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found deal with the id
            return;
        }
        console.log("deleted deal with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted deal successfully"
        })
        return;
    });
});

module.exports = routerdeal