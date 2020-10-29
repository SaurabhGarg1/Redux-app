import { Action } from "redux";
import { ProjectData } from "../common";
import { TypeKeys } from "./actionUtils";

export interface LoadDataAction extends Action {
  type: TypeKeys.LOAD_DATA;
}
export interface LoadDataFulfilledAction extends Action {
  type: TypeKeys.LOAD_DATA_FULFILLED;
  data: Array<ProjectData>;
}
export interface LoadDataFailedAction extends Action {
  type: TypeKeys.LOAD_DATA_FAILED;
  error: string;
  status: number;
}

export const loadData = (): LoadDataAction => ({
  type: TypeKeys.LOAD_DATA
});

export const loadDataFulfilled = (
  response: Array<ProjectData>
): LoadDataFulfilledAction => ({
  type: TypeKeys.LOAD_DATA_FULFILLED,
  data: response
});

export const loadDataFailed = (
  error: string,
  status: number
): LoadDataFailedAction => ({
  type: TypeKeys.LOAD_DATA_FAILED,
  error,
  status
});

export type TableActionTypes =
  | LoadDataAction
  | LoadDataFulfilledAction
  | LoadDataFailedAction;
