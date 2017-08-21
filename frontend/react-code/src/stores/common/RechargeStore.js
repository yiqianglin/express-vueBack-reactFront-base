import { observable, action } from 'mobx';
import { request, getSign } from 'utils/utilsFunc';

/**
 * BaseRechargeStore数据类
 * @example
 * const rechargeStore = new BaseRechargeStore();
 *
 */
class BaseRechargeStore {
  /**
   * 充值金额
   * @type {number}
   */
  @observable rechargeNum;
  /**
   * 充值赠送金额
   * @type {number}
   */
  @observable rechargeRewardNum;
  /**
   * 充值结果状态
   * @type {boolean}
   */
  @observable rechargeResultStatus;
  /**
   * 充值比例
   * @type {number}
   */
  @observable rechargeRadio;
  /**
   * 充值选项
   * @type {array}
   */
  @observable rechargeSelectOphion;
  /**
   * 充值赠送积分选项
   * @type {array}
   */
  @observable rechargeRewardScore;
  /**
   * 充值弹窗展示状态
   * @type {boolean}
   */
  @observable isShortBalance;
  /**
   * 订单号
   * @type {string}
   */
  @observable requestNo;
  @observable mwebUrl;
  /**
   * 创建SystemStore实例
   */
  constructor() {
    this.rechargeNum = 0;
    this.needGoldNum = 0;
    this.rechargeRewardNum = 0;
    this.rechargeResultStatus = 0; // 充值结果状态， 0 ==> 取消， -1 ==> 失败 , 1 ===> 成功
    this.rechargeRadio = 1000;
    this.rechargeSelectOphion = [2000, 10000, 50000, 100000];
    this.rechargeRewardScore = [0, 100, 700, 1500];
    this.isShortBalance = false;
    this.requestNo = '';
    this.popStatus = observable.map({
      isShowGetGold: false,
      isShowGetGoldDetail: false,
      isShowGetGoldResult: false,
      isShowProtocol: false
    });
    this.mwebUrl = '';
  }

  @action setRechargeInfo(data) {
    this.rechargeSelectOphion = data.rechargeScoreItem.map(
      item => item.rechargeScore
    );
    this.rechargeRewardScore = data.rechargeScoreItem.map(
      item => item.rewardScore
    );
    this.rechargeRadio = data.scoreConvertToRMBRate || 1000;
    this.registerNum = data.register_score;
  }

  @action showProtocol() {
    this.popStatus.set('isShowProtocol', true);
  }

  /**
   * 显示充值
   * @example
   * showPopRecharge(false)
   *
   * @param {boolean} isShortBalance 充值是否展示余额标志
   */
  @action showPopRecharge(isShortBalance, needGoldNum = 0) {
    this.popStatus.set('isShowGetGold', true);
    this.isShortBalance = isShortBalance;
    this.needGoldNum = needGoldNum;
  }

  /**
   * 关闭充值弹窗
   * @example
   * closePop('isShowSimuIntro')
   *
   * @param {string} popName 弹窗名
   */
  @action closePop(popName) {
    this.popStatus.set(popName);
  }

  /**
   * 显示充值详情弹窗
   * @example
   * showPopRechargeDetail(100)
   *
   * @param {number} rechargeNum 充值金额
   */
  @action showPopRechargeDetail(rechargeNum, rechargeRewardNum) {
    this.popStatus.set('isShowGetGold', false);
    this.popStatus.set('isShowGetGoldDetail', true);
    this.rechargeNum = rechargeNum;
    this.rechargeRewardNum = rechargeRewardNum;
  }

  /**
   * 显示充值中 [充值结果未知前]
   * @example
   * showPopRecharging(false)
   */
  @action showPopRecharging() {
    if (!this.popStatus.get('isShowGetGoldResult')) {
      this.popStatus.set('isShowGetGoldRecharging', true);
    }
  }

  /**
   * 显示充值结果
   * @example
   * showPopRechargeResult(0)
   *
   * @param {number} rechargeResultStatus 充值是否成功标志
   * 0 ==> 取消， -1 ==> 失败 , 1 ===> 成功
   */
  @action showPopRechargeResult(rechargeResultStatus) {
    this.popStatus.set('isShowGetGoldRecharging', false);
    this.popStatus.set('isShowGetGoldResult', true);
    this.rechargeResultStatus = rechargeResultStatus;
  }

  /**
   * 设置微信充值请求参数参数
   * @example
   * setRechargeRequestPara()
   *
   */
  @action setRechargeRequestPara(data) {
    this.requestNo = data.requestNo;
    this.mwebUrl = data.mwebUrl || '';
  }

  /**
   * 获取充值参数
   * @example
   * getWXRechargePara()
   */
  async getWXRechargePara(subServerTime, score, tradeType) {
    console.log(_gamesource_);
    const params = {
      appType: 2,
      gameSource: _gamesource_ === 'guessGame'
        ? 2
        : _gamesource_ === 'eggGame'
          ? 3
          : _gamesource_ === 'shootGame' ? 4 : 999,
      score: this.rechargeNum || score,
      st: +new Date() + subServerTime
    };
    if (tradeType) {
      params.tradeType = tradeType;
    }
    const data = await request('WxRechargeScore', params);
    if (data.code === '200') {
      this.setRechargeRequestPara(data);
      // this.showPopRecharging();
      this.payFun(data);
    } else {
      this.showPopRechargeResult(-1);
    }
  }

  /**
   * 获取充值参数
   * @example
   * getWXRechargePara()
   */
  async getWXRechargeStatus(subServerTime) {
    const params = {
      appType: 2,
      requestNo: this.requestNo,
      st: +new Date() + subServerTime
    };
    const data = await request('WxRechargeQuery', params);
    if (data.code === '200') {
      this.setRechargeRequestPara(data);
      // rechargeResultStatus 充值是否成功标志
      //  0 ==> 取消， -1 ==> 失败 , 1 ===> 成功
      if (data.orderStatus === 20) {
        // 成功
        this.paySuccess();
      } else if (
        data.orderStatus === 30 ||
        data.orderStatus === 1 ||
        data.orderStatus === 40
      ) {
        // 撤销
        this.showPopRechargeResult(0);
      } else if (data.orderStatus === 60) {
        // 失败
        this.showPopRechargeResult(-1);
      }
    }
  }

  /**
   * 微信支付函数
   * @example payFun(params)
   *
   * @param {object} params 请求参数
   */
  @action payFun(params) {
    wx.chooseWXPay({
      appId: params.appId,
      timestamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.pkg,
      signType: params.signType,
      paySign: params.paySign,
      success: (res) => {
        this.paySuccess();
      },
      fali: (res) => {
        this.showPopRechargeResult(-1);
      },
      cancel: (res) => {
        this.showPopRechargeResult(0);
      }
    });
  }

  @action paySuccess() {
    this.showPopRechargeResult(1);
  }
}

const rechargeStore = new BaseRechargeStore();

/** SystemStore实例 */
export default rechargeStore;
export { BaseRechargeStore };
