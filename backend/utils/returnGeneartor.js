
// 向前台返回JSON方法的简单封装
const jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '-1',
            msg: '网络繁忙，请稍后再试'
        });
    } else {
        res.json(ret);
    }
};

const pageWrite = function (res, ret, pageUri) {
	res.render(pageUri, ret);
};

export {
	jsonWrite,
	pageWrite
}