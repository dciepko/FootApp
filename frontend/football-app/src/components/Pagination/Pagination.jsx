import React from "react";
import classes from "./Pagination.module.css"; // stwórz lub przenieś odpowiednie style

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
}) {
  const renderPaginationButtons = () => {
    const paginationButtons = [];

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${classes.paginationButton} ${
            currentPage === i ? classes.activePage : ""
          }`}
        >
          <span>{i}</span>
        </button>
      );
    }

    if (currentPage > 4) {
      paginationButtons.push(<span key="dots-prev">...</span>);
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      if (currentPage - 1 > 3) {
        paginationButtons.push(
          <button
            key={currentPage - 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={classes.paginationButton}
          >
            <span>{currentPage - 1}</span>
          </button>
        );
      }

      paginationButtons.push(
        <button
          key={currentPage}
          onClick={() => onPageChange(currentPage)}
          className={`${classes.paginationButton} ${classes.activePage}`}
        >
          <span>{currentPage}</span>
        </button>
      );

      if (currentPage + 1 < totalPages - 2) {
        paginationButtons.push(
          <button
            key={currentPage + 1}
            onClick={() => onPageChange(currentPage + 1)}
            className={classes.paginationButton}
          >
            <span>{currentPage + 1}</span>
          </button>
        );
      }
    }

    if (currentPage < totalPages - 3) {
      paginationButtons.push(<span key="dots-next">...</span>);
    }

    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${classes.paginationButton} ${
            currentPage === i ? classes.activePage : ""
          }`}
        >
          <span>{i}</span>
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <div className={classes.paginationContainer}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={classes.paginationButton}
      >
        <span>&lt; Poprzednia</span>
      </button>

      {renderPaginationButtons()}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={classes.paginationButton}
      >
        <span>Następna &gt;</span>
      </button>
    </div>
  );
}
