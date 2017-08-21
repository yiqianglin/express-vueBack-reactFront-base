const path = require('path');
const config = require('../config/config');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
let postcssSprites = require('postcss-sprites');
let updateRule = require('postcss-sprites/lib/core').updateRule;
let makeSpritesheetPath = require('postcss-sprites/lib/core')
  .makeSpritesheetPath;
const argv = require('yargs').argv;
const project = require('../config/project');

const postcssConfig = {
  autoprefixer: {
    // 自动前缀的配置
    pc: [
      'last 3 versions',
      'Explorer >= 8',
      'Chrome >= 21',
      'Firefox >= 1',
      'Edge 13'
    ],
    app: ['Android >= 4', 'iOS >= 6']
  },
  postcssPxtorem: {
    root_value: '100', // 基准值 html{ font-zise: 20px; }
    prop_white_list: [], // 对所有 px 值生效
    minPixelValue: 3 // 忽略 1px 值
  },
  postcssSprites: {
    retina: false,
    verbose: true,
    spritePath: './dist/images', // 雪碧图合并后存放地址
    stylesheetPath: '../dist/css',
    basePath: './',
    spritesmith: {
      padding: 2
    },
    filterBy(image) {
      if (image.url.indexOf('/img/sprite/') === -1) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    groupBy(image) {
      return spritesGroupBy(image);
    },
    hooks: {
      onUpdateRule(rule, comment, image) {
        var spriteUrl = image.spritePath.replace('dist', '');
        image.spriteUrl = argv.local
          ? spriteUrl
          : `/${project[config.appName].contentPath}${spriteUrl}?t=${+new Date()}`;
        return spritesOnUpdateRule(true, rule, comment, image);
      },
      onSaveSpritesheet(opts, groups) {
        return spritesOnSaveSpritesheet(true, opts, groups);
      }
    }
  }
};

function spritesGroupBy(image) {
  let groups = /\/img\/sprites\/(.*?)\/.*/gi.exec(image.url);
  let groupName = groups ? groups[1] : group;
  image.retina = true;
  image.ratio = 1;
  if (groupName) {
    let ratio = /@(\d+)x$/gi.exec(groupName);
    if (ratio) {
      ratio = ratio[1];
      while (ratio > 10) {
        ratio /= 10;
      }
      image.ratio = ratio;
    }
  }
  return Promise.resolve(groupName);
}

function spritesOnUpdateRule(isDev, rule, comment, image) {
  updateRule(rule, comment, image);
}

function spritesOnSaveSpritesheet(isDev, opts, groups) {
  return makeSpritesheetPath(opts, groups);
}

module.exports = {
  assetsPath(_dir, _path) {
    return `${_dir}/${config.appName}/${_path}`;
  },
  postcssOption() {
    return [
      autoprefixer({
        browsers: postcssConfig.autoprefixer[config.platform]
      }),
      // postcssSprites(postcssConfig.postcssSprites),
      pxtorem(postcssConfig.postcssPxtorem)
    ];
  }
};
