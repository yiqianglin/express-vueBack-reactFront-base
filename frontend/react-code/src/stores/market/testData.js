/**
 * Created by cc on 2017/6/19.
 */
import systemStore from './SystemStore';

const accuExpend = 10001;
const accuGain = 4001;
const balance = 100000;
const simulationData = {};

function generateData(type, params) {
  let _temp;
  if (type === 'Index') {
    _temp = {
      code: '200',
      msg: '成功',
      banner: [
        {
          title: 'ceshi1',
          image:
            'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-yunying/upload/adv/170705113238882_16.jpg',
          url: ''
        },
        {
          title: 'ceshi2',
          image:
            'https://xl-games.oss-cn-hangzhou.aliyuncs.com/game-yunying/upload/adv/170705113238882_16.jpg',
          url: ''
        }
      ],
      centerImage: 'https://xl-games.oss-cn-hangzhou.aliyuncs.com/index/image/game-center.png',
      crazybetImage: 'https://xl-games.oss-cn-hangzhou.aliyuncs.com/index/image/game-ftball.png',
      crazybetLinkUrl: 'http://test.weitrades.com/game-web-site/game/crazybet/index.htm',
      crazybetUserNum: 79584,
      hitmeImage: 'https://xl-games.oss-cn-hangzhou.aliyuncs.com/index/image/game-shoot.png',
      hitmeLinkUrl: 'http://test.weitrades.com/game-web-hitme/game/shoot/shootHome.htm',
      hitmeUserNum: 85673,
      lotteryLinkUrl: 'http://test.weitrades.com/game-web-site/game/activity/m_JulyLottery.htm',
      mallLinkUrl: 'http://test.weitrades.com/game-web-mall/game/market/creditMarket.htm',
      moreImage: 'https://xl-games.oss-cn-hangzhou.aliyuncs.com/index/image/game-more.png',
      smasheggImage: 'https://xl-games.oss-cn-hangzhou.aliyuncs.com/index/image/game-egg.png',
      smasheggLinkUrl: 'http://test.weitrades.com/game-web-smashegg/game/egg/gameLevel.htm',
      smasheggUserNum: 195634,
      updownImage: 'https://xl-games.oss-cn-hangzhou.aliyuncs.com/index/image/game-guess.png',
      updownLinkUrl: 'http://test.weitrades.com/game-web-updown/game/guess/home.htm',
      updownUserNum: 241856
    };
  }
  simulationData[type] = _temp;
}

export function asyncFunc(type, params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tempData = generateData(type, params);
      resolve(simulationData[type]);
    }, 300);
  });
}
