const express = require('express');
const asyncHandler = require('express-async-handler');
const postModel = require('../Models/post');

//Index Controller Function
exports.index = asyncHandler((req, res, next) => {
    res.json({
        route: '/',
        method: 'GET',
        subRoute: '-',
        message: 'Welcome Everyone!'
    });
});

//Get Post Controller Function
exports.getPosts = asyncHandler(async (req, res, next) => {
    const allPosts = await postModel.find();

    if (allPosts) {
        res.json({
            resCode: 'allPosts',
            message: 'Posts Fetched Successfully.',
            posts: allPosts
        });
    }
    else {
        res.json({
            resCode: 'postsNA',
            message: 'Posts Not Available.'
        });
    }
});