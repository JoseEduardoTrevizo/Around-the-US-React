import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import EditProfile from "./Main/components/Popup/EditProfile/EditProfile";
import EditAvatar from "./Main/components/Popup/EditAvatar/EditAvatar";
import NewCard from "../components/Main/components/Popup/NewCard/NewCard";
import ConfirmationPopup from "../components/Main/components/Popup/RemoveCard/RemoveCard";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Main/components/login/Login";
import Register from "./Main/components/register/Register";
import InfoToolTip from "./Main/components/infoToolTip/InfoToolTip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});
  const [isRegister, setIsRegister] = useState(true);
  const [open, setOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ userEmail: "", password: "" });

  const handleClose = () => {
    setOpen(false);
  };

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
  }

  async function handleCardDelete(card) {
    /* Verifica una vez más si a esta tarjeta ya les has dado like */
    setDeletedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
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

  const handleLogin = ({ userEmail, password }) => {
    if (!userEmail || password) {
      return;
    }
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

        <NewCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateNewCard={handleAddPlaceSubmit}
        />

        <EditAvatar
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

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>

        <InfoToolTip
          open={open}
          isRegister={isRegister}
          handleClose={handleClose}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
