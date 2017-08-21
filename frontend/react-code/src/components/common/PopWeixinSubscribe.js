import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import qrcodeSrc from 'assets/img/pop/subscribe/qrcode.jpg';

@inject(stores => ({
  isShow: stores.systemStore.popStatus.get('isShowWeixinSubscribe'),
  subscribeScore: stores.systemStore.subscribeScore,
  togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
}))
@observer
class PopWeixinSubscribe extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  render() {
    const classname = classnames({
      'pop-subscribe': true,
      'pop-layer': true,
      'pop-show': this.props.isShow
    });
    return (
      <div className={classname}>
        <div className="pop-mask" onClick={this.close} />
        <div className="pop-subscribe-content">
          <p className="pop-text1">
            粉一下“<span className="highlight">迅雷小游戏</span>”
          </p>
          <p className="pop-text2">
            免费再领
            <span className="highlight num">{this.props.subscribeScore}</span>
            欢乐豆赚一把
          </p>
          <img className="qrcode" src={qrcodeSrc} alt="" />
          <p className="pop-text3">迅雷小游戏，能赚钱的小游戏</p>
          <p className="highlight">长按二维码领取</p>
        </div>
      </div>
    );
  }

  close() {
    this.props.togglePop('isShowWeixinSubscribe', false);
  }
}

export default PopWeixinSubscribe;
