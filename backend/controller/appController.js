'use strict';

var Post = require('../model/appModel.js');

exports.list_all_post = function(req, res) {
  Post.getAllPost(function(err, post) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', post);
    res.send(post);
  });
};

exports.create_a_post = function(req, res) {
  var newPost = new Post(req.body);

  //handles null error 
   if(!newPost.title || !newPost.body || !newPost.user_id){
        res.status(400).send({ error:true, message: 'Please provide title/body' });
    }
    else{
    
    Post.createPost(newPost, function(err, post) {
        if (err)
        res.send(err);
        res.json(post);
    });
    }
};


exports.read_a_post = function(req, res) {
  Post.getPostById(req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.update_a_post = function(req, res) {
  Post.updateById(req.body.post_id, new Post(req.body), function(err, post) {
    if (err)
      res.send(err);
    res.json(post);
  });
};


exports.delete_a_post = function(req, res) {

  Post.remove( req.params.postId, function(err, post) {
    if (err)
      res.send(err);
    res.json({ message: 'Post successfully deleted' });
  });
};