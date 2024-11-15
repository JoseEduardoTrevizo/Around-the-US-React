import TrashButton from "../images/Trash.png";
import { useContext } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === CurrentUserContext._id;
  const likesCounter = card.likes.length;
  console.log(likesCounter);
  /*Verifica una vez más si a esta tarjeta ya les has dado like */
  const isLiked = card._id.like;
  console.log(isLiked);
  const cardLikeButtonClassName = `elements-name__place_like ${
    isLiked ? "elements-name__place_like_active" : ""
  }`;

  const cardDeleteButtonClassName = `elements-card__element_trash ${
    isOwn
      ? "elements-card__element_trash"
      : "elements-card__element_trash_hiden"
  }`;
  return (
    <div className="element">
      <div className="elements-card">
        <img
          src={card.link}
          alt={card.name}
          className="elements-card__element elements-card__element_image"
          id="image_card"
          onClick={handleClick}
        />
        <img
          src={TrashButton}
          alt="Trash"
          className={cardDeleteButtonClassName}
        />
      </div>
      <div className="elements-name">
        <h2 className="elements-name__place elements-name__place">
          {card.name}
        </h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__counter">{likesCounter}</p>
        </div>
      </div>
    </div>
  );
}
