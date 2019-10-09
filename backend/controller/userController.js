'use strict';

var User = require('../model/userModel.js');

exports.list_all_user = function(req, res) {
  User.getAllUser(function(err, user) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};

exports.create_a_user = function(req, res) {
  var newUser = new User(req.body);

  //handles null error 
   if(!newUser.name || !newUser.username || !newUser.email){
        res.status(400).send({ error:true, message: 'Please provide title/body' });
    }
    else{
    
    User.createUser(newUser, function(err, user) {
        if (err)
        res.send(err);
        res.json(user);
    });
    }
};


exports.read_a_user = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  User.updateById(req.params.userId, new User(req.body), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {

  User.remove( req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};