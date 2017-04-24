var util = require('./util');

exports.parseUri = function (uri) {
    var resultArr = [];
    if (!util.isString(uri) || !uri) {
        return resultArr;
    }
    var protocolLastIndex = util.getProtocolLastIndex(uri);
    if (protocolLastIndex !== -1) {
        resultArr.push(uri.slice(0, protocolLastIndex + 1));
        uri = uri.slice(protocolLastIndex + 1);
    }
    resultArr = resultArr.concat(uri.split('/'));
    return resultArr;
};

exports.arrayToUri = function (arr) {
    if (!util.isArray(arr) || !arr.length) {
        return '';
    }
    var protocolSeg = [];
    if (arr[0].indexOf('/') !== -1) {
        protocolSeg.push(arr[0]);
        arr = arr.slice(1);
    }
    return protocolSeg.concat(arr.join('/')).join('');
};
