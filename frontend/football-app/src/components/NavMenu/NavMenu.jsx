import { Link } from "react-router-dom";
import classes from "./NavMenu.module.css";

export default function NavMenu() {
  return (
    <nav className={classes.navMenu}>
      <ul>
        <Link className="disablingLinks" to={"/search"}>
          <li style={{ borderLeft: 0 }}>
            <a className={classes.navMenuOption}>Search</a>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/live"}>
          <li>
            <a href="#" className={classes.navMenuOption}>
              LIVE&nbsp;Results&nbsp; <div className={classes.liveDot}></div>
            </a>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/leagues"}>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Leagues
            </a>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/compare"}>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Compare
            </a>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/bets"}>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Bets
            </a>
          </li>
        </Link>

        <Link className="disablingLinks" to={"/simulations"}>
          <li style={{ borderRight: 0 }}>
            <a href="#" className={classes.navMenuOption}>
              Simulations
            </a>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
