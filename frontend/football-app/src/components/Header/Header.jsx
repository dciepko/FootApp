import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.container}>
      <div className={classes.logoContainer}>
        <div className={classes.logoPicture} />
        <h1 className={classes.logoSign}>FootVision</h1>
      </div>
      <div className={classes.buttonContainer}>
        <a className={classes.headerButton} href="#">
          <span>Zaloguj się</span>
        </a>
        <a className={classes.headerButton} href="#">
          <span>Zarejestruj się</span>
        </a>
      </div>
    </header>
  );
}
