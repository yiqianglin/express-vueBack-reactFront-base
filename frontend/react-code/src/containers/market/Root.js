/**
 * Created by cc on 2017/5/5.
 */
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import * as stores from 'stores/market';

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./App').default,
    childRoutes: [{
      path: `${websitePath}/creditMarket.htm`,
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./Home').default);
        }, 'Home');
      }
    }]
  }]
};

class Root extends Component {
  render() {
    return (
      <Provider { ...stores }>
        <Router history={browserHistory} routes={rootRoute}>
        </Router>
      </Provider>
    );
  }
}

export default Root;

