import classes from "./LoginInput.module.css";

export default function LoginInput({ label, id, error, ...props }) {
  return (
    <div className={classes.inputSection}>
      <label className={classes.inputLabel} htmlFor={id}>
        {label}
      </label>
      <input className={classes.inputField} id={id} {...props} />
      <div className={classes.errorContainer}>{error && <p>{error}</p>}</div>
    </div>
  );
}
