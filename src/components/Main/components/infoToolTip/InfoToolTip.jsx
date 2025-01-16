import React from "react";
import registerOk from "../../../../images/Allow.png";
import registerFail from "../../../../images/Not-Allow.png";
import closeIcon from "../../../../images/Close_Icon.png";
import "../../../../blocks/PopupInfoToolTip.css";

export default function InfoToolTip({ open, isRegister, handleClose }) {
  return (
    <div className={`popup popup_register ${open ? "popup_opened" : ""}`}>
      <div className="popup__overlay"></div>

      <div className="popup__wrapper-register">
        <img
          className="popup__image-register"
          src={isRegister ? registerOk : registerFail}
          alt="status"
        />

        <button
          type="button"
          className="popup__button-cross"
          onClick={handleClose}
        >
          <img src={closeIcon} alt="imagén de una cruz" />
        </button>

        <p className="popup_register-title">
          {isRegister
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}
