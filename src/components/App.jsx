import Header from "./Header";
import Main from "../components/Main";
import Footer from "./Footer";
import EditProfile from "../components/popup/EditProfile/EditProfile";
import EditAvatarPopup from "../components/EditAvatar";
import NewCardPopup from "../components/NewCard";
import ConfirmationPopup from "./popup/RemoveCard/RemoveCard";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});

  useEffect(() => {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" && closeAllPopups();
    });
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
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
    /* Envía una solicitud a la API y obtén los datos actualizados de la tarjeta */
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

  const handleSubmitConfirmation = () => {
    if (deletedCard) {
      api.deleteCard(deletedCard._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      });
    }
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
    setIsConfirmationPopupOpen(false);
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
          onCardDelete={handleCardDelete}
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
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleSubmitConfirmation}
          card={selectedCard}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
