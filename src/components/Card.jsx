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
  /*Verifica una vez más si a esta tarjeta ya les has dado like */
  const isLiked = card.isLiked;
  console.log(isLiked);
  const cardLikeButtonClassName = `elements-name__place_like ${
    isLiked ? "elements-name__place_like_active" : ""
  }`;
  console.log(cardLikeButtonClassName);

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
          className="elements-card__element elements-card__element_trash"
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
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
