import Header from "./Header";
import Main from "../components/Main";
import Footer from "./Footer";
import Card from "./Card";
import EditProfile from "./EditProfile";
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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

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

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        console.log(info);
        setCurrentUser({
          userName: info.name,
          userDescription: info.about,
          userAvatar: info.avatar,
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
      .updateUser({ name, about })
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          onCardClick={handleCardClick}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
        />
        <PopupWithForm
          name={"edit-profile"}
          title={"Editar perfil"}
          buttonTitle={"Guardar"}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <>
            <input
              className="popup__info popup__info_name"
              type="text"
              placeholder="Nombre"
              required
              id="name"
              name="name"
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error popup__error_name"></span>
            <input
              className="popup__info popup__info_about"
              type="text"
              placeholder="Acerca de mi"
              required
              id="about"
              name="about"
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error popup__error_about"></span>
          </>
        </PopupWithForm>

        <PopupWithForm
          name={"add-image"}
          title={"Nuevo Lugar"}
          buttonTitle={"Guardar"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <>
            <input
              className="popup__info popup__info_name"
              type="text"
              required
              name="name"
              minLength="2"
              maxLength="30"
              placeholder="Titulo"
              id="input_title"
            />
            <span className="popup__error popup__error_name"></span>
            <input
              className="popup__info popup__info_link"
              type="url"
              required
              name="link"
              placeholder="Enlace a la imagen"
              id="input_link"
            />
            <span className="popup__error popup__error_link"></span>
          </>
        </PopupWithForm>

        <PopupWithForm
          name={"change-avatar"}
          title={"Cambiar foto de perfil"}
          buttonTitle={"Guardar"}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <>
            <input
              className="changeProfile__inputChange"
              type="url"
              required
              name="avatar"
              placeholder="Enlace a la imagen"
              id="input_link"
            />
            <span className="popup__error popup__error_link"></span>
          </>
        </PopupWithForm>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
