import React, { useEffect, useState, useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import { COLUMNS } from "./columns";
import { getJobNumbers, getSubmissionsFromServer } from "../../services/admin";
import "./table.css";

export const Table = ({ submissions }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => submissions, [submissions]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <div>
      {submissions !== null ? (
        <div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <table {...getTableProps()}>
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
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Hi</h1>
      )}
    </div>
  );
};
