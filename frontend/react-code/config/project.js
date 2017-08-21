module.exports = {
  guessGame: {
    appName: 'guessGame', // 项目名
    title: '疯狂猜涨跌', // 项目title
    port: 8091,
    urlPath: '/game/guess',
    indexPath: '/game/guess/home.htm', // 首页路径
    contentPath: 'game-web-updown',
    htmlPath: 'guessGame'
  },
  eggGame: {
    appName: 'eggGame', // 项目名
    title: '全民砸蛋', // 项目title
    port: 8092,
    urlPath: '/game/egg',
    indexPath: '/game/egg/gameClassic.htm',
    contentPath: 'game-web-smashegg',
    htmlPath: 'eggGame'
  },
  shootGame: {
    appName: 'shootGame', // 项目名
    title: '来打我呀', // 项目title
    port: 8093,
    urlPath: '/game/shoot',
    indexPath: '/game/shoot/shootHome.htm',
    contentPath: 'game-web-hitme',
    htmlPath: 'shootGame'
  },
  market: {
    appName: 'market',
    title: '领奖台',
    port: 8094,
    urlPath: '/game/market',
    indexPath: '/game/market/creditMarket.htm',
    contentPath: 'game-web-mall',
    htmlPath: 'market/creditMarket'
  },
  gameCenter: {
    appName: 'gameCenter',
    title: '游戏厅',
    port: 8095,
    urlPath: '/game/center',
    indexPath: '/game/center/home.htm',
    contentPath: 'game-web-activity',
    htmlPath: 'guessGame'
  }
};
