import HeadertLogo from "../../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import Register from "../Main/components/register/Register";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../../blocks/login.css";
import * as auth from "../../utils/auth";

export default function Header({ handleLogOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    console.log("useLocation", location.pathname);
  }, [location]);

  return (
    <header className="header">
      <img
        src={HeadertLogo}
        alt="Around of the EE.UU"
        className="header__logo"
      />
      <div className="login__header">
        <h2 className="header__user-email">{}</h2>

        {location.pathname == "/home" && (
          <Link
            to="/login"
            className="login__header-register"
            onClick={handleLogOut}
          >
            Cerrar sesion
          </Link>
        )}
      </div>
    </header>
  );
}
