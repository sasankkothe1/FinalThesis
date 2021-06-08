import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search:{" "}
      <input
        className="form-control"
        placeholder="Search"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
