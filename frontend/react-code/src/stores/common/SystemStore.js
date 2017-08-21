import { observable, action } from 'mobx';
import { request } from 'utils/utilsFunc';

/**
 * BaseSystemStore数据类
 * @example
 * const systemStore = new BaseSystemStore();
 *
 */
class BaseSystemStore {
  /**
   * 服务器时间差值
   * @type {number}
   */
  @observable subServerTime;
  /**
   * 获取服务器时间成功状态
   * @type {boolean}
   */
  @observable loadSuccess;
  /**
   * 初始化完成标志
   * @type {boolean}
   */
  @observable isLoadingComplete;
  /**
   * 初始化进度
   * @type {number}
   */
  @observable loadingProgress;
  /**
   * toast状态
   * @type {boolean}
   */
  @observable toastStatus;
  /**
   * toast提示
   * @type {ObservableMap}
   * @property {boolean} errorTip.get('sentence') toast提示
   * @property {boolean} errorTip.get('icon') toast图标
   */
  @observable errorTip;
  /**
   * 签到积分
   * @type {array}
   */
  @observable signScoreRule;
  /**
   * 关注赠送金额
   * @type {number}
   */
  @observable subscribeScore;
  @observable firstRechargeCouponDays;

  /**
   * 创建SystemStore实例
   */
  constructor() {
    this.subServerTime = 0;
    this.loadSuccess = false;
    this.isLoadingComplete = false;
    this.loadingProgress = 0;
    // this.systemConfig = null;
    this.toastStatus = false;
    this.errorTip = observable.map({
      sentence: '',
      icon: ''
    });
    this.signScoreRule = ',,,,,';
    this.subscribeScore = 0;
    this.firstRechargeCouponDays = 15;
  }

  /**
   * 异步获取服务器时间
   * @example
   * getServerTime()
   */
  async getServerTime() {
    const data = await request('GetServerTime');
    if (data.code === '200') {
      this.setSubServerTime(data.time);
    }
  }

  /**
   * 设置服务器时间差值
   * @example
   * const time = +new Date()
   * setSubServerTime(time)
   *
   * @param {number} time 服务器时间
   */
  @action setSubServerTime(time) {
    this.subServerTime = time - new Date();
    this.loadSuccess = true;
    this.loadSuccessCallback();
    this.getSystemConfig();
  }

  /**
   * 异步获取系统配置
   * @example
   * getSystemConfig()
   */
  async getSystemConfig() {
    const data = await request('SystemConfig', {
      appType: 2,
      st: +new Date() + this.subServerTime
    });
    if (data.code === '200') {
      this.setSystemConfig(data);
    }
  }

  /**
   * 设置系统配置
   * @example
   * setSystemConfig(data)
   *
   * @param {object} data 系统配置数据
   */
  @action setSystemConfig(data) {
    // this.systemConfig = data;
    this.subscribeScore = data.subscribeScore;
    this.signScoreRule = data.signin_gift_rules;
    this.firstRechargeCouponDays = data.firstRechargeCouponDays;
  }

  /**
   * 显示toast
   * @example
   * showToast('success','succ')
   *
   * @param {string} tipText toast提示
   * @param {string} icon toast图标
   */
  @action showToast(tipText, icon) {
    tipText && this.errorTip.set('sentence', tipText);
    icon && this.errorTip.set('icon', icon);
    this.toastStatus = true;
  }

  /**
   * 隐藏toast
   * @example
   * hideToast()
   */
  @action hideToast() {
    this.toastStatus = false;
  }

  /**
   * 设置加载完成度
   * @example
   * loadingComplete(10)
   *
   * @param {number} percent 进度百分比
   */
  @action loadingComplete(percent) {
    const curPercent = this.loadingProgress;
    const newPercent = curPercent + percent > 100 ? 100 : curPercent + percent;
    this.loadingProgress = newPercent;
    if (newPercent === 100) {
      setTimeout(() => {
        this.isLoadingComplete = true;
        this.loadingCallback();
      }, 200);
    }
  }

  /**
   * 进度条加载成功回调
   */
  @action loadingCallback() {
    console.log('加载成功');
  }

  @action loadSuccessCallback() {
    console.log('获取服务器时间成功');
  }

  /**
   * 重置加载完成度
   * @example
   * resetComplete()
   */
  @action resetComplete() {
    this.loadingProgress = 30;
    this.isLoadingComplete = false;
  }
}

const systemStore = new BaseSystemStore();

/** SystemStore实例 */
export default systemStore;
export { BaseSystemStore };
