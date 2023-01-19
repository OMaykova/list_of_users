import React, { useEffect, useState }  from "react";
import Header from '../Header/Header.jsx';
import Main from '../Main/Main';
import './App.css';
import { Switch, Route, useHistory } from "react-router-dom";
import Profile from '../Profile/Profile';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Register from "../Register/Register.jsx";
import { register } from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute ';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { fetchUsers, setLikeUser } from '../../store/usersSlice';
import { addCurrentUser } from '../../store/currentUserSlice';

function App() {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    id: '',
  })
  const currentUser = useSelector((state) => state = state.currentUser.currentUser);
  const { status, error } = useSelector(state => state.users);
  const dispatch = useDispatch();
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  if (isLoggedIn) {
    dispatch(fetchUsers());
    history.push("/users")
    }
}, [isLoggedIn])

  function handleCardClick(user) {
    setSelectedCard({ avatar: user.avatar, firstName: user.first_name, lastName: user.last_name, email: user.email, phone: '+7 (954) 333-44-55', id: user.id });
  }

  function handleCardLike(user) {
    dispatch(setLikeUser(user))
  }

  function handleRegister({password, email}) {
    return register(password, email)
    .then((res) => {
      if(res) {
        console.log(res)
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        dispatch(addCurrentUser(res))
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
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>Произошла ошибка на сервере</h2>}
            <Main
              handleCardLike={handleCardLike}
              currentUser={currentUser}
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