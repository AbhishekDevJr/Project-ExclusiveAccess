const express = require('express');
const asyncHandler = require('express-async-handler');
const postModel = require('../Models/post');
const userModel = require('../Models/user');
const jwt = require('jsonwebtoken');

exports.posts = asyncHandler(async (req, res, next) => {

    const token = req.body.token;

    if (req.body.title && req.body.description && req.body.time_stamp && token) {

        const decoded = jwt.verify(token, 'mySecretKey');
        const username = decoded.username;

        const user = await userModel.findOne({ email: username });
        console.log('User--------->', user);
        if (user) {
            const newPost = new postModel({ ...req.body, createdBy: user._id, author: username });
            await newPost.save();

            res.json({
                resCode: 'postCreated',
                message: 'Post created successfully.',
                post: newPost,
            });
        }
        else {
            res.json({
                resCode: 'userNotFound',
                message: 'User not found.',
                username: username,
            });
        }
    }
    else {
        res.status(400).json({
            resCode: 'badRequest',
            message: 'Bad Request Payload',
        });
    }
});