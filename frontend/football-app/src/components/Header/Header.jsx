import { Outlet } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={classes.container}>
        <div className={classes.logoContainer}>
          <div className={classes.logoPicture} />
          <h1 className={classes.logoSign}>GoalVision</h1>
        </div>
        <div className={classes.buttonContainer}>
          <a className={classes.headerButton} href="#">
            <span>Login</span>
          </a>
          <a className={classes.headerButton} href="#">
            <span>Register</span>
          </a>
        </div>
      </header>
      <Outlet />
    </>
  );
}
