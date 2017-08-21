/**
 * Created by cc on 2017/4/25.
 */
import { observable, computed, action, autorun } from 'mobx';
import { request } from 'utils/utilsFunc';
import { systemStore } from 'stores/market/index';
// import { simulationData, asyncFunc } from 'utils/simulationData';
import { Product } from './Product';

class ProductList {
  /**
   * 获取到的服务器返回的列表（不包含商品详细介绍）
   * @type {Array}
   */
  @observable productList;
  /**
   * 缓存已有商品所有信息（包含商品详细介绍）的列表
   * @type {Array}
   */
  @observable productInfoListCache;
  /**
   * 需要显示的商品信息
   * @type {Product}
   */
  @observable productShow;
  constructor() {
    this.productList = observable.map({
      hotList: [],
      commonList: [],
      allList: []
    });
    this.productInfoListCache = [];
    this.productShow = null;// 兑换时展示的商品
    this.orderId = null;// 兑换成功的订单号
  }


  /**
   * 根据productId来查找商品详细信息（先查找cache）
   *
   */
  async getProductInfo(productId) {
    const productInfoListCache = this.productInfoListCache.toJS();
    for (const i in productInfoListCache) {
      if (productInfoListCache[i].productId === productId) {
        this.productShow = productInfoListCache[i];
        return this.productShow;
      }
    }
    const product = await new Product({ productId }).getProductInfo();
    this.setProductInfoListCache(product);
    return product;
  }
  /**
   * 获取商品列表
   * hotFlag Integer   null：全部 1：热门 0：非热门
   */
  async getProductList(hotFlag) {
    const params = {};
    if (hotFlag !== undefined) {
      params.hotFlag = hotFlag;
    }
    params.st = +new Date() + systemStore.subServerTime;
    const data = await request('MallProductList', params);
    // const data = await asyncFunc('GetProductList');
    if (data.code === '200') {
      this.setProductList(data.result, hotFlag);
    } else {
      console.log('failed');
    }
  }

  /**
   * 设置商品列表
   *
   */
  @action setProductList(data, hotFlag) {
    const productList = [];
    for (const i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        productList.push(new Product({ ...data[i] }));
      }
    }
    if (hotFlag === undefined) {
      this.productList.set('allList', productList);
    } else if (hotFlag === 1) {
      this.productList.set('hotList', productList);
    } else {
      this.productList.set('commonList', productList);
    }
  }

  /**
   * 设置商品详情的缓存
   * params product为Product的实例
   */
  @action setProductInfoListCache(product) {
    const productInfoListCache = this.productInfoListCache.toJS();
    for (const i in productInfoListCache) {
      if (productInfoListCache[i].productId === product.productId) {
        this.productInfoListCache[i] = product;
        return;
      }
    }
    this.productInfoListCache.push(product);
  }

  /**
   * 设置需要显示的商品
   * params product为Product的实例
   */
  @action setProductShow(product) {
    this.productShow = product;
  }
}

const productList = new ProductList({});
export default productList;
export { ProductList };
