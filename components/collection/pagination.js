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
  if (isFirstPage === isLastPage) {
    return "";
  }
  return (
    <nav
      className="flex items-center justify-center"
      role="navigation"
      aria-label="pagination"
    >
      <a
        className={`${
          isFirstPage
            ? "cursor-not-allowed text-gray-600"
            : "bg-primary-600 cursor-pointer"
        } flex  items-center px-6 py-4 rounded-lg text-gray-100 `}
        onClick={() => (isFirstPage ? "" : changePage(currentPage - 1))}
        disabled={isFirstPage}
      >
        Previous
      </a>

      <ul className="flex items-center">
        {result.map((value) => {
          return (
            <li>
              <a
                className={`px-6 py-4 bg-gray-100 rounded-lg mx-2 cursor-pointer ${
                  currentPage === value ? "bg-gray-700 text-gray-100" : ""
                }`}
                aria-label="Goto page"
                aria-current="page"
                onClick={() => changePage(value)}
              >
                {value}
              </a>
            </li>
          );
        })}
      </ul>
      <a
        className={`${
          isLastPage
            ? "cursor-not-allowed text-gray-600"
            : "bg-primary-600 cursor-pointer"
        } flex items-center px-6 py-4 rounded-lg text-gray-100`}
        onClick={() => (isLastPage ? "" : changePage(currentPage + 1))}
        disabled={isLastPage}
      >
        Next
      </a>
    </nav>
  );
}
