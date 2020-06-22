const express = require('express');
var router = express.Router();
var publicDir = require("path").join(__dirname,'public');
router.use(express.static(publicDir));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nguyenhuonghh2707:0346924758@cluster0-qj71u.mongodb.net/test";

router.get('/',async (req,res)=>{   
    let client = await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    let result = await dbo.collection("toys").find({}).toArray();
    res.render('toy',{toys:result});
});
router.get('/delete',async (req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    let client= await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    await dbo.collection("toys").deleteOne(condition);

    // let results = await dbo.collection("toys").find({}).toArray();
    // res.render('toy',{toys:results});
    res.redirect('/');
});


router.get('/insert',async(req,res)=>{
    res.render('insertToy');
});
router.post('/doInsert',async(req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    let nameValue = req.body.txtName;
    let priceValue = req.body.txtPrice;
    let producerValue = req.body.txtProducer;
    let materialValue = req.body.txtMaterial;
    let abc = materialValue.toUpperCase();
    let newToy = {name : nameValue, material : abc, price: priceValue,producer:producerValue};
    await dbo.collection("toys").insertOne(newToy);
    console.log(newToy);
    // let results = await dbo.collection("books").find({}).toArray();
    // res.render('book',{books:results});
    res.redirect("/");
});

router.get('/update',async(req,res)=>
{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID; 
    let cliet = await MongoClient.connect(url);
    let dbo = cliet.db('asmdb');
    let result = await dbo.collection("toys").findOne({'_id' : ObjectID(id)});
    res.render('updateToy',{toys:result});
})
router.post('/doUpdate', async(req,res)=>{
    let id = req.body.id;
    let nameValue = req.body.txtName;
    let priceValue = req.body.txtPrice;
    let producerValue = req.body.txtProducer;
    let materialValue = req.body.txtMaterial;
    let newValues ={$set : {name: nameValue,material:materialValue,price:priceValue,producer:producerValue}};
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("asmdb");
    await dbo.collection("toys").updateOne(condition,newValues);
    
    // let results = await dbo.collection("toys").find({}).toArray();
    // res.render('toy',{toys:results});

    res.redirect('/');
});
module.exports = router;