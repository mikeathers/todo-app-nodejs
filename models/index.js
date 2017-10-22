// default page when we require(../models).

// connect to mongodb through mongoose
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api');


// allows promises to be used. .then, .done. etc
mongoose.Promise = Promise;


// requires ./todo and exports this through Todo model
module.exports.Todo = require('./todo');
