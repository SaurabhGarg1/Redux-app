export interface ProjectData {
  project: number;
  description: string;
  "start date": string;
  category: string;
  responsible: string;
  "savings amount": number;
  currency: string;
  complexity: string;
  id?: string;
}
export interface TableHeader {
  name: string;
  searchable?: boolean;
  sortable?: boolean;
  formatValue?: (val?: string | number) => {} | undefined;
}
export interface TableState {
  rows?: Array<ProjectData>;
  columns?: Array<TableHeader>;
}
export interface State {
  table: TableState | null;
}

export const formatDate = (val?: string | number) => val?.toString().split("T")[0].split("-").reverse().join(".")