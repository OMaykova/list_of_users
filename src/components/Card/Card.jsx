import React, { useState } from "react";
import like from '../../images/like.svg';
import like_active from '../../images/like_active.svg';
import './Card.css';
import avaTest from '../../images/ava_test.svg';

function Card() {
  const [isLiked, setIsLiked] = useState(false)
  return (
    <figure className="card">
      <img className="card__avatar" src={avaTest} alt='Фото участника'/>
      <figcaption className="card__name">Фамилия</figcaption>
      <button className="card__like-btn" type='button' title='Нравится' aria-label="Кнопка нравится">
        <img className='card__like' src={isLiked ? like_active : like}  alt='Нравится' />
      </button>
    </figure>
  );
}

export default Card;