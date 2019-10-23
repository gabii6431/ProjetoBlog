'user strict';
var sql = require('./db.js');

//Post object constructor
var Post = function(post){
    this.title = post.title;
    this.body = post.body;
    this.user_id = post.user_id;
};
Post.createPost = function (newPost, result) {
        sql.query("INSERT INTO post set ?", newPost, function (err, res) {
                
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
Post.getPostById = function (postId, result) {
        sql.query("Select title, body from post where id = ? ", postId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Post.getAllPost = function (result) {
        sql.query("Select * from post", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('post : ', res);  

                 result(null, res);
                }
            });   
};
Post.updateById = function(id, post, result){
  sql.query("UPDATE post SET title = ?, body = ? WHERE id = ?", [post.title, post.body, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Post.remove = function(id, result){
    console.log('chegou aqui')
    console.log("ID")
    console.log(id)
     sql.query("DELETE FROM post WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Post;