import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../../../blocks/login.css";

export default function Register({ handleLogin }) {
  const [data, setData] = useState({
    userEmail: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { mail, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [mail]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <>
      <div className="login">
        <div className="login__header-container">
          <div className="login__header">
            <Link to="/register" className="login__header-register">
              Iniciar sesion
            </Link>
          </div>
        </div>
        <h2 className="title__login"> Registrate</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <fieldset className="login__form-fieldset">
            <input
              className="login__form-input"
              name="e-mail"
              placeholder="E-mail"
              type="text"
              value={data.userEmail}
              id="email"
              required
              onChange={handleChanges}
            ></input>
            <span></span>
            <input
              className="login__form-input"
              name="password"
              placeholder="Password"
              type="password"
              value={data.password}
              id="password"
              required
              onChange={handleChanges}
            ></input>
            <span></span>
            <button className="login__button" type="submit">
              Registrate
            </button>
          </fieldset>
        </form>
        <Link className="login__register-link" to="/register">
          ¿Ya eres miembro? Inicia sesion aqui
        </Link>
      </div>
    </>
  );
}
