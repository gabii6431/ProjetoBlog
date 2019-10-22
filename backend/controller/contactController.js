'use strict';

var Contact = require('../model/contactModel.js');

exports.list_all_contact = function(req, res) {
  Contact.getAllContact(function(err, contact) {
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', contact);
    res.send(contact);
  });
};

exports.create_a_contact = function(req, res) {
  var newContact = new Contact(req.body);

  //handles null error 
   if(!newContact.nome || !newContact.email || !newContact.message){
        res.status(400).send({ error:true, message: 'Please provide nome/email/message' });
    }
    else{
    
    Contact.createContact(newContact, function(err, contact) {
        if (err)
        res.send(err);
        res.json(contact);
    });
    }
};


exports.read_a_contact = function(req, res) {
  Contact.getContactById(req.params.contactId, function(err, contact) {
    if (err)
      res.send(err);
    res.json(contact);
  });
};


exports.update_a_contact = function(req, res) {
  Contact.updateById(req.params.contactId, new Contact(req.body), function(err, contact) {
    if (err)
      res.send(err);
    res.json(contact);
  });
};


exports.delete_a_contact = function(req, res) {

  Contact.remove( req.params.contactId, function(err, contact) {
    if (err)
      res.send(err);
    res.json({ message: 'Contact successfully deleted' });
  });
};