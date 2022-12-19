import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import './Header.css';

function Header({selectedCard, handleSignOut }) {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      {location.pathname === '/' &&
        <section className="header header_type_main">
          <div className='header__btn-cover header__btn-cover_type_exit'>
            <button className='header__btn header__btn_type_exit' onClick={handleSignOut} title='Выход' type="button" aria-label="Кнопка выход">Выход</button>
          </div>
          <div className="team">
            <h1 className="team__title">Наша команда</h1>
            <p className="team__description">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.</p>
          </div>
        </section>
      }
      { selectedCard ? location.pathname === `/profile/${selectedCard.id}` &&
        <section className="header header_type_profile">
          <div className="header__container">
            <div className="header__btn-cover header__btn-cover_type_back" onClick={() => history.goBack()}>
              <button className='header__btn header__btn_type_back' title='Назад' type="button" aria-label="Кнопка назад">Назад</button>
            </div>
            <img className="header__avatar" src={selectedCard.avatar} alt='Фото профиля' />
            <div className="header__description">
              <h1 className="header__name">{`${selectedCard.firstName} ${selectedCard.lastName}`}</h1>
              <p className="header__role">Партнер</p>
            </div>
          </div>
          <div className='header__btn-cover header__btn-cover_type_exit'>
            <button className='header__btn header__btn_type_exit' onClick={handleSignOut} title='Выход' type="button" aria-label="Кнопка выход">Выход</button>
          </div>
        </section>
        : ''
      }
    </>
  );
}

export default Header;