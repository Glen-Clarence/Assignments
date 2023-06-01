/* eslint-disable react/prop-types */

const Pagination = ({ filteredData, rowsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayPages = 5; // Number of page numbers to display
  const displayRange = Math.min(displayPages, totalPages);

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      paginate(page);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= displayRange) {
      // Display all page numbers if total pages are less than or equal to the display range
      return Array(totalPages)
        .fill()
        .map((_, index) => index + 1);
    } else {
      const middleIndex = Math.floor(displayRange / 2);
      const startPage = currentPage - middleIndex;
      const endPage = currentPage + middleIndex;

      if (startPage <= 1) {
        // Show page numbers from 1 to displayRange if current page is towards the beginning
        return Array(displayRange)
          .fill()
          .map((_, index) => index + 1);
      } else if (endPage >= totalPages) {
        // Show page numbers towards the end if current page is towards the end
        return Array(displayRange)
          .fill()
          .map((_, index) => totalPages - displayRange + index + 1);
      } else {
        // Show page numbers with ellipsis in the middle
        return Array(displayRange)
          .fill()
          .map((_, index) => startPage + index);
      }
    }
  };

  return (
    filteredData.length > rowsPerPage && (
      <div className="bg-gray-50 dark:bg-gray-800 py-2 px-4 fixed bottom-0 w-[80%]">
        <div className="flex items-center justify-between">
          <ul className="flex space-x-2">
            {getPageNumbers().map((page) => (
              <li
                key={page}
                className={`${
                  currentPage === page
                    ? "bg-gray-300 dark:bg-gray-600"
                    : "bg-gray-200 dark:bg-gray-700"
                } rounded-md px-2 py-1 text-sm text-gray-800 dark:text-white cursor-pointer`}
                onClick={() => paginate(page)}
              >
                {page}
              </li>
            ))}
            {totalPages > displayRange && (
              <li className="bg-transparent px-2 py-1 text-sm text-gray-800 dark:text-white cursor-pointer">
                ...
              </li>
            )}
          </ul>
          <div className="flex items-center space-x-2">
            <span>Total Pages: {totalPages}</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={handlePageChange}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
            />
            <span>/ {totalPages}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Pagination;
