import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import qs from 'qs';

import 'assets/scss/market/home.scss';
import 'assets/scss/market/pop.scss';

@inject('systemStore', 'productListStore', 'userStore') @observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData(params, method, timeout = 60000) {
    // const url = 'http://127.0.0.1:3000/demo/demo4/home/123_henix';
    const url = 'http://127.0.0.1:3000/demo/demo5/showUser';
    // const url = 'http://test.weitrades.com/game-web-site/game/system/getServerTime.htm';
    return axios
      .post(url, qs.stringify({ userId: 2, name: 'henix' }), {
        responseType: 'json',
        headers: {
          Accept: 'image/png',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        timeout: 60000
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.groupCollapsed();
        console.table(data);
        console.groupEnd();
        if (data.code !== '200') {
          console.log('客户端收到错误返回。');
        } else {
          this.setState({
            userData: data.result
          });
        }
        return data;
      })
      .catch((error) => {
        console.log('客户端catch', error);
        return error;
      });
  }

  render() {
    const { userData } = this.state;
    return (
      <div className="homepage" onClick={ (event) => { this.cancelUserCenterHandler(event); } }>
        没有请求参数 to: /home
        <br/>
        { JSON.stringify(userData) }
      </div>
    );
  }
}

