const express = require('express');
const asyncHandler = require('express-async-handler');
const express_validator = require('express-validator');
const { body, validationResult } = require('express-validator');
const UserModel = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) { //userExists
        res.json({
            resCode: 'UserExists',
            message: 'UserName Already in use.',
            UserName: req.body.email,
        });
    }
    else {

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const userNew = new UserModel({ ...req.body, password: hashedPassword });
        await userNew.save();
        res.json({
            resCode: 'UserCreated',
            message: 'User Created Successfully.',
            user: userNew,
        });
    }
});

exports.exclusive = asyncHandler(async (req, res, next) => {

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
            message: `${req.body.username} now has Exclusive Access.`
        });
    }
});

exports.signin = asyncHandler(async (req, res, next) => {

    const userFind = await UserModel.findOne({ email: req.body.username });
    if (userFind) {

        const isPasswordCorrect = await bcrypt.compare(req.body.password, userFind.password);

        if (isPasswordCorrect) {
            const token = jwt.sign({
                resCode: 'Authenticated',
                message: `${req.body.username} successfully signed in.`,
                username: req.body.username
            }, process.env.JWT_SECRET);

            res.json({ token: token, resCode: 'Authenticated', message: `${req.body.username} successfully signed in.`, expTime: 3600000 });
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