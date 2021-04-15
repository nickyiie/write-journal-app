import { Link } from 'react-router-dom';
import Google from '../../assets/icons/google.png';
import './Login.scss'



function Login (props) {
  const { signInEmail, signInGoogle} = props
  
  const handleLogin =
    event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      signInEmail(email.value, password.value);

    };

    return (
    <div className="login">
        <h1 className='login__title'>I'll Write</h1>
      <form id='login-form' className='login__form' onSubmit={handleLogin}>
        <h2 className='login__form-title'>Login</h2>
        <input className='login__input' type="email" name="email" autoComplete='off' placeholder='email..' required />
        <input className='login__input' type="password" name="password" placeholder='password..' required />
        <button className="login__button" type='submit'>Login</button>
        <img className='login__google' src={Google} onClick={signInGoogle} alt='google sign-in'/>
        <Link to='/register' className='login__register'>Register</Link>
      </form>
      
    </div>
    )
}

export default (Login);
// withRouter
