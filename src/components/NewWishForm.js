import React, {Component, PropTypes} from 'react';
import {requireServerCss} from '../util';
import Loader from 'react-loader';

const styles = __CLIENT__ ? require('./NewWishForm.scss') : requireServerCss(require.resolve('./NewWishForm.scss'));

class NewWishForm extends Component {

  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.newWish.getDOMNode();  // need for getDOMNode() call going away in React 0.14
    if (input.value) {
      this.props.onNewWish(input.value);
      input.value = '';
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">New Wish</h3>
        </div>
        <div className="panel-body">
          <form className={'form-inline ' + styles.newWishForm} onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" className="form-control new-wish" ref="newWish" placeholder="A Surfboard"/>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <Loader loaded={!this.props.creating}/>
          </form>
        </div>
      </div>
    )
  }
}

NewWishForm.propTypes = {
  onNewWish: PropTypes.func.isRequired,
  creating: PropTypes.bool
};


export default  NewWishForm;