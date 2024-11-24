import classes from "./LoginPage.module.css";
import logo from "../../assets/goalvision-high-resolution-logo-transparent.png";
import { useState } from "react";
import LoginInput from "../../components/LoginInput/LoginInput";
import { useInput } from "../../hooks/useInput";
import { hasMinLength, isNotEmpty } from "../../utils/validationFunctions";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [isNotAccurate, setIsNotAccurate] = useState(false);
  const navigate = useNavigate();
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 6));

  const { login, loading } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError || !emailValue || !passwordValue) {
      alert("Please enter the correct data.");
      return;
    }

    const authData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      await login(authData);
      navigate("/");
    } catch (error) {
      setIsNotAccurate(true);
    }
  }

  return (
    <div className={classes.loginPage}>
      <Link to="/" className="disablingLinks">
        <header className={classes.loginHeader}>
          <div className={classes.logoContainer}>
            <img src={logo} className={classes.logoPicture} />
          </div>
          <h1 className={classes.name}>GoalVision</h1>
        </header>
      </Link>
      <div className={classes.loginContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h2 className={classes.h2}>Login</h2>
          {isNotAccurate && (
            <p className={classes.incorrectInputsContainer}>
              Incorrect login or password!
            </p>
          )}
          <div className={classes.inputsContainer}>
            <LoginInput
              label="Login"
              id="email"
              type="text"
              name="email"
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              value={emailValue}
              error={emailHasError && "Please enter the correct format"}
              placeholder="Please enter your login"
            />
            <LoginInput
              label="Password"
              id="password"
              type="password"
              name="password"
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
              value={passwordValue}
              error={passwordHasError && "Please enter the correct format"}
              placeholder="Please enter your password"
            />

            <div className={classes.buttonsContainer}>
              <button className={classes.loginButton}>
                <span>Login</span>
              </button>
              <Link to="/" className="disablingLinks">
                <button className={classes.cancelButton}>
                  <span>Cancel</span>
                </button>
              </Link>
            </div>
            <div className={classes.buttonWithText}>
              <span className={classes.textBesideButton}>
                You don't have the account?
              </span>
              &nbsp;
              <Link to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
