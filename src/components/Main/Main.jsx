import React, { useEffect, useState }  from "react";
import { Link, useRouteMatch } from 'react-router-dom';
import Card from '../Card/Card';
import './Main.css';
import { useSelector } from "react-redux";

function Main({users, onCardClick, currentUser, handleCardLike}) {
  const usersR = useSelector((state) => state.users[0]);
  console.log('usersR', usersR)
  let { path } = useRouteMatch();
  const [counter, setCounter] = useState({total: 4, more: 1})
  const [showCards, setShowCards] = useState([]);

  useEffect(() => {
    if (usersR.length) {
        const list = usersR.slice(0, counter.total);
        setShowCards(list);
      }
    }, [usersR, counter.total]);

  function handleMoreButton() {
    let start = counter.total + counter.more
    setCounter({total: start, more: counter.more})
  }

  return (
    <section className="main">
      <ul className="team-cards">
        {
          showCards.map(user =>
            <li className="team-cards__container" key={user.id}>
              <Link to={`${path}/profile/${user.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  key={user.id}
                  handleCardLike={handleCardLike}
                  currentUser={currentUser}
                  user={user}
                  onCardClick={onCardClick}
                />
              </Link>
            </li>
          )
        }
      </ul>
      {usersR.length > 3 && counter.total < usersR.length ?
        <button className="btn-more" type='button' onClick={handleMoreButton} title='Ещё' aria-label='Кнопка ещё'>
          <p className="btn-more__title">Показать ещё</p>
          <span className="btn-more__arrow"></span>
        </button>
      :
      ''
      }
    </section>
  );
}

export default Main;