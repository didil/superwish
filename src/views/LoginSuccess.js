import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import {load as loadAuth} from '../actions/authActions';
import * as authActions from '../actions/authActions';

@connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators(authActions, dispatch)
)

class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  render() {
    const {user, logout} = this.props;
    return (
      <div className="container">
        <h1>Login Success</h1>

        <div>
          <p>Hi, {user.name}. You have just successfully logged in.
          </p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators(authActions, dispatch)
)(LoginSuccess)