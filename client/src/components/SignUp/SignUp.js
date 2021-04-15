// import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router';
import { AiFillCaretLeft } from 'react-icons/ai';
import axios from 'axios';
import './SignUp.scss';

//state - loading true happen false, async

function SignUp(props) {
  const { createAccount, user } = props
  console.log(props)
  const [loading, setLoading] = useState(false)

  
  

    const handleSingUp = (event) => {
    event.preventDefault();
    setLoading(true);

    const { email, password } = event.target.elements;
    createAccount(email.value, password.value);
    console.log(user)

  //   const newUser = {
  //     uid: user.uid
  //   }

  //   const createProfile = async => {
  //     try {
  //       const createUserInfo = await axios.post('http://localhost:8080/user', newUser)
  //     } catch(error) { console.log(error) }
      

  //   }

  //   const testing = async => {

  //     const createTodoInfo = await axios.post('http://localhost:8080/todos', newUser) 
  //   }

  //   const createUserProfile = async => {
      
  //     const createEntriesInfo = await axios.post('http://localhost:8080/entries', newUser)
  //   }

  //   createProfile();
  //   createUserProfile();
  //   setLoading(false)

  //   return newUser
  }

  // useEffect(() =>  {

  const goBack = () => props.history.goBack();


  if (loading === true ) {
    return <div> loading </div>
  }
  return (
    <>
      <AiFillCaretLeft className='single-entry__chevron' onClick={goBack} />
      <div className="sign-up">
        <h1 className='sign-up__title'>I'll Write</h1>
        <form id='sign-up-form' className='sign-up__form' onSubmit={handleSingUp}>
          <h2 className='sign-up__subtitle'>Register</h2>
          <input className='sign-up__input' type="email" name="email" placeholder='email..' />
          <input className='sign-up__input' type="password" name="password" placeholder='password..' />
          <button className="sign-up__button" type='submit'>Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default withRouter(SignUp);