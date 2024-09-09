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
        <article className={classes.currentResultsContainer}></article>
        <article className={classes.leaguesContainer}></article>
        <article className={classes.additionalContainer}></article>
      </section>
    </main>
  );
}
