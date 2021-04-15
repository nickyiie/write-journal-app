import { useState, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase/firebaseConfig';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import SignUp from './components/SignUp/SignUp';
import NewEntry from './pages/NewEntry/NewEntry';
import Header from './components/Header/Header';
import Entries from './pages/Entries/Entries';

import './App.scss';
import SingleEntry from './pages/SingleEntry/SingleEntry';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function App (props) {
  const [usersData, setUsersData] = useState(null);
  const [entriesData, setEntriesData] = useState(null);

  const {
    user,
    signOut,
    signInWithGoogle,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  } = props;

  useEffect(() => {
    const getUsers = () =>
    axios.get('http://localhost:8080/users')
      .then(res => {
        setUsersData(
          res.data
        )
      })

      const getEntries = () => 
      axios.get('http://localhost:8080/entries')
      .then(res => {
        setEntriesData(
         res.data
        )
      })

    getUsers();
    getEntries();
  }, [])


  if (usersData || entriesData === null) { <div>Loading</div>}

    return (
      <div className="App">
      {console.log(user)}
            <BrowserRouter>
            {user ? <Header user={user} usersData={usersData}/> : null }
              <Switch>
                {user ? <Route  exact path={`/${user.uid}`} render={() => user ? <Home user={user}/> : <Redirect to='/login' />}/> : null }
                <Route exact path='/login' render={(props) => user ? <Redirect to={`/${user.uid}`}/> : <Login {...props} user={user} signInEmail={signInWithEmailAndPassword} signInGoogle={signInWithGoogle}/> }/>
                {user ? <Route exact path={`/${user.uid}/new`} render={(props) => user?  <NewEntry {...props} user={user}/> : <Redirect to='/login'/> }/>: null }
                <Route exact path='/register' render={(props) => user ? <Home/> : <SignUp {...props} createAccount={createUserWithEmailAndPassword} user={user}/>} />
                <Route exact path='/entries' render={(props) => user? <Entries {...props} user={user} entriesData={entriesData}/> : <Redirect to='/login'/>}/>
                <Route exact path='/:entryId' render={(props) => user ? <SingleEntry {...props} user={user} entriesData={entriesData}/> : <Redirect to='/login'/>}/>
              </Switch>
              {user ? <NavBar user={user} signOut={signOut}/> : null }
            </BrowserRouter>
      </div>
    );

}


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
