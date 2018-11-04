import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './partner-log.reducer';
import { IPartnerLog } from 'app/shared/model/partner-log.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPartnerLogProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPartnerLogState extends IPaginationBaseState {
  search: string;
}

export class PartnerLog extends React.Component<IPartnerLogProps, IPartnerLogState> {
  state: IPartnerLogState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
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

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { partnerLogList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="partner-log-heading">
          <Translate contentKey="vpay01App.partnerLog.home.title">Partner Logs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="vpay01App.partnerLog.home.createLabel">Create new Partner Log</Translate>
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
                    placeholder={translate('vpay01App.partnerLog.home.search')}
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
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogAmount')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogAmount">Partner Log Amount</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogTransRef')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogTransRef">Partner Log Trans Ref</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogUsername')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogUsername">Partner Log Username</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogProductTypeCode')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogProductTypeCode">Partner Log Product Type Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogResultCode')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogResultCode">Partner Log Result Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogResultDesc')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogResultDesc">Partner Log Result Desc</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogDate')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogDate">Partner Log Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogUDF1')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogUDF1">Partner Log UDF 1</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogUDF2')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogUDF2">Partner Log UDF 2</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogUDF3')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogUDF3">Partner Log UDF 3</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogUDF4')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogUDF4">Partner Log UDF 4</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('partnerLogUDF5')}>
                  <Translate contentKey="vpay01App.partnerLog.partnerLogUDF5">Partner Log UDF 5</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('isDeleted')}>
                  <Translate contentKey="vpay01App.partnerLog.isDeleted">Is Deleted</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="vpay01App.partnerLog.partner">Partner</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {partnerLogList.map((partnerLog, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${partnerLog.id}`} color="link" size="sm">
                      {partnerLog.id}
                    </Button>
                  </td>
                  <td>{partnerLog.partnerLogAmount}</td>
                  <td>{partnerLog.partnerLogTransRef}</td>
                  <td>{partnerLog.partnerLogUsername}</td>
                  <td>{partnerLog.partnerLogProductTypeCode}</td>
                  <td>{partnerLog.partnerLogResultCode}</td>
                  <td>{partnerLog.partnerLogResultDesc}</td>
                  <td>
                    <TextFormat type="date" value={partnerLog.partnerLogDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{partnerLog.partnerLogUDF1}</td>
                  <td>{partnerLog.partnerLogUDF2}</td>
                  <td>{partnerLog.partnerLogUDF3}</td>
                  <td>{partnerLog.partnerLogUDF4}</td>
                  <td>{partnerLog.partnerLogUDF5}</td>
                  <td>{partnerLog.isDeleted ? 'true' : 'false'}</td>
                  <td>{partnerLog.partner ? <Link to={`partner/${partnerLog.partner.id}`}>{partnerLog.partner.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${partnerLog.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partnerLog.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${partnerLog.id}/delete`} color="danger" size="sm">
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
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ partnerLog }: IRootState) => ({
  partnerLogList: partnerLog.entities,
  totalItems: partnerLog.totalItems
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
)(PartnerLog);
