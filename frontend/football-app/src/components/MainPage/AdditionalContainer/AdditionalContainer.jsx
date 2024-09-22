import classes from "./AdditionalContainer.module.css";
import star from "../../../assets/star-svgrepo-com.svg";

export default function AdditionalContainer() {
  return (
    <div className={classes.additionalContent}>
      <img className={classes.star} src={star} alt="" />
      <h2 className={classes.announceText}>
        Zaloguj się, aby obserwować ulubione!
      </h2>
    </div>
  );
}
