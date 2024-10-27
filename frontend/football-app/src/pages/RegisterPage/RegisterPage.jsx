import { Link } from "react-router-dom";
import LoginInput from "../../components/LoginInput/LoginInput";
import { useInput } from "../../hooks/useInput";
import {
  hasMinLength,
  isEmail,
  isNotEmpty,
} from "../../utils/validationFunctions";
import classes from "./RegisterPage.module.css";
import logo from "../../assets/goalvision-high-resolution-logo-transparent.png";

export default function RegisterPage() {
  const {
    value: firstNameValue,
    handleInputChange: handleFirstNameChange,
    handleInputBlur: handleFirstNameBlur,
    hasError: firstNameHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: lastNameValue,
    handleInputChange: handleLastNameChange,
    handleInputBlur: handleLastNameBlur,
    hasError: lastNameHasError,
  } = useInput("", (value) => isNotEmpty(value));
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 6));
  const {
    value: passwordRepeatValue,
    handleInputChange: handlePasswordRepeatChange,
    handleInputBlur: handlePasswordRepeatBlur,
    hasError: passwordRepeatHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 6));

  async function handleSubmit(event) {
    event.preventDefault();

    // if (
    //   firstNameHasError ||
    //   lastNameHasError ||
    //   emailHasError ||
    //   nickHasError ||
    //   passwordHasError ||
    //   passwordRepeatHasError ||
    //   !firstNameValue ||
    //   !lastNameValue ||
    //   !emailValue ||
    //   !nickValue ||
    //   !passwordValue ||
    //   !passwordRepeatValue ||
    //   passwordValue !== passwordRepeatValue
    // ) {
    //   alert("Proszę wypełnić wszystkie pola poprawnie.");
    //   return;
    // }

    // const authData = {
    //   userFirstName: firstNameValue,
    //   userSurename: lastNameValue,
    //   userEmail: emailValue,
    //   userNickname: nickValue,
    //   userPassword: passwordValue,
    // };

    // const response = await fetch("http://localhost:8080/register", {
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
          <h2 className={classes.h2}>Register</h2>
          <div className={classes.inputsContainer}>
            <LoginInput
              label="First name"
              id="firstName"
              type="text"
              name="firstName"
              onBlur={handleFirstNameBlur}
              onChange={handleFirstNameChange}
              value={firstNameValue}
              error={firstNameHasError && "Please enter the correct format"}
              placeholder="Enter your first name"
            />
            <LoginInput
              label="Last name"
              id="lastName"
              type="text"
              name="lastName"
              onBlur={handleLastNameBlur}
              onChange={handleLastNameChange}
              value={lastNameValue}
              error={lastNameHasError && "Please enter the correct format"}
              placeholder="Enter your last name"
            />
            <LoginInput
              label="Email"
              id="email"
              type="email"
              name="email"
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              value={emailValue}
              error={emailHasError && "Please enter the correct format"}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
            <LoginInput
              label="Repeat password"
              id="passwordRepeat"
              type="password"
              name="passwordRepeat"
              onBlur={handlePasswordRepeatBlur}
              onChange={handlePasswordRepeatChange}
              value={passwordRepeatValue}
              error={
                passwordRepeatHasError && "Please enter the correct format"
              }
              placeholder="Repeat your password"
            />
            <div className={classes.buttonsContainer}>
              <button className={classes.registerButton}>
                <span>Register</span>
              </button>
              <Link to="/" className="disablingLinks">
                <button className={classes.cancelButton}>
                  <span>Cancel</span>
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
