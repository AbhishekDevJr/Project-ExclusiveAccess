const express = require('express');
const asyncHandler = require('express-async-handler');
const postModel = require('../Models/post');
const userModel = require('../Models/user');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

exports.posts = asyncHandler(async (req, res, next) => {

    const token = req.body.token;

    if (req.body.title && req.body.description && req.body.time_stamp && token) {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const username = decoded.username;

        const user = await userModel.findOne({ email: username });
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

exports.edit = asyncHandler(async (req, res, next) => {
    if (req.body.title && req.body.description && req.body._id) {
        const updatesPost = await postModel.findOneAndUpdate({ _id: new ObjectId(String(req.body._id)) },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    updatedAt: req.body.updatedAt
                }
            },
            {
                returnDocument: 'after',
            });

        if (updatesPost) {
            const allPost = await postModel.find();

            res.json({
                resCode: 'postUpdated',
                message: 'Post Updated Successfully.',
                updatedPosts: allPost,
            });
        }
        else {
            res.json({
                resCode: 'postNotUpdated',
                message: 'Something unhandled happened on the server.'
            });
        }
    }
    else {
        res.json({
            resCode: 'badRequest',
            message: 'Bad Request Payload'
        });
    }
});

exports.delete = asyncHandler(async (req, res, next) => {
    if (req.body._id) {
        const deletePost = await postModel.findOneAndDelete({ _id: new ObjectId(String(req.body._id)) });

        if (deletePost) {
            const allPosts = await postModel.find();

            res.json({
                resCode: 'postDeleted',
                message: 'Post Deleted Successfully.',
                updatedPosts: allPosts,
            });
        }
        else {
            res.json({
                resCode: 'postNotDeleted',
                message: 'Something unhandled happened on the server.'
            });
        }
    }
    else {
        res.json({
            resCode: 'badRequest',
            message: 'Bad Request Payload'
        });
    }
});