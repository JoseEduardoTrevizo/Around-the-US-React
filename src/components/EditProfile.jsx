import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(CurrentUserContext.name);
  const [description, setDescription] = useState(CurrentUserContext.about);

  const handleNameChange = (evt) => {
    setName(evt.target.value); /* actualiza name cuando cambie la entrada*/
  };

  const handleDescriptionChange = (evt) => {
    setDescription(
      evt.target.value
    ); /* Actualiza descripcion cuando cambie la entrada*/
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser({ name, about: description });
  }

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"edit-profile"}
      title={"Edital perfil"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Nombre"
          required
          type="text"
          value={name} // Vincula name con la entrada
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description} // Vincula description con la entrada
          onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Save
      </button>
    </PopupWithForm>
  );
}
