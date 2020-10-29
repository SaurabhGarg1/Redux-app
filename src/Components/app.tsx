import * as React from "react";
import { useEffect } from "react";
import { TableState } from "../common";
import { Table } from "./Table/Table";
import "./app.scss";

export interface AppDispatchers {
  onLoadData: () => void;
}
export interface AppOwnProps extends TableState {}
type AppProps = AppOwnProps & AppDispatchers;

export const App = ({ onLoadData, rows, columns  }: AppProps) => {
  useEffect(() => {
    onLoadData()
  }, [onLoadData]);
  return (
    <div className="App">
      <Table {...{
        rows,
        columns
      }}/>
    </div>
  );
};
