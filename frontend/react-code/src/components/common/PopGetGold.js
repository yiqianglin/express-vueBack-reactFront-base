import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

@inject((stores) => {
  const props = {
    isShow: stores.rechargeStore.popStatus.get('isShowGetGold'),
    isShortBalance: stores.rechargeStore.isShortBalance,
    myGoldNum: stores.userStore.userScore,
    needGoldNum: stores.rechargeStore.needGoldNum,
    subscribeScore: stores.systemStore.subscribeScore,
    firstRechargeCouponDays: stores.systemStore.firstRechargeCouponDays,
    rechargeSelectOphion: stores.rechargeStore.rechargeSelectOphion,
    isRecharge: stores.userStore.isRecharge,
    rechargeRewardScore: stores.rechargeStore.rechargeRewardScore,
    closePop: stores.rechargeStore.closePop.bind(stores.rechargeStore),
    showPopRechargeDetail: stores.rechargeStore.showPopRechargeDetail.bind(
      stores.rechargeStore
    ),
    togglePop: stores.systemStore.togglePop.bind(stores.systemStore)
  };
  return props;
})
@observer
class PopGetGold extends Component {
  constructor() {
    super();
    this.popRechargeDetail = this.popRechargeDetail.bind(this);
  }
  popRechargeDetail(rechargeNum, rechargeRewardNum) {
    return () => {
      this.props.showPopRechargeDetail(rechargeNum, rechargeRewardNum);
    };
  }
  render() {
    const {
      isShow,
      isShortBalance,
      myGoldNum,
      needGoldNum,
      rechargeSelectOphion,
      subscribeScore,
      firstRechargeCouponDays,
      isRecharge,
      rechargeRewardScore,
      closePop,
      togglePop
    } = this.props;
    const classname = classnames({
      'pop-layer': true,
      'pop-get-gold': true,
      'pop-show': isShow
    });
    const closeClassName = classnames({
      'close-btn': true,
      'short-close-btn': isShortBalance
    });
    return (
      <div className={classname}>
        <section
          className="pop-mask"
          onTouchEnd={() => {
            closePop('isShowGetGold', false);
          }}
        />
        <section className="pop-body pop-body-get-gold get-gold">
          <div
            className={closeClassName}
            onClick={() => {
              closePop('isShowGetGold', false);
            }}
          />
          {isShortBalance
            ? <div className="hd-short-balance" />
            : <div className="hd-get-gold" />}
          <div className="bd-wrp">
            <section className="bd-wrp-inner">
              <div className="bd-bg">
                <p className="bd-hd-title">
                  我的欢乐豆:
                  {' '}
                  {myGoldNum || 0}
                  {' '}
                  {isShortBalance
                    ? <span className="need-gold">
                        仍需欢乐豆: {needGoldNum - (myGoldNum || 0)}
                      </span>
                    : ''}
                  <a
                    className="gold-detail-anker"
                    href={`/game-web-updown/game/guess/goldRecord.htm?gameSource=${_gamesource_}`}
                  >
                    欢乐豆明细
                  </a>
                </p>
                {!isRecharge
                  ? <section className="bd-recharge-list">
                      <div className="inner">
                        限时福利：首次充值送{firstRechargeCouponDays}天迅雷会员
                      </div>
                      <div className="shine" />
                    </section>
                  : ''}
                {weixinSubscribe === '0' && subscribeGiftStatus === '0'
                  ? <ul className="list-box gift">
                      <li className="list-item list-item1 gold-0" />
                      <li className="list-item list-item2">
                        <span className="num">{subscribeScore}</span>欢乐豆
                      </li>
                      <li className="list-item list-item3">
                        <div
                          className="get-gold-btn"
                          onClick={() => {
                            if (_ENV_ !== 'DEV') {
                              TDGA.onEvent('弹出关注弹窗');
                            }
                            closePop('isShowGetGold', false);
                            togglePop('isShowWeixinSubscribe', true);
                          }}
                        >
                          免费获取
                        </div>
                      </li>
                    </ul>
                  : ''}
                {rechargeSelectOphion.map((item, index) => (
                  <ul className="list-box" key={`rechargeOpthion${item}`}>
                    <li className={`list-item list-item1 gold-${index}`} />
                    {rechargeRewardScore[index] > 0
                      ? <li className="list-item list-item2 line-more">
                          <p className="line1">
                            <span className="num">
                              {item
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </span>
                            欢乐豆
                          </p>
                          <p className="line2">
                            +
                            {rechargeRewardScore[index]
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            欢乐豆
                          </p>
                        </li>
                      : <li className="list-item list-item2">
                          <span className="num">
                            {item
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          </span>
                          欢乐豆
                        </li>}
                    <li className="list-item list-item3">
                      <div
                        className="get-gold-btn"
                        onClick={this.popRechargeDetail(
                          item,
                          rechargeRewardScore[index]
                        )}
                      >
                        获取
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default PopGetGold;
