import React from "react";
import ArrowLeftIcon from "@assets/icons/arrow_left.svg?react";
import ArrowRightIcon from "@assets/icons/arrow-right.svg?react";
import clsx from "clsx";
import styles from "./Pagination.module.scss";

type PageItem = number | "...";

const range = (start: number, end: number): number[] => {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

function getPaginationRange(
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1,
): PageItem[] {
  const totalPageNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  const pages: PageItem[] = [];

  const leftSibling = Math.max(2, currentPage - siblingCount);
  const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);

  pages.push(1);
  if (leftSibling > 2) {
    pages.push("...");
  }
  pages.push(...range(leftSibling, rightSibling));
  if (rightSibling < totalPages - 1) {
    pages.push("...");
  }
  pages.push(totalPages);

  return pages;
}

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className,
}) => {
  if (totalPages <= 1) return null;

  const paginationRange = getPaginationRange(totalPages, currentPage, siblingCount);

  const onNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const onPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <nav
      className={clsx(styles.pagination, className)}
      aria-label="Pagination Navigation"
    >
      <ul className={styles["pagination__list"]}>
        {/* prev btn */}
        <li key="button-prev">
          <button
            className={styles["pagination__button-prev"]}
            onClick={onPrev}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <ArrowLeftIcon></ArrowLeftIcon>
          </button>
        </li>

        {/* pages */}
        {paginationRange.map((page, i) => {
          if (page === "...") {
            return (
              <li key={`dots-${i}`}>
                <span
                  className={styles["pagination__dots"]}
                  aria-hidden="true"
                >
                  …
                </span>
              </li>
            );
          }

          return (
            <li key={page}>
              <button
                className={clsx(styles["pagination__button"], {
                  [styles["pagination__button_active"]]: page === currentPage,
                })}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next */}
        <li key="button-next">
          <button
            className={styles["pagination__button-next"]}
            onClick={onNext}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            <ArrowRightIcon color={currentPage === totalPages ? "secondary" : "primary"}></ArrowRightIcon>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
