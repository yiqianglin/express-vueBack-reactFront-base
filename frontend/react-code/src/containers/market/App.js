import React, { Component } from 'react';
import { autorun } from 'mobx';
import { Router, Route, Redirect, Switch, browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import 'assets/scss/market/app.scss';

@inject('systemStore', 'userStore') @observer
export default class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="app-wrapper">
        {_ENV_ === 'DEV' && <div style={{ height: '64px' }}><DevTools /></div>}
        { this.props.children }
        这里是App的内容
      </div>
    );
  }
}
