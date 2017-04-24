var formatter = require('./formatter'),
    util = require('./util');

var symbol = ':',
    tempSeg = '';

module.exports = function uriParams(uri, params) {
    if (!util.isString(uri)) {
        return '';
    }
    if (!params) {
        return uri;
    }
    var arr = formatter.parseUri(uri);
    arr = arr.map(function (seg) {
        if (seg.charAt(0) !== symbol) {
            return seg;
        }
        tempSeg = seg.slice(1);
        if (params.hasOwnProperty(tempSeg)) {
            return params[tempSeg];
        }
        return seg;
    });
    return formatter.arrayToUri(arr);
};
