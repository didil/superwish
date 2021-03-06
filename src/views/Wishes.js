import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {isLoaded} from '../reducers/wishes';
import {connect} from 'react-redux';
import * as wishActions from '../actions/wishActions';
import {load as loadWishes } from '../actions/wishActions';
import {requireServerCss} from '../util';
import moment from 'moment';
import NewWishForm from '../components/NewWishForm'
import Loader from 'react-loader';

const styles = __CLIENT__ ? require('./Wishes.scss') : requireServerCss(require.resolve('./Wishes.scss'));

class Wishes extends Component {
  static propTypes = {
    wishes: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    creating: PropTypes.bool,
    destroying: PropTypes.bool,
    load: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWishes());
    }
  }

  handleNewWish(wishName) {
    this.props.create(wishName);
  }

  handleDestroy(e,_id) {
    e.preventDefault();
    this.props.destroy(_id);
  }

  render() {
    const {wishes, error, loading,   load, user } = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div className={styles.wishes + ' container'}>
        <h1>
          Wishes
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}><i
            className={refreshClassName}/> {' '} Reload Wishes
          </button>
        </h1>

        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}

        {user &&
        <NewWishForm onNewWish={this.handleNewWish.bind(this)} creating={this.props.creating}/>
        }
        {!user &&
        <div className="alert alert-danger" role="alert">
          <span className="sr-only">Error:</span>
          Please login to be able to create wishes
        </div>
        }

        {wishes && wishes.length > 0 &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th>Wish</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            wishes.map((wish) =>
              <tr key={wish._id}>
                <td>{wish.name}</td>
                <td>{wish.user}</td>
                <td>{moment(wish.createdAt).fromNow()}</td>
                <td>
                  {user && wish.user === user.name &&
                  <a href className="btn btn-danger" onClick={(e) => this.handleDestroy(e,wish._id)}>Destroy</a>}
                </td>
              </tr>)
          }
          </tbody>
        </table>}
        <Loader loaded={!this.props.destroying}/>

        {wishes && wishes.length == 0 &&
        <em>No Wishes available</em>
        }
      </div>
    );
  }
}

export default connect(
    state => ({
    user: state.auth.user,
    wishes: state.wishes.data,
    error: state.wishes.error,
    loading: state.wishes.loading,
    creating: state.wishes.creating,
    destroying: state.wishes.destroying
  }),
    dispatch => bindActionCreators(wishActions, dispatch)
)(Wishes);
