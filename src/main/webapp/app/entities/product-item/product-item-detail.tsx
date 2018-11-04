import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product-item.reducer';
import { IProductItem } from 'app/shared/model/product-item.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProductItemDetail extends React.Component<IProductItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { productItemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="vpay01App.productItem.detail.title">ProductItem</Translate> [<b>{productItemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="productItemCode">
                <Translate contentKey="vpay01App.productItem.productItemCode">Product Item Code</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.productItemCode}</dd>
            <dt>
              <span id="productItemName">
                <Translate contentKey="vpay01App.productItem.productItemName">Product Item Name</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.productItemName}</dd>
            <dt>
              <span id="productItemValue">
                <Translate contentKey="vpay01App.productItem.productItemValue">Product Item Value</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.productItemValue}</dd>
            <dt>
              <span id="productItemDesc">
                <Translate contentKey="vpay01App.productItem.productItemDesc">Product Item Desc</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.productItemDesc}</dd>
            <dt>
              <span id="productItemUDF1">
                <Translate contentKey="vpay01App.productItem.productItemUDF1">Product Item UDF 1</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.productItemUDF1}</dd>
            <dt>
              <span id="productItemUDF2">
                <Translate contentKey="vpay01App.productItem.productItemUDF2">Product Item UDF 2</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.productItemUDF2}</dd>
            <dt>
              <span id="productItemUDF3">
                <Translate contentKey="vpay01App.productItem.productItemUDF3">Product Item UDF 3</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.productItemUDF3}</dd>
            <dt>
              <span id="isDeleted">
                <Translate contentKey="vpay01App.productItem.isDeleted">Is Deleted</Translate>
              </span>
            </dt>
            <dd>{productItemEntity.isDeleted}</dd>
            <dt>
              <Translate contentKey="vpay01App.productItem.product">Product</Translate>
            </dt>
            <dd>{productItemEntity.product ? productItemEntity.product.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/product-item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/product-item/${productItemEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ productItem }: IRootState) => ({
  productItemEntity: productItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItemDetail);
