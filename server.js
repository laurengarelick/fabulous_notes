const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
//express().use()..... too long
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get("/api/notes", (req,res)=>{
    res.json(db)
})
app.post('/api/notes', (req,res)=>{
    db.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(db), (err)=> res.json(err||"success!") )
})
app.get("/members/:password", (req,res)=>{
    if(req.params.password === process.env.SECRET_PASSWORD){
        res.sendFile(path.join(__dirname, './public/members.html'))
    }else{
        res.json('YOU CANT HAVE NONE!')
    }
})

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT,()=> console.log(`App is listening on port ${PORT}`))

//{name: "kevin"}// {"name": "kevin"}