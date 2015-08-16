import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import {requireServerCss} from '../util';

const styles = __CLIENT__ ? require('./Login.scss') : requireServerCss(require.resolve('./Login.scss'));


class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.username.getDOMNode();  // need for getDOMNode() call going away in React 0.14
    if(input.value){
      this.props.login(input.value);
      input.value = '';
    }
  }

  render() {
    const {user, logout} = this.props;
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="username" placeholder="Enter a username"/>
            <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators(authActions, dispatch))(Login)

