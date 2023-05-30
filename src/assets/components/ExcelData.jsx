/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import TableRow from "./Row";
import Pagination from "./Pagination";

const ExcelData = ({ data }) => {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    designation: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = (event, columnName) => {
    setFilters({
      ...filters,
      [columnName]: event.target.value,
    });
    setCurrentPage(1); // Reset current page when filters change
  };
  const rowsPerPage = 25;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const updateFiletredData = () => {
    const filteredData = Object.keys(data).reduce((result, sheetName) => {
      const filteredRows = data[sheetName].filter((row) => {
        const FirstName = row.FirstName;
        const LastName = row.LastName;
        const designation = row.Designation;

        return (
          FirstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
          LastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
          designation.toLowerCase().includes(filters.designation.toLowerCase())
        );
      });

      if (filteredRows.length > 0) {
        result = result.concat(filteredRows);
      }

      return result;
    }, []);
    setFilteredData(filteredData);
  };
  useEffect(() => {
    updateFiletredData();
  }, [data, filters]);
  if (!data || Object.keys(data).length === 0) {
    // Render an appropriate message or fallback UI when data is empty or undefined
    return <div>No data available</div>;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const isDataEmpty = filteredData.length === 0;

  const currentRowsToShow = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const nameA = a.FirstName.toLowerCase();
      const nameB = b.FirstName.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setCurrentPage(1); // Reset current page when sorting changes
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle the sort order
    setFilteredData(sortedData);
    // Update the filtered data with the sorted data
  };
  const tableHeaders = Object.keys(data[Object.keys(data)[0]][0]).map((key) => (
    <th
      scope="col"
      className="hidden md:table-cell py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
      key={key}
    >
      {key}
      {key === "FirstName" && (
        <>
          <button onClick={handleSort}>
            <svg
              className="h-3 pl-2"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <path
                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <path
                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.3"
              />
            </svg>
          </button>
          <div className="relative">
          <input
            type="text"
            placeholder="First Name"
            value={filters.firstName}
            onChange={(e) => handleFilterChange(e, "firstName")}
            className="w-full pl-8 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          />
          <div className="absolute top-0 left-0 inline-flex items-center p-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24"
							strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
							strokeLinejoin="round">
							<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
							<circle cx="10" cy="10" r="7" />
							<line x1="21" y1="21" x2="15" y2="15" />
						</svg>
					</div>
          </div>
        </>
      )}
      {key === "LastName" && (
        <div className="relative">
          <input
          type="text"
          placeholder="search"
          value={filters.lastName}
          onChange={(e) => handleFilterChange(e, "lastName")}
          className="w-full pl-8 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        />
        <div className="absolute top-0 left-0 inline-flex items-center p-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24"
							strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
							strokeLinejoin="round">
							<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
							<circle cx="10" cy="10" r="7" />
							<line x1="21" y1="21" x2="15" y2="15" />
						</svg>
					</div>
        </div>
      )}
      {key === "Designation" && (
        <div className="relative">
        <input
          type="text"
          placeholder="Designation"
          value={filters.designation}
          onChange={(e) => handleFilterChange(e, "designation")}
          className="w-full pl-8 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        />
        <div className="absolute top-0 left-0 inline-flex items-center p-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24"
							strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
							strokeLinejoin="round">
							<rect x="0" y="0" width="24" height="24" stroke="none"></rect>
							<circle cx="10" cy="10" r="7" />
							<line x1="21" y1="21" x2="15" y2="15" />
						</svg>
					</div>
        </div>
      )}
    </th>
  ));
  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 w-full">
          <div className=" border border-gray-200 dark:border-gray-700 md:rounded-lg w-full">
            <div className="md:hidden grid grid-cols-[1fr,1fr] p-4 gap-4">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                <input  value={filters.firstName} onChange={(e) => handleFilterChange(e, "firstName")} placeholder="Search by First Name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                <input  placeholder="Search by Last Name"
                value={filters.lastName}
                onChange={(e) => handleFilterChange(e, "lastName")} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                <input   placeholder="Search by Designation"
                value={filters.designation}
                onChange={(e) => handleFilterChange(e, "designation")} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
              
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr>{tableHeaders}</tr>
              </thead>
              {isDataEmpty ? (
                <tbody>
                  <tr>
                    <td>No matching data found.</td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {currentRowsToShow.map((row, index) => (
                    <TableRow key={index} row={row} />
                  ))}
                </tbody>
              )}
            </table>
            <Pagination
              filteredData={filteredData}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExcelData;
