const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function readTodos() {
  let todosData = fs.readFileSync('./data/todos.json');
  let parsedData = JSON.parse(todosData);
  return parsedData;
}

router.get('/', (req, res) => {
  res.json(readTodos());
  console.log(req.params)
});

router.get('/:userId', (req, res) => {
  let todos = readTodos();
  let userTodos = todos.find((user) => (user.uid === req.params.userId))
  console.log(req.params.userId)
  res.json(userTodos.todos)
});

router.post('/:userId/add', (req, res) => {
  const { todo } = req.body;

  const postDate = new Date();
  const dateOfPost = (`${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()}`)
  

  const newTodo = {
    id: uuidv4(),
    completed: false,
    text: todo,
    date: dateOfPost
  };

  const todos = readTodos();
  todos.map((user) => {
    if (req.params.userId === user.uid) {
      user.todos.unshift(newTodo);
      fs.writeFileSync('./data/todos.json', JSON.stringify(todos));
    }
  })
  res.json(newTodo);
});

router.put('/:userId/:entryId', (req, res) => {
  const { complete } = req.body;

  const mitComplete = {
    completed: complete
  }

  const todos = readTodos();
  let userTodos = todos.find((user) => (user.uid === req.params.userId))
  userTodos.todos.find((todo) => {
    console.log(todo.completed)
    console.log(todo.id)
    console.log(req.params.entryId)

    if (todo.id === req.params.entryId){
      todo.completed = mitComplete.completed
      console.log(todo.completed)
    }}) 

    fs.writeFileSync('./data/todos.json', JSON.stringify(todos));
    res.json(mitComplete);

})

router.delete('/:userId/:todoId', (req, res) => {
  let todos = readTodos();
  let userTodos = todos.find((user) => (user.uid === req.params.userId))
  let deleteUserTodo = userTodos.todos.findIndex(todo => todo.id === req.params.todoId);
  console.log(userTodos.todos)
  userTodos.todos.splice(deleteUserTodo, 1);

  fs.writeFileSync('./data/todos.json', JSON.stringify(todos));

  res.json('deleted');
});

module.exports = router;