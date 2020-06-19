const express = require('express');
var router = express.Router();
var publicDir = require("path").join(__dirname,'public');
router.use(express.static(publicDir));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nguyenhuonghh2707:0346924758@cluster0-qj71u.mongodb.net/test";

router.get('/',async (req,res)=>{   
    let client = await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    let result = await dbo.collection("books").find({}).toArray();
    res.render('book',{books:result});
});
router.get('/delete',async (req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    let client= await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    await dbo.collection("books").deleteOne(condition);
    //
    let results = await dbo.collection("books").find({}).toArray();
    res.render('book',{books:results});
});
router.get('/insert',async(req,res)=>{
    res.render('insertBook');
});
router.post('/doInsert',async(req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    let nameValue = req.body.txtName;
    let priceValue = req.body.txtPrice;
    let detailValue = req.body.txtDetail;
    let authorValue = req.body.txtAuthor;
    let newBook = {name : nameValue, author : authorValue, price: priceValue,detail:detailValue};
    await dbo.collection("books").insertOne(newBook);
    console.log(newBook);
    // let results = await dbo.collection("books").find({}).toArray();
    // res.render('book',{books:results});
    res.redirect("/book");
});
router.get('/update',async(req,res)=>
{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID; 
    let cliet = await MongoClient.connect(url);
    let dbo = cliet.db('asmdb');
    let result = await dbo.collection("books").findOne({'_id' : ObjectID(id)});
    res.render('updateBook',{books:result});
})
router.post('/doUpdate', async(req,res)=>{
    let id = req.body.id;
    let nameValue = req.body.txtName;
    let priceValue = req.body.txtPrice;
    let detailValue = req.body.txtDetail;
    let authorValue = req.body.txtAuthor;
    let newValues ={$set : {name: nameValue,author:authorValue,price:priceValue,detail:detailValue}};
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    await dbo.collection("books").updateOne(condition,newValues);
    //
    let results = await dbo.collection("books").find({}).toArray();
    res.render('book',{books:results});
});
module.exports = router;