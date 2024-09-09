import classes from "./Header.module.css";
import logo from "../../assets/logoprz2.jpg";

export default function Header() {
  return (
    <header className={classes.container}>
      <div className={classes.logoContainer}>
        <img className={classes.logoPicture} src={logo} alt="Logo picture" />
        <h1 className={classes.logoSign}>FootVision</h1>
      </div>
      <div className={classes.buttonContainer}>
        <a className={classes.headerButton} href="#">
          Zaloguj się
        </a>
        <a className={classes.headerButton} href="#">
          Zarejestruj się
        </a>
      </div>
    </header>
  );
}
