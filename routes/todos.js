const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/todos');

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo)

router.route('/:todoId')
  .get(helpers.getTodoById)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo)


// exports router so when we require
// todos.js we get the router settings
module.exports = router;
