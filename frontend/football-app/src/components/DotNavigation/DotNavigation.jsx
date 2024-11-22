import React from "react";
import classes from "./DotNavigation.module.css";

export default function DotNavigation({
  totalPages,
  currentPage,
  onPageChange,
}) {
  return (
    <div className={classes.dotNavigation}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`${classes.dot} ${
            index === currentPage ? classes.active : ""
          }`}
          onClick={() => onPageChange(index)}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
}
