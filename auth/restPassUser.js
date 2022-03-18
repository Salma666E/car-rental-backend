// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const uuid = require('uuid');
// const jwt = require('jsonwebtoken');
// const db = require('../modules/config.js');

// userRoutes.post('/reset-password', function (req, res) {
//     const email = req.body.email
//     console.log(email);
//     let sql = `SELECT (email, id) FROM (client, maintenancemanager, agency) WHERE email = ${req.body.email}`;
//     db.query(sql, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             return;
//         }
//         if (res.length) {
//             ress.json({
//                 status: 200,
//                 res,
//                 message: "agency's details retrieved successfully"
//             })
//             console.log("found agency: ", res[0]);
//             return res[0];
//         }
//     });









//     User
//         .findOne({
//             where: {email: email},//checking if the email address sent by client is present in the db(valid)
//         })
//         .then(function (user) {
//             if (!user) {
//                 return throwFailed(res, 'No user found with that email address.')
//             }
//             ResetPassword
//                 .findOne({
//                     where: {userId: user.id, status: 0},
//                 }).then(function (resetPassword) {
//                 if (resetPassword)
//                     resetPassword.destroy({
//                         where: {
//                             id: resetPassword.id
//                         }
//                     })
//                 token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
//                 bcrypt.hash(token, null, null, function (err, hash) {//hashing the password to store in the db node.js
//                     ResetPassword.create({
//                         userId: user.id,
//                         resetPasswordToken: hash,
//                         expire: moment.utc().add(config.tokenExpiry, 'seconds'),
//                     }).then(function (item) {
//                         if (!item)
//                             return throwFailed(res, 'Oops problem in creating new password record')
//                         let mailOptions = {
//                             from: '"<jyothi pitta>" jyothi.pitta@ktree.us',
//                             to: user.email,
//                             subject: 'Reset your account password',
//                             html: '<h4><b>Reset Password</b></h4>' +
//                             '<p>To reset your password, complete this form:</p>' +
//                             '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
//                             '<br><br>' +
//                             '<p>--Team</p>'
//                         }
//                         let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
//                         if (mailSent) {
//                             return res.json({success: true, message: 'Check your mail to reset your password.'})
//                         } else {
//                             return throwFailed(error, 'Unable to send email.');
//                         }
//                     })
//                 })
//             });
//         })
//  })