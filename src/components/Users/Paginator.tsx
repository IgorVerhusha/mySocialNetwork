import React from "react";
import classes from "./Users.module.css";

type Props = {
  totalItemsCount: number
  pageSize:number
  currentPage: number
  onPageChanged: (pageNumber:number)=> void
  portionSize?: number
  paginatorPage:number
  setPaginatorPage: (pageNumber:number)=>void
}

const Paginator: React.FC<Props> = ({
  totalItemsCount,
  pageSize,
  currentPage = 1,
  onPageChanged,
  portionSize = 30,
  paginatorPage = 1,
  setPaginatorPage,
}) => {
  let pagesCount:number = Math.ceil(totalItemsCount / pageSize);
  let pages:Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount: number = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber: number = (paginatorPage - 1) * portionSize + 1;
  let rightPortionPageNumber: number = paginatorPage * portionSize;
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
              className={currentPage === p ? classes.selectedPage : ""}
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