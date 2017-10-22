// start express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');


// require api routes
const todoRoutes = require("./routes/todos");


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.use('/api/todos', todoRoutes);



// GET /todos
app.get("/", function (req, res) {
  res.sendFile('index.html');
});



// node port settins
app.listen(3000, function () {
  console.log("App is running on 3000.")
});
