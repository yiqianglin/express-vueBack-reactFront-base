import React, { Component } from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react'; // 充值结果状态， 0 ==> 取消， -1 ==> 失败 , 1 ===> 成功
// import { togglePop, getWXRechargePara } from 'actions/guessGame';

@inject((stores) => {
  const props = {
    isShow: stores.rechargeStore.popStatus.get('isShowGetGoldResult'),
    rechargeResultStatus: stores.rechargeStore.rechargeResultStatus,
    rechargeNum: stores.rechargeStore.rechargeNum,
    rechargeRadio: stores.rechargeStore.rechargeRadio,
    rechargeRewardNum: stores.rechargeStore.rechargeRewardNum,
    closePop: stores.rechargeStore.closePop.bind(stores.rechargeStore),
    getWXRechargePara: stores.rechargeStore.getWXRechargePara.bind(
      stores.rechargeStore
    ),
    subServerTime: stores.systemStore.subServerTime
  };
  return props;
})
@observer
class PopGetGoldResult extends Component {
  constructor(props) {
    super(props);
    this.finishRecharge = this.finishRecharge.bind(this);
    this.failedThenRecharge = this.failedThenRecharge.bind(this);
  }
  finishRecharge() {
    this.props.closePop('isShowGetGoldResult', false);
    return false;
  }
  addCommas(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  formatGold(rechargeNum, rechargeRewardNum) {
    const result = {};
    result.rechargeNum = rechargeNum / this.props.rechargeRadio;
    result.moneyStr = this.addCommas(rechargeNum + rechargeRewardNum);
    return result;
  }
  failedThenRecharge() {
    this.props.closePop('isShowGetGoldResult', false);
    this.props.getWXRechargePara(this.props.subServerTime);
  }
  render() {
    const {
      isShow,
      rechargeResultStatus,
      rechargeNum,
      rechargeRewardNum,
      closePop
    } = this.props;
    const classname = classnames({
      'pop-layer': true,
      'pop-get-gold': true,
      'pop-show': isShow
    });
    const result = this.formatGold(rechargeNum, rechargeRewardNum);
    return (
      <div className={classname}>
        <section
          className="pop-mask"
          onClick={() => {
            closePop('isShowGetGoldResult', false);
          }}
        />
        <section className="pop-body pop-body-get-gold get-gold-result">
          <div
            className="close-btn"
            onClick={() => {
              closePop('isShowGetGoldResult', false);
            }}
          />
          <div className="hd-get-gold" />
          <div className="bd-wrp bd-result-wrp">
            <section className="bd-wrp-inner">
              <div className="bd-bg">
                {rechargeResultStatus === 1
                  ? <div className="succ">
                      <section className="result-hd ">
                        <p className="p1">已获{result.moneyStr}欢乐豆</p>
                        <p className="p2">钻石已兑换印花，并获得欢乐豆</p>
                      </section>
                      <section
                        className="recharge-btn"
                        onClick={this.finishRecharge}
                      >
                        完成
                      </section>
                      <section className="result-ft-wrp">
                        <div className="result-ft">
                          <p className="p1">欢乐值+{result.rechargeNum}</p>
                          <p className="p2">印花已提升欢乐值</p>
                        </div>
                      </section>
                    </div>
                  : rechargeResultStatus === -1
                      ? <div className="fail">
                          <section className="result-hd">
                            <p className="p1">支付似乎失败啦</p>
                            <p className="p2">请稍后以获取欢乐豆明细为准</p>
                          </section>
                          <section
                            className="recharge-btn"
                            onClick={this.failedThenRecharge}
                          >
                            再试一次
                          </section>
                          <section
                            className="return-btn"
                            onClick={this.finishRecharge}
                          >
                            退出支付
                          </section>
                          <section className="result-ft-wrp">
                            <p className="p3">
                              如果在充值过程中遇到了问题，可以到[迅雷小游戏]公众号告诉我们
                            </p>
                          </section>
                        </div>
                      : <div className="fail">
                          <section className="result-hd">
                            <p className="p1">咦~你好像取消了支付</p>
                            <p className="p2">请以稍后获取欢乐豆明细为准</p>
                          </section>
                          <section
                            className="recharge-btn"
                            onClick={this.failedThenRecharge}
                          >
                            再试一次
                          </section>
                          <section
                            className="return-btn"
                            onClick={this.finishRecharge}
                          >
                            退出支付
                          </section>
                          <section className="result-ft-wrp">
                            <p className="p3">
                              如果在充值过程中遇到了问题，可以到[迅雷小游戏]公众号告诉我们
                            </p>
                          </section>
                        </div>}
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default PopGetGoldResult;
