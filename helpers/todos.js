const db = require('../models');

// GET /api/todos/
exports.getTodos = (req, res) => {
  db.Todo.find()
  .then((todos) => {
    res.json(todos);
  })
  .catch((err) => {
    res.send(err);
  })
}

// GET /api/todos/id
exports.getTodoById = (req, res) => {
  db.Todo.findById(req.params.todoId)
  .then((foundTodo) => {
    res.json(foundTodo);
  })
  .catch((err) => {
    res.send(err);
  })
}

// POST /api/todos
exports.createTodo = (req, res) => {
  db.Todo.create(req.body)
  .then((newTodo) => {
    res.status(201).json(newTodo);
  })
  .catch ((err) => {
    res.send(err);
  });
}

// PUT /api/todos/id
// finds the id and uses the req.body as data to update. Responds with the
// updated object using {new: true}.
exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
  .then((todo) => {
    res.json(todo);
  })
  .catch((err) => {
    res.send(err);
  })
}

// DELETE /api/todos/id
exports.deleteTodo = (req, res) => {
  db.Todo.remove({_id: req.params.todoId})
  .then(() => {
    res.json({message: 'We deleted it'});
  })
  .catch((err) => {
    res.send(err);
  })
}

module.exports = exports;
