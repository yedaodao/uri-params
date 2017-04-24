import test from 'ava';

import {parseUri, arrayToUri} from '../lib/formatter';
import {getProtocolLastIndex, isString, isArray, existsStartSlash, existsEndSlash} from '../lib/util';
import uriParams from '../index';

test('util.isString()', async t => {
    t.truthy(isString(''));
    t.truthy(isString('abc'));
    t.falsy(isString(null));
    t.falsy(isString(undefined));
    t.falsy(isString({}));
    t.falsy(isString(/abc/i));
});

test('util.isArray()', async t => {
    t.truthy(isArray([]));
    t.truthy(isArray([1, 2, 3]));
    t.falsy(isArray(null));
    t.falsy(isArray(undefined));
    t.falsy(isArray({}));
});

test('util.existsStartSlash()', async t => {
    t.truthy(existsStartSlash('/'));
    t.truthy(existsStartSlash('/abc/d/'));
    t.falsy(existsStartSlash(null));
    t.falsy(existsStartSlash(undefined));
    t.falsy(existsStartSlash({}));
});

test('util.existsEndSlash()', async t => {
    t.truthy(existsEndSlash('/'));
    t.truthy(existsEndSlash('a/'));
    t.falsy(existsEndSlash(''));
    t.falsy(existsEndSlash(null));
    t.falsy(existsEndSlash(undefined));
});

test('util.getProtocolLastIndex()', async t => {
    t.is(getProtocolLastIndex('https://'), 7);
    t.is(getProtocolLastIndex('https:'), -1);
    t.is(getProtocolLastIndex('http'), -1);
    t.is(getProtocolLastIndex(null), -1);
    t.is(getProtocolLastIndex(''), -1);
    t.is(getProtocolLastIndex('http://'), 6);
    t.is(getProtocolLastIndex('ftp://'), 5);
    t.is(getProtocolLastIndex('/abc//'), -1);
});

test('formatter.parseUri()', async t => {
    t.deepEqual(parseUri(null), []);
    t.deepEqual(parseUri(undefined), []);
    t.deepEqual(parseUri(''), []);
    t.deepEqual(parseUri('/abc/'), ['', 'abc', '']);
    t.deepEqual(parseUri('http://abc'), ['http://', 'abc']);
    t.deepEqual(parseUri('http://abc/'), ['http://', 'abc', '']);
    t.deepEqual(parseUri('http://abc/b/c'), ['http://', 'abc', 'b', 'c']);
    t.deepEqual(parseUri('https://abc'), ['https://', 'abc']);
    t.deepEqual(parseUri('https://abc/b/c'), ['https://', 'abc', 'b', 'c']);
    t.deepEqual(parseUri('https://abc/b-c/d'), ['https://', 'abc', 'b-c', 'd']);
    t.deepEqual(parseUri('//abc/'), ['//', 'abc', '']);
    t.deepEqual(parseUri('//abc/b-c/d'), ['//', 'abc', 'b-c', 'd']);
    t.deepEqual(parseUri('//abc/b-c/d/'), ['//', 'abc', 'b-c', 'd', '']);
    t.deepEqual(parseUri('abc/:b/d'), ['abc', ':b', 'd']);
    t.deepEqual(parseUri('abc/:b/:d'), ['abc', ':b', ':d']);
    t.deepEqual(parseUri('abc/:b/:d/'), ['abc', ':b', ':d', '']);
    t.deepEqual(parseUri('abc/:b:c/:d/'), ['abc', ':b:c', ':d', '']);
});

test('formatter.arrayToUri()', async t => {
    t.is(arrayToUri(null), '');
    t.is(arrayToUri(['', 'abc', '']), '/abc/');
    t.is(arrayToUri(['http://', 'abc']), 'http://abc');
    t.is(arrayToUri(['http://', 'abc', '']), 'http://abc/');
    t.is(arrayToUri(['http://', 'abc', 'b', 'c']), 'http://abc/b/c');
    t.is(arrayToUri(['https://', 'abc']), 'https://abc');
    t.is(arrayToUri(['https://', 'abc', 'b', 'c']), 'https://abc/b/c');
    t.is(arrayToUri(['https://', 'abc', 'b-c', 'd']), 'https://abc/b-c/d');
    t.is(arrayToUri(['//', 'abc', '']), '//abc/');
    t.is(arrayToUri(['//', 'abc', 'b-c', 'd']), '//abc/b-c/d');
    t.is(arrayToUri(['//', 'abc', 'b-c', 'd', '']), '//abc/b-c/d/');
    t.is(arrayToUri(['abc', ':b', 'd']), 'abc/:b/d');
    t.is(arrayToUri(['abc', ':b', ':d']), 'abc/:b/:d');
    t.is(arrayToUri(['abc', ':b', ':d', '']), 'abc/:b/:d/');
    t.is(arrayToUri(['abc', ':b:c', ':d', '']), 'abc/:b:c/:d/');
});

test('uriParams()', async t => {
    t.is(uriParams(null), '');
    t.is(uriParams('http://example.com'), 'http://example.com');
    t.is(uriParams('http://example.com/:id', {id: 1}), 'http://example.com/1');
    t.is(uriParams('http://example.com/:id/:ids', {id: 1}), 'http://example.com/1/:ids');
    t.is(uriParams('//example.com/:id/:ids', {ids: 1}), '//example.com/:id/1');
    t.is(uriParams('//example.com//:id//:ids', {ids: 1}), '//example.com//:id//1');
    t.is(uriParams('/example.com/:id/:ids', {ids: 1}), '/example.com/:id/1');
    t.is(uriParams('/example.com/:id/:ids', {id: 1, ids: 2}), '/example.com/1/2');
    t.is(uriParams('http://127.0.0.1:3000/:id/:ids', {id: 1, ids: 2}), 'http://127.0.0.1:3000/1/2');
});
