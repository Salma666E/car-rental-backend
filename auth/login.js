const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../modules/config.js');

router.post('/login/clientoradmin', async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log('/////////////////////');
        console.log(req.body);
        if (!email || !password) {
            return res.json({
                success: 0,
                data: "Please provide an email and password"
            });
        }
        db.query(`SELECT * FROM client WHERE email = ?`,
            [email], async function (error, results) {
                // console.log(results);
                console.log(password);
                console.log(await bcrypt.hash(password, 10));
                console.log(results[0].password);
                console.log(await bcrypt.compare(password, results[0].password));
                if (!results || !(await bcrypt.compare(password, results[0].password))) {
                    res.json({
                        success: 401,
                        data: "Email or Password is incorrect"
                    });
                }
                else {
                    const id = results[0].id;
                    const token = jwt.sign({ id }, `mysupersecretpassword`, {
                        expiresIn: `90d`
                    });
                    console.log("Token: " + token);

                    const cookieOption = {
                        express: new Date(
                            Date.now() + 90 * 24 * 60 * 60
                        ),
                        httpOnly: true,
                    }
                    res.cookie('jwt', token, cookieOption);
                    var sql = `UPDATE client SET token= ? WHERE id= ?`;
                    db.query(sql, [token, results[0].id], function (err, data) {
                        if (err) throw err;
                        res.json({
                            status: 200,
                            data:results[0],
                            // type:results[0].type,
                            message: "updated client successfully and logged"
                        })
                        console.log(data.affectedRows + " record(s) updated");
                        return;
                    });
                }
            })
    } catch (error) {
        console.log(error);
    }
});
// as agency
router.post('/login/agency', async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log('/////////////////////');
        console.log(req.body);
        if (!email || !password) {
            return res.json({
                success: 0,
                data: "Please provide an email and password"
            });
        }
        db.query(`SELECT * FROM agency WHERE email = ?`,
            [email], async function (error, results) {
                // console.log(results);
                console.log(password);
                console.log(await bcrypt.hash(password, 10));
                console.log(results[0].password);
                console.log(await bcrypt.compare(password, results[0].password));
                if (!results || !(await bcrypt.compare(password, results[0].password))) {
                    res.json({
                        success: 401,
                        data: "Email or Password is incorrect"
                    });
                }
                else {
                    const id = results[0].id;
                    const token = jwt.sign({ id }, `mysupersecretpassword`, {
                        expiresIn: `90d`
                    });
                    console.log("Token: " + token);

                    const cookieOption = {
                        express: new Date(
                            Date.now() + 90 * 24 * 60 * 60
                        ),
                        httpOnly: true,
                    }
                    res.cookie('jwt', token, cookieOption);
                    var sql = `UPDATE agency SET token= ? WHERE id= ?`;
                    db.query(sql, [token, results[0].id], function (err, data) {
                        if (err) throw err;
                        res.json({
                            status: 200,
                            data:results[0],
                            // type:results[0].type,
                            message: "updated client successfully and logged"
                        })
                        console.log(data.affectedRows + " record(s) updated");
                        return;
                    });
                }
            })
    } catch (error) {
        console.log(error);
    }
});
//as ResManagers
router.post('/login/maintenancemanager', async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log('/////////////////////');
        console.log(req.body);
        if (!email || !password) {
            return res.json({
                success: 0,
                data: "Please provide an email and password"
            });
        }
        db.query(`SELECT * FROM maintenancemanager WHERE email = ?`,
            [email], async function (error, results) {
                // console.log(results);
                console.log(password);
                console.log(await bcrypt.hash(password, 10));
                console.log(results[0].password);
                console.log(await bcrypt.compare(password, results[0].password));
                if (!results || !(await bcrypt.compare(password, results[0].password))) {
                    res.json({
                        success: 401,
                        data: "Email or Password is incorrect"
                    });
                }
                else {
                    const id = results[0].id;
                    const token = jwt.sign({ id }, `mysupersecretpassword`, {
                        expiresIn: `90d`
                    });
                    console.log("Token: " + token);

                    const cookieOption = {
                        express: new Date(
                            Date.now() + 90 * 24 * 60 * 60
                        ),
                        httpOnly: true,
                    }
                    res.cookie('jwt', token, cookieOption);
                    var sql = `UPDATE maintenancemanager SET token= ? WHERE id= ?`;
                    db.query(sql, [token, results[0].id], function (err, data) {
                        if (err) throw err;
                        res.json({
                            status: 200,
                            data:results[0],
                            // type:results[0].type,
                            message: "updated client successfully and logged"
                        })
                        console.log(data.affectedRows + " record(s) updated");
                        return;
                    });
                }
            })
    } catch (error) {
        console.log(error);
    }
});
// Logout
router.post('/logout/:id', function (req, res) {
    var sql = `UPDATE client SET token= ? WHERE id= ?`;
    db.query(sql, ['', req.params.id], function (err, data) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "updated client successfully and logged"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});
// Logout
router.post('/logoutagency/:id', function (req, res) {
    var sql = `UPDATE agency SET token= ? WHERE id= ?`;
    db.query(sql, ['', req.params.id], function (err, data) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "updated client successfully and logged"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});
// Logout
router.post('/logoutresmanager/:id', function (req, res) {
    var sql = `UPDATE maintenancemanager SET token= ? WHERE id= ?`;
    db.query(sql, ['', req.params.id], function (err, data) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "updated client successfully and logged"
        })
        console.log(data.affectedRows + " record(s) updated");
        return;
    });
});


router.get('/secret-route', (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;
