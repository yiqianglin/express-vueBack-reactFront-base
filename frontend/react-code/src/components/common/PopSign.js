import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { getIn } from 'utils/utilsFunc';

@inject(stores => ({
  subServerTime: stores.systemStore.subServerTime,
  signScoreRule: stores.systemStore.signScoreRule,
  isShow: stores.userStore.popStatus.get('isShowSign'),
  continuousNum: getIn(['userInfo', 'continuousNum'], stores.userStore, 0),
  togglePop: stores.userStore.togglePop.bind(stores.userStore),
  userSignin: stores.userStore.userSignin.bind(stores.userStore),
  setFinshSignStatus: stores.userStore.setFinshSignStatus.bind(stores.userStore)
}))
@observer
class PopSign extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.userSignin = this.userSignin.bind(this);
  }

  render() {
    const classname = classnames({
      'pop-sign': true,
      'pop-layer': true,
      'pop-show': this.props.isShow
    });
    const continuousNum = this.props.continuousNum;
    const scoreArr = this.props.signScoreRule.split(',');
    return (
      <div className={classname}>
        <div className="pop-mask" />
        <div className="pop-sign-content">
          <a href="javascript:;" className="close-btn" onClick={this.close} />
          <div className="prize-list">
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div
                className={`prize-list-item prize0${item}${(continuousNum < 7 && item <= continuousNum) || (continuousNum >= 7 && item < 7) ? ' signed' : ''}${(continuousNum < 7 && item === continuousNum + 1) || (continuousNum >= 7 && item === 7) ? ' cur' : ''}`}
                key={`sign${index}`}
              >
                <h3 className="sign-tt">{item < 7 ? `第${item}天` : '6天以上'}</h3>
                {(continuousNum < 7 && item <= continuousNum) ||
                  (continuousNum >= 7 && item < 7)
                  ? <p className="score-text">已领取</p>
                  : item < 7
                      ? <p className="score-text">
                          欢乐豆
                          <span className="score-num">x{scoreArr[index]}</span>
                        </p>
                      : <p className="score-text">随机欢乐豆</p>}
                <div className="signed-mask" />
              </div>
            ))}
          </div>
          <p className="sign-text">连续签到{continuousNum}天啦~</p>
          <a href="javascript:;" className="sign-btn" onClick={this.userSignin}>
            领取欢乐豆
          </a>
        </div>
      </div>
    );
  }

  close() {
    this.props.togglePop('isShowSign', false);
    this.props.setFinshSignStatus(true);
  }

  userSignin() {
    this.props.userSignin(this.props.subServerTime);
  }
}

export default PopSign;
