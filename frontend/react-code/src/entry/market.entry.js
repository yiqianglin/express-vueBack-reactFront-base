/**
 * 项目入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../containers/market/Root';

require('core-js/fn/array/fill');

ReactDOM.render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('../containers/market/Root', () => {
    ReactDOM.render(<Root />, document.getElementById('root'));
  });
}
