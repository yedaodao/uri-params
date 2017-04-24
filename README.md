# uri-params

[![Build Status](https://travis-ci.org/yedaodao/uri-params.svg?branch=master)](https://travis-ci.org/yedaodao/uri-params)
[![Coverage Status](https://coveralls.io/repos/github/yedaodao/uri-params/badge.svg?branch=master)](https://coveralls.io/github/yedaodao/uri-params?branch=master)

Format uri with variables. It can run both in Node.js runtime and browsers.

## Get Started

Use npm to install:
```
npm install --save uri-params
```


Use Commonjs/CMD
```javascript
import uriParams from 'uri-params';

let url = 'http://example.com/:id';
// http://example.com/1
console.log(uriParams(url, {id:1}));
```

Use in browsers
```html
<script src="http://example.com/public/node_modules/uri-params/dist/uri-params.js"></script>
<script> 
window.uriParams('http://example.com/:id', {id:1});
</script>
```

## Feedback  
If you have any questions or requirements, use [Issues](https://github.com/yedaodao/uri-params/issues).



