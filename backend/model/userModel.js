'user strict';
var sql = require('./db.js');

//User object constructor
var User = function(user){
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
};
User.createUser = function (newUser, result) {    
        sql.query("INSERT INTO user set ?", newUser, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
User.getUserById = function (userId, result) {
        sql.query("Select name, username from user where id = ? ", userId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
User.getAllUser = function (result) {
        sql.query("Select * from user", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('user : ', res);  

                 result(null, res);
                }
            });   
};
User.updateById = function(id, user, result){
  sql.query("UPDATE user SET username = ? WHERE id = ?", [user.username, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
User.remove = function(id, result){
     sql.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= User;