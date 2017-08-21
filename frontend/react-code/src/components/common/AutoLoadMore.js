import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';

class AutoLoadMore extends Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isFirstLoading: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    renderFirstLoading: PropTypes.func,
    renderFooter: PropTypes.func,
    renderEmpty: PropTypes.func
  }

  render() {
    const { listClassName } = this.props;
    return (
      <div className={listClassName}>
        {this.renderByData()}
      </div>
    );
  }

  renderByData() {
    const { renderFirstLoading, renderEmpty, renderFooter } = this.props;
    if (this.props.isFirstLoading) {
      return renderFirstLoading ? renderFirstLoading() : this.defRenderFirstLoading();
    }
    if (this.props.isEmpty) {
      return renderEmpty ? renderEmpty() : this.defRenderEmpty();
    }
    const footer = renderFooter ? renderFooter() : this.defRenderFooter();
    return (
      <div>
        {this.props.children}
        {footer}
      </div>
    );
  }

  defRenderEmpty() {
    return (
      <div className="auto-load-more-none">
        <p className="auto-load-more-none p1" >暂无数据</p>
      </div>
    );
  }

  defRenderFirstLoading() {
    return (
      <div className="auto-load-more-none">
        <p className="auto-load-more-none p1" >正在加载中...</p>
      </div>
    );
  }

  defRenderFooter() {
    return (
      <div className="auto-load-more-footer">
        {this.renderWaypoint()}
        <p className="auto-load-more-footer p1">{this.props.hasMore ? '正在加载...' : '已经到底了'}</p>
      </div>
    );
  }

  renderWaypoint() {
    if (!this.props.loading) {
      return (
        <Waypoint onEnter={this.props.onLoadMore}/>
      );
    }
    return true;
  }
}

export default AutoLoadMore;
