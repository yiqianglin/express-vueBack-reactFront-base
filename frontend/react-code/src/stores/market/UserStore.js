/**
 * Created by cc on 2017/4/17.
 */
import { observable, computed, action, autorun } from 'mobx';
import { request } from 'utils/utilsFunc';
import { showToast, togglePop } from './actionFunc';
import { systemStore, productListStore } from './index';
import { BaseUserStore } from '../common/UserStore';

class User extends BaseUserStore {
  /**
   * 用户积分记录
   * type {Object}
   */
  @observable scoreLogger;
  /**
   * 用户兑换记录
   * type {Object}
   */
  @observable exchangeRecord;
  /**
   * 用户兑换详情
   * type {Object}
   */
  @observable exchangeRecordInfo;
  /**
   * 用户游戏账户信息
   * type {Object}
   */
  @observable userInfoWZRY;

  constructor() {
    super();
    this.scoreLogger = observable.map({
      pageIndex: 1,
      pageSize: 10,
      type: 0,
      scoreLoggerList: [],
      scoreLoggerListCache: []
    });
    this.exchangeRecord = observable.map({
      pageIndex: 1,
      pageSize: 10,
      exchangeRecordList: [],
      exchangeRecordListCache: []
    });
    this.exchangeRecordInfo = null;
    this.userInfoWZRY = null;
  }

  /**
   * 获取用户积分记录
   *
   */
  async getScoreLogger() {
    const params = {
      pageIndex: this.scoreLogger.get('pageIndex'),
      pageSize: this.scoreLogger.get('pageSize'),
      st: +new Date() + systemStore.subServerTime,
      type: this.scoreLogger.get('type')
    };
    try {
      const data = await request('ScoreLoggerList', params);
      if (data.code === '200') {
        this.setScoreLoggerList(data.result);
      } else {
        showToast(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 设置用户积分记录
   * params product为Product的实例
   */
  @action
  setScoreLoggerList(data) {
    this.scoreLogger.set('scoreLoggerList', data);
  }

  /**
   * 兑换商品
   *
   */
  async exchangeProduct(productId) {
    const params = {
      productId,
      st: +new Date() + systemStore.subServerTime
    };
    const data = await request('MallExchangeProduct', params);
    // if (_ENV_ === 'DEV') {
    //   data = { code: '200', msg: '产品兑换成功', data: '20170967' };
    // }
    if (data.code === '200') {
      this.getUserInfo(); // 与后台同步积分
      productListStore.getProductList(); // 重新拉取商品，以防商品数量不足
      productListStore.orderId = data.data; // productList设置orderId
      return data;
    }
    showToast(data.msg);
    return data;
  }

  /**
   * 获取兑换记录列表
   *
   */
  async getExchangeRecord() {
    const params = {
      pageIndex: this.exchangeRecord.get('pageIndex'),
      pageSize: this.exchangeRecord.get('pageSize'),
      st: +new Date() + systemStore.subServerTime
    };
    try {
      let data = await request('MallExchangeRecord', params);
      if (_ENV_ === 'DEV') {
        data = {
          code: '200',
          msg: '获取兑换记录列表成功',
          pageIndex: 6,
          list: [
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '1天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 1,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1,
              createSource: 1
            },
            {
              productId: 1,
              orderId: `2017${Math.floor(Math.random() * 10000)}`,
              productName: '15天迅雷会员',
              exchangeTime: '2017-07-06 11:00:00',
              orderStatus: 0,
              productPicUrl:
                'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/icon-product-01.png',
              receivedStatus: 0,
              spendScore: 1500,
              createSource: 2
            }
          ]
        };
      }
      if (data.code === '200') {
        this.setExchangeRecordList(data.list);
        return data;
      }
      showToast(data.msg);
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * 设置兑换记录列表
   *
   */
  @action
  setExchangeRecordList(data) {
    this.exchangeRecord.set('exchangeRecordList', data);
    this.setExchangeRecordCache(data);
  }

  /**
   * 设置兑换记录缓存列表
   *
   */
  @action
  setExchangeRecordCache(data) {
    let temp = [];
    const cacheList = this.exchangeRecord.get('exchangeRecordListCache').toJS();
    if (cacheList.length === 0) {
      temp = [].concat(data);
    } else {
      for (const i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
          let isRepeat = false;
          for (const j in cacheList) {
            if (data[i].orderId === cacheList[j].orderId) {
              isRepeat = true;
              break;
            }
          }
          if (!isRepeat) {
            temp.push(data[i]);
          }
        }
      }
    }
    const result = this.exchangeRecord.get('exchangeRecordListCache').concat(temp);
    this.exchangeRecord.set('exchangeRecordListCache', result);
  }

  /**
   * 清除兑换记录列表
   *
   */
  @action
  cleanExchangeRecordData() {
    this.exchangeRecord.set('pageIndex', 1);
    this.exchangeRecord.set('type', 0);
    this.exchangeRecord.set('exchangeRecordList', []);
    this.exchangeRecord.set('exchangeRecordListCache', []);
  }

  /**
   * 获取兑换记录详情
   *
   */
  async getExchangeRecordInfo(orderId) {
    const params = {
      orderId,
      st: +new Date() + systemStore.subServerTime
    };
    try {
      let data = await request('MallExchangeRecordInfo', params);
      if (_ENV_ === 'DEV') {
        // 激活码已经发放
        /*        data = {
          code: '200',
          msg: '获取兑换记录详情成功',
          productId: 5,
          orderId: 20170752,
          productName: '180天迅雷会员',
          exchangeTime: '2017-06-06 10:09:50',
          orderStatus: 1,
          productPicUrl: 'http://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/xl_vip.png',
          receivedStatus: 0,
          receiver: '',
          receivedPhone: '',
          receivedProvince: '',
          receivedCity: '',
          receivedAddress: '',
          trackingCompany: '',
          trackingNumber: '',
          productDesc: '1.长按上方迅雷激活码，并复制<br>2.前往迅雷会员官方PC官网\r\n( <a target=\'_blank\' rel=\'nofollow\' href=\'http://act.vip.xunlei.com/xlhyk/\'>http://act.vip.xunlei.com/xlhyk/</a> )粘贴使用',
          couponCode: 'asdfasdfasdeed84',
          createSource: 1,
          spendScore: 106250,
          couponType: 'xunlei'
        };*/
        // 京东卡，卡密类型，已经发货
        // 实物，没填写收货信息
        /*        data = {
          code: '200',
          msg: '获取兑换记录详情成功',
          productId: 6,
          orderId: 20170643,
          productName: 'iPhone7 中国红 32G',
          exchangeTime: '2017-06-06 09:41:31',
          orderStatus: 1,
          productPicUrl: 'http://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/iphone7.png',
          receivedStatus: 1,
          receiver: '',
          receivedPhone: '',
          receivedProvince: '',
          receivedCity: '',
          receivedAddress: '',
          trackingCompany: '',
          trackingNumber: '',
          productDesc: '',
          couponCode: '',
          createSource: 1,
          spendScore: 612500,
          couponType: ''
        };*/
        // 实物，已经填写收货信息
        /*        data = {
          code: '200',
          msg: '获取兑换记录详情成功',
          productId: 6,
          orderId: 20170643,
          productName: 'iPhone7 中国红 32G',
          exchangeTime: '2017-06-06 09:41:31',
          orderStatus: 1,
          productPicUrl: 'http://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/iphone7.png',
          receivedStatus: 20,
          receiver: '林小强',
          receivedPhone: '18620257044',
          receivedProvince: '440000',
          receivedCity: '440300',
          receivedAddress: '广东省深圳市，南山区',
          trackingCompany: '',
          trackingNumber: '',
          productDesc: '',
          couponCode: '',
          createSource: 1,
          spendScore: 612500,
          couponType: ''
        };*/
        // 皮肤，没有填写个人游戏信息
        data = {
          code: '200',
          msg: '获取兑换记录详情成功',
          productId: 18,
          orderId: 20171047,
          productName: '王者荣耀皮肤',
          exchangeTime: '2017-07-11 17:07:30',
          orderStatus: 0,
          productPicUrl:
            'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/gift-zqb.png',
          receivedStatus: 1,
          receiver: '',
          receivedPhone: '',
          receivedProvince: '',
          receivedCity: '',
          receivedAddress: '',
          trackingCompany: '',
          trackingNumber: '',
          productDesc: '',
          couponCode: '',
          createSource: 1,
          spendScore: 28000,
          couponType: 'skin',
          skinFlg: 1,
          selectSkinInfo: '',
          qq: '',
          weixin: '',
          serverType: 0,
          roleName: '',
          skinList: [
            {
              skinId: 5,
              type: 1,
              skinInfo: '李白套装--大概15个工作日内送达',
              mark: ''
            },
            {
              skinId: 6,
              type: 1,
              skinInfo: '关羽套装',
              mark: ''
            }
          ]
        };
        // 皮肤，已经填写个人游戏信息
        data = {
          code: '200',
          msg: '获取兑换记录详情成功',
          productId: 18,
          orderId: 20171047,
          productName: '王者荣耀皮肤',
          exchangeTime: '2017-07-11 17:07:30',
          orderStatus: 0,
          productPicUrl:
            'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/gift-zqb.png',
          receivedStatus: 0,
          receiver: '',
          receivedPhone: '',
          receivedProvince: '',
          receivedCity: '',
          receivedAddress: '',
          trackingCompany: '',
          trackingNumber: '',
          productDesc: '',
          couponCode: '',
          createSource: 1,
          spendScore: 28000,
          couponType: 'skin',
          skinFlg: 1,
          selectSkinInfo: '李白龙年限定188，皮肤很长，但是应该会很酷炫',
          qq: '',
          weixin: '林小强，我的微信名也很长很长，但是没办法，它合法',
          serverType: 1,
          roleName: '大司马，你很皮，这波不亏，看你怎么说，不解释连招',
          skinList: [
            {
              skinId: 6,
              type: 1,
              skinInfo: '关羽套装',
              mark: ''
            },
            {
              skinId: 5,
              type: 1,
              skinInfo: '李白套装',
              mark: ''
            }
          ]
        };
      }
      if (data.code === '200') {
        const { code, msg, ...reslut } = data;
        this.setExchangeRecordInfo(reslut);
      } else {
        showToast(data.msg);
      }
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   * 设置兑换记录详情
   * params product为Product的实例
   */
  @action
  setExchangeRecordInfo(data) {
    this.exchangeRecordInfo = data;
  }

  /**
   * 设置收货地址
   *
   */
  async setReceivedAddress(orderId, formParams) {
    const params = { orderId, ...formParams, st: +new Date() + systemStore.subServerTime };
    try {
      const data = await request('MallSetReceivedAddress', params);
      if (data.code === '200') {
        showToast('设置成功');
        this.getExchangeRecordInfo(orderId);
        return data;
      }
      showToast(data.msg);
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * 完成王者荣耀皮肤订单
   *
   */
  async completeWzryOrder(orderId, formParams) {
    let params = {};
    if (formParams.qq) {
      params = {
        orderId,
        qq: formParams.qq,
        roleName: formParams.roleName,
        serverType: formParams.serverType,
        skinId: formParams.skinId,
        st: +new Date() + systemStore.subServerTime
      };
    } else {
      params = {
        orderId,
        roleName: formParams.roleName,
        serverType: formParams.serverType,
        skinId: formParams.skinId,
        st: +new Date() + systemStore.subServerTime,
        weixin: formParams.weixin
      };
    }
    try {
      let data = await request('MallCompleteWzryOrder', params);
      data = {
        code: '200',
        msg: '获取兑换记录详情成功'
      };
      if (data.code === '200') {
        showToast('提交成功');
        this.getExchangeRecordInfo(orderId);
      }
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * 获取用户王者荣耀账户信息
   *
   */
  async getUserInfoWZRY() {
    const params = {
      st: +new Date() + systemStore.subServerTime
    };
    try {
      let data = await request('UserInfoWZRY', params);
      if (_ENV_ === 'DEV') {
        // 拉取到信息
        data = {
          code: '200',
          msg: '获取成功',
          serverType: 3,
          qq: '',
          weixin: '林小强',
          roleName: '大司马你很皮',
          status: 1
        };
        // 没拉取到信息
        data = {
          code: '200',
          msg: '获取成功',
          serverType: 1,
          qq: '',
          weixin: '',
          roleName: '',
          status: 0
        };
      }
      const { code, msg, ...result } = data;
      if (data.code === '200') {
        this.setUserInfoWZRY(result);
      } else {
        showToast(data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 设置用户王者荣耀账户信息
   */
  @action
  setUserInfoWZRY(data) {
    this.userInfoWZRY = data;
  }

  @action
  handleSign(signinStatus) {
    if (signinStatus && _userStatus !== '1' && !this.isFinishSign) {
      this.togglePop('isShowSign', true);
    }
  }
}

const user = new User({});
export default user;
export { User };
