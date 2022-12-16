import React from "react";
import Card from '../Card/Card';
import './Main.css';

function Main() {
  return (
    <section className="main">
      <ul className="team-cards">
        <li className="team-cards__container">
          <Card />
        </li>
        <li className="team-cards__container">
          <Card />
        </li>
        <li className="team-cards__container">
          <Card />
        </li>
        <li className="team-cards__container">
          <Card />
        </li>
        <li className="team-cards__container">
          <Card />
        </li>
      </ul>
      <button className="btn-more" type='button' title='Ещё' aria-label='Кнопка ещё'>
        <p className="btn-more__title">Показать ещё</p>
        <span className="btn-more__arrow"></span>
      </button>
    </section>
  );
}

export default Main;