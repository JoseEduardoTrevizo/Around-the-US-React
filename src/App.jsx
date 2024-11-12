import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import PopupWithForm from "./components/PopupWithForm";
import { useState } from "react";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

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

  return (
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
  );
}

export default App;
