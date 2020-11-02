import React from "react";

export default function pagination({ currentPage, pageCount, changePage }) {
  let delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    result = [];

  result = Array.from({ length: pageCount }, (v, k) => k + 1).filter(
    (i) => i && i >= left && i < right
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;
  return (
    <nav
      className="pagination mx-2  is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <a
        className="pagination-previous"
        onClick={() => changePage(currentPage - 1)}
        disabled={isFirstPage}
      >
        Previous
      </a>
      <a
        className="pagination-next"
        onClick={() => changePage(currentPage + 1)}
        disabled={isLastPage}
      >
        Next page
      </a>
      <ul className="pagination-list">
        {result.map((value) => {
          return (
            <li>
              <a
                className={`pagination-link ${
                  currentPage === value ? "is-current" : ""
                }`}
                aria-label="Goto page 1"
                aria-current="page"
                onClick={() => changePage(value)}
              >
                {value}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
