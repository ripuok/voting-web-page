require('dotenv').config();
const express = require('express');
const router = express.Router();

                                                           
var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "ripu",
//     password: "Qwerty@123",
//     database: "votingdb"
var con = mysql.createConnection({
    host: "bergxmxnrh47mjtrl1ws-mysql.services.clever-cloud.com",
    user: "ubgbi1lqtefxmgjx",
    password: process.env.PASSWORD,
    database: "bergxmxnrh47mjtrl1ws"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
});

router.post('/',async function(req,res){
    try{
    // con.connect(function(err) {
    //     if (err) throw err;
    //     //console.log("Connected!");
        
    // });        
        let {username,password,emailid,phone} = req.body
        var sql = "INSERT INTO users (username, password , emailid ,mobile) VALUES ('"+username+"','"+password+"','"+emailid+"','"+phone+"') ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      res.send(result) 
    });
          
    // con.end();             
    }catch( error ){
        console.log(error);
    }
});

router.get('/',async function(req,res){
    try{        
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
         res.send(result)   
        });          
    }catch( error ){
        console.log(error);
    }
});

router.put('/post', async function(req,res){
    let { username} = req.body;
    var sql = "UPDATE users SET votecount = votecount + 1 WHERE username = '"+username+"'";
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        console.log(result)
    res.send("success")
})})

router.put('/post1', async function(req,res){
    let {username, voted} = req.body;
    var sql = "UPDATE users SET voted = ? WHERE username = ?";
    con.query(sql,[voted,username], function (err, result,fields) {
        if (err) throw err;
    res.send("success")
})})

router.post('/data/',async function(req,res){
    try{ 
   // console.log(req.body)
    let {username} = req.body;

    var sql = "SELECT * FROM users WHERE username = ?";
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

    var sql = "SELECT * FROM users WHERE username = ?";
    con.query(sql,username, function (err, result,fields) {
    if (err) throw err;
    //console.log(fields)
    //console.log(result[0].password)
    try{

        if(result[0].password === password){
            if(username === "admin"){
                res.send("admin")
            }else {
                res.send("login true")
            }
        }else {
            res.send("Wrong username password")
        }
    }catch(e){
        res.send("Wrong username password")
    }
    // console.log(result);
    // res.send(result) 
    });

                  
}catch( error ){
        console.log(error);
    }
});


router.post('/username/',async function(req,res){
    try{ 
    let {username} = req.body;

    var sql = "SELECT * FROM users WHERE username = '"+username+"'";
    con.query(sql, function (err, result,fields) {
    if (err) throw err;
    
    if(result[0] === undefined){
        res.send("ok")
    }else if(result[0].username === username){       
        res.send("User exits")
    }else {
        res.send("ok")
    }
    
    // console.log("here" ,result[0].username)
    // res.send(result[0])
    });

                  
}catch( error ){
        console.log(error);
    }
});



module.exports = router;