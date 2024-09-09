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
          <li>Ulubione</li>
          <li>Kursy</li>
          <li>Symulacje</li>
        </ul>
      </nav>
      <section>
        <article></article>
        <article></article>
        <article></article>
      </section>
    </main>
  );
}
