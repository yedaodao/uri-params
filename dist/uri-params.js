/*! Author by yedaodao<404069912@qq.com> */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["uriParams"] = factory();
	else
		root["uriParams"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var formatter = __webpack_require__(2),
    util = __webpack_require__(0);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
});