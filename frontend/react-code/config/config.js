const path = require('path');
const localConf = require('./localConfig');
const merge = require('lodash/merge');
const argv = require('yargs').argv;
const project = require('./project');

const projectName = typeof argv.projectName === 'string'
  ? argv.projectName
  : 'guessGame';
console.log('build project:', projectName);

let config = {
  appName: project[projectName].appName,
  platform: 'app',
  title: project[projectName].title,
  htmlPath:  project[projectName].htmlPath,
  entry: path.join(
    __dirname,
    `../src/entry/${project[projectName].appName}.entry.js`
  ),
  dev: {
    env: {
      NODE_ENV: JSON.stringify('development')
    },
    port: project[projectName].port,
    autoOpenBrowser: true,
    assetsPublicPath: '/',
    proxyTable: {
      context: [
        '/gameServer/system',
        '/game-web-site/game/system',
      ],
      options: {
        target: 'http://test.weitrades.com',
        // target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    },
    template: path.join(__dirname, '../tpl/dev.template.html'),
    indexPath: project[projectName].indexPath,
    urlPath: project[projectName].urlPath // css，js文件url前缀
  },
  build: {
    env: {
      NODE_ENV: JSON.stringify('production')
    },
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: `/${project[projectName].contentPath}/`,
    template: path.join(
      __dirname,
      `../tpl/${project[projectName].appName}.template.html`
    ),
    bundleAnalyzerReport: process.env.npm_config_report,
    minifyImg: process.env.npm_config_minify
  },
  npmAlias: {
    img: path.join(__dirname, '../src/assets/img')
  },
  projectDir: `E:/game/${project[projectName].contentPath}/src/main/webapp`
};

merge(config, localConf);

module.exports = config;
