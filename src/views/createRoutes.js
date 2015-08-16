import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Home from 'views/Home';
import Wishes from 'views/Wishes';
import Login from 'views/Login';
import RequireLogin from 'views/RequireLogin';
import LoginSuccess from 'views/LoginSuccess';
import NotFound from 'views/NotFound';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/wishes" component={Wishes}/>
      <Route path="/login" component={Login}/>
      <Route component={RequireLogin} onEnter={RequireLogin.onEnter(store)}>
        <Route path="/loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
