import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {isLoaded} from '../reducers/wishes';
import {connect} from 'react-redux';
import * as wishActions from '../actions/wishActions';
import {load as loadWishes} from '../actions/wishActions';
import {requireServerCss} from '../util';
import moment from 'moment';

const styles = __CLIENT__ ? require('./Wishes.scss') : requireServerCss(require.resolve('./Wishes.scss'));

@connect(
    state => ({
    wishes: state.wishes.data,
    error: state.wishes.error,
    loading: state.wishes.loading
  }),
    dispatch => bindActionCreators(wishActions, dispatch)
)

class Wishes extends Component {
  static propTypes = {
    wishes: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWishes());
    }
  }

  render() {
    const {wishes, error, loading, load} = this.props;
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
        {wishes && wishes.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th>Name</th>
            <th>User</th>
            <th>Created</th>
          </tr>
          </thead>
          <tbody>
          {
            wishes.map((wish) => <tr key={wish._id}>
              <td>{wish.name}</td>
              <td>{wish.user}</td>
              <td>{moment(wish.createdAt).fromNow()}</td>
            </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

export default connect(
    state => ({
    wishes: state.wishes.data,
    error: state.wishes.error,
    loading: state.wishes.loading
  }),
    dispatch => bindActionCreators(wishActions, dispatch)
)(Wishes);
