import React from "react";
import { useState } from "react";
import classNames from "classnames";
import "./Table.scss";
import { addUniqueIdToItems, sortArray } from "./utils";
import { ProjectData, TableHeader } from "../../common";

export interface TableProps {
  rows?: Array<ProjectData>;
  columns?: Array<TableHeader>;
}

const formatValue = (value: string | number | undefined) => {
  if (!value || value === "NULL") {
    return "\u00A0";
  } else {
    return value;
  }
};

const filterRow = (
  rows: Array<ProjectData>,
  columns: Array<TableHeader>,
  search: string
) => {
  if (!search) {
    return rows;
  }
  const searchableColumns = columns.filter(
    (column: TableHeader) => column.searchable
  );
  if (!searchableColumns.length) {
    return rows;
  }
  return rows.filter((row: ProjectData) => {
    const matchingRowValues = searchableColumns.map(
      (searchableColumn: TableHeader) =>
        row[searchableColumn.name as keyof ProjectData]
    );
    return matchingRowValues.some(rowValues =>
      rowValues?.toString().toLowerCase().includes(search.toLowerCase())
    );
  });
};

const getRows = (rows: Array<ProjectData>, columns: Array<TableHeader>) => {
  if (!rows.length) {
    return <span>No Item found</span>;
  }
  return (
    <div className="table--rows">
      {rows.map(row =>
        columns.map(column => (
          <span key={`${row.id}-${column.name}`} className={column.name.replace(' ', '-')}>
            {column.formatValue
              ? column.formatValue(row[column.name as keyof ProjectData])
              : formatValue(row[column.name as keyof ProjectData])}
          </span>
        ))
      )}
    </div>
  );
};

const getColumns = (
  columns: Array<TableHeader>,
  sortedColName: string,
  sortedOrder: string,
  onSort: (col: TableHeader) => void
) =>
  columns.map((col, index) => (
    <div
      key={col.name}
      id={col.name.replace(' ', '-')}
      className={classNames("column", {
        "column--not-sorted" : col.sortable && sortedColName !== col.name,
      })}
      onClick={() => onSort(col)}
    >
      <span key={index}>
        <strong>{col.name}</strong>
      </span>
      {col.sortable && getSortContent(sortedColName, sortedOrder, col.name)}
    </div>
  ));

const getSortContent = (
  sortedColName: string,
  sortedOrder: string,
  currentColName: string
) => {
  if (sortedColName === currentColName) {
    return (
      <span
        className={classNames("table--columns--sortable", {
          "table--columns--sortable--desc": sortedOrder === "desc",
          "table--columns--sortable--asc": sortedOrder === "asc"
        })}
      />
    );
  }
  return (
    <span
      className={classNames("table--columns--sortable")}
    />
  );
};

export const Table = ({ rows, columns }: TableProps) : JSX.Element => {
  const [sort, setSort] = useState({
    columnName: "",
    order: "asc"
  });

  const [search, setSearch] = useState<string>("");

  /**  Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */

  if(!rows || !columns) {
    return <p> Loading ....</p>
  }

  return (
    <>
      <input
        className="search"
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by description.."
      />
      <div className="table--columns">
        {getColumns(
          columns,
          sort.columnName,
          sort.order,
          (col: TableHeader) =>
            col.sortable &&
            setSort({
              columnName: col.name,
              order:
                sort.columnName === col.name && sort.order === "desc"
                  ? "asc"
                  : "desc"
            })
        )}
      </div>
      {getRows(
        sortArray(
          filterRow(addUniqueIdToItems(rows, 1), columns, search),
          sort.columnName as keyof ProjectData,
          sort.order
        ),
        columns
      )}
    </>
  );
};
