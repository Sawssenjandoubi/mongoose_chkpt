const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PersonModel = require("./models/person");
const port = process.env.PORT || 5000;
require("dotenv").config();
const uri = process.env.uri;
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("connected sucessfully");
  }
);
//Create and Save a Record of a Model:
const person = new PersonModel
({
    name:'sawssen',
    age:25,
    favoriteFoods:['coscous','spagethi','pizza']
});
person.save((err,data)=>{
    if (err) throw err
    console.log(data)
});
/*const person = new PersonModel
({
    name:'mary',
    age:30,
    favoriteFoods:['Mosli','Risotto']
});
person.save((err,data)=>{
    if (err) throw (err)
    console.log(data)
});*/
/*const person = new PersonModel
({
    name: "ala",
      age: 28,
      favoriteFoods: ["lasagne", "Risotto","burritos"],
})
person.save((err,data)=>{
    if (err) throw (err)
    console.log(data)
});*/
PersonModel.findOneAndUpdate({name:'maya'},{$set:{favoriteFoods:'burritos'}},(data,err)=>{
    if (err) throw err
    console.log(data)
})
//Create Many Records with model.create()
PersonModel.create(
  [
    {
      name: "john",
      age: 20,
      favoriteFoods: ["sushi", "pizza"],
    },
    {
      name: "maya",
      age: 23,
      favoriteFoods: ["lasagne", "Risotto"],
    },
    {
      name: "alex",
      age: 24,
      favoriteFoods: ["hamburger", "takos"],
    },
  ],
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);
//Find all the people
PersonModel.find({},(err,data)=>{
    if (err) throw err
    console.log(data)
});
// Use model.findOne() to Return a Single Matching Document from Your Database:
PersonModel.findOne({favoriteFoods:'lasagne'},(err,data)=>{
    if (err) throw (err)
    console.log(data)
})
//Use model.findById() to Search Your Database By _id:
PersonModel.findById("62e905d90a35ea3e7886a54d",(err,data)=>{
    if(err) throw (err)
    console.log(data)
})
//Perform New Updates on a Document Using model.findOneAndUpdate():
PersonModel.findOneAndUpdate({name:'sawssen'},{ $set: {age:20}},{new: true} )
.then((data)=>console.log(data))
.catch((err)=>console.log(err))
//Delete One Document Using model.findByIdAndRemove:
PersonModel.findByIdAndRemove("62e905d90a35ea3e7886a54e",{new: true},(err,data)=>{
    if(err) throw (err)
    console.log(data)
})
// Delete Many Documents with model.remove():
PersonModel.remove({name:'mary'},function (data,err){
    if (err) throw err
    console.log(data)
})
//Chain Search Query Helpers to Narrow Search Results:
PersonModel
.find({favoriteFoods:'burritos'})
.sort({name:1})
.limit(2)
.select({age:0})
.exec(function(data,err){
    if (err) throw err
    console.log(data)
})
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`app is running at http://localhost:${port}`);
});
