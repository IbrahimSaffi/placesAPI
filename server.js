const express = require("express")
const { default: mongoose } = require('mongoose');
const placeModel = require("./schemes/placeSchema");
const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

async function connectToDatabase(){
     await mongoose.connect("mongodb+srv://IbrahimSaffi:jmk161651@places-api-cluster.3mlhqry.mongodb.net/?retryWrites=true&w=majority")
    console.log("Connected to Database")
}
connectToDatabase()

app.post("/add",async(req,res)=>{
     const { name,city,state } = req.body
     if(!name||!city||!state){
       return res.status(400).send({error:"Some or all required fields are missing"})
     }
     const placeExist = await placeModel.findOne({name:name})
     console.log(placeExist)
     if(placeExist!==null){
      return res.status(400).send({response:"This place already exists"})
     }
     let place = new placeModel({
       name:name,
       city:city,
       state:state,
     })
     place.save( async (err,savedObj)=>{
        let id = savedObj._id
        let name = savedObj.name
     await savedObj.updateOne({$set:{slug:`${name}-${id}`}})
    })
    return res.status(200).send({response:"Place has been added"})
})
app.get("/",async(req,res)=>{
  const { name} = req.body
  if(!name){
    return res.status(400).send({error: "Please provide name of place"})
  }
  const place = await placeModel.findOne({name:name})
  console.log(place)
  if(place===null){
   return res.status(400).send({response:"Such place do not exist"})
  }
  else{
    return res.send(place)
  }
})
app.get("/list",async(req,res)=>{
 
  if(Object.entries(req.body)==0){
    return res.status(400).send( {error: "No filters provided"})
  }
  let places;
  if(req.body.hasOwnProperty("city")){
    let city = req.body.city
     places = await placeModel.find({city: city})  
     console.log(places)
    }
    else if(req.body.hasOwnProperty("state")){
      let state = req.body.state
      places = await placeModel.find({state:state})  
    }
    if(places.length===0){
     return res.status(400).send( {response: "No places in this category"})
    }
    return res.send(places)
})
app.listen(8000)