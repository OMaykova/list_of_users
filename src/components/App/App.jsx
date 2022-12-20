import React, { useEffect, useState }  from "react";
import Header from '../Header/Header.jsx';
import Main from '../Main/Main';
import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import Profile from '../Profile/Profile';
import {usersApi} from "../../utils/usersApi";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Register from "../Register/Register.jsx";
import { register } from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute ';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { ADD_USERS } from '../../store/actions';
import { UPDATE_USER } from '../../store/actions';

function App() {
  const dispatch = useDispatch();
  const usersR = useSelector((state) => state = state.users[0])
  const history = useHistory();
  // const [users, setUsers] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    id: '',
  })
  const [currentUser, setCurrentUser] =useState({
    _id: '',
  })
const [isLoggedIn, setIsLoggedIn] = useState(false);
console.log('currentUser', currentUser)

useEffect(() => {
  if (isLoggedIn) {
    usersApi.getUsers()
    .then((res) => {
      console.log('res', res)
      dispatch({
        type: ADD_USERS,
        payload:
          res.data
        })
    })
    .then(() => history.push("/users"))
    .catch((err) => console.log(err));
    }
}, [isLoggedIn])

  function handleCardClick(user) {
    setSelectedCard({ avatar: user.avatar, firstName: user.first_name, lastName: user.last_name, email: user.email, phone: '+7 (954) 333-44-55', id: user.id });
  }

  function handleCardLike(user) {
    const isLiked = (user.like === currentUser._id);
    console.log('user.like', user.like)
    console.log('currentUser._id', currentUser._id)
    const request = isLiked ?
      usersApi.removeLike(user) : usersApi.setLike(currentUser._id, user);

    request
      .then((newUser) => {
        console.log('newUser', newUser)
      dispatch({
          type: UPDATE_USER,
          payload: {
            id: newUser.id,
            like: newUser.like
          }

        })
        // setUsers((state) => state.map((u) => u.id === newUser.id ? newUser : u));
        }).catch(console.log)
  }

  function handleRegister({password, email}) {
    return register(password, email)
    .then((res) => {
      if(res) {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setCurrentUser ({
          _id: res.id
        })
      }
    })
    .catch((err) => {
      console.log(err)
    });
  }


  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/signup');
  }

  function checkToken() {
    if (localStorage.getItem('jwt')){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
      history.push("/signup");
    }
  }


  console.log('dispatch', usersR)

  useEffect(() => {
    checkToken();
  }, []);


  return (
    <CurrentUserContext.Provider value ={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute exact path="/users" isLoggedIn={isLoggedIn}>
            <Header
              handleSignOut={handleSignOut}
            />
            <Main
              handleCardLike={handleCardLike}
              currentUser={currentUser}
              users={usersR}
              onCardClick={handleCardClick}
            />
          </ProtectedRoute>
          <ProtectedRoute exact path="/users/profile/:id" isLoggedIn={isLoggedIn}>
            <Header
              selectedCard={selectedCard}
              handleSignOut={handleSignOut}
              />
            <Profile
              selectedCard={selectedCard}
            />
          </ProtectedRoute>
          <Route exact path='/signup'>
            <Register
              handleReqest={handleRegister}
            />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;