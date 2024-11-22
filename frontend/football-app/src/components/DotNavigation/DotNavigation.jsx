import React from "react";
import classes from "./DotNavigation.module.css";

export default function DotNavigation({ pages, currentPage, onPageChange }) {
  return (
    <div className={classes.dotNavigation}>
      {pages.map((page, index) => (
        <button
          key={page} // Użyj unikalnego klucza, np. `id` z obiektu, jeśli dostępny
          className={`${classes.dot} ${
            page === currentPage ? classes.active : ""
          }`}
          onClick={() => onPageChange(index)}
          aria-label={`Go to page ${page || index + 1}`} // Dodaj etykietę opartą na właściwości strony
          title={`Go to page ${page || index + 1}`}
        />
      ))}
    </div>
  );
}
