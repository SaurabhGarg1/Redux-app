import { Observable } from "rxjs";

export interface EpicDependencies {
  getJSON<T>(url: string, headers?: Object): Observable<T>;
}
