import { combineEpics, Epic } from "redux-observable";
import { ApplicationActionTypes } from "../Actions";
import { State } from "../common";
import { getTableDataEpic } from "./tableEpic";
import { EpicDependencies } from "./utils";

export * from "./utils";

export const appEpic: Epic<
  ApplicationActionTypes,
  ApplicationActionTypes,
  State,
  EpicDependencies
> = combineEpics(getTableDataEpic);
