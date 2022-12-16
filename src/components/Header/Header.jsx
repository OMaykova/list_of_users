import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <section className="header">
      <Link to = '/signout' className='header__signout-link'>
        <button className='header__signout-btn' title='Выход' type="button" aria-label="Кнопка выход">Выход</button>
      </Link>
      <div className="team">
        <h1 className="team__title">Наша команда</h1>
        <p className="team__description">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.</p>
      </div>

    </section>
  );
}

export default Header;