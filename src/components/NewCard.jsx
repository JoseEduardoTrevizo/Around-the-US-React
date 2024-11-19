import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

export default function NewCardPopup({ isOpen, onClose, onUpdateNewCard }) {
  const titleRef = useRef();
  const linkRef = useRef();
  const [loading, setLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    onUpdateNewCard({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"add-image"}
      title={"Nuevo Lugaar"}
      buttonTitle={loading ? "Guardando..." : "Guardar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__info popup__info_name"
        type="text"
        name="name"
        placeholder="Titulo"
        id="input_title"
        minLength="2"
        maxLength="30"
        required
        ref={titleRef || ""}
      />
      <span className="popup__error popup__error_name"></span>
      <input
        className="popup__info popup__info_link"
        type="url"
        required
        name="link"
        placeholder="Enlace a la imagen"
        id="input_link"
        ref={linkRef || ""}
      />
      <span className="popup__error popup__error_link"></span>
    </PopupWithForm>
  );
}
