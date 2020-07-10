//declare dependancies
const express = require('express');
const path = require('path');
const fs = require('fs');


//global variable for reading the db.json file
const db = require('./db/db.json');

//set up express app
//whatever is in the environment variable PORT, or 3000 if there's nothing there
const PORT = process.env.PORT || 3000;
const app = express();  

//so the server and browser speak the same language
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//serves the static folder to the browser from the beginning
app.use(express.static('public'));

//ROUTES

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html')
  )
})
app.get('/api/notes', (req, res) => {
  res.json(db)
})
app.post('/api/notes', (req, res) => {
  console.log(req.body)
  db.push(req.body)
  fs.writeFile('./db/db.json', JSON.stringify(db), (err) => res.json(err || "success!"))
})
app.delete('/api/notes/:name', (req, res) => {
  let id = req.params.name;
//to remove from db which is our makeshift database in this assignment using the id from params
  db.splice(id, 1)
  fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
    if (err) throw err;
    res.send('success!')
})
})

app.get("/test/:param1?/:param2", (req,res)=> console.log("this is param1",req.params.param1, "this is param2", req.params.param2))
//catch all get routes not previously specified
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))

//{name: "kevin"}// {"name": "kevin"}
