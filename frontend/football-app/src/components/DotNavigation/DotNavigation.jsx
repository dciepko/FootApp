import React from "react";
import classes from "./DotNavigation.module.css";

export default function DotNavigation({
  pages,
  currentPage,
  onPageChange,
  additionalStyle,
}) {
  return (
    <div
      className={classes.dotNavigation}
      style={additionalStyle && additionalStyle}
    >
      {pages.map((page, index) => (
        <button
          key={page}
          className={`${classes.dot} ${
            page === currentPage ? classes.active : ""
          }`}
          onClick={() => onPageChange(index)}
          aria-label={`Go to page ${page || index + 1}`}
          title={`Go to page ${page || index + 1}`}
        />
      ))}
    </div>
  );
}
