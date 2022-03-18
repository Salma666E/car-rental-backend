var express = require("express")
var routerinvoice = express.Router()
const db = require('../modules/config.js');

// get invoice list
routerinvoice.get('/list', function (req, res) {
    let sql = `SELECT * FROM invoice`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "invoice lists retrieved successfully"
        })
    })
});
// create new invoice by all Info.
routerinvoice.post('/new', function (req, res) {
    let sql = `INSERT INTO invoice( number, date, name_agency, name_client, email_client, address, 
        reservation_number, reservation_duration, car_brand, car_num_plate, rantal_price, equipment_price, total_amount, pay_within_day, bank_details, 
        bank_name, bank_teller, bank_key) VALUES (?)`;
    let values = [
        req.body.number,
        req.body.date,
        req.body.name_agency,
        req.body.name_client,
        req.body.email_client,
        req.body.address,
        req.body.reservation_number,
        req.body.reservation_duration,
        req.body.car_brand,
        req.body.car_num_plate,
        req.body.rantal_price,
        req.body.equipment_price,
        req.body.total_amount,
        req.body.pay_within_day,
        req.body.bank_details,
        req.body.bank_name,
        req.body.bank_teller,
        req.body.bank_key
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) {
            console.log("error: ", err);
            return;
        }
        res.json({
            status: 200,
            message: "New mail added successfully"
        })
        return;
    })
});
//search invoice by id.
routerinvoice.get('/findinvoiceid/:id', function (req, ress) {
    let sql = `SELECT * FROM invoice WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "invoice's details retrieved successfully"
            })
            console.log("found invoice: ", res[0]);
            return res[0];
        }
    });
});
//search invoice by name_agency.
routerinvoice.get('/findinvoicename_agency/:id', function (req, ress) {
    let sql = `SELECT * FROM invoice WHERE name_agency = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "invoice's details retrieved successfully"
            })
            console.log("found invoice: ", res[0]);
            return res[0];
        }
    });
});

//update invoice info by id
routerinvoice.post('/updateinvoice/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE invoice SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated invoice successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete invoice by id.
routerinvoice.delete('/deleteinvoice/:id', function (req, ress) {
    let sql = `DELETE FROM invoice WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found invoice with the id
            return;
        }
        console.log("deleted invoice with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted invoice successfully"
        })
        return;
    });
});

module.exports = routerinvoice