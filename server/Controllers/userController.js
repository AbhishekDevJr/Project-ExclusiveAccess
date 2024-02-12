const express = require('express');
const asyncHandler = require('express-async-handler');

exports.user = asyncHandler((req, res, next) => {
    res.json({
        FirstName: 'Abhishek',
        LastName: 'Choudhari',
        isAdmin: true,
        username: 'abhishek@gmail.com'
    });
});

exports.signup = asyncHandler((req, res, next) => {
    console.log('Req--------------->', req.body);
    res.json(req.body);
});