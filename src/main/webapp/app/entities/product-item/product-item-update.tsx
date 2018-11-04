import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product-item.reducer';
import { IProductItem } from 'app/shared/model/product-item.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProductItemUpdateState {
  isNew: boolean;
  productId: string;
}

export class ProductItemUpdate extends React.Component<IProductItemUpdateProps, IProductItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      productId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getProducts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { productItemEntity } = this.props;
      const entity = {
        ...productItemEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/product-item');
  };

  render() {
    const { productItemEntity, products, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="vpay01App.productItem.home.createOrEditLabel">
              <Translate contentKey="vpay01App.productItem.home.createOrEditLabel">Create or edit a ProductItem</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : productItemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="product-item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="productItemCodeLabel" for="productItemCode">
                    <Translate contentKey="vpay01App.productItem.productItemCode">Product Item Code</Translate>
                  </Label>
                  <AvField
                    id="product-item-productItemCode"
                    type="text"
                    name="productItemCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="productItemNameLabel" for="productItemName">
                    <Translate contentKey="vpay01App.productItem.productItemName">Product Item Name</Translate>
                  </Label>
                  <AvField
                    id="product-item-productItemName"
                    type="text"
                    name="productItemName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="productItemValueLabel" for="productItemValue">
                    <Translate contentKey="vpay01App.productItem.productItemValue">Product Item Value</Translate>
                  </Label>
                  <AvField id="product-item-productItemValue" type="string" className="form-control" name="productItemValue" />
                </AvGroup>
                <AvGroup>
                  <Label id="productItemDescLabel" for="productItemDesc">
                    <Translate contentKey="vpay01App.productItem.productItemDesc">Product Item Desc</Translate>
                  </Label>
                  <AvField id="product-item-productItemDesc" type="text" name="productItemDesc" />
                </AvGroup>
                <AvGroup>
                  <Label id="productItemUDF1Label" for="productItemUDF1">
                    <Translate contentKey="vpay01App.productItem.productItemUDF1">Product Item UDF 1</Translate>
                  </Label>
                  <AvField id="product-item-productItemUDF1" type="text" name="productItemUDF1" />
                </AvGroup>
                <AvGroup>
                  <Label id="productItemUDF2Label" for="productItemUDF2">
                    <Translate contentKey="vpay01App.productItem.productItemUDF2">Product Item UDF 2</Translate>
                  </Label>
                  <AvField id="product-item-productItemUDF2" type="text" name="productItemUDF2" />
                </AvGroup>
                <AvGroup>
                  <Label id="productItemUDF3Label" for="productItemUDF3">
                    <Translate contentKey="vpay01App.productItem.productItemUDF3">Product Item UDF 3</Translate>
                  </Label>
                  <AvField id="product-item-productItemUDF3" type="text" name="productItemUDF3" />
                </AvGroup>
                <AvGroup>
                  <Label id="isDeletedLabel" for="isDeleted">
                    <Translate contentKey="vpay01App.productItem.isDeleted">Is Deleted</Translate>
                  </Label>
                  <AvField
                    id="product-item-isDeleted"
                    type="string"
                    className="form-control"
                    name="isDeleted"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="product.id">
                    <Translate contentKey="vpay01App.productItem.product">Product</Translate>
                  </Label>
                  <AvInput id="product-item-product" type="select" className="form-control" name="product.id">
                    <option value="" key="0" />
                    {products
                      ? products.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/product-item" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  products: storeState.product.entities,
  productItemEntity: storeState.productItem.entity,
  loading: storeState.productItem.loading,
  updating: storeState.productItem.updating,
  updateSuccess: storeState.productItem.updateSuccess
});

const mapDispatchToProps = {
  getProducts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItemUpdate);
