const express = require('express');
const asyncHandler = require('express-async-handler');

exports.user = asyncHandler((req, res, next) => {
    if (req.body.isLoggedIn) {
        //Handle Logged In Response
    }
    else {
        //Handle Non Logged In Response
    }
});