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

function App() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
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
const [isLoggedIn, setIsLoggedIn] = useState();

console.log("currentUser", currentUser)
  function handleCardClick(user) {
    setSelectedCard({ avatar: user.avatar, firstName: user.first_name, lastName: user.last_name, email: user.email, phone: '+7 (954) 333-44-55', id: user.id });
  }
  function handleCardLike(user) {
    const isLiked = (user.like === currentUser._id);

    const request = isLiked ?
      usersApi.removeLike(user) : usersApi.setLike(currentUser._id, user);
    request.then((newUser) => {
      setUsers((state) => state.map((u) => u.id === newUser.id ? newUser : u));
      }).catch(console.log)
  }

  function handleRegister({password, email}) {
    return register(password, email)
    .then((res) => {
      if(res) {
        console.log("res", res)
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        history.push("/");
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
      usersApi.getUsers()
      .then((users) => {
        setUsers(users.data)
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch(err => {
        console.log(err)
      });
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
          <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>
            <Header
              handleSignOut={handleSignOut}
            />
            <Main
              handleCardLike={handleCardLike}
              currentUser={currentUser}
              users={users}
              onCardClick={handleCardClick}
            />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/:id" isLoggedIn={isLoggedIn}>
            <Header
              selectedCard={selectedCard}/>
              handleSignOut={handleSignOut}
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