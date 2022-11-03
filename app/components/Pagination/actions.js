import { useMemo } from 'react';

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

export const usePagination = ({
  siblingCount = 1,
  total,
  limit,
  page,
  last,
}) => {
  const paginationRange = useMemo(() => {
    if (!total) {
      // const totalPageCount = Math.ceil(total / limit);
      // const totalPageNumbers = siblingCount + 5;

      if (last && page === 1) {
        return range(1, 1);
      }
      if (last && page === 2) {
        return range(1, 2);
      }

      const leftSiblingIndex = Math.max(page - siblingCount, 1);
      const rightSiblingIndex = page + siblingCount;

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = last === false;
      console.log('here', shouldShowLeftDots, shouldShowRightDots);

      const firstPageIndex = 1;
      // const lastPageIndex = totalPageCount;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        if (page === 1) {
          return [page, page + 1, DOTS];
        }
        if (page === 2) {
          return [page - 1, page, page + 1, DOTS];
        }
        return [...leftRange, page, page + 1, DOTS];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightRange = range(page - 1, page);
        return [firstPageIndex, DOTS, ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
      return [firstPageIndex, page - 1, page];
    }
    const totalPageCount = Math.ceil(total / limit);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return null;
  }, [total, limit, siblingCount, page]);

  return paginationRange;
};
