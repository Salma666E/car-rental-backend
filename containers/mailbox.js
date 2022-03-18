var express = require("express")
var routermailbox = express.Router()
const db = require('../modules/config.js');

// get mailbox list
routermailbox.get('/list', function (req, res) {
    let sql = `SELECT * FROM mailbox`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "mailbox lists retrieved successfully"
        })
    })
});
// create new mailbox by all Info.
routermailbox.post('/new', function (req, res) {
    let sql = `INSERT INTO mailbox(writermail, content, agency_id, client_id, create_at) VALUES (?)`;
    let values = [
        req.body.writermail,
        req.body.content,
        req.body.agency_id,
        req.body.client_id,
        req.body.create_at
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
//search mailbox by id.
routermailbox.get('/findmailboxid/:id', function (req, ress) {
    let sql = `SELECT * FROM mailbox WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "mailbox's details retrieved successfully"
            })
            console.log("found mailbox: ", res[0]);
            return res[0];
        }
    });
});
//search mailbox by writermail.
routermailbox.get('/findmailboxwritermail/:id', function (req, ress) {
    let sql = `SELECT * FROM mailbox WHERE writermail = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "mailbox's details retrieved successfully"
            })
            console.log("found mailbox: ", res[0]);
            return res[0];
        }
        return;
    });
});

//update mailbox info by id
routermailbox.post('/updatemailbox/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE mailbox SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "updated mailbox successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});
//update mailbox confirmed by id
routermailbox.get('/updatemailboxconfirmed/:id', function (req, ress) {
    var id = req.params.id;
    console.log(id);
    var updateData ={ confirmed: 0 };
    console.log(updateData);
    console.log('.........................................');
    db.query(`UPDATE mailbox SET confirmed= ? WHERE id= ?`, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            // data: results[0],
            message: "updated mailbox successfully and logged"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete mailbox by id.
routermailbox.delete('/deletemailbox/:id', function (req, ress) {
    let sql = `DELETE FROM mailbox WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found mailbox with the id
            return;
        }
        console.log("deleted mailbox with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted mailbox successfully"
        })
        return;
    });
});

module.exports = routermailbox