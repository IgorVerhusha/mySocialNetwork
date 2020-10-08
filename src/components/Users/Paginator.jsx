import React from "react";
import classes from "./Users.module.css";

let Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage = 1,
  onPageChanged,
  portionSize = 30,
  paginatorPage = 1,
  setPaginatorPage,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);

  let leftPortionPageNumber = (paginatorPage - 1) * portionSize + 1;
  let rightPortionPageNumber = paginatorPage * portionSize;
  return (
    <div className={classes.pagesCount}>
      {paginatorPage > 1 && (
        <button
          onClick={() => {
            setPaginatorPage(paginatorPage - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              key={p}
              className={currentPage === p ? classes.selectedPage : classes}
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {" "}
              {p}
            </span>
          );
        })}
      {portionCount > paginatorPage && (
        <button
          onClick={() => {
            setPaginatorPage(paginatorPage + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
