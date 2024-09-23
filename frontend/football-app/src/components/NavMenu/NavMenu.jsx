import classes from "./NavMenu.module.css";

export default function NavMenu() {
  return (
    <nav className={classes.navMenu}>
      <ul>
        <li style={{ borderLeft: 0 }}>
          <button className={classes.navMenuOption}>Szukaj</button>
        </li>
        <li>
          <a href="#" className={classes.navMenuOption}>
            Rozgrywki
          </a>
        </li>
        <li>
          <a href="#" className={classes.navMenuOption}>
            Zawodnicy
          </a>
        </li>
        <li>
          <a href="#" className={classes.navMenuOption}>
            Porównaj
          </a>
        </li>
        <li>
          <a href="#" className={classes.navMenuOption}>
            Kursy
          </a>
        </li>
        <li style={{ borderRight: 0 }}>
          <a href="#" className={classes.navMenuOption}>
            Symulacje
          </a>
        </li>
      </ul>
    </nav>
  );
}
