const express = require('express'); 
const app = express();               //express().use()..... too long
require('dotenv').config(); 
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

//whatever is in the environment variable PORT, or 3000 if there's nothing there
const PORT = process.env.PORT || 3000;
console.log(db);
+
app.use(express.json());
app.use(express.static('public'));
app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html')
)})
app.get('/api/notes', (req,res)=>{
    res.json(db)
})
app.post('/api/notes', (req,res)=>{
    db.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(db), (err)=> res.json(err||"success!") )
})
app.delete('/api/notes/:id', (req, res)=> {
    res.push('db\db.json')
})

// app.get("/members/:password", (req,res)=>{
//     if(req.params.password === process.env.SECRET_PASSWORD){
//         res.sendFile(path.join(__dirname, './public/members.html'))
//     }else{
//         res.json('YOU CANT HAVE NONE!')
//     }
// })
// db\db.json
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT,()=> console.log(`App is listening on port ${PORT}`))

//{name: "kevin"}// {"name": "kevin"}