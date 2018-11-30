import { ILocation } from 'app/shared/model//location.model';
import { IEmployee } from 'app/shared/model//employee.model';
import { IUser } from 'app/shared/model/user.model';

export interface IDepartment {
  id?: number;
  departmentName?: string;
  location?: ILocation;
  employees?: IEmployee[];
  departmentusers?: IUser[];
}

export const defaultValue: Readonly<IDepartment> = {};
