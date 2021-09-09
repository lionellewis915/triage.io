const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
//const _ = require('loadash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Custom error handler to get useful errors from DB
const { errorHandler } = require('../helpers/dbErrorHandling');

// Email verification
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY)

exports.registerController = (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    const errors = validationResult(req);

    // Validation to req, body...Will create custom validation in seconds
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((wrr, user) => {
            // If user exists
            if(user) {
                return res.status(400).json({
                    error: "Email is taken"
                })
            }
        })

        // General Token
        const token = jwt.sign(
            {
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '15 Minutes'
            }
        )

        // Data for sending email
        const emailData = {
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: "Triage.io Account Activation Link",
            html: `
                <h1>Please Click the link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                </hr>
                <p>This email contains sensitve information</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
        };

        sgMail.send(emailData).then(() => {
            console.log(`Email has been sent to ${email}`)
            return res.json({
                message: `Email has been sent to ${email}`                
            })
        }).catch(err => {
            return res.status(400).json({
                error: errorHandler(err)
            })
        })
    }
};