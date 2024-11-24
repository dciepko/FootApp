import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

export default function Header() {
  const { user, logout, loading } = useAuth();
  console.log(user);

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
          {loading ? (
            <Loader />
          ) : (
            <>
              {!user ||
              user.id === undefined ||
              user.firstName === undefined ? (
                <>
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
                </>
              ) : (
                <>
                  <span className={classes.welcomeSign}>
                    Welcome, {user.firstName}!
                  </span>{" "}
                  <a className={classes.headerButton} onClick={logout}>
                    <Link className="disablingLinks">
                      <span>Logout</span>
                    </Link>
                  </a>
                </>
              )}
            </>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}
