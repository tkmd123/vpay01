import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './product-item.reducer';
import { IProductItem } from 'app/shared/model/product-item.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProductItemState {
  search: string;
}

export class ProductItem extends React.Component<IProductItemProps, IProductItemState> {
  state: IProductItemState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { productItemList, match } = this.props;
    return (
      <div>
        <h2 id="product-item-heading">
          <Translate contentKey="vpay01App.productItem.home.title">Product Items</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="vpay01App.productItem.home.createLabel">Create new Product Item</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('vpay01App.productItem.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.productItemCode">Product Item Code</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.productItemName">Product Item Name</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.productItemValue">Product Item Value</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.productItemDesc">Product Item Desc</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.productItemUDF1">Product Item UDF 1</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.productItemUDF2">Product Item UDF 2</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.productItemUDF3">Product Item UDF 3</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.isDeleted">Is Deleted</Translate>
                </th>
                <th>
                  <Translate contentKey="vpay01App.productItem.product">Product</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productItemList.map((productItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${productItem.id}`} color="link" size="sm">
                      {productItem.id}
                    </Button>
                  </td>
                  <td>{productItem.productItemCode}</td>
                  <td>{productItem.productItemName}</td>
                  <td>{productItem.productItemValue}</td>
                  <td>{productItem.productItemDesc}</td>
                  <td>{productItem.productItemUDF1}</td>
                  <td>{productItem.productItemUDF2}</td>
                  <td>{productItem.productItemUDF3}</td>
                  <td>{productItem.isDeleted}</td>
                  <td>{productItem.product ? <Link to={`product/${productItem.product.id}`}>{productItem.product.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${productItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productItem.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ productItem }: IRootState) => ({
  productItemList: productItem.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);
