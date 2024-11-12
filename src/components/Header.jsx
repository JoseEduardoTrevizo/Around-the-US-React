import HeadertLogo from "../images/logo.png";
export default function Header() {
  return (
    <header className="header">
      <img
        src={HeadertLogo}
        alt="Around of the EE.UU"
        className="header__logo"
      />
    </header>
  );
}
