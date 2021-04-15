import React from 'react';
import Todo from '../Todo/Todo';
import './TodoList.scss'

function TodoList({todos, setTodos, user}) {
  console.log(todos)
  return (
    <div>
      <ul className='todo'>
      {todos.map(todo => {
        return <Todo  user={user} todos={todos} text={todo.text} id={todo.id} completed={todo.completed} setTodos={setTodos}/>  
      })}
      </ul>
    </div>
    
  )
}

export default TodoList
