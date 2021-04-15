import { NavLink } from 'react-router-dom';
import Home from '../../assets/icons/user.svg';
import Add from '../../assets/icons/add.svg';
import Entries from '../../assets/icons/openbook.svg';
import { AiOutlineLogout } from 'react-icons/ai';
import './NavBar.scss'

function NavBar ({user, signOut}) {
  
  if (signOut === null) {
    return <div> Loading </div>
  }
  return (
    <nav className='navbar'>
      {user ? <NavLink className='navbar__account' to={`/${user.uid}`} exact><img className='navbar__icon' src={Home} alt='home'/></NavLink> : null } 
      {user ? <NavLink className='navbar__new-entry' to={`/${user.uid}/new`}><img className='navbar__icon' src={Add} alt='new entrry'/></NavLink> : null }
      <NavLink className='navbar__entries' to='/entries'><img className='navbar__icon' src={Entries} alt='entries'/></NavLink>
      <AiOutlineLogout className='navbar__icon' onClick={signOut}> Sign out </AiOutlineLogout>
    </nav>
  )
}

export default NavBar;