import axios from 'axios';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TodoForm.scss';

function TodoForm({ user, setInputText, inputText, setTodos, todos }) {
  console.log(todos.length)
  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }
  
  const submitTodoHandler = (e) => {
    e.preventDefault();

    const newTodo = {
      todo: inputText
    }

    if (todos.length < 3 ){
      axios.post(`http://localhost:8080/todos/${user.uid}/add`, newTodo)

    setTodos([
      ...todos, { text: inputText, completed: false, id: uuidv4() }
    ]);
    setInputText('');
    } else { console.log ('too many!')}
    
  }

  return (
    <div>
      <form className='todo-form'>
        <input className='todo-form__input' value={inputText} type="text" onChange={inputTextHandler} />
        <button className='todo-form__button' type="submit" onClick={submitTodoHandler}>
          Add Todo
      </button>
        <div>
        </div>
      </form>
    </div>
  )
}

export default TodoForm;
