/**
 * Created by cc on 2017/4/25.
 */
import { observable, computed, action, autorun } from 'mobx';
import { request } from 'utils/utilsFunc';
import { systemStore } from 'stores/market/index';
// import { simulationData, asyncFunc } from 'utils/simulationData';

class Product {
  @observable productId;
  @observable name;
  @observable needScore;
  @observable brief;
  @observable picUrl;
  @observable needSend;
  @observable desc;
  @observable exchangeRules;
  @observable stock;
  @observable hourLimitStart;
  @observable hourLimitEnd;

  constructor({
    productId = '',
    name = '',
    needScore = true,
    brief = '',
    picUrl = '',
    needSend = false,
    desc = '',
    exchangeRules = '',
    stock = '',
    hourLimitStart = null,
    hourLimitEnd = null
  }) {
    this.productId = productId;
    this.name = name;
    this.needScore = needScore;
    this.brief = brief;
    this.picUrl = picUrl;
    this.needSend = needSend;
    this.desc = desc;
    this.exchangeRules = exchangeRules;
    this.stock = stock;
    this.hourLimitStart = hourLimitStart;
    this.hourLimitEnd = hourLimitEnd;
  }

  async getProductInfo() {
    const params = {
      productId: this.productId,
      st: +new Date() + systemStore.subServerTime
    };
    const data = await request('MallProductInfo', params);
    // if (_ENV_ === 'DEV') {
    //   data = {
    //     code: '200',
    //     msg: '产品信息获取成功',
    //     productId: 14,
    //     name: '50元京东购物卡',
    //     needScore: 500,
    //     brief: 'asdfasdfasd',
    //     picUrl: 'http://xl-games.oss-cn-hangzhou.aliyuncs.com/game-mall-product/jd_50.png',
    //     needSend: 0,
    //     desc: '个山东分公司答复个水电费',
    //     exchangeRules: '山东分公司答复个水电费个水电费'
    //   };
    // }
    if (data.code === '200') {
      this.setProductInfo(data);
    } else {
      console.log('failed');
    }
    return this;
  }

  @action setProductInfo(data) {
    this.productId = data.productId;
    this.name = data.name;
    this.needScore = data.needScore;
    this.brief = data.brief;
    this.picUrl = data.picUrl;
    this.needSend = data.needSend;
    this.desc = data.desc;
    this.exchangeRules = data.exchangeRules;
    this.stock = data.stock;
    this.hourLimitStart = data.stock;
    this.hourLimitEnd = data.hourLimitEnd;
  }
}

const product = new Product({});
export default product;
export { Product };
