import { Link, Outlet } from "react-router-dom";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={classes.container}>
        <Link className="disablingLinks" to={"/"}>
          <div className={classes.logoContainer}>
            <div className={classes.logoPicture} />
            <h1 className={classes.logoSign}>GoalVision</h1>
          </div>
        </Link>
        <div className={classes.buttonContainer}>
          <a className={classes.headerButton} href="#">
            <Link
              className="disablingLinks"
              style={{ color: "white" }}
              to={"/login"}
            >
              <span>Login</span>
            </Link>
          </a>
          <a className={classes.headerButton} href="#">
            <Link
              className="disablingLinks"
              style={{ color: "white" }}
              to={"/register"}
            >
              <span>Register</span>
            </Link>
          </a>
        </div>
      </header>
      <Outlet />
    </>
  );
}
