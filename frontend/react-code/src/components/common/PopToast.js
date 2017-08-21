import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    isShow: stores.systemStore.toastStatus,
    sentence: stores.systemStore.errorTip.get('sentence'),
    icon: stores.systemStore.errorTip.get('icon'),
    hideToast: stores.systemStore.hideToast.bind(stores.systemStore)
  };
  return props;
}) @observer
class PopToast extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isShow) {
      if (this.timer && this.props.sentence !== nextProps.sentence) {
        clearTimeout(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.props.hideToast();
        }, 3000);
      }
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.props.hideToast();
        }, 3000);
      }
    } else {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    const { isShow, icon, sentence } = this.props;
    const classname = classnames({
      'pop-layer': true,
      'pop-toast': true,
      'pop-show': isShow
    });
    return (
      <div className={classname} >
        <div className="pop-body pop-body-toast">
          {icon ? <i className={`icon ${icon}`}></i> : ''}
          <span>
            {sentence || '成功!'}
          </span>
        </div>
      </div>
    );
  }
}

export default PopToast;
