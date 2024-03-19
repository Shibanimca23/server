const dotenv=require('dotenv').config();
const PORT = process.env.PORT;
// console.log(PORT);
const URL = process.env.URL;
// console.log(URL); 
const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{

   res.setHeader("Access-Control-Allow-Credentials","true");
   res.send("<h1>Welcome</h1>")
})

app.get('/data',(req,res)=>{
   
   Data.find().then((item)=>res.send(item))
})

app.post('/create',(req,res)=>{
    
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

app.listen(PORT,()=>{
    console.log("server started !!!");
});

// connect mongodb

mongoose.connect(URL).then(()=>{console.log("MongoDB connected!")}).catch(err=>console.log(err.message))

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

