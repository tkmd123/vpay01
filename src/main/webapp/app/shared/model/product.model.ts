import { IProductType } from 'app/shared/model//product-type.model';
import { IProductItem } from 'app/shared/model//product-item.model';

export interface IProduct {
  id?: number;
  productCode?: string;
  productName?: string;
  productDesc?: string;
  productUDF1?: string;
  productUDF2?: string;
  productUDF3?: string;
  isDeleted?: number;
  productType?: IProductType;
  productProductItems?: IProductItem[];
}

export const defaultValue: Readonly<IProduct> = {};
