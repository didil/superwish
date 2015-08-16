import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {isLoaded} from '../reducers/wishes';
import {connect} from 'react-redux';
import * as wishActions from '../actions/wishActions';
import {load as loadWishes } from '../actions/wishActions';
import {requireServerCss} from '../util';
import moment from 'moment';

const styles = __CLIENT__ ? require('./Wishes.scss') : requireServerCss(require.resolve('./Wishes.scss'));

class Wishes extends Component {
  static propTypes = {
    wishes: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    creating: PropTypes.bool,
    load: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWishes());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.newWish.getDOMNode();  // need for getDOMNode() call going away in React 0.14
    if (input.value) {
      this.props.create(input.value);
      input.value = '';
    }
  }

  render() {
    const {wishes, error, loading, load, user} = this.props;
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
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">New Wish</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <input type="text" className="form-control new-wish" ref="newWish" placeholder="A Surfboard"/>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
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
    creating: state.wishes.creating
  }),
    dispatch => bindActionCreators(wishActions, dispatch)
)(Wishes);
