import React, { useState } from "react";
import like from '../../images/like.svg';
import like_active from '../../images/like_active.svg';
import './Card.css';


function Card({user, onCardClick, currentUser, handleCardLike}) {
  const isLiked = (user.like === currentUser._id);
  function hundleClick() {
    onCardClick(user);
  }
  function handleLikeClick(event) {
    event.preventDefault()
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    handleCardLike(user)
  }
  return (
    <figure className="card" onClick={hundleClick}>
      <img className="card__avatar" src={user.avatar} alt='Фото участника'/>
      <figcaption className="card__name">{`${user.first_name} ${user.last_name}`}</figcaption>
      <button className="card__like-btn" onClick={handleLikeClick} type='button' title='Нравится' aria-label="Кнопка нравится">
        <img className='card__like' src={isLiked ? like_active : like}  alt='Нравится' />
      </button>
    </figure>
  );
}

export default Card;