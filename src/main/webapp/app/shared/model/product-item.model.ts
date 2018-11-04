import { IProduct } from 'app/shared/model//product.model';

export interface IProductItem {
  id?: number;
  productItemCode?: string;
  productItemName?: string;
  productItemValue?: number;
  productItemDesc?: string;
  productItemUDF1?: string;
  productItemUDF2?: string;
  productItemUDF3?: string;
  isDeleted?: number;
  product?: IProduct;
}

export const defaultValue: Readonly<IProductItem> = {};
