import React, { useMemo } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import { COLUMNS } from "./columns";
import "./table.css";

export const Table = ({ submissions }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => submissions, [submissions]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    gotoPage,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div>
      {submissions !== null ? (
        <div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="table-container">
            <table className="submissions-table" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination-container">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <button
                className="pagination-button"
                onClick={previousPage}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button
                className="pagination-button"
                onClick={nextPage}
                disabled={!canNextPage}
              >
                Next
              </button>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "50px" }}
                />
              </span>{" "}
              <select
                className="pagination-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ) : (
        <h1>Hi</h1>
      )}
    </div>
  );
};
