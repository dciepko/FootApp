import classes from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main>
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
      <section className={classes.mainSection}>
        <div className={classes.currentResultsContainer}>
          <div className={classes.currentResultsShape}></div>
        </div>
        <div className={classes.leaguesContainer}>
          <div className={classes.leaguesShape}></div>
        </div>
        <div className={classes.additionalContainer}>
          <div className={classes.additionalShape}></div>
        </div>
      </section>
    </main>
  );
}
