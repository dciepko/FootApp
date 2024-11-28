import { Link } from "react-router-dom";
import classes from "./NavMenu.module.css";

export default function NavMenu() {
  return (
    <nav className={classes.navMenu}>
      <ul>
        <Link className="disablingLinks" to={"/search"}>
          <li style={{ borderLeft: 0 }}>
            <span className={classes.navMenuOption}>Search </span>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/live"}>
          <li>
            <span className={classes.navMenuOption}>
              LIVE&nbsp;Results&nbsp; <div className={classes.liveDot}></div>
            </span>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/leagues"}>
          <li>
            <span className={classes.navMenuOption}>Leagues </span>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/compare"}>
          <li>
            <span className={classes.navMenuOption}>Compare </span>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/bets"}>
          <li>
            <span className={classes.navMenuOption}>Bets </span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
