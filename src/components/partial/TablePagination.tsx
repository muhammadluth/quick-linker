import React from "react";
import { TablePaginationType } from "@/lib/model";
import { getPages, getPagesCount } from "@/lib/utils";

export function TablePagination({
  totalData,
  page,
  sizePerPage,
  totalPage,
  paginationSize,
  handlePage,
  handleSelectedPage,
}: Readonly<TablePaginationType>) {
  const pagesCount =
    totalPage === 0 ? getPagesCount(2, sizePerPage) : totalPage;
  const pages = getPages(page, pagesCount, paginationSize);
  const maxData = page * sizePerPage;
  const minData = maxData - sizePerPage + 1;
  const minPage = pages[0];
  const maxPage = pages[pages.length - 1];
  return (
    <div
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {minData}-{maxData}{" "}
        </span>
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalData}
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            disabled={page === minPage}
            onClick={() => handlePage("previous")}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => handleSelectedPage(p)}
              className={
                page === p
                  ? "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
            >
              {p}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={page === maxPage}
            onClick={() => handlePage("next")}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
