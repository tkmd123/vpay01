export interface IStatus {
  id?: number;
  statusCode?: string;
  statusValue?: number;
  statusName?: string;
  statusDesc?: string;
  statusUDF1?: string;
  statusUDF2?: string;
  statusUDF3?: string;
  isDeleted?: number;
}

export const defaultValue: Readonly<IStatus> = {};
