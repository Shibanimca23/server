const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post('/',(req,res)=>{

   let {name,mail,pass}=req.body;

   if(name === "Sahaya Shibani" && mail==="sahayashibani@gmail.com" && pass==="shibani@123"){
    res.send("Success")
   }
   else{
    res.send("failed")
   }
})

app.get('/data',(req,res)=>{
   // console.log("I got a request");
   Data.find().then((item)=>res.send(item))
})

app.post('/create',(req,res)=>{
    // console.log(req.body);
    Data.create(req.body).then((item)=>res.send(item))
 })
 
 app.put('/update/:id',(req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
    Data.findOneAndUpdate({_id:req.params.id},{$set:req.body},{ new: true }).then(res => console.log(res))
 })

 app.delete('/delete/:id',(req,res)=>{
console.log(res.params);
       let deletedItem = Data.findOneAndDelete({_id:req.params.id}).then(response => console.log("response:",response))
   //   console.log("deleted",deletedItem);
       if(deletedItem){
          console.log(`deleted successfully ${deletedItem.name}`)
       }
    })

app.listen(8080,()=>{
    console.log("server started !!!");
});

// connect mongodb

mongoose.connect("mongodb+srv://sahayashibani:sahayashibani@cluster0.qhffl43.mongodb.net/mca").then(()=>{console.log("MongoDB connected!")})

// create a schema

let newSchema = new mongoose.Schema({
                 name : String,
                 email:String,
                 password : String,
                 amount : Number
                })

// model

let Data = mongoose.model('mca' , newSchema)

// // create a data for testing

// let data1 = new Data({
//     name :"Rehana Bensha",
//     email:"rehana@gmail.com",
//     password:"12345789",
//     amount : 20000
// })

// data1.save();

