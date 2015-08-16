import React, {Component} from 'react';
import {Link} from 'react-router';
import {requireServerCss, requireServerImage} from '../util';

const styles = __CLIENT__ ? require('./Home.scss') : requireServerCss(require.resolve('./Home.scss'));

// require the logo image both from client and server
let logoImage = '';
if (__CLIENT__) {
  logoImage = require('./logo.png');
} else {
  logoImage = requireServerImage('./logo.png');
}

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>Superwish</h1>

            <h2>Next Gen Wishlist.</h2>

          </div>
        </div>

        <div className="container">


        </div>
      </div>
    );
  }
}
