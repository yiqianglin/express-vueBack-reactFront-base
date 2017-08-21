/**
 * Created by cc on 2017/4/17.
 */
import { observable, action, autorun } from 'mobx';
import { request, getSign, requestOfJson } from 'utils/utilsFunc';
import { BaseSystemStore } from '../common/SystemStore';
import { showToast } from './actionFunc';
import { asyncFunc } from './testData';
import rechargeStore from './RechargeStore';

/**
 * SystemStore数据类
 * @example
 * const systemStore = new SystemStore();
 *
 */
class SystemStore extends BaseSystemStore {
  /**
   * 商品兑换弹窗
   * @type {ObservableMap}
   *
   */
  @observable productPopStatus;
  /**
   * 系统弹窗名及显示隐藏状态集合
   * @type {ObservableMap}
   */
  @observable popStatus;
  /**
   * 广告banner
   */
  @observable bannerList;
  /**
   * 中奖广播数据
   * @type {boolean}
   */
  @observable marqueeData;
  /**
   * 皮肤游戏服务区列表
   * @type {list}
   */
  @observable skinServerList;
  /**
   * banner url 信息
   * @type {array}
   */
  @observable banner;

  /**
   * banner url 信息
   * @type {ObservableMap}
   */
  @observable playerNumInfo;
  @observable registerNum;
  @observable firstLogin;
  /**
   * 创建SystemStore实例
   */
  constructor() {
    super();
    this.popStatus = observable.map({
      isShowExchangeConfirm: false,
      isShowExchangeSuccess: false,
      isShowSetAddress: false,
      isShowQQqunTips: false,
      isShowFirstLogin: false
    });
    this.bannerList = [];
    this.marqueeStatus = observable.map({
      pageSize: 30,
      data: []
    });
    this.skinServerList = null;
    this.banner = [];
    this.playerNumInfo = observable.map({
      updownUserNum: 0,
      smasheggUserNum: 0,
      hitmeUserNum: 0,
      crazybetUserNum: 0,
      updownLinkUrl: '',
      smasheggLinkUrl: '',
      hitmeLinkUrl: '',
      crazybetLinkUrl: '',
      mallLinkUrl: '',
      lotteryLinkUrl: '',
      updownImage: '',
      smasheggImage: '',
      hitmeImage: '',
      crazybetImage: '',
      moreImage: '',
      centerImage: ''
    });
    this.registerNum = 888;
    this.firstLogin = observable.map({
      pause: true,
      moment: 0
    });
  }
  /**
   * 获取广告banner列表信息
   * @example
   * getBannerList()
   */
  async getBannerList() {
    const params = {
      appType: 2,
      st: +new Date() + this.subServerTime
    };
    const data = await request('MallBannerList', params);
    if (data.code === '200') {
      this.setBannerList(data.banner);
    }
  }

  /**
   * 设置广告banner列表信息
   *
   * @param {Object} data 签到数据
   */
  @action
  setBannerList(data) {
    this.bannerList = data;
  }

  @action
  setRechargeFlag(flag) {
    this.isRecharge = flag;
  }

  /**
   * 获取中奖广播数据
   */
  async getMarqueeData() {
    const params = {
      pageSize: this.marqueeStatus.get('pageSize'),
      st: +new Date() + this.subServerTime
    };
    try {
      const data = await request('MallGlobalExchangeRecord', params);
      // const data = await asyncFunc('GetUserInfo');
      if (data.code === '200') {
        this.setMarqueeData(data.list);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 设置中奖广播数据
   */
  @action
  setMarqueeData(data) {
    this.marqueeStatus.set('data', data);
  }

  /**
   * 设置弹窗状态
   * @example
   * togglePop('isShowSimuIntro',true)
   *
   * @param {string} popName 弹窗名
   * @param {boolean} isShow 弹窗状态
   */
  @action
  togglePop(popName, isShow) {
    this.popStatus.set(popName, isShow);
  }

  /**
   * 获取皮肤游戏服务区列表
   * @example
   * getSkinServerList()
   */
  async getSkinServerList() {
    const params = {
      st: +new Date() + this.subServerTime
    };
    const data = await request('MallProductSkinServerList', params);
    if (data.code === '200') {
      this.setSkinServerList(data.list);
      if (data.list.length === 0) {
        showToast('区服列表为空，请稍后再试');
      }
    }
  }

  /**
   * 设置皮肤游戏服务区列表
   */
  @action
  setSkinServerList(data) {
    this.skinServerList = data;
  }

  /**
 * 显示加载层
 */
  @action
  loadIndex() {
    this.resetComplete();
    this.getIndex();
  }

  @action
  getNecessaryInfo() {
    if (!this.isLoadingComplete) {
      setTimeout(() => {
        this.loadingComplete(40);
        setTimeout(() => {
          this.loadingComplete(30);
        }, 120);
      }, 120);
    }
  }

  /**
   * 设置首页信息
   * @example
   * setIndexInfo('isShowSimuIntro',true)
   *
   * @param {object} data 首页接口数据
   */
  @action
  setIndexInfo(data) {
    this.banner = data.banner;
    this.playerNumInfo.set('updownUserNum', data.updownUserNum);
    this.playerNumInfo.set('smasheggUserNum', data.smasheggUserNum);
    this.playerNumInfo.set('hitmeUserNum', data.hitmeUserNum);
    this.playerNumInfo.set('crazybetUserNum', data.crazybetUserNum);
    this.playerNumInfo.set('updownLinkUrl', data.updownLinkUrl);
    this.playerNumInfo.set('smasheggLinkUrl', data.smasheggLinkUrl);
    this.playerNumInfo.set('hitmeLinkUrl', data.hitmeLinkUrl);
    this.playerNumInfo.set('crazybetLinkUrl', data.crazybetLinkUrl);
    this.playerNumInfo.set('mallLinkUrl', data.mallLinkUrl);
    this.playerNumInfo.set('lotteryLinkUrl', data.lotteryLinkUrl);
    this.playerNumInfo.set('updownImage', data.updownImage);
    this.playerNumInfo.set('smasheggImage', data.smasheggImage);
    this.playerNumInfo.set('hitmeImage', data.hitmeImage);
    this.playerNumInfo.set('crazybetImage', data.crazybetImage);
    this.playerNumInfo.set('moreImage', data.moreImage);
    this.playerNumInfo.set('centerImage', data.centerImage);
  }

  /**
   * 获取首页信息
   * @example
   * getIndex()
   */
  async getIndex() {
    const params = {
      st: +new Date() + this.subServerTime
    };
    let data;
    if (_ENV_ === 'DEV') {
      data = await asyncFunc('Index');
    } else {
      data = await request('Index', params);
    }
    if (data.code === '200') {
      this.setIndexInfo(data);
    } else {
      this.showToast(data.msg);
    }
    this.getNecessaryInfo();
  }

  /**
   * 设置系统配置
   * @example
   * updateSystemConfig(data)
   *
   * @param {object} data 系统配置数据
   */
  @action
  setSystemConfig(data) {
    super.setSystemConfig(data);
    this.registerNum = data.register_score;
    rechargeStore.setRechargeInfo(data);
  }
  /**
   * 停止首次登录 豆子动画
   * @example
   * stopAnimateBeans()
   */
  @action
  stopAnimateBeans() {
    this.firstLogin.set('pause', true);
    this.firstLogin.set('moment', 0);
  }

  /**
   * 开始首次登录 豆子动画
   * @example
   * stopAnimateBeans()
   */
  @action
  startAnimateBeans() {
    this.firstLogin.set('pause', false);
    this.firstLogin.set('moment', 0);
    setTimeout(() => {
      this.firstLogin.set('moment', null);
    }, 100);
  }
}

const systemStore = new SystemStore({});
export default systemStore;
export { SystemStore };
