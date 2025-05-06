const express = require('express');
const app = express();
const todos = require('./data');

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Get all todo items
app.get('/api/TodoItems', (req, res) => {
  res.status(200).json(todos);
});

// Get a single todo item by ID
app.get('/api/TodoItems/:number', (req, res) => {
  const id = parseInt(req.params.number);
  const todo = todos.find(item => item.todoItemId === id);
  if (!todo) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.status(200).json(todo);
});

// Add a new todo item
app.post('/api/TodoItems', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Delete a todo item
app.delete('/api/TodoItems/:number', (req, res) => {
  const id = parseInt(req.params.number);
  const index = todos.findIndex(item => item.todoItemId === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const deleted = todos.splice(index, 1)[0];
  res.status(200).json(deleted);
});

module.exports = app;