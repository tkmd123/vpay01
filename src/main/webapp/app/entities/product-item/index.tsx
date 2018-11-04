import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductItem from './product-item';
import ProductItemDetail from './product-item-detail';
import ProductItemUpdate from './product-item-update';
import ProductItemDeleteDialog from './product-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductItem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProductItemDeleteDialog} />
  </>
);

export default Routes;
