import { ActionsObservable, Epic, StateObservable, ofType } from "redux-observable";
import { catchError, mergeMap, map } from "rxjs/operators";
import {
  ApplicationActionTypes,
} from "../Actions";
import { EpicDependencies } from "./utils";
import { State } from "../common";
import { Observable, of } from "rxjs";
import { loadDataFulfilled, loadDataFailed } from "../Actions";
import { AjaxError } from "rxjs/ajax";
import { TypeKeys } from "../Actions/actionUtils";

const get = <R, A, B>(
  epicDependencies: EpicDependencies,
  successAction: (response: R) => A,
  failureAction: (message: string, status: number) => B,
  path: string
): Observable<A | B> =>
  epicDependencies.getJSON<R>(path).pipe(
    map((response : R) => successAction(response)),
    catchError((ajaxError: AjaxError) =>
      of(failureAction(ajaxError.message, ajaxError.status))
    )
  );

export const getTableDataEpic: Epic<
  ApplicationActionTypes,
  ApplicationActionTypes,
  State,
  EpicDependencies
> = (
  action$: ActionsObservable<ApplicationActionTypes>,
  state$: StateObservable<State>,
  epicDependencies: EpicDependencies
) =>
  action$.pipe(
    ofType(TypeKeys.LOAD_DATA),
    mergeMap(() =>
        get(
          epicDependencies,
          loadDataFulfilled,
          loadDataFailed,
          "http://localhost:3002/getcustomerData"
        )
    ));