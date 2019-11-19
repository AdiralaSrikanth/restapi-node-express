const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const Contact = require('./models/contact') 
//Contact var will now have access to  contactModel collect. In app.js we can now add
//documents to contactModel collection

const app = express()
app.use(bodyParser.json())

//Connecting to a database. we are creating "restapi"database on the fly.
mongoose.connect('mongodb://localhost:27017/restapi', (err) =>{
    if(err){
        console.log(err)
    }else{
        console.log("Connected to a database")
    }
});

app.get("/", (req,res) => {
    Contact.find({}) //running a query in contactModel collection
    .then((data) => {
    res.status(200).json({message:"Api hit successfully", data:data})
    // console.log(data[0])
    })
})

app.post("/", (req,res)=>{
    Contact.create({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    }).then (() => {
            res.status(200).json({message:"Data stored successfully"})
    }).catch((err)=>{
        res.status(400).json({"err":err})
    })
})

//Real time - we need to find the doc
app.get("/getOne/:id", (req,res)=>{
    Contact.findById(req.params.id)
    .then(()=>{
        res.status(200).json({message: "found the searched user"})
        console.log("found the user")
    })
})

//Update
app.put("/update/:id", (req,res)=>{
    Contact.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    })
    .then ((data) => {
            if(data){
            res.status(200).json({message:"Data updated successfully"})
            }else{
            res.status(200).json({message:"Data not updated, no recordsfound"})

            }
    }).catch((err)=>{
        res.status(400).json({"err":err})
    })
})

app.delete("/delete/:id", (req,res)=>{
    Contact.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).json({message:"Deleted the user"})
    }).catch((err)=>{
        console.log(err)
    })
})



app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})

