import classes from "./LoginPage.module.css";
import logo from "../../assets/logoprz2.jpg";
import { useState } from "react";

export default function LoginPage() {
  const [isNotAccurate, setIsNotAccurate] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // if (nickHasError || passwordHasError || !nicknameValue || !passwordValue) {
    //   alert("Proszę wypełnić wszystkie pola poprawnie.");
    //   return;
    // }

    // const authData = {
    //   userNickname: nicknameValue,
    //   userPassword: passwordValue,
    // };

    // const response = await fetch("http://localhost:8080/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(authData),
    // });

    // if (response.status === 422 || response.status === 401) {
    //   return response;
    // }

    // if (!response.ok) {
    //   setIsNotAccurate(true);
    //   throw new Error("Could not authenticate user.");
    // }

    // if (response.ok) {
    //   const resData = await response.json();
    //   const token = resData.token;
    //   const loggedUserId = resData.userID;
    //   localStorage.setItem("token", token);
    //   const expiration = new Date();
    //   expiration.setHours(expiration.getHours() + 24);
    //   localStorage.setItem("expiration", expiration.toISOString());

    //   localStorage.setItem("currentUserID", loggedUserId);

    //   navigate(`/${loggedUserId}/home`);
    // }
  }

  return (
    <div className={classes.loginPage}>
      <header className={classes.loginHeader}>
        <div className={classes.logoContainer}>
          <div className={classes.logoPicture} />
        </div>
        <h1 className={classes.name}>GoalVision</h1>
      </header>
      <div className={classes.loginContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h2 className={classes.h2}>Zaloguj się</h2>
          {isNotAccurate && (
            <p className={classes.incorrectInputsContainer}>
              Niepoprawny nick lub hasło!
            </p>
          )}
          <div className={classes.inputsContainer}>
            {/* <Input
              label="Nick"
              id="nickname"
              type="text"
              name="nickname"
              onBlur={handleNickBlur}
              onChange={handleNickChange}
              value={nicknameValue}
              error={nickHasError && "Wprowadź poprawny nick"}
              placeholder="Wprowadź swój nick"
            />
            <Input
              label="Hasło"
              id="password"
              type="password"
              name="password"
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
              value={passwordValue}
              error={passwordHasError && "Wprowadź poprawne hasło"}
              placeholder="Wprowadź swoje hasło"
            /> */}

            <div className={classes.buttonsContainer}>
              <button className={classes.loginButton}>Login</button>
            </div>
            <div className={classes.buttonWithText}>
              <span className={classes.textBesideButton}>Nie masz konta?</span>
              {/* <Link to="/register" className={classes.registerButton}>
                Zarejestruj się!
              </Link> */}
              <a href="#">Register</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
