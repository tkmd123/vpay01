import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProductItem, defaultValue } from 'app/shared/model/product-item.model';

export const ACTION_TYPES = {
  SEARCH_PRODUCTITEMS: 'productItem/SEARCH_PRODUCTITEMS',
  FETCH_PRODUCTITEM_LIST: 'productItem/FETCH_PRODUCTITEM_LIST',
  FETCH_PRODUCTITEM: 'productItem/FETCH_PRODUCTITEM',
  CREATE_PRODUCTITEM: 'productItem/CREATE_PRODUCTITEM',
  UPDATE_PRODUCTITEM: 'productItem/UPDATE_PRODUCTITEM',
  DELETE_PRODUCTITEM: 'productItem/DELETE_PRODUCTITEM',
  RESET: 'productItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProductItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProductItemState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductItemState = initialState, action): ProductItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PRODUCTITEMS):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTITEM):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTITEM):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PRODUCTITEMS):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTITEM):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTITEM):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTITEM):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PRODUCTITEMS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/product-items';
const apiSearchUrl = 'api/_search/product-items';

// Actions

export const getSearchEntities: ICrudSearchAction<IProductItem> = query => ({
  type: ACTION_TYPES.SEARCH_PRODUCTITEMS,
  payload: axios.get<IProductItem>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IProductItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODUCTITEM_LIST,
  payload: axios.get<IProductItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProductItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTITEM,
    payload: axios.get<IProductItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProductItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProductItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTITEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
