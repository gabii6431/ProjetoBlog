'user strict';
var sql = require('./db.js');

//Comment object constructor
var Comment = function(comment){
    this.id = comment.id;
    this.title = comment.title;
    this.body = comment.body;
    this.email = comment.email;
    this.post_id = comment.post_id;
};
Comment.createComment = function (newComment, result) {    
        sql.query("INSERT INTO comment set ?", newComment, function (err, res) {
                
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
Comment.getCommentById = function (commentId, result) {
        sql.query("Select title, body, email from comment where id = ? ", commentId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Comment.getAllComment = function (result) {
        sql.query("Select * from comment", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('comment : ', res);  

                 result(null, res);
                }
            });   
};
Comment.updateById = function(id, comment, result){
  sql.query("UPDATE comment SET body = ? WHERE id = ?", [comment.body, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Comment.remove = function(id, result){
     sql.query("DELETE FROM comment WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Comment;