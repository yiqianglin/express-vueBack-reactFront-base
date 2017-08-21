import { observable, action } from 'mobx';
import { request } from 'utils/utilsFunc';

/**
 * UserStore数据类
 * @example
 * const userStore = new UserStore();
 */
class BaseUserStore {
  /**
   * 用户信息
   * @type {Object}
   */
  @observable userInfo;
  /**
   * 用户积分
   * @type {number}
   */
  @observable userScore;
  /**
   * 弹窗名及显示隐藏状态集合
   * @type {ObservableMap}
   */
  @observable popStatus;
  /**
   * 签到积分
   * @type {number}
   */
  @observable signScore;
  /**
   * 当日是否已经走完了签到(直接关闭或签到成功)
   * @type {boolean}
   */
  @observable isFinishSign;
  @observable isRecharge;

  /**
   * 创建UserStore实例
   */
  constructor() {
    this.userInfo = null;
    this.userScore = 0;
    this.signScore = 0;
    this.popStatus = observable.map({
      isShowSign: false,
      isShowSignSucc: false,
      isShowLotteryGuide: false
    });
    this.isFinishSign = false;
    this.isRecharge = true;
  }

  async userBindChannelId(channelId, subServerTime) {
    const params = {
      appType: 2,
      channelId,
      st: +new Date() + subServerTime
    };
    const data = await request('UserChannelBind', params);
  }

  /**
   * 获取用户信息
   * @example
   * getUserInfo()
   */
  async getUserInfo(subServerTime = 0) {
    const params = {
      appType: 2,
      st: +new Date() + subServerTime
    };
    const data = await request('UserInfo', params);
    if (data.code === '200') {
      this.setUserInfo(data);
    }
    if (_ENV_ === 'DEV') {
      this.setUserInfo({
        score: 1000 - Math.floor(Math.random() * 100),
        totalRechargeAmount: 0,
        signinStatus: false,
        continuousNum: 1
      });
    }
  }

  /**
   * 设置用户信息
   * @example
   * setUserInfo(data)
   *
   * @param {object} data 接口数据
   */
  @action setUserInfo(data) {
    const updateScore = data && data.score ? data.score - this.userScore : 0;
    this.userInfo = data;
    this.updateUserScore(updateScore);
    this.handleSign(data.signinStatus);
    this.isRecharge = data.totalRechargeAmount > 0;
  }

  /**
   * 设置用户今天是否签到完
   * @example
   * setFinshSignStatus(boolVal)
   *
   * @param {boolean} boolVal 布尔值
   */
  @action setFinshSignStatus(boolVal) {
    this.isFinishSign = boolVal;
  }

  /**
   * 更新用户积分
   * @example
   * updateUserScore(type, score)
   *
   * @param {number} type 更新类型(1为增加，-1为减少)
   * @param {number} score 更新积分
   */
  @action updateUserScore(score) {
    this.userScore = this.userScore + score;
  }

  /**
   * 设置弹窗状态
   * @example
   * togglePop('isShowSimuIntro',true)
   *
   * @param {string} popName 弹窗名
   * @param {boolean} isShow 弹窗状态
   */
  @action togglePop(popName, isShow) {
    this.popStatus.set(popName, isShow);
  }

  /**
   * 用户签到
   * @example
   * userSignin()
   */
  async userSignin(subServerTime) {
    const params = {
      appType: 2,
      st: +new Date() + subServerTime
    };
    const data = await request('UserSignin', params);
    if (data.code === '200') {
      this.signSuccess(data.data, subServerTime);
    }
  }

  @action handleSign(signinStatus) {}
  /**
   * 签到成功
   * @example
   * signSuccess(score)
   *
   * @param {number} score
   */
  @action signSuccess(score, subServerTime) {
    if (_ENV_ !== 'DEV') {
      TDGA.onReward(score, '签到奖励');
    }
    this.signScore = score;
    this.togglePop('isShowSign', false);
    this.togglePop('isShowSignSucc', true);
  }
}

const userStore = new BaseUserStore();

/* UserStore实例 */
export default userStore;
export { BaseUserStore };
