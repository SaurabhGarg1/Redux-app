import * as React from "react";
import { TableActionTypes } from "../Actions";
import { loadData } from "../Actions";
import { ApplicationDispatchers } from "../Components";
import { App } from "../Components";
import { connect } from "react-redux";
import { State } from '../common';


const mapStateToProps = ({table}: State) => ({
  ...table
});
const mapDispatchToProps = (
  dispatch: React.Dispatch<TableActionTypes>
): ApplicationDispatchers => ({
  onLoadData: () => dispatch(loadData())
});

export const ApplicationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
