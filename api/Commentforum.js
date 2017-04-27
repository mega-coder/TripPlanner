var express = require('express');
var router = express.Router();
var Comment = require('../models/Commentforum');
var Post = require('../models/Posts');
var request = require('request');

// Add a new comment
router.post('/:post/comments',function(req, res, next) {
    Post.findById(req.params.post,function (err,mypost) {
        if(!mypost)
            return res.status(404).send();

        var comment = new Comment(req.body);
        comment.post = mypost;
        if(mypost.active && comment.body.length > 1){

            // save the new comment
            comment.save(function(err, comment){
                if(err){ return next(err); }

                mypost.comments.push(comment);
                mypost.save(function(err, post) {
                    if(err){ return next(err); }

                    res.json(comment);
                });
            });
        }
        else{
            var err = ("Failed. The Post Is Inactive.")
            res.send(err);
            return next(err);
        }

    });
});

// Upvote a Comment
router.put('/upvote/:comment', function(req, res, next) {
    Comment.findById(req.params.comment,function (err,comment) {
        if(!comment)
            return res.status(404).send();
        comment.upvote(function(err, comment){
            if (err) { return next(err); }
        });
        return res.json(comment);
    });
});

// Downvote a Comment
router.put('/downvote/:comment',function(req, res, next) {
    Comment.findById(req.params.comment,function (err,comment) {
        if(!comment)
            return res.status(404).send();
        comment.downvote(function(err, comment){
            if (err) { return next(err); }
        });
        return res.json(comment);
    });
});

module.exports = router;