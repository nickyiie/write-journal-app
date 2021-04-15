import React from 'react';
import LevelBar from '../../components/LevelBar/LevelBar';
import './Header.scss';

function Header ({user, usersData}) {
  let currentData = usersData.find((currUser) => currUser.uid === user.uid); 

if (currentData  === []) {
  return <div>Loading</div>
}

  return (
    <div className='header'>
      {user.displayName ? 
      <p className='header__title'>Welcome {user.displayName}!</p>
      :
      <h1 className='header__title'>Life's a game...</h1> }
      <LevelBar level={currentData} className='header__level'/>
    </div>
  )
}

export default Header;