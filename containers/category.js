var express = require("express")
var routercategory = express.Router()
const db = require('../modules/config.js');

// get category list
routercategory.get('/list', function (req, res) {
    let sql = `SELECT * FROM category`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "category lists retrieved successfully"
        })
    })
});
// create new category by all Info.
routercategory.post('/new', function (req, res) {
    let sql = `INSERT INTO category(name, description) VALUES (?)`;
    let values = [
        req.body.name,
        req.body.description
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
//search category by idcat.
routercategory.get('/findcategoryidcat/:idcat', function (req, ress) {
    let sql = `SELECT * FROM category WHERE idcat = ${req.params.idcat}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "category's details retrieved successfully"
            })
            console.log("found category: ", res[0]);
            return res[0];
        }
    });
});
//search category by name.
routercategory.get('/findcategoryname/:idcat', function (req, ress) {
    let sql = `SELECT * FROM category WHERE name = ${req.params.idcat}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "category's details retrieved successfully"
            })
            console.log("found category: ", res[0]);
            return res[0];
        }
    });
});

//update category info by idcat
routercategory.post('/updatecategory/:idcat', function (req, ress) {
    var idcat = req.params.idcat;
    var updateData = req.body;
    var sql = `UPDATE category SET ? WHERE idcat= ?`;
    db.query(sql, [updateData, idcat], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated category successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete category by idcat.
routercategory.delete('/deletecategory/:idcat', function (req, ress) {
    let sql = `DELETE FROM category WHERE idcat = ?`;
    db.query(sql, req.params.idcat, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found category with the idcat
            return;
        }
        console.log("deleted category with idcat: ", req.params.idcat);
        ress.json({
            status: 200,
            res,
            message: "deleted category successfully"
        })
        return;
    });
});

module.exports = routercategory