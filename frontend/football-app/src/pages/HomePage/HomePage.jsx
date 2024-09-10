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
          <article></article>
        </div>
        <div className={classes.leaguesContainer}>
          <article></article>
        </div>
        <div className={classes.additionalContainer}>
          <article></article>
        </div>
      </section>
    </main>
  );
}
