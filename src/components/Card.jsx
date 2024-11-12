import TrashButton from "../images/Trash.png";
import CurrentUserContext from "../contexts/CurrentUserContext";
export default function Card({ card, onCardClick, currentUser }) {
  function handleClick() {
    onCardClick(card);
  }

  const { CurrentUser } = useContext(CurrentUserContext);

  return (
    <div className="element">
      <div className="elements-card">
        <img
          src={CurrentUser?.link}
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
          <button className="elements-name__place elements-name__place_like"></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
