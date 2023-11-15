// Create web server
var express = require('express');
var router = express.Router();
var comments = require('../models/comments');
var users = require('../models/users');
var ObjectId = require('mongoose').Types.ObjectId;
var auth = require('../auth');
var check = auth.check;
var checkAdmin = auth.checkAdmin;

// GET all comments
router.get('/', checkAdmin, function(req, res, next) {
    comments.find({}, function(err, comments) {
        if (err) return next(err);
        res.json(comments);
    });
});

// GET a comment by id
router.get('/:id', check, function(req, res, next) {
    comments.findOne({
        _id: new ObjectId(req.params.id)
    }, function(err, comment) {
        if (err) return next(err);
        if (!comment) return next();
        res.json(comment);
    });
});

// POST a new comment
router.post('/', check, function(req, res, next) {
    var comment = new comments({
        title: req.body.title,
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    });
});