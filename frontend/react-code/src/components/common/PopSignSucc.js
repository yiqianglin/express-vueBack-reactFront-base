import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import prizeImg from 'assets/img/pop/sign/prize-img.png';

@inject(stores => ({
  subServerTime: stores.systemStore.subServerTime,
  isShow: stores.userStore.popStatus.get('isShowSignSucc'),
  score: stores.userStore.signScore,
  togglePop: stores.userStore.togglePop.bind(stores.userStore),
  getUserInfo: stores.userStore.getUserInfo.bind(stores.userStore),
  setFinshSignStatus: stores.userStore.setFinshSignStatus.bind(stores.userStore)
}))
@observer
class PopSignSucc extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isShow && nextProps.isShow) {
      setTimeout(() => {
        this.close();
        this.props.setFinshSignStatus(true);
      }, 3600);
    }
  }

  render() {
    const { isShow, score } = this.props;
    const classname = classnames({
      'pop-signsucc': true,
      'pop-layer': true,
      'pop-show': isShow
    });
    return (
      <div className={classname}>
        <div className="pop-mask" />
        <div className="pop-signsucc-content">
          <div className="pop-signsucc-bg" />
          <p className="sign-succ-tt" />
          <div className="prize-bg">
            <img src={prizeImg} alt="" />
          </div>
          <p className="get-score">
            欢乐豆<span className="score-num">x{score}</span>
          </p>
        </div>
      </div>
    );
  }

  close() {
    this.props.togglePop('isShowSignSucc', false);
    this.props.getUserInfo(this.props.subServerTime);
  }
}

export default PopSignSucc;
