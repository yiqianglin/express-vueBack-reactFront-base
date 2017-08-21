import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import PopProtocol from 'components/common/PopProtocol';
// import { showToast, togglePop, showPopRecharging, getWXRechargePara } from 'actions/guessGame';

@inject((stores) => {
  const props = {
    isShow: stores.rechargeStore.popStatus.get('isShowGetGoldDetail'),
    rechargeNum: stores.rechargeStore.rechargeNum,
    rechargeRadio: stores.rechargeStore.rechargeRadio,
    rechargeRewardNum: stores.rechargeStore.rechargeRewardNum,
    closePop: stores.rechargeStore.closePop.bind(stores.rechargeStore),
    getWXRechargePara: stores.rechargeStore.getWXRechargePara.bind(stores.rechargeStore),
    showProtocol: stores.rechargeStore.showProtocol.bind(stores.rechargeStore),
    showToast: stores.systemStore.showToast.bind(stores.systemStore),
    subServerTime: stores.systemStore.subServerTime
  };
  return props;
}) @observer
class PopGetGoldDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowRechargeTip: false,
      isSelectedProtocol: true
    };
    this.showPopRechargeTip = this.showPopRechargeTip.bind(this);
    this.hidePopRechargeTip = this.hidePopRechargeTip.bind(this);
    this.toRecharge = this.toRecharge.bind(this);
    this.toggleSelectedProtocol = this.toggleSelectedProtocol.bind(this);
  }
  showPopRechargeTip(e) {
    this.setState({
      isShowRechargeTip: true
    });
    return false;
  }
  hidePopRechargeTip(e) {
    this.setState({
      isShowRechargeTip: false
    });
    return false;
  }
  toRecharge() { // 先弹起等待页，再弹起结果页
    if (!this.state.isSelectedProtocol) {
      this.props.showToast('请阅读并勾选<<迅雷小游戏许可及服务协议>>');
      return false;
    }
    this.props.closePop('isShowGetGoldDetail', false);
    this.props.getWXRechargePara(this.props.subServerTime);
    return true;
  }
  toggleSelectedProtocol() {
    this.setState({ isSelectedProtocol: !this.state.isSelectedProtocol });
  }
  showProtocol() {
    this.setState({
      isShowProtocol: true,
    });
  }
  addCommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  formatGold(rechargeNum) {
    const result = {};
    let suffixStr = '0';
    switch (rechargeNum) {
      case 2000:
        suffixStr = '0'; break;
      case 10000:
        suffixStr = '1'; break;
      case 50000:
        suffixStr = '2'; break;
      case 100000:
        suffixStr = '3'; break;
      default:
        suffixStr = '0'; break;
    }
    result.suffixStr = `icon-gold icon-gold-${suffixStr}`;
    result.rechargeNum = (rechargeNum / this.props.rechargeRadio);
    result.moneyStr = this.addCommas(rechargeNum);
    return result;
  }
  render() {
    const { isShow, rechargeNum, rechargeRewardNum, closePop, showProtocol } = this.props;
    const { isShowRechargeTip, isSelectedProtocol } = this.state;
    const classname = classnames({
      'pop-layer': true,
      'pop-get-gold': true,
      'pop-show': isShow
    });
    const popTipClassName = classnames({
      'pop-recharge-tip': true,
      'show-pop-tip': isShowRechargeTip
    });
    const isSelectedProClassName = classnames({
      'radio-icon': true,
      selected: isSelectedProtocol
    });
    const result = this.formatGold(rechargeNum);
    return (
      <section>
        <div className={classname}>
          {
            isShowRechargeTip ? <div className="transparent-fixed-bg" onClick={this.hidePopRechargeTip}></div> : ''
          }
          <section className="pop-mask" onClick={() => { closePop('isShowGetGoldDetail', false); }}></section>
          <section className="pop-body pop-body-get-gold get-gold-detail">
            <div className="close-btn" onClick={() => { closePop('isShowGetGoldDetail', false); }}></div>
            <div className="hd-get-gold"></div>
            <div className="bd-wrp bd-detail-wrp">
              <section className="bd-wrp-inner">
                <div className="bd-bg">
                  <p className="bd-gold-section"><span className={result.suffixStr}></span>{result.moneyStr}欢乐豆</p>
                  { rechargeRewardNum > 0 ? <p className="reward-tip-p"><span className="icon">赠</span>免费赠送{this.addCommas(rechargeRewardNum)}欢乐豆</p> : ''}
                  <section className="recharge-btn" onClick={() => { this.toRecharge(rechargeNum); }}>立即支付 {result.rechargeNum} 元</section>
                  <section className="recharge-tips-box">
                    <p className="recharge-tips">你将先充值钻石，充值后自动兑换<span className="icon-question" onClick={this.showPopRechargeTip}></span></p>
                    <div className={popTipClassName}>
    您充值钻石后，将自动兑换印花道具增加欢乐值，同时附赠欢乐豆。欢乐值可点击个人中心查看，使用欢乐豆可参与游戏。（1元可充10钻，自动兑换印花道具增加1欢乐值，同时附赠1000欢乐豆）</div>
                  </section>
                  <section className="protocol-anker-box">
                    <p className="protocol-anker-p selected"><span className={isSelectedProClassName} onClick={() => { this.toggleSelectedProtocol(); }}></span>阅读并同意<a href="javascript:;" onClick={ () => { showProtocol('isShowProtocol', true); }} className="protocol-anker">《迅雷小游戏许可及服务协议》</a></p>
                  </section>
                </div>
              </section>
            </div>
          </section>
        </div>
        <PopProtocol></PopProtocol>
      </section>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isShow && nextProps.isShow) {
      this.setState({ isSelectedProtocol: true });
    }
  }
}

export default PopGetGoldDetail;
