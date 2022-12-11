const express = require('express');
const router = express.Router();

var mysql = require('mysql');
const { CLIENT_IGNORE_SIGPIPE } = require('mysql/lib/protocol/constants/client');
var con = mysql.createConnection({
  host: "localhost",
  user: "ram",
  password: "Qwerty@123",
  database: "userdb"
});




con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
});

router.post('/',async function(req,res){
    try{        
        let {username,password,emailid,phone} = req.body
        var sql = "INSERT INTO user (username, password ,mobile , emailid ) VALUES ('"+username+"','"+password+"','"+emailid+"','"+phone+"') ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result) 
    });
          
                  
    }catch( error ){
        console.log(error);
    }
});

router.get('/',async function(req,res){
    try{        
        con.query("SELECT * FROM user", function (err, result, fields) {
            if (err) throw err;
         res.send(result)   
        });          
    }catch( error ){
        console.log(error);
    }
});

router.put('/post', async function(req,res){
    let {votecount, username} = req.body;
    var sql = "UPDATE user SET votecount = ? WHERE username = '"+username+"'";
    con.query(sql,votecount, function (err, result,fields) {
        if (err) throw err;
        console.log(result)
    res.send("success")
})})

router.put('/post1', async function(req,res){
    let {username, voted} = req.body;
    var sql = "UPDATE user SET voted = ? WHERE username = ?";
    con.query(sql,[voted,username], function (err, result,fields) {
        if (err) throw err;
    res.send("success")
})})

router.post('/data/',async function(req,res){
    try{ 
    console.log(req.body)
    let {username} = req.body;

    var sql = "SELECT * FROM user WHERE username = ?";
    con.query(sql,username, function (err, result,fields) {
    if (err) throw err;
    //console.log(fields)
    res.send(result[0])
    // console.log(result);
    // res.send(result) 
    });

                  
}catch( error ){
        console.log(error);
    }
});

router.post('/login/',async function(req,res){
    try{ 
    let {username,password} = req.body;

    var sql = "SELECT * FROM user WHERE username = ?";
    con.query(sql,username, function (err, result,fields) {
    if (err) throw err;
    //console.log(fields)
    console.log(result[0].password)
    if(result[0].password === password){
        if(username === "admin"){
            res.send("admin")
        }else {
            res.send("login true")
        }
    }else {
        res.send("Wrong username password")
    }
    // console.log(result);
    // res.send(result) 
    });

                  
}catch( error ){
        console.log(error);
    }
});

// var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";

// router.post('/',async function(req,res){
//     try{        
//         var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//       res.json(result) 
//     });
          
                  
//     }catch( error ){
//         console.log(error);
//     }
// });



module.exports = router;