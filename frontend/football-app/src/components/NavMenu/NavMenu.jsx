import { Link } from "react-router-dom";
import classes from "./NavMenu.module.css";

export default function NavMenu() {
  return (
    <nav className={classes.navMenu}>
      <ul>
        <li style={{ borderLeft: 0 }}>
          <button className={classes.navMenuOption}>Search</button>
        </li>
        <Link className="disablingLinks" to={"/leagues"}>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Leagues
            </a>
          </li>
        </Link>

        <li>
          <a href="#" className={classes.navMenuOption}>
            Compare
          </a>
        </li>
        <Link className="disablingLinks" to={"/bets"}>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Bets
            </a>
          </li>
        </Link>

        <li style={{ borderRight: 0 }}>
          <a href="#" className={classes.navMenuOption}>
            Simulations
          </a>
        </li>
      </ul>
    </nav>
  );
}
