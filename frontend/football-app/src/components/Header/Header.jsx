import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.container}>
      <div className={classes.logoContainer}>LOGO</div>
      <div className={classes.buttonContainer}>buttons</div>
    </header>
  );
}
