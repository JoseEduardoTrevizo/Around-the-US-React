import Header from "./Header";
import Main from "../components/Main";
import Footer from "./Footer";
import Card from "./Card";
import EditProfile from "./EditProfile";
import EditAvatarPopup from "./EditAvatar";
import NewCardPopup from "./NewCard";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState({});

  useEffect(() => {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" && closeAllPopups();
    });
    const handleClickOutside = (evt) => {
      if (evt.target === document.querySelector(".popup__overlay")) {
        closeAllPopups();
      }
    };
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  async function handleCardLike(card, isLiked) {
    /*Verifica una vez más si a esta tarjeta ya les has dado like */
    if (!isLiked) {
      await api
        .addCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((error) => console.error(error));
    } else {
      await api
        .deleteCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((error) => console.error(error));
    }
    /*Envía una solicitud a la API y obtén los datos actualizados de la tarjeta */
  }

  async function handleCardDelete(card) {
    /* Verifica una vez más si a esta tarjeta ya les has dado like */
    const isDelete = card.isDelete;

    /* Envía una solicitud a la API y obtén los datos actualizados de la tarjeta */
    await api
      .deleteCard(card._id, !isDelete)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        console.log(info);
        setCurrentUser({
          userName: info.name,
          userDescription: info.about,
          userAvatar: info.avatar,
          userId: info._id,
          _id: info._id,
        });
      })
      .catch((invalid) => {
        console.error("invalid message", invalid);
      });
    api
      .getInitialCards()
      .then((res) => {
        console.log(res);
        setCards(res);
      })
      .catch((invalid) => {
        console.error("invalid message", invalid);
      });
  }, []);

  const handleUpdateUser = ({ name, about }) => {
    return api
      .updateProfile(name, about)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name,
          about,
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Invalid", error);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    return api
      .editAvatar(avatar)
      .then((updateUser) => {
        setCurrentUser(updateUser);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = ({ link, name }) => {
    api
      .createCard({ link, name })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Invalid", error);
      });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
        />

        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <NewCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateNewCard={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
