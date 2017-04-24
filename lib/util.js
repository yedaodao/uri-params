var protocolRegxStr = '(^(?:[a-z]+:)?\/\/)';
exports.isString = function (uri) {
    return typeof uri === 'string';
};
exports.isArray = function (uri) {
    return Object.prototype.toString.call(uri) === '[object Array]';
};
exports.existsStartSlash = function (uri) {
    if (!exports.isString(uri)) {
        return false;
    }
    return !!uri && uri[0] === '/';
};
exports.existsEndSlash = function (uri) {
    if (!exports.isString(uri)) {
        return false;
    }
    return !!uri && uri[uri.length - 1] === '/';
};
exports.getProtocolLastIndex = function (uri) {
    if (!exports.isString(uri)) {
        return -1;
    }
    var rs = (new RegExp(protocolRegxStr, 'g')).exec(uri);
    if (!rs || rs.length !== 2) {
        return -1;
    }
    return rs[1].length - 1;
};
