var express = require("express")
var router = express.Router()
const db = require('../modules/config.js');

// get car list
router.get('/list', function (req, res) {
    let sql = `SELECT *, category.name FROM car,category WHERE category.idcat=category_id`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "car lists retrieved successfully"
        })
    })
});
// create new car by all Info.
router.post('/new', function (req, res) {
    let sql = `INSERT INTO car(car_model, car_brand, plate_number, booking_num,
        car_image, available_num, broken_down_num, marked, version, category, date_first_circulation,
        identify_num, description, capacity, price,	gps_price, airbag_price,
        air_conditioning_price, child_seat_price, cd_player_price, baby_seat_price, ski_rack, rate, category_id) VALUES (?)`;
    let values = [
        req.body.car_model,
        req.body.car_brand,
        req.body.plate_number,
        req.body.booking_num,
        req.body.car_image,
        req.body.available_num,
        req.body.broken_down_num,
        req.body.marked,
        req.body.version,
        req.body.category,
        req.body.date_first_circulation,
        req.body.identify_num,
        req.body.description,
        req.body.capacity,
        req.body.price,
        req.body.gps_price,
        req.body.airbag_price,
        req.body.air_conditioning_price,
        req.body.child_seat_price,
        req.body.cd_player_price,
        req.body.baby_seat_price,
        req.body.ski_rack,
        req.body.rate,
        req.body.category_id
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
//search car by id.
router.get('/findcarid/:id', function (req, ress) {
    let sql = `SELECT * FROM car WHERE id = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "car's details retrieved successfully"
            })
            console.log("found car: ", res[0]);
            return res[0];
        }
    });
});
//search car by Brand name.
router.get('/findplate_number/', function (req, ress) {
    let sql = `SELECT plate_number,id FROM car`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "car's details retrieved successfully"
            })
            console.log("found car: ", res[0]);
            return res[0];
        }
    });
});
//search car by Brand name.
router.get('/findcarbrand/:id', function (req, ress) {
    let sql = `SELECT * FROM car WHERE car_brand = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "car's details retrieved successfully"
            })
            console.log("found car: ", res[0]);
            return res[0];
        }
    });
});
//search car by city.
router.get('/findcity/', function (req, ress) {
    let sql = `SELECT dep_city, rout_city, id FROM car`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "car's details retrieved successfully"
            })
            console.log("found car: ", res[0]);
            return res[0];
        }
    });
});
//search car by city and return car details.
router.get('/citycar/:dep_city/:rout_city', function (req, ress) {
    let sql = `SELECT * FROM car WHERE dep_city = ${req.params.dep_city} AND rout_city=${req.params.rout_city}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "car's details retrieved successfully"
            })
            console.log("found car: ", res[0]);
            return res[0];
        }
    });
});
//search car by PlateNumber and return car details.
router.get('/platnumcar/:id', function (req, ress) {
    let sql = `SELECT * FROM car WHERE plate_number = ${req.params.id}`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.length) {
            ress.json({
                status: 200,
                res,
                message: "car's details retrieved successfully"
            })
            console.log("found car: ", res[0]);
            return res[0];
        }
    });
});
//update car info by id
router.post('/updatecar/:id', function (req, ress) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE car SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        ress.json({
            status: 200,
            data,
            message: "update car successfully"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});

//delete car by id.
router.delete('/deletcar/:id', function (req, ress) {
    let sql = `DELETE FROM car WHERE id = ?`;
    db.query(sql, req.params.id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found car with the id
            return;
        }
        console.log("deleted car with id: ", req.params.id);
        ress.json({
            status: 200,
            res,
            message: "deleted car successfully"
        })
        return;
    });
});

module.exports = router