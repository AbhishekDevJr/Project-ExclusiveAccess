const express = require('express');
const asyncHandler = require('express-async-handler');
const express_validator = require('express-validator');
const { body, validationResult } = require('express-validator');
const UserModel = require('../Models/user');
const jwt = require('jsonwebtoken');

const godUser = ['abhishek007coc@gmail.com'];

exports.user = asyncHandler((req, res, next) => {
    res.json({
        FirstName: 'Abhishek',
        LastName: 'Choudhari',
        isAdmin: true,
        username: 'abhishek@gmail.com'
    });
});

exports.signup = asyncHandler(async (req, res, next) => {
    console.log('Req--------------->', req.body);
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) { //userExists
        res.json({
            resCode: 'UserExists',
            message: 'UserName Already in use.',
            UserName: req.body.email,
        });
    }
    else {
        const userNew = new UserModel(req.body);
        await userNew.save();
        console.log('userNew------->', userNew);
        res.json({
            resCode: 'UserCreated',
            message: 'User Created Successfully.',
            user: userNew,
        });
    }
});

exports.exclusive = asyncHandler(async (req, res, next) => {
    console.log('Ex Req----------->', req.body);

    const hasExclusiveAccess = await UserModel.findOne({ email: req.body.username });

    if (hasExclusiveAccess.exclusiveAccess) {
        res.json({
            resCode: 'hasAccess',
            message: `${req.body.username} Already has exclusive access.`
        });
    }
    else {
        const updateUserAccess = await UserModel.findOneAndUpdate(
            { email: req.body.username },
            { $set: { exclusiveAccess: true } },
            { new: true }
        );

        res.json({
            resCode: 'OK',
            message: `${req.body.username} now has Exclusive Access.` //Use updateUserAccess.username
        });
    }

    // res.json(req.body);
});

exports.signin = asyncHandler(async (req, res, next) => {
    console.log('Req------------>', req.body);
    const userFind = await UserModel.findOne({ email: req.body.username });
    if (userFind) { //userFind
        if (String(userFind.password) === String(req.body.password)) { //String(userFind.password) === String(req.body.password)

            const token = jwt.sign({
                resCode: 'Authenticated',
                message: `${req.body.username} successfully signed in.`,
                username: req.body.username
            }, 'mySecretKey');

            res.json({ token: token, resCode: 'Authenticated', message: `${req.body.username} successfully signed in.` });
            // res.redirect('http://localhost:3000/exclusive');
        }
        else {
            res.json({
                resCode: 'Authentication Failed',
                message: `${req.body.username}'s incorrect password.`
            });
        }
    }
    else {
        res.json({
            resCode: 'UserNotFound',
            message: `${req.body.username} user not found.`
        });
    }
});