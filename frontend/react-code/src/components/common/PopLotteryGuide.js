import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { getIn } from 'utils/utilsFunc';

@inject((stores) => {
  const props = {
    subServerTime: stores.systemStore.subServerTime,
    isShow: stores.userStore.popStatus.get('isShowLotteryGuide'),
    togglePop: stores.userStore.togglePop.bind(stores.userStore),
    getUserInfo: stores.userStore.getUserInfo.bind(stores.userStore)
  };
  return props;
})
@observer
class PopLotteryGuide extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  render() {
    const { isShow, pos } = this.props;
    const classname = classnames({
      'lottery-guide-wrap': true,
      'pop-show': isShow
    });
    return (
      <div className={classname}>
        <p className="guide-tt">恭喜获得1次免费抽会员</p>
        <p className="guide-content">抽奖在页面{pos}哦~</p>
        <div className="lottery-bg"></div>
        <a href="javascript:;" className="closeBtn" onClick={this.close}>每玩5局游戏，再送1次免费抽会员</a>
      </div>
    );
  }

  close() {
    this.props.togglePop('isShowLotteryGuide', false);
    this.props.getUserInfo(this.props.subServerTime);
  }
}

export default PopLotteryGuide;
