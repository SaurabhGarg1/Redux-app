import { TypeKeys } from "../Actions/actionUtils";
import { ApplicationActionTypes } from "../Actions";
import { TableState, TableHeader, formatDate } from "../common";

const getTableColumns = () : Array<TableHeader>=>  [
  {
    name: "id"
  },
  {
    name: "description",
    searchable: true
  },
  {
  name: "start date",
  sortable: true,
	formatValue: (val?: string | number) => formatDate(val)
  },
  {
    name: "first name"
  },
  {
    name: "last name"
  },
  {
    name: "email"
  },
  {
    name: "gender"
  }
];

export const tableReducer = (
  state: TableState = {rows:undefined, columns: undefined},
  action: ApplicationActionTypes
): TableState | null => {
  if (!state) {
    return null;
  }
  switch (action.type) {
    case TypeKeys.LOAD_DATA:
      return state;
    case TypeKeys.LOAD_DATA_FULFILLED:
      return {
        ...state,
        rows: action.data,
        columns: getTableColumns()
      };
    case TypeKeys.LOAD_DATA_FAILED:
      return state;
    default:
      return state;
  }
};
