import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css';
import avaTest from '../../images/ava_test.svg';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {location.pathname === '/' &&
        <section className="header header_type_main">
          <Link to = '/signout' className='header__btn-cover header__btn-cover_type_exit'>
            <button className='header__btn header__btn_type_exit' title='Выход' type="button" aria-label="Кнопка выход">Выход</button>
          </Link>
          <div className="team">
            <h1 className="team__title">Наша команда</h1>
            <p className="team__description">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.</p>
          </div>
        </section>
      }
      {location.pathname === '/profile' &&
        <section className="header header_type_profile">
          <div className="header__container"> 
            <div className="header__btn-cover header__btn-cover_type_back">   
              <button className='header__btn header__btn_type_back' onClick={() => navigate(-1)} title='Назад' type="button" aria-label="Кнопка назад">Назад</button>
            </div>
            <img className="header__avatar" src={avaTest} alt='Фото профиля' />
            <div className="header__description">
              <h1 className="header__name">Фамилия</h1>
              <p className="header__role">Партнер</p>
            </div>
          </div>
          <Link to = '/signout' className='header__btn-cover header__btn-cover_type_exit'>
            <button className='header__btn header__btn_type_exit' title='Выход' type="button" aria-label="Кнопка выход">Выход</button>
          </Link>
        </section>
      }
    </>
  );
}

export default Header;