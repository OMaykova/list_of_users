import React, { useEffect, useState }  from "react";
import Header from '../Header/Header.jsx';
import Main from '../Main/Main';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Profile from '../Profile/Profile';
import {usersApi} from "../../utils/usersApi";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function App() {
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
    name:'test',
    email: 'test',
    _id: 58,
  })

  useEffect(() => {
    usersApi.getUsers()
    .then((users) => {
      console.log(users.data)
      setUsers(users.data)
    })
    .catch((err) => console.log(err))
  }, [])

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

  return (
    <CurrentUserContext.Provider value ={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header />
            <Main
              handleCardLike={handleCardLike}
              currentUser={currentUser}
              users={users}
              onCardClick={handleCardClick}
            />
          </Route>
          <Route exact path="/profile/:id">
            <Header
              selectedCard={selectedCard}/>
            <Profile
              selectedCard={selectedCard}
            />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;