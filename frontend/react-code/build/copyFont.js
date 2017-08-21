const map = require('map-stream');
const vfs = require('vinyl-fs');
const del = require('del');

del([
  'src/assets/font/*.eot',
  'src/assets/font/*.svg',
  'src/assets/font/*.ttf',
  'src/assets/font/*.woff'
]).then((paths) => {
  console.log('Deleted files:\n', paths.join('\n'));
});
vfs
  .src([
    'buildFont/font/*.eot',
    'buildFont/font/*.svg',
    'buildFont/font/*.ttf',
    'buildFont/font/*.woff'
  ])
  .pipe(
    map((file, cb) => {
      console.log('Copy font file：', file.path, ' success!');
      cb(null, file);
    })
  )
  .pipe(vfs.dest('src/assets/font'));
