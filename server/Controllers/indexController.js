const express = require('express');
const asyncHandler = require('express-async-handler');
const postModel = require('../Models/post');

exports.index = asyncHandler((req, res, next) => {
    res.json({
        route: '/',
        method: 'GET',
        subRoute: '-',
        message: 'Welcome Everyone!'
    });
});

exports.getPosts = asyncHandler(async (req, res, next) => {
    console.log('Req p----------->', req);
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