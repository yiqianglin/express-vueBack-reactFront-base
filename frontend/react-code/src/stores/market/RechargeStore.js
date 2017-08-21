import { observable, action } from 'mobx';
import { BaseRechargeStore } from '../common/RechargeStore';
import userStore from './UserStore';
import systemStore from './SystemStore';

class RechargeStore extends BaseRechargeStore {
  @action paySuccess() {
    this.showPopRechargeResult(1);
    userStore.getUserInfo(systemStore.subServerTime);
  }
}

const rechargeStore = new RechargeStore();

/** RechargeStore */
export default rechargeStore;
export { RechargeStore };
