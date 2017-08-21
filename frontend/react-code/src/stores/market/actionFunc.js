/**
 * @module actionFunc
 * @desc action函数集合
 */
import { systemStore, userStore, productListStore, wxRechargeStore, rechargeStore } from './index';

/**
 * 商品兑换状态
 *
 * @type {object}
 */
export const orderStatusMapList = [{ status: 1, des: '订单创建成功' }];

/**
 * 收货状态
 *
 * @type {object}
 */

export const receivedStatusMapList = [
  { status: 0, des: '已发放' },
  { status: 1, des: '请填写收货信息' },
  { status: 10, des: '未发货' },
  { status: 20, des: '已发货' },
  { status: 30, des: '已签收' },
  { status: 40, des: '已确认收货' }
];
/**
 * 皮肤发放状态
 *
 * @type {object}
 */

export const skinStatusMapList = [
  { status: 0, des: '已发放' },
  { status: 1, des: '请填写账号信息' },
  { status: 10, des: '未发货' },
  { status: 20, des: '已发货' },
  { status: 40, des: '已确认收货' }
];
/**
 * 兑奖成功统计
 *
 */
export function reportTDGA(priceInVirtualCurrency) {
  if (_ENV_ !== 'DEV') {
    TDGA.onItemPurchase({
      item: '兑换奖品消耗',
      itemNumber: 1,
      priceInVirtualCurrency
    });
  }
}

/**
 * 显示（关闭）toast
 */
export function showToast(tipText, type) {
  systemStore.showToast(tipText, type);
}

/**
 * 点击兑换，弹出确认面板（待确认）
 * @param {string} productId 产品ID
 */
export function exchangeProduct(productId) {
  productListStore.getProductInfo(productId).then((product) => {
    productListStore.setProductShow(product);
    systemStore.togglePop('isShowExchangeConfirm', true);
  });
}

/**
 * 兑换商品（确认）
 *
 * @param {string} productId 产品ID
 *
 */
export async function exchangeProductConfirmed(productId, needScore) {
  // 判断余额是否充足
  if (+userStore.userInfo.score < needScore) {
    systemStore.togglePop('isShowExchangeConfirm', false);
    rechargeStore.showPopRecharge(true, Math.abs(needScore));
    return;
  }
  const data = await userStore.exchangeProduct(productId);
  if (data && data.code === '200') {
    systemStore.togglePop('isShowExchangeConfirm', false);
    systemStore.togglePop('isShowExchangeSuccess', true);
    // 更新商品库存信息
    productListStore.getProductList(1);
    productListStore.getProductList(0);
    reportTDGA(needScore);
  } else {
    systemStore.togglePop('isShowExchangeConfirm', false);
  }
}

/**
 * 兑换成功后，点击查看奖品，需要隐藏面板，以免用户返回
 */
export function goCheckAwardHasGot() {
  systemStore.togglePop('isShowExchangeSuccess', false);
}

/**
 * 我的领奖记录，设置当前页面
 *
 */
export function setAwardLoggerPageIndex(pageIndex) {
  userStore.exchangeRecord.set('pageIndex', pageIndex);
}

/**
 * 我的领奖记录加载更多
 *
 */
export async function getMoreAwardLogger(pageIndex) {
  setAwardLoggerPageIndex(pageIndex);
  const data = await userStore.getExchangeRecord();
  if (data && data.code === '200') {
    return data.list;
  }
  return false;
}
/**
 * 我的领奖记录，清除当前记录
 *
 */
export function cleanExchangeRecordData() {
  userStore.cleanExchangeRecordData();
}

/**
 * 根据orderStatus映射订单状态（中文）
 *
 */
export function mapOrderStatus(status) {
  for (const i in receivedStatusMapList) {
    if (receivedStatusMapList[i].status === status) {
      return receivedStatusMapList[i].des;
    }
  }
  return '';
}

/**
 * 根据orderStatus映射皮肤收货状态（中文）
 *
 */
export function mapSkinOrderStatus(status) {
  for (const i in skinStatusMapList) {
    if (skinStatusMapList[i].status === status) {
      return skinStatusMapList[i].des;
    }
  }
  return '';
}


/**
 * 设置收货信息
 *
 */
export async function setAddressee(orderId, formParams) {
  const data = await userStore.setReceivedAddress(orderId, formParams);
  if (data.code === '200') {
    systemStore.togglePop('isShowSetAddress', false);
    return data;
  }
  return false;
}

/**
 * QQ群顶部提示
 */
export function toggleQQqunTips(popStatus) {
  systemStore.setQQqunTips(popStatus);
}


/**
 * 获取兑换记录详情
 *
 */
export async function getExchangeRecordInfo(orderId) {
  const data = await userStore.getExchangeRecordInfo(orderId);
  if (data.skinFlg === 1) {
    await systemStore.getSkinServerList();
  }
}
