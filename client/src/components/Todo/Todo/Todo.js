import React, { useState } from 'react';
import './Todo.scss';
import { MdDone } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import axios from 'axios';

function Todo({user, text, id, completed, todos, setTodos}) {
  const [taskExp, setTaskExp] = useState(0)
  
  const deleteTodo = () => {
    axios.delete(`http://localhost:8080/todos/${user.uid}/${id}`)
    setTodos(todos.filter((el) => el.id !== id))
  };


  const completeTodo = () => {
    setTaskExp(2)
    console.log(taskExp)

    const mitComplete = {
      complete: true,
      experience: taskExp
    }

    const setComplete = () => {
      axios.put(`http://localhost:8080/todos/${user.uid}/${id}`, mitComplete)
      axios.put(`http://localhost:8080/users/t/${user.uid}`, mitComplete)
    }

    setTodos(todos.map((item) => {
      if(item.id === id) {
        return {
          ...item, completed: !item.completed
        };
      }
        return item;
    }))

    setComplete();
    
  }


  return (
    <div className='todo-item__container' key={id}>
      <li className={`todo-item ${completed}`} key={id}>{text}</li>
      <div className='todo-item__button-box'>
      <MdDone className='todo-item__button button-left' onClick={completeTodo}/>
      <FiTrash className='todo-item__button' onClick={deleteTodo}/>
      </div>
    </div>
  )
}

export default Todo
