import classes from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main>
      <nav className={classes.navMenu}>
        <ul>
          <li>
            <button>Szukaj</button>
          </li>
          <li>Rozgrywki</li>
          <li>Zawodnicy</li>
          <li>Porównaj</li>
          <li>Kursy</li>
          <li>Symulacje</li>
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
