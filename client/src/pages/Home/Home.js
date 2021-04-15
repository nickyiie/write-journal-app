import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TodoForm from '../../components/Todo/TodoForm/TodoForm';
import TodoList from '../../components/Todo/TodoList/TodoList';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Home.scss'


function Home({user}) {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [values, setValues] = useState([])
  

  

  useEffect(() => {

    const toDate = new Date()
    const dateToday = (`${toDate.getFullYear()}-${toDate.getMonth()}-${toDate.getDate()}`)

    const getTodos = async () => {
      const response = await axios.get(`http://localhost:8080/todos/${user.uid}`)
      let todayTodo = response.data.filter((todo) => (todo.date === dateToday))
      setTodos(todayTodo);
    }

    const getValues = async () => {
    const valuesResponse = await axios.get(`http://localhost:8080/users/${user.uid}`)
    setValues(valuesResponse.data.values)
    console.log(valuesResponse.data.values)
  }   
    getTodos();
    getValues();
  }, []) 
  
  const numDays = 182;

  return (
    <div className='home'>
      <p className='home__title'>Most Important Things</p>
      <TodoForm user={user} todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}/>
      <TodoList user={user} todos={todos} setTodos={setTodos} />
      <CalendarHeatmap className='home__heatmap' endDate={new Date()} numDays={numDays} values={values}/>
    </div>
  )
}

export default Home;