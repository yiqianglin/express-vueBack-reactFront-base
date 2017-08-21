process.env.NODE_ENV = 'production';

const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/config');
const webpackConfig = require('./webpack.prod.config');
const argv = require('yargs').argv;
const del = require('del');
const map = require('map-stream');
const vfs = require('vinyl-fs');
const fs = require('fs-extra');

const spinner = ora('building for production...');
spinner.start();
del([`${config.build.assetsRoot}/**`,`!${config.build.assetsRoot}`]).then((paths) => {
  console.log(chalk.red('Deleted files:\n', paths.join('\n')));
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      `${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })}\n\n`
    );

    console.log(chalk.cyan('  Build complete.\n'));
    if (argv.copy) {
      const spinner = ora('delete project file');
      spinner.start();
      console.log('project dir: ', config.projectDir);
      del(
        [
          path.join(config.projectDir, `css/${config.appName}`),
          path.join(config.projectDir, `fonts/${config.appName}`),
          path.join(config.projectDir, `images/${config.appName}`),
          path.join(config.projectDir, `js/${config.appName}`)
        ],
        { force: true }
      ).then((paths) => {
        console.log(chalk.red('Deleted files:\n', paths.join('\n')));
        spinner.stop();
        const spinnerCopy = ora('Copy to workdir');
        spinnerCopy.start();
        console.log(chalk.blue('Start copy files to ', config.projectDir));
        fs.copy('dist', config.projectDir, (err) => {
          if (err) return console.error(err);
          spinnerCopy.stop();
          console.log(chalk.yellow('  Copy complete.\n'));
        });
      });
    }
  });
});
