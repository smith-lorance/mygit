(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 13:
/*!****************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 14));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 15));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 19));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 20));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 24));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 25));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 26));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 27));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 28));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 29));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 30));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 17));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 16));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 31));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 18));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 32));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 33));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 34));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 35));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 36));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 37);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 38));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 39));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 40));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!***************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!*****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/request/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 16));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!**********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 17:
/*!**********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/deepClone.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 18:
/*!*****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/test.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 185:
/*!****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/util/emitter.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 186:
/*!************************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/util/async-validator.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_NAME":"app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../前端学习/91/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 187)))

/***/ }),

/***/ 187:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 188);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 188:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 187)))

/***/ }),

/***/ 19:
/*!************************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/queryParams.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"app","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!******************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/route.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 22);

/***/ }),

/***/ 22:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 23);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 23:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 24:
/*!***********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 25:
/*!*********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 26:
/*!**************************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 27:
/*!*****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/guid.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 28:
/*!******************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/color.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 29:
/*!**********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/type2icon.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!************************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/randomArray.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 31:
/*!********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/addUnit.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 32:
/*!*******************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/random.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 33:
/*!*****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/trim.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 34:
/*!******************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/toast.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 35:
/*!**********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/getParent.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 36:
/*!********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/$parent.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 37:
/*!****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/sys.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 38:
/*!*********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/debounce.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 39:
/*!*********************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/function/throttle.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 4:
/*!********************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/config/config.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 41:
/*!*****************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 42:
/*!****************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/request/request.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = getHttp;function getHttp()




{var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$method = _ref.method,method = _ref$method === void 0 ? "get" : _ref$method,methodType = _ref.methodType,aip = _ref.aip,_ref$data = _ref.data,data = _ref$data === void 0 ? {} : _ref$data;
  return new Promise(function (resolve, reject) {
    methodType = method === 'post' ? 'application/json' : 'application/x-www-form-urlencoded';
    uni.getStorage({
      key: 'token',
      success: function success(res) {
        var token = res.data;
        uni.request({
          method: method,
          url: "https://shkeduwlkj.com/api/".concat(aip),
          data: data,
          header: {
            'x-access-token': token,
            'Content-Type': methodType },

          success: function success(res) {
            resolve(res.data);
          },
          fail: function fail(res) {
            reject(res.data);
          } });

      } });

  });


}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 43:
/*!*******************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/tim-wx-sdk/tim-wx.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, uni) {!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {function e(t) {return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(t);}function t(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function n(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}function o(e, t, o) {return t && n(e.prototype, t), o && n(e, o), e;}function a(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}function s(e, t) {var n = Object.keys(e);if (Object.getOwnPropertySymbols) {var o = Object.getOwnPropertySymbols(e);t && (o = o.filter(function (t) {return Object.getOwnPropertyDescriptor(e, t).enumerable;})), n.push.apply(n, o);}return n;}function r(e) {for (var t = 1; t < arguments.length; t++) {var n = null != arguments[t] ? arguments[t] : {};t % 2 ? s(Object(n), !0).forEach(function (t) {a(e, t, n[t]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach(function (t) {Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));});}return e;}function i(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && u(e, t);}function c(e) {return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {return e.__proto__ || Object.getPrototypeOf(e);})(e);}function u(e, t) {return (u = Object.setPrototypeOf || function (e, t) {return e.__proto__ = t, e;})(e, t);}function l() {if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (e) {return !1;}}function d(e, t, n) {return (d = l() ? Reflect.construct : function (e, t, n) {var o = [null];o.push.apply(o, t);var a = new (Function.bind.apply(e, o))();return n && u(a, n.prototype), a;}).apply(null, arguments);}function g(e) {var t = "function" == typeof Map ? new Map() : void 0;return (g = function g(e) {if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;var n;if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");if (void 0 !== t) {if (t.has(e)) return t.get(e);t.set(e, o);}function o() {return d(e, arguments, c(this).constructor);}return o.prototype = Object.create(e.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), u(o, e);})(e);}function p(e, t) {if (null == e) return {};var n,o,a = function (e, t) {if (null == e) return {};var n,o,a = {},s = Object.keys(e);for (o = 0; o < s.length; o++) {n = s[o], t.indexOf(n) >= 0 || (a[n] = e[n]);}return a;}(e, t);if (Object.getOwnPropertySymbols) {var s = Object.getOwnPropertySymbols(e);for (o = 0; o < s.length; o++) {n = s[o], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]);}}return a;}function h(e) {if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e;}function _(e, t) {return !t || "object" != typeof t && "function" != typeof t ? h(e) : t;}function f(e) {return function () {var t,n = c(e);if (l()) {var o = c(this).constructor;t = Reflect.construct(n, arguments, o);} else t = n.apply(this, arguments);return _(this, t);};}function m(e, t) {return v(e) || function (e, t) {if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;var n = [],o = !0,a = !1,s = void 0;try {for (var r, i = e[Symbol.iterator](); !(o = (r = i.next()).done) && (n.push(r.value), !t || n.length !== t); o = !0) {;}} catch (c) {a = !0, s = c;} finally {try {o || null == i.return || i.return();} finally {if (a) throw s;}}return n;}(e, t) || I(e, t) || D();}function M(e) {return function (e) {if (Array.isArray(e)) return T(e);}(e) || y(e) || I(e) || function () {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function v(e) {if (Array.isArray(e)) return e;}function y(e) {if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);}function I(e, t) {if (e) {if ("string" == typeof e) return T(e, t);var n = Object.prototype.toString.call(e).slice(8, -1);return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? T(e, t) : void 0;}}function T(e, t) {(null == t || t > e.length) && (t = e.length);for (var n = 0, o = new Array(t); n < t; n++) {o[n] = e[n];}return o;}function D() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function S(e) {if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {if (Array.isArray(e) || (e = I(e))) {var t = 0,n = function n() {};return { s: n, n: function n() {return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };}, e: function e(_e2) {throw _e2;}, f: n };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var o,a,s = !0,r = !1;return { s: function s() {o = e[Symbol.iterator]();}, n: function n() {var e = o.next();return s = e.done, e;}, e: function e(_e3) {r = !0, a = _e3;}, f: function f() {try {s || null == o.return || o.return();} finally {if (r) throw a;}} };}var E = { SDK_READY: "sdkStateReady", SDK_NOT_READY: "sdkStateNotReady", SDK_DESTROY: "sdkDestroy", MESSAGE_RECEIVED: "onMessageReceived", MESSAGE_MODIFIED: "onMessageModified", MESSAGE_REVOKED: "onMessageRevoked", MESSAGE_READ_BY_PEER: "onMessageReadByPeer", CONVERSATION_LIST_UPDATED: "onConversationListUpdated", GROUP_LIST_UPDATED: "onGroupListUpdated", GROUP_SYSTEM_NOTICE_RECEIVED: "receiveGroupSystemNotice", PROFILE_UPDATED: "onProfileUpdated", BLACKLIST_UPDATED: "blacklistUpdated", FRIEND_LIST_UPDATED: "onFriendListUpdated", FRIEND_GROUP_LIST_UPDATED: "onFriendGroupListUpdated", FRIEND_APPLICATION_LIST_UPDATED: "onFriendApplicationListUpdated", KICKED_OUT: "kickedOut", ERROR: "error", NET_STATE_CHANGE: "netStateChange", SDK_RELOAD: "sdkReload" },k = { MSG_TEXT: "TIMTextElem", MSG_IMAGE: "TIMImageElem", MSG_SOUND: "TIMSoundElem", MSG_AUDIO: "TIMSoundElem", MSG_FILE: "TIMFileElem", MSG_FACE: "TIMFaceElem", MSG_VIDEO: "TIMVideoFileElem", MSG_GEO: "TIMLocationElem", MSG_GRP_TIP: "TIMGroupTipElem", MSG_GRP_SYS_NOTICE: "TIMGroupSystemNoticeElem", MSG_CUSTOM: "TIMCustomElem", MSG_MERGER: "TIMRelayElem", MSG_PRIORITY_HIGH: "High", MSG_PRIORITY_NORMAL: "Normal", MSG_PRIORITY_LOW: "Low", MSG_PRIORITY_LOWEST: "Lowest", CONV_C2C: "C2C", CONV_GROUP: "GROUP", CONV_SYSTEM: "@TIM#SYSTEM", CONV_AT_ME: 1, CONV_AT_ALL: 2, CONV_AT_ALL_AT_ME: 3, GRP_PRIVATE: "Private", GRP_WORK: "Private", GRP_PUBLIC: "Public", GRP_CHATROOM: "ChatRoom", GRP_MEETING: "ChatRoom", GRP_AVCHATROOM: "AVChatRoom", GRP_MBR_ROLE_OWNER: "Owner", GRP_MBR_ROLE_ADMIN: "Admin", GRP_MBR_ROLE_MEMBER: "Member", GRP_TIP_MBR_JOIN: 1, GRP_TIP_MBR_QUIT: 2, GRP_TIP_MBR_KICKED_OUT: 3, GRP_TIP_MBR_SET_ADMIN: 4, GRP_TIP_MBR_CANCELED_ADMIN: 5, GRP_TIP_GRP_PROFILE_UPDATED: 6, GRP_TIP_MBR_PROFILE_UPDATED: 7, MSG_REMIND_ACPT_AND_NOTE: "AcceptAndNotify", MSG_REMIND_ACPT_NOT_NOTE: "AcceptNotNotify", MSG_REMIND_DISCARD: "Discard", GENDER_UNKNOWN: "Gender_Type_Unknown", GENDER_FEMALE: "Gender_Type_Female", GENDER_MALE: "Gender_Type_Male", KICKED_OUT_MULT_ACCOUNT: "multipleAccount", KICKED_OUT_MULT_DEVICE: "multipleDevice", KICKED_OUT_USERSIG_EXPIRED: "userSigExpired", ALLOW_TYPE_ALLOW_ANY: "AllowType_Type_AllowAny", ALLOW_TYPE_NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_TYPE_DENY_ANY: "AllowType_Type_DenyAny", FORBID_TYPE_NONE: "AdminForbid_Type_None", FORBID_TYPE_SEND_OUT: "AdminForbid_Type_SendOut", JOIN_OPTIONS_FREE_ACCESS: "FreeAccess", JOIN_OPTIONS_NEED_PERMISSION: "NeedPermission", JOIN_OPTIONS_DISABLE_APPLY: "DisableApply", JOIN_STATUS_SUCCESS: "JoinedSuccess", JOIN_STATUS_ALREADY_IN_GROUP: "AlreadyInGroup", JOIN_STATUS_WAIT_APPROVAL: "WaitAdminApproval", GRP_PROFILE_OWNER_ID: "ownerID", GRP_PROFILE_CREATE_TIME: "createTime", GRP_PROFILE_LAST_INFO_TIME: "lastInfoTime", GRP_PROFILE_MEMBER_NUM: "memberNum", GRP_PROFILE_MAX_MEMBER_NUM: "maxMemberNum", GRP_PROFILE_JOIN_OPTION: "joinOption", GRP_PROFILE_INTRODUCTION: "introduction", GRP_PROFILE_NOTIFICATION: "notification", GRP_PROFILE_MUTE_ALL_MBRS: "muteAllMembers", SNS_ADD_TYPE_SINGLE: "Add_Type_Single", SNS_ADD_TYPE_BOTH: "Add_Type_Both", SNS_DELETE_TYPE_SINGLE: "Delete_Type_Single", SNS_DELETE_TYPE_BOTH: "Delete_Type_Both", SNS_APPLICATION_TYPE_BOTH: "Pendency_Type_Both", SNS_APPLICATION_SENT_TO_ME: "Pendency_Type_ComeIn", SNS_APPLICATION_SENT_BY_ME: "Pendency_Type_SendOut", SNS_APPLICATION_AGREE: "Response_Action_Agree", SNS_APPLICATION_AGREE_AND_ADD: "Response_Action_AgreeAndAdd", SNS_CHECK_TYPE_BOTH: "CheckResult_Type_Both", SNS_CHECK_TYPE_SINGLE: "CheckResult_Type_Single", SNS_TYPE_NO_RELATION: "CheckResult_Type_NoRelation", SNS_TYPE_A_WITH_B: "CheckResult_Type_AWithB", SNS_TYPE_B_WITH_A: "CheckResult_Type_BWithA", SNS_TYPE_BOTH_WAY: "CheckResult_Type_BothWay", NET_STATE_CONNECTED: "connected", NET_STATE_CONNECTING: "connecting", NET_STATE_DISCONNECTED: "disconnected", MSG_AT_ALL: "__kImSDK_MesssageAtALL__" },C = function () {function e() {t(this, e), this.cache = [], this.options = null;}return o(e, [{ key: "use", value: function value(e) {if ("function" != typeof e) throw "middleware must be a function";return this.cache.push(e), this;} }, { key: "next", value: function value(e) {if (this.middlewares && this.middlewares.length > 0) return this.middlewares.shift().call(this, this.options, this.next.bind(this));} }, { key: "run", value: function value(e) {return this.middlewares = this.cache.map(function (e) {return e;}), this.options = e, this.next();} }]), e;}(),N = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function A(e, t) {return e(t = { exports: {} }, t.exports), t.exports;}var O = A(function (e, t) {var n, o, a, s, r, i, c, u, l, d, g, p, h, _, f, m, M, v;e.exports = (n = "function" == typeof Promise, o = "object" == typeof self ? self : N, a = "undefined" != typeof Symbol, s = "undefined" != typeof Map, r = "undefined" != typeof Set, i = "undefined" != typeof WeakMap, c = "undefined" != typeof WeakSet, u = "undefined" != typeof DataView, l = a && void 0 !== Symbol.iterator, d = a && void 0 !== Symbol.toStringTag, g = r && "function" == typeof Set.prototype.entries, p = s && "function" == typeof Map.prototype.entries, h = g && Object.getPrototypeOf(new Set().entries()), _ = p && Object.getPrototypeOf(new Map().entries()), f = l && "function" == typeof Array.prototype[Symbol.iterator], m = f && Object.getPrototypeOf([][Symbol.iterator]()), M = l && "function" == typeof String.prototype[Symbol.iterator], v = M && Object.getPrototypeOf(""[Symbol.iterator]()), function (e) {var t = typeof e;if ("object" !== t) return t;if (null === e) return "null";if (e === o) return "global";if (Array.isArray(e) && (!1 === d || !(Symbol.toStringTag in e))) return "Array";if ("object" == typeof window && null !== window) {if ("object" == typeof window.location && e === window.location) return "Location";if ("object" == typeof window.document && e === window.document) return "Document";if ("object" == typeof window.navigator) {if ("object" == typeof window.navigator.mimeTypes && e === window.navigator.mimeTypes) return "MimeTypeArray";if ("object" == typeof window.navigator.plugins && e === window.navigator.plugins) return "PluginArray";}if (("function" == typeof window.HTMLElement || "object" == typeof window.HTMLElement) && e instanceof window.HTMLElement) {if ("BLOCKQUOTE" === e.tagName) return "HTMLQuoteElement";if ("TD" === e.tagName) return "HTMLTableDataCellElement";if ("TH" === e.tagName) return "HTMLTableHeaderCellElement";}}var a = d && e[Symbol.toStringTag];if ("string" == typeof a) return a;var l = Object.getPrototypeOf(e);return l === RegExp.prototype ? "RegExp" : l === Date.prototype ? "Date" : n && l === Promise.prototype ? "Promise" : r && l === Set.prototype ? "Set" : s && l === Map.prototype ? "Map" : c && l === WeakSet.prototype ? "WeakSet" : i && l === WeakMap.prototype ? "WeakMap" : u && l === DataView.prototype ? "DataView" : s && l === _ ? "Map Iterator" : r && l === h ? "Set Iterator" : f && l === m ? "Array Iterator" : M && l === v ? "String Iterator" : null === l ? "Object" : Object.prototype.toString.call(e).slice(8, -1);});}),L = { WEB: 7, WX_MP: 8, QQ_MP: 9, TT_MP: 10, BAIDU_MP: 11, ALI_MP: 12, UNI_NATIVE_APP: 14 },R = "1.7.3",P = 537048168,w = 1,G = 2,b = 3,U = { HOST: { CURRENT: { DEFAULT: "", BACKUP: "" }, TEST: { DEFAULT: "wss://wss-dev.tim.qq.com", BACKUP: "wss://wss-dev.tim.qq.com" }, PRODUCTION: { DEFAULT: "wss://wss.im.qcloud.com", BACKUP: "wss://wss.tim.qq.com" }, OVERSEA_PRODUCTION: { DEFAULT: "wss://wss.im.qcloud.com", BACKUP: "wss://wss.im.qcloud.com" }, setCurrent: function setCurrent() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2;e === w ? this.CURRENT = this.TEST : e === G ? this.CURRENT = this.PRODUCTION : e === b && (this.CURRENT = this.OVERSEA_PRODUCTION);} }, NAME: { OPEN_IM: "openim", GROUP: "group_open_http_svc", FRIEND: "sns", PROFILE: "profile", RECENT_CONTACT: "recentcontact", PIC: "openpic", BIG_GROUP_NO_AUTH: "group_open_http_noauth_svc", BIG_GROUP_LONG_POLLING: "group_open_long_polling_http_svc", BIG_GROUP_LONG_POLLING_NO_AUTH: "group_open_long_polling_http_noauth_svc", IM_OPEN_STAT: "imopenstat", WEB_IM: "webim", IM_COS_SIGN: "im_cos_sign_svr", CUSTOM_UPLOAD: "im_cos_msg", HEARTBEAT: "heartbeat", IM_OPEN_PUSH: "im_open_push", IM_OPEN_STATUS: "im_open_status", IM_LONG_MESSAGE: "im_long_msg", CLOUD_CONTROL: "im_sdk_config_mgr" }, CMD: { ACCESS_LAYER: "accesslayer", LOGIN: "wslogin", LOGOUT_LONG_POLL: "longpollinglogout", LOGOUT: "wslogout", HELLO: "wshello", PORTRAIT_GET: "portrait_get_all", PORTRAIT_SET: "portrait_set", GET_LONG_POLL_ID: "getlongpollingid", LONG_POLL: "longpolling", AVCHATROOM_LONG_POLL: "get_msg", ADD_FRIEND: "friend_add", UPDATE_FRIEND: "friend_update", GET_FRIEND_LIST: "friend_get", GET_FRIEND_PROFILE: "friend_get_list", DELETE_FRIEND: "friend_delete", CHECK_FRIEND: "friend_check", GET_FRIEND_GROUP_LIST: "group_get", RESPOND_FRIEND_APPLICATION: "friend_response", GET_FRIEND_APPLICATION_LIST: "pendency_get", DELETE_FRIEND_APPLICATION: "pendency_delete", REPORT_FRIEND_APPLICATION: "pendency_report", GET_GROUP_APPLICATION: "get_pendency", CREATE_FRIEND_GROUP: "group_add", DELETE_FRIEND_GROUP: "group_delete", UPDATE_FRIEND_GROUP: "group_update", GET_BLACKLIST: "black_list_get", ADD_BLACKLIST: "black_list_add", DELETE_BLACKLIST: "black_list_delete", CREATE_GROUP: "create_group", GET_JOINED_GROUPS: "get_joined_group_list", SEND_MESSAGE: "sendmsg", REVOKE_C2C_MESSAGE: "msgwithdraw", DELETE_C2C_MESSAGE: "delete_c2c_msg_ramble", SEND_GROUP_MESSAGE: "send_group_msg", REVOKE_GROUP_MESSAGE: "group_msg_recall", DELETE_GROUP_MESSAGE: "delete_group_ramble_msg_by_seq", GET_GROUP_INFO: "get_group_info", GET_GROUP_MEMBER_INFO: "get_specified_group_member_info", GET_GROUP_MEMBER_LIST: "get_group_member_info", QUIT_GROUP: "quit_group", CHANGE_GROUP_OWNER: "change_group_owner", DESTROY_GROUP: "destroy_group", ADD_GROUP_MEMBER: "add_group_member", DELETE_GROUP_MEMBER: "delete_group_member", SEARCH_GROUP_BY_ID: "get_group_public_info", APPLY_JOIN_GROUP: "apply_join_group", HANDLE_APPLY_JOIN_GROUP: "handle_apply_join_group", HANDLE_GROUP_INVITATION: "handle_invite_join_group", MODIFY_GROUP_INFO: "modify_group_base_info", MODIFY_GROUP_MEMBER_INFO: "modify_group_member_info", DELETE_GROUP_SYSTEM_MESSAGE: "deletemsg", DELETE_GROUP_AT_TIPS: "deletemsg", GET_CONVERSATION_LIST: "get", PAGING_GET_CONVERSATION_LIST: "page_get", DELETE_CONVERSATION: "delete", GET_MESSAGES: "getmsg", GET_C2C_ROAM_MESSAGES: "getroammsg", GET_GROUP_ROAM_MESSAGES: "group_msg_get", SET_C2C_MESSAGE_READ: "msgreaded", GET_PEER_READ_TIME: "get_peer_read_time", SET_GROUP_MESSAGE_READ: "msg_read_report", FILE_READ_AND_WRITE_AUTHKEY: "authkey", FILE_UPLOAD: "pic_up", COS_SIGN: "cos", COS_PRE_SIG: "pre_sig", TIM_WEB_REPORT_V2: "tim_web_report_v2", BIG_DATA_HALLWAY_AUTH_KEY: "authkey", GET_ONLINE_MEMBER_NUM: "get_online_member_num", ALIVE: "alive", MESSAGE_PUSH: "msg_push", MESSAGE_PUSH_ACK: "ws_msg_push_ack", STATUS_FORCEOFFLINE: "stat_forceoffline", DOWNLOAD_MERGER_MESSAGE: "get_relay_json_msg", UPLOAD_MERGER_MESSAGE: "save_relay_json_msg", FETCH_CLOUD_CONTROL_CONFIG: "fetch_config", PUSHED_CLOUD_CONTROL_CONFIG: "push_configv2" }, CHANNEL: { SOCKET: 1, XHR: 2, AUTO: 0 }, NAME_VERSION: { openim: "v4", group_open_http_svc: "v4", sns: "v4", profile: "v4", recentcontact: "v4", openpic: "v4", group_open_http_noauth_svc: "v4", group_open_long_polling_http_svc: "v4", group_open_long_polling_http_noauth_svc: "v4", imopenstat: "v4", im_cos_sign_svr: "v4", im_cos_msg: "v4", webim: "v4", im_open_push: "v4", im_open_status: "v4" } };U.HOST.setCurrent(G);var F,q,V,K,x = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && Boolean(wx.getSystemInfoSync().fontSizeSetting),B = "undefined" != typeof qq && "function" == typeof qq.getSystemInfoSync && Boolean(qq.getSystemInfoSync().fontSizeSetting),H = "undefined" != typeof tt && "function" == typeof tt.getSystemInfoSync && Boolean(tt.getSystemInfoSync().fontSizeSetting),j = "undefined" != typeof swan && "function" == typeof swan.getSystemInfoSync && Boolean(swan.getSystemInfoSync().fontSizeSetting),Y = "undefined" != typeof my && "function" == typeof my.getSystemInfoSync && Boolean(my.getSystemInfoSync().fontSizeSetting),$ = "undefined" != typeof uni && "undefined" == typeof window,z = x || B || H || j || Y || $,W = ("undefined" != typeof uni || "undefined" != typeof window) && !z,J = B ? qq : H ? tt : j ? swan : Y ? my : x ? wx : $ ? uni : {},X = (F = "WEB", de ? F = "WEB" : B ? F = "QQ_MP" : H ? F = "TT_MP" : j ? F = "BAIDU_MP" : Y ? F = "ALI_MP" : x ? F = "WX_MP" : $ && (F = "UNI_NATIVE_APP"), L[F]),Q = W && window && window.navigator && window.navigator.userAgent || "",Z = /AppleWebKit\/([\d.]+)/i.exec(Q),ee = (Z && parseFloat(Z.pop()), /iPad/i.test(Q)),te = /iPhone/i.test(Q) && !ee,ne = /iPod/i.test(Q),oe = te || ee || ne,ae = ((q = Q.match(/OS (\d+)_/i)) && q[1] && q[1], /Android/i.test(Q)),se = function () {var e = Q.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if (!e) return null;var t = e[1] && parseFloat(e[1]),n = e[2] && parseFloat(e[2]);return t && n ? parseFloat(e[1] + "." + e[2]) : t || null;}(),re = (ae && /webkit/i.test(Q), /Firefox/i.test(Q), /Edge/i.test(Q)),ie = !re && /Chrome/i.test(Q),ce = (function () {var e = Q.match(/Chrome\/(\d+)/);e && e[1] && parseFloat(e[1]);}(), /MSIE/.test(Q)),ue = (/MSIE\s8\.0/.test(Q), function () {var e = /MSIE\s(\d+)\.\d/.exec(Q),t = e && parseFloat(e[1]);return !t && /Trident\/7.0/i.test(Q) && /rv:11.0/.test(Q) && (t = 11), t;}()),le = (/Safari/i.test(Q), /TBS\/\d+/i.test(Q)),de = (function () {var e = Q.match(/TBS\/(\d+)/i);if (e && e[1]) e[1];}(), !le && /MQQBrowser\/\d+/i.test(Q), !le && / QQBrowser\/\d+/i.test(Q), /(micromessenger|webbrowser)/i.test(Q)),ge = /Windows/i.test(Q),pe = /MAC OS X/i.test(Q),he = (/MicroMessenger/i.test(Q), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});V = "undefined" != typeof console ? console : void 0 !== he && he.console ? he.console : "undefined" != typeof window && window.console ? window.console : {};for (var _e = function _e() {}, fe = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], me = fe.length; me--;) {K = fe[me], console[K] || (V[K] = _e);}V.methods = fe;var Me = V,ve = 0,ye = function ye() {return new Date().getTime() + ve;},Ie = function Ie() {ve = 0;},Te = 0,De = new Map();function Se() {var e,t = ((e = new Date()).setTime(ye()), e);return "TIM " + t.toLocaleTimeString("en-US", { hour12: !1 }) + "." + function (e) {var t;switch (e.toString().length) {case 1:t = "00" + e;break;case 2:t = "0" + e;break;default:t = e;}return t;}(t.getMilliseconds()) + ":";}var Ee = { arguments2String: function arguments2String(e) {var t;if (1 === e.length) t = Se() + e[0];else {t = Se();for (var n = 0, o = e.length; n < o; n++) {Pe(e[n]) ? Ge(e[n]) ? t += Ke(e[n]) : t += JSON.stringify(e[n]) : t += e[n], t += " ";}}return t;}, debug: function debug() {if (Te <= -1) {var e = this.arguments2String(arguments);Me.debug(e);}}, log: function log() {if (Te <= 0) {var e = this.arguments2String(arguments);Me.log(e);}}, info: function info() {if (Te <= 1) {var e = this.arguments2String(arguments);Me.info(e);}}, warn: function warn() {if (Te <= 2) {var e = this.arguments2String(arguments);Me.warn(e);}}, error: function error() {if (Te <= 3) {var e = this.arguments2String(arguments);Me.error(e);}}, time: function time(e) {De.set(e, qe.now());}, timeEnd: function timeEnd(e) {if (De.has(e)) {var t = qe.now() - De.get(e);return De.delete(e), t;}return Me.warn("未找到对应label: ".concat(e, ", 请在调用 logger.timeEnd 前，调用 logger.time")), 0;}, setLevel: function setLevel(e) {e < 4 && Me.log(Se() + "set level from " + Te + " to " + e), Te = e;}, getLevel: function getLevel() {return Te;} },ke = function ke(e) {return "file" === be(e);},Ce = function Ce(t) {return null !== t && ("number" == typeof t && !isNaN(t - 0) || "object" === e(t) && t.constructor === Number);},Ne = function Ne(e) {return "string" == typeof e;},Ae = function Ae(t) {return null !== t && "object" === e(t);},Oe = function Oe(t) {if ("object" !== e(t) || null === t) return !1;var n = Object.getPrototypeOf(t);if (null === n) return !0;for (var o = n; null !== Object.getPrototypeOf(o);) {o = Object.getPrototypeOf(o);}return n === o;},Le = function Le(e) {return "function" == typeof Array.isArray ? Array.isArray(e) : "array" === be(e);},Re = function Re(e) {return void 0 === e;},Pe = function Pe(e) {return Le(e) || Ae(e);},we = function we(e) {return "function" == typeof e;},Ge = function Ge(e) {return e instanceof Error;},be = function be(e) {return Object.prototype.toString.call(e).match(/^\[object (.*)\]$/)[1].toLowerCase();},Ue = function Ue(e) {if ("string" != typeof e) return !1;var t = e[0];return !/[^a-zA-Z0-9]/.test(t);},Fe = 0;Date.now || (Date.now = function () {return new Date().getTime();});var qe = { now: function now() {0 === Fe && (Fe = Date.now() - 1);var e = Date.now() - Fe;return e > 4294967295 ? (Fe += 4294967295, Date.now() - Fe) : e;}, utc: function utc() {return Math.round(Date.now() / 1e3);} },Ve = function e(t, n, o, a) {if (!Pe(t) || !Pe(n)) return 0;for (var s, r = 0, i = Object.keys(n), c = 0, u = i.length; c < u; c++) {if (s = i[c], !(Re(n[s]) || o && o.includes(s))) if (Pe(t[s]) && Pe(n[s])) r += e(t[s], n[s], o, a);else {if (a && a.includes(n[s])) continue;t[s] !== n[s] && (t[s] = n[s], r += 1);}}return r;},Ke = function Ke(e) {return JSON.stringify(e, ["message", "code"]);},xe = function xe(e) {if (0 === e.length) return 0;for (var t = 0, n = 0, o = "undefined" != typeof document && void 0 !== document.characterSet ? document.characterSet : "UTF-8"; void 0 !== e[t];) {n += e[t++].charCodeAt[t] <= 255 ? 1 : !1 === o ? 3 : 2;}return n;},Be = function Be(e) {var t = e || 99999999;return Math.round(Math.random() * t);},He = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",je = He.length,Ye = function Ye(e, t) {for (var n in e) {if (e[n] === t) return !0;}return !1;},$e = {},ze = function ze() {if (z) return "https:";if (W && "undefined" == typeof window) return "https:";var e = window.location.protocol;return ["http:", "https:"].indexOf(e) < 0 && (e = "http:"), e;},We = function We(e) {return -1 === e.indexOf("http://") || -1 === e.indexOf("https://") ? "https://" + e : e.replace(/https|http/, "https");},Je = function t(n) {if (0 === Object.getOwnPropertyNames(n).length) return Object.create(null);var o = Array.isArray(n) ? [] : Object.create(null),a = "";for (var s in n) {null !== n[s] ? void 0 !== n[s] ? (a = e(n[s]), ["string", "number", "function", "boolean"].indexOf(a) >= 0 ? o[s] = n[s] : o[s] = t(n[s])) : o[s] = void 0 : o[s] = null;}return o;};function Xe(e, t) {Le(e) && Le(t) ? t.forEach(function (t) {var n = t.key,o = t.value,a = e.find(function (e) {return e.key === n;});a ? a.value = o : e.push({ key: n, value: o });}) : Ee.warn("updateCustomField target 或 source 不是数组，忽略此次更新。");}var Qe = function Qe(e) {return e === k.GRP_PUBLIC;},Ze = function Ze(e) {return e === k.GRP_AVCHATROOM;},et = function et(e) {return Ne(e) && e === k.CONV_SYSTEM;};function nt(e, t) {var n = {};return Object.keys(e).forEach(function (o) {n[o] = t(e[o], o);}), n;}function ot() {function e() {return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);}return "".concat(e() + e()).concat(e()).concat(e()).concat(e()).concat(e()).concat(e()).concat(e());}function at() {var e = "unknown";if (pe && (e = "mac"), ge && (e = "windows"), oe && (e = "ios"), ae && (e = "android"), z) try {var t = J.getSystemInfoSync().platform;void 0 !== t && (e = t);} catch (n) {}return e;}function st(e) {var t = e.originUrl,n = void 0 === t ? void 0 : t,o = e.originWidth,a = e.originHeight,s = e.min,r = void 0 === s ? 198 : s,i = parseInt(o),c = parseInt(a),u = { url: void 0, width: 0, height: 0 };return (i <= c ? i : c) <= r ? (u.url = n, u.width = i, u.height = c) : (c <= i ? (u.width = Math.ceil(i * r / c), u.height = r) : (u.width = r, u.height = Math.ceil(c * r / i)), u.url = "".concat(n, 198 === r ? "?imageView2/3/w/198/h/198" : "?imageView2/3/w/720/h/720")), Re(n) ? p(u, ["url"]) : u;}function rt(e) {var t = e[2];e[2] = e[1], e[1] = t;for (var n = 0; n < e.length; n++) {e[n].setType(n);}}function it(e) {var t = e.servcmd;return t.slice(t.indexOf(".") + 1);}function ct(e, t) {return Math.round(Number(e) * Math.pow(10, t)) / Math.pow(10, t);}function ut(e, t) {return e.includes(t);}function lt(e, t) {return e.includes(t);}var dt = Object.prototype.hasOwnProperty;function gt(e) {if (null == e) return !0;if ("boolean" == typeof e) return !1;if ("number" == typeof e) return 0 === e;if ("string" == typeof e) return 0 === e.length;if ("function" == typeof e) return 0 === e.length;if (Array.isArray(e)) return 0 === e.length;if (e instanceof Error) return "" === e.message;if (Oe(e)) {for (var t in e) {if (dt.call(e, t)) return !1;}return !0;}return !("map" !== be(e) && !function (e) {return "set" === be(e);}(e) && !ke(e)) && 0 === e.size;}function pt(e, t, n) {if (void 0 === t) return !0;var o = !0;if ("object" === O(t).toLowerCase()) Object.keys(t).forEach(function (a) {var s = 1 === e.length ? e[0][a] : void 0;o = !!ht(s, t[a], n, a) && o;});else if ("array" === O(t).toLowerCase()) for (var a = 0; a < t.length; a++) {o = !!ht(e[a], t[a], n, t[a].name) && o;}if (o) return o;throw new Error("Params validate failed.");}function ht(e, t, n, o) {if (void 0 === t) return !0;var a = !0;return t.required && gt(e) && (Me.error("TIM [".concat(n, '] Missing required params: "').concat(o, '".')), a = !1), gt(e) || O(e).toLowerCase() === t.type.toLowerCase() || (Me.error("TIM [".concat(n, '] Invalid params: type check failed for "').concat(o, '".Expected ').concat(t.type, ".")), a = !1), t.validator && !t.validator(e) && (Me.error("TIM [".concat(n, "] Invalid params: custom validator check failed for params.")), a = !1), a;}var _t,ft = { UNSEND: "unSend", SUCCESS: "success", FAIL: "fail" },mt = { NOT_START: "notStart", PENDING: "pengding", RESOLVED: "resolved", REJECTED: "rejected" },Mt = function Mt(e) {return !!e && (!!(function (e) {return Ne(e) && e.slice(0, 3) === k.CONV_C2C;}(e) || function (e) {return Ne(e) && e.slice(0, 5) === k.CONV_GROUP;}(e) || et(e)) || (console.warn("非法的会话 ID:".concat(e, "。会话 ID 组成方式：C2C + userID（单聊）GROUP + groupID（群聊）@TIM#SYSTEM（系统通知会话）")), !1));},vt = "请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#",yt = function yt(e) {return e.param ? "".concat(e.api, " ").concat(e.param, " ").concat(e.desc, "。").concat(vt).concat(e.api) : "".concat(e.api, " ").concat(e.desc, "。").concat(vt).concat(e.api);},It = { type: "String", required: !0 },Tt = { type: "Array", required: !0 },Dt = { type: "Object", required: !0 },St = { login: { userID: It, userSig: It }, addToBlacklist: { userIDList: Tt }, on: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn(yt({ api: "on", param: "eventName", desc: "类型必须为 String，且不能为空" })), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn(yt({ api: "on", param: "handler", desc: "参数必须为 Function" })), !1) : ("" === e.name && console.warn("on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。"), !0);} }], once: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn(yt({ api: "once", param: "eventName", desc: "类型必须为 String，且不能为空" })), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn(yt({ api: "once", param: "handler", desc: "参数必须为 Function" })), !1) : ("" === e.name && console.warn("once 接口的 handler 参数推荐使用具名函数。"), !0);} }], off: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn(yt({ api: "off", param: "eventName", desc: "类型必须为 String，且不能为空" })), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn(yt({ api: "off", param: "handler", desc: "参数必须为 Function" })), !1) : ("" === e.name && console.warn("off 接口无法为匿名函数取消监听事件。"), !0);} }], sendMessage: [r({ name: "message" }, Dt)], getMessageList: { conversationID: r({}, It, { validator: function validator(e) {return Mt(e);} }), nextReqMessageID: { type: "String" }, count: { type: "Number", validator: function validator(e) {return !(!Re(e) && !/^[1-9][0-9]*$/.test(e)) || (console.warn(yt({ api: "getMessageList", param: "count", desc: "必须为正整数" })), !1);} } }, setMessageRead: { conversationID: r({}, It, { validator: function validator(e) {return Mt(e);} }) }, getConversationProfile: [r({ name: "conversationID" }, It, { validator: function validator(e) {return Mt(e);} })], deleteConversation: [r({ name: "conversationID" }, It, { validator: function validator(e) {return Mt(e);} })], getGroupList: { groupProfileFilter: { type: "Array" } }, getGroupProfile: { groupID: It, groupCustomFieldFilter: { type: "Array" }, memberCustomFieldFilter: { type: "Array" } }, getGroupProfileAdvance: { groupIDList: Tt }, createGroup: { name: It }, joinGroup: { groupID: It, type: { type: "String" }, applyMessage: { type: "String" } }, quitGroup: [r({ name: "groupID" }, It)], handleApplication: { message: Dt, handleAction: It, handleMessage: { type: "String" } }, changeGroupOwner: { groupID: It, newOwnerID: It }, updateGroupProfile: { groupID: It, muteAllMembers: { type: "Boolean" } }, dismissGroup: [r({ name: "groupID" }, It)], searchGroupByID: [r({ name: "groupID" }, It)], getGroupMemberList: { groupID: It, offset: { type: "Number" }, count: { type: "Number" } }, getGroupMemberProfile: { groupID: It, userIDList: Tt, memberCustomFieldFilter: { type: "Array" } }, addGroupMember: { groupID: It, userIDList: Tt }, setGroupMemberRole: { groupID: It, userID: It, role: It }, setGroupMemberMuteTime: { groupID: It, userID: It, muteTime: { type: "Number", validator: function validator(e) {return e >= 0;} } }, setGroupMemberNameCard: { groupID: It, userID: It, nameCard: { type: "String", validator: function validator(e) {return Ne(e) ? (e.length, !0) : (console.warn(yt({ api: "setGroupMemberNameCard", param: "nameCard", desc: "类型必须为 String" })), !1);} } }, setMessageRemindType: { groupID: It, messageRemindType: It }, setGroupMemberCustomField: { groupID: It, userID: { type: "String" }, memberCustomField: Tt }, deleteGroupMember: { groupID: It }, createTextMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {return Oe(e) ? Ne(e.text) ? 0 !== e.text.length || (console.warn(yt({ api: "createTextMessage", desc: "消息内容不能为空" })), !1) : (console.warn(yt({ api: "createTextMessage", param: "payload.text", desc: "类型必须为 String" })), !1) : (console.warn(yt({ api: "createTextMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createTextAtMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {return Oe(e) ? Ne(e.text) ? 0 === e.text.length ? (console.warn(yt({ api: "createTextAtMessage", desc: "消息内容不能为空" })), !1) : !(e.atUserList && !Le(e.atUserList)) || (console.warn(yt({ api: "createTextAtMessage", desc: "payload.atUserList 类型必须为数组" })), !1) : (console.warn(yt({ api: "createTextAtMessage", param: "payload.text", desc: "类型必须为 String" })), !1) : (console.warn(yt({ api: "createTextAtMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createCustomMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {return Oe(e) ? e.data && !Ne(e.data) ? (console.warn(yt({ api: "createCustomMessage", param: "payload.data", desc: "类型必须为 String" })), !1) : e.description && !Ne(e.description) ? (console.warn(yt({ api: "createCustomMessage", param: "payload.description", desc: "类型必须为 String" })), !1) : !(e.extension && !Ne(e.extension)) || (console.warn(yt({ api: "createCustomMessage", param: "payload.extension", desc: "类型必须为 String" })), !1) : (console.warn(yt({ api: "createCustomMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createImageMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {if (!Oe(e)) return console.warn(yt({ api: "createImageMessage", param: "payload", desc: "类型必须为 plain object" })), !1;if (Re(e.file)) return console.warn(yt({ api: "createImageMessage", param: "payload.file", desc: "不能为 undefined" })), !1;if (W) {if (!(e.file instanceof HTMLInputElement || ke(e.file))) return Oe(e.file) && "undefined" != typeof uni ? 0 !== e.file.tempFilePaths.length && 0 !== e.file.tempFiles.length || (console.warn(yt({ api: "createImageMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1) : (console.warn(yt({ api: "createImageMessage", param: "payload.file", desc: "类型必须是 HTMLInputElement 或 File" })), !1);if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn(yt({ api: "createImageMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1;}return !0;}, onProgress: { type: "Function", required: !1, validator: function validator(e) {return Re(e) && console.warn(yt({ api: "createImageMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }) }, createAudioMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {return !!Oe(e) || (console.warn(yt({ api: "createAudioMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }), onProgress: { type: "Function", required: !1, validator: function validator(e) {return Re(e) && console.warn(yt({ api: "createAudioMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }, createVideoMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {if (!Oe(e)) return console.warn(yt({ api: "createVideoMessage", param: "payload", desc: "类型必须为 plain object" })), !1;if (Re(e.file)) return console.warn(yt({ api: "createVideoMessage", param: "payload.file", desc: "不能为 undefined" })), !1;if (W) {if (!(e.file instanceof HTMLInputElement || ke(e.file))) return Oe(e.file) && "undefined" != typeof uni ? !!ke(e.file.tempFile) || (console.warn(yt({ api: "createVideoMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1) : (console.warn(yt({ api: "createVideoMessage", param: "payload.file", desc: "类型必须是 HTMLInputElement 或 File" })), !1);if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn(yt({ api: "createVideoMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1;}return !0;} }), onProgress: { type: "Function", required: !1, validator: function validator(e) {return Re(e) && console.warn(yt({ api: "createVideoMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }, createFaceMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {return Oe(e) ? Ce(e.index) ? !!Ne(e.data) || (console.warn(yt({ api: "createFaceMessage", param: "payload.data", desc: "类型必须为 String" })), !1) : (console.warn(yt({ api: "createFaceMessage", param: "payload.index", desc: "类型必须为 Number" })), !1) : (console.warn(yt({ api: "createFaceMessage", param: "payload", desc: "类型必须为 plain object" })), !1);} }) }, createFileMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {if (!Oe(e)) return console.warn(yt({ api: "createFileMessage", param: "payload", desc: "类型必须为 plain object" })), !1;if (Re(e.file)) return console.warn(yt({ api: "createFileMessage", param: "payload.file", desc: "不能为 undefined" })), !1;if (W) {if (!(e.file instanceof HTMLInputElement || ke(e.file))) return Oe(e.file) && "undefined" != typeof uni ? 0 !== e.file.tempFilePaths.length && 0 !== e.file.tempFiles.length || (console.warn(yt({ api: "createFileMessage", param: "payload.file", desc: "您没有选择文件，无法发送" })), !1) : (console.warn(yt({ api: "createFileMessage", param: "payload.file", desc: "类型必须是 HTMLInputElement 或 File" })), !1);if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn(yt({ api: "createFileMessage", desc: "您没有选择文件，无法发送" })), !1;}return !0;} }), onProgress: { type: "Function", required: !1, validator: function validator(e) {return Re(e) && console.warn(yt({ api: "createFileMessage", desc: "没有 onProgress 回调，您将无法获取上传进度" })), !0;} } }, createMergerMessage: { to: It, conversationType: It, payload: r({}, Dt, { validator: function validator(e) {if (gt(e.messageList)) return console.warn(yt({ api: "createMergerMessage", desc: "不能为空数组" })), !1;if (gt(e.compatibleText)) return console.warn(yt({ api: "createMergerMessage", desc: "类型必须为 String，且不能为空" })), !1;var t = !1;return e.messageList.forEach(function (e) {e.status === ft.FAIL && (t = !0);}), !t || (console.warn(yt({ api: "createMergerMessage", desc: "不支持合并已发送失败的消息" })), !1);} }) }, revokeMessage: [r({ name: "message" }, Dt, { validator: function validator(e) {return gt(e) ? (console.warn("revokeMessage 请传入消息（Message）实例"), !1) : e.conversationType === k.CONV_SYSTEM ? (console.warn("revokeMessage 不能撤回系统会话消息，只能撤回单聊消息或群消息"), !1) : !0 !== e.isRevoked || (console.warn("revokeMessage 消息已经被撤回，请勿重复操作"), !1);} })], deleteMessage: [r({ name: "messageList" }, Tt, { validator: function validator(e) {return !gt(e) || (console.warn(yt({ api: "deleteMessage", param: "messageList", desc: "不能为空数组" })), !1);} })], getUserProfile: { userIDList: { type: "Array", validator: function validator(e) {return Le(e) ? (0 === e.length && console.warn(yt({ api: "getUserProfile", param: "userIDList", desc: "不能为空数组" })), !0) : (console.warn(yt({ api: "getUserProfile", param: "userIDList", desc: "必须为数组" })), !1);} } }, updateMyProfile: { profileCustomField: { type: "Array", validator: function validator(e) {return !!Re(e) || !!Le(e) || (console.warn(yt({ api: "updateMyProfile", param: "profileCustomField", desc: "必须为数组" })), !1);} } }, addFriend: { to: It, source: { type: "String", required: !0, validator: function validator(e) {return !!e && (e.startsWith("AddSource_Type_") ? !(e.replace("AddSource_Type_", "").length > 8) || (console.warn(yt({ api: "addFriend", desc: "加好友来源字段的关键字长度不得超过8字节" })), !1) : (console.warn(yt({ api: "addFriend", desc: "加好友来源字段的前缀必须是：AddSource_Type_" })), !1));} }, remark: { type: "String", required: !1, validator: function validator(e) {return !(Ne(e) && e.length > 96) || (console.warn(yt({ api: "updateFriend", desc: " 备注长度最长不得超过 96 个字节" })), !1);} } }, deleteFriend: { userIDList: Tt }, checkFriend: { userIDList: Tt }, getFriendProfile: { userIDList: Tt }, updateFriend: { userID: It, remark: { type: "String", required: !1, validator: function validator(e) {return !(Ne(e) && e.length > 96) || (console.warn(yt({ api: "updateFriend", desc: " 备注长度最长不得超过 96 个字节" })), !1);} }, friendCustomField: { type: "Array", required: !1, validator: function validator(e) {if (e) {if (!Le(e)) return console.warn(yt({ api: "updateFriend", param: "friendCustomField", desc: "必须为数组" })), !1;var t = !0;return e.forEach(function (e) {return Ne(e.key) && -1 !== e.key.indexOf("Tag_SNS_Custom") ? Ne(e.value) ? e.value.length > 8 ? (console.warn(yt({ api: "updateFriend", desc: "好友自定义字段的关键字长度不得超过8字节" })), t = !1) : void 0 : (console.warn(yt({ api: "updateFriend", desc: "类型必须为 String" })), t = !1) : (console.warn(yt({ api: "updateFriend", desc: "好友自定义字段的前缀必须是 Tag_SNS_Custom" })), t = !1);}), t;}return !0;} } }, acceptFriendApplication: { userID: It }, refuseFriendApplication: { userID: It }, deleteFriendApplication: { userID: It }, createFriendGroup: { name: It }, deleteFriendGroup: { name: It }, addToFriendGroup: { name: It, userIDList: Tt }, removeFromFriendGroup: { name: It, userIDList: Tt }, renameFriendGroup: { oldName: It, newName: It } },Et = { login: "login", logout: "logout", on: "on", once: "once", off: "off", setLogLevel: "setLogLevel", registerPlugin: "registerPlugin", destroy: "destroy", createTextMessage: "createTextMessage", createTextAtMessage: "createTextAtMessage", createImageMessage: "createImageMessage", createAudioMessage: "createAudioMessage", createVideoMessage: "createVideoMessage", createCustomMessage: "createCustomMessage", createFaceMessage: "createFaceMessage", createFileMessage: "createFileMessage", createMergerMessage: "createMergerMessage", downloadMergerMessage: "downloadMergerMessage", createForwardMessage: "createForwardMessage", sendMessage: "sendMessage", resendMessage: "resendMessage", getMessageList: "getMessageList", setMessageRead: "setMessageRead", revokeMessage: "revokeMessage", deleteMessage: "deleteMessage", getConversationList: "getConversationList", getConversationProfile: "getConversationProfile", deleteConversation: "deleteConversation", getGroupList: "getGroupList", getGroupProfile: "getGroupProfile", createGroup: "createGroup", joinGroup: "joinGroup", updateGroupProfile: "updateGroupProfile", quitGroup: "quitGroup", dismissGroup: "dismissGroup", changeGroupOwner: "changeGroupOwner", searchGroupByID: "searchGroupByID", setMessageRemindType: "setMessageRemindType", handleGroupApplication: "handleGroupApplication", getGroupMemberProfile: "getGroupMemberProfile", getGroupMemberList: "getGroupMemberList", addGroupMember: "addGroupMember", deleteGroupMember: "deleteGroupMember", setGroupMemberNameCard: "setGroupMemberNameCard", setGroupMemberMuteTime: "setGroupMemberMuteTime", setGroupMemberRole: "setGroupMemberRole", setGroupMemberCustomField: "setGroupMemberCustomField", getGroupOnlineMemberCount: "getGroupOnlineMemberCount", getMyProfile: "getMyProfile", getUserProfile: "getUserProfile", updateMyProfile: "updateMyProfile", getBlacklist: "getBlacklist", addToBlacklist: "addToBlacklist", removeFromBlacklist: "removeFromBlacklist", getFriendList: "getFriendList", addFriend: "addFriend", deleteFriend: "deleteFriend", checkFriend: "checkFriend", updateFriend: "updateFriend", getFriendProfile: "getFriendProfile", getFriendApplicationList: "getFriendApplicationList", refuseFriendApplication: "refuseFriendApplication", deleteFriendApplication: "deleteFriendApplication", acceptFriendApplication: "acceptFriendApplication", setFriendApplicationRead: "setFriendApplicationRead", getFriendGroupList: "getFriendGroupList", createFriendGroup: "createFriendGroup", renameFriendGroup: "renameFriendGroup", deleteFriendGroup: "deleteFriendGroup", addToFriendGroup: "addToFriendGroup", removeFromFriendGroup: "removeFromFriendGroup", callExperimentalAPI: "callExperimentalAPI" },kt = "sign",Ct = "message",Nt = "user",At = "c2c",Ot = "group",Lt = "sns",Rt = "groupMember",Pt = "conversation",wt = "context",Gt = "storage",bt = "eventStat",Ut = "netMonitor",Ft = "bigDataChannel",qt = "upload",Vt = "plugin",Kt = "syncUnreadMessage",xt = "session",Bt = "channel",Ht = "message_loss_detection",jt = "cloudControl",Yt = "pullGroupMessage",$t = "qualityStat",zt = function () {function e(n) {t(this, e), this._moduleManager = n, this._className = "";}return o(e, [{ key: "isLoggedIn", value: function value() {return this._moduleManager.getModule(wt).isLoggedIn();} }, { key: "isOversea", value: function value() {return this._moduleManager.getModule(wt).isOversea();} }, { key: "getMyUserID", value: function value() {return this._moduleManager.getModule(wt).getUserID();} }, { key: "getModule", value: function value(e) {return this._moduleManager.getModule(e);} }, { key: "getPlatform", value: function value() {return X;} }, { key: "getNetworkType", value: function value() {return this._moduleManager.getModule(Ut).getNetworkType();} }, { key: "probeNetwork", value: function value() {return this._moduleManager.getModule(Ut).probe();} }, { key: "getCloudConfig", value: function value(e) {return this._moduleManager.getModule(jt).getCloudConfig(e);} }, { key: "emitOuterEvent", value: function value(e, t) {this._moduleManager.getOuterEmitterInstance().emit(e, t);} }, { key: "emitInnerEvent", value: function value(e, t) {this._moduleManager.getInnerEmitterInstance().emit(e, t);} }, { key: "getInnerEmitterInstance", value: function value() {return this._moduleManager.getInnerEmitterInstance();} }, { key: "generateTjgID", value: function value(e) {return this._moduleManager.getModule(wt).getTinyID() + "-" + e.random;} }, { key: "filterModifiedMessage", value: function value(e) {if (!gt(e)) {var t = e.filter(function (e) {return !0 === e.isModified;});t.length > 0 && this.emitOuterEvent(E.MESSAGE_MODIFIED, t);}} }, { key: "filterUnmodifiedMessage", value: function value(e) {return gt(e) ? [] : e.filter(function (e) {return !1 === e.isModified;});} }, { key: "request", value: function value(e) {return this._moduleManager.getModule(xt).request(e);} }]), e;}(),Wt = "wslogin",Jt = "wslogout",Xt = "wshello",Qt = "getmsg",Zt = "authkey",en = "sendmsg",tn = "send_group_msg",nn = "portrait_get_all",on = "portrait_set",an = "black_list_get",sn = "black_list_add",rn = "black_list_delete",cn = "msgwithdraw",un = "msgreaded",ln = "getroammsg",dn = "get_peer_read_time",gn = "delete_c2c_msg_ramble",pn = "page_get",hn = "get",_n = "delete",fn = "deletemsg",mn = "get_joined_group_list",Mn = "get_group_info",vn = "create_group",yn = "destroy_group",In = "modify_group_base_info",Tn = "apply_join_group",Dn = "apply_join_group_noauth",Sn = "quit_group",En = "get_group_public_info",kn = "change_group_owner",Cn = "handle_apply_join_group",Nn = "handle_invite_join_group",An = "group_msg_recall",On = "msg_read_report",Ln = "group_msg_get",Rn = "get_pendency",Pn = "deletemsg",wn = "get_msg",Gn = "get_msg_noauth",bn = "get_online_member_num",Un = "delete_group_ramble_msg_by_seq",Fn = "get_group_member_info",qn = "get_specified_group_member_info",Vn = "add_group_member",Kn = "delete_group_member",xn = "modify_group_member_info",Bn = "cos",Hn = "pre_sig",jn = "tim_web_report_v2",Yn = "alive",$n = "msg_push",zn = "ws_msg_push_ack",Wn = "stat_forceoffline",Jn = "save_relay_json_msg",Xn = "get_relay_json_msg",Qn = "fetch_config",Zn = "push_configv2",eo = { NO_SDKAPPID: 2e3, NO_ACCOUNT_TYPE: 2001, NO_IDENTIFIER: 2002, NO_USERSIG: 2003, NO_TINYID: 2022, NO_A2KEY: 2023, USER_NOT_LOGGED_IN: 2024, REPEAT_LOGIN: 2025, COS_UNDETECTED: 2040, COS_GET_SIG_FAIL: 2041, MESSAGE_SEND_FAIL: 2100, MESSAGE_LIST_CONSTRUCTOR_NEED_OPTIONS: 2103, MESSAGE_SEND_NEED_MESSAGE_INSTANCE: 2105, MESSAGE_SEND_INVALID_CONVERSATION_TYPE: 2106, MESSAGE_FILE_IS_EMPTY: 2108, MESSAGE_ONPROGRESS_FUNCTION_ERROR: 2109, MESSAGE_REVOKE_FAIL: 2110, MESSAGE_DELETE_FAIL: 2111, MESSAGE_IMAGE_SELECT_FILE_FIRST: 2251, MESSAGE_IMAGE_TYPES_LIMIT: 2252, MESSAGE_IMAGE_SIZE_LIMIT: 2253, MESSAGE_AUDIO_UPLOAD_FAIL: 2300, MESSAGE_AUDIO_SIZE_LIMIT: 2301, MESSAGE_VIDEO_UPLOAD_FAIL: 2350, MESSAGE_VIDEO_SIZE_LIMIT: 2351, MESSAGE_VIDEO_TYPES_LIMIT: 2352, MESSAGE_FILE_UPLOAD_FAIL: 2400, MESSAGE_FILE_SELECT_FILE_FIRST: 2401, MESSAGE_FILE_SIZE_LIMIT: 2402, MESSAGE_FILE_URL_IS_EMPTY: 2403, MESSAGE_MERGER_TYPE_INVALID: 2450, MESSAGE_MERGER_KEY_INVALID: 2451, MESSAGE_MERGER_DOWNLOAD_FAIL: 2452, MESSAGE_FORWARD_TYPE_INVALID: 2453, CONVERSATION_NOT_FOUND: 2500, USER_OR_GROUP_NOT_FOUND: 2501, CONVERSATION_UN_RECORDED_TYPE: 2502, ILLEGAL_GROUP_TYPE: 2600, CANNOT_JOIN_WORK: 2601, CANNOT_CHANGE_OWNER_IN_AVCHATROOM: 2620, CANNOT_CHANGE_OWNER_TO_SELF: 2621, CANNOT_DISMISS_Work: 2622, MEMBER_NOT_IN_GROUP: 2623, JOIN_GROUP_FAIL: 2660, CANNOT_ADD_MEMBER_IN_AVCHATROOM: 2661, CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN: 2662, CANNOT_KICK_MEMBER_IN_AVCHATROOM: 2680, NOT_OWNER: 2681, CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM: 2682, INVALID_MEMBER_ROLE: 2683, CANNOT_SET_SELF_MEMBER_ROLE: 2684, CANNOT_MUTE_SELF: 2685, NOT_MY_FRIEND: 2700, ALREADY_MY_FRIEND: 2701, FRIEND_GROUP_EXISTED: 2710, FRIEND_GROUP_NOT_EXIST: 2711, FRIEND_APPLICATION_NOT_EXIST: 2716, UPDATE_PROFILE_INVALID_PARAM: 2721, UPDATE_PROFILE_NO_KEY: 2722, ADD_BLACKLIST_INVALID_PARAM: 2740, DEL_BLACKLIST_INVALID_PARAM: 2741, CANNOT_ADD_SELF_TO_BLACKLIST: 2742, ADD_FRIEND_INVALID_PARAM: 2760, NETWORK_ERROR: 2800, NETWORK_TIMEOUT: 2801, NETWORK_BASE_OPTIONS_NO_URL: 2802, NETWORK_UNDEFINED_SERVER_NAME: 2803, NETWORK_PACKAGE_UNDEFINED: 2804, NO_NETWORK: 2805, CONVERTOR_IRREGULAR_PARAMS: 2900, NOTICE_RUNLOOP_UNEXPECTED_CONDITION: 2901, NOTICE_RUNLOOP_OFFSET_LOST: 2902, UNCAUGHT_ERROR: 2903, GET_LONGPOLL_ID_FAILED: 2904, INVALID_OPERATION: 2905, CANNOT_FIND_PROTOCOL: 2997, CANNOT_FIND_MODULE: 2998, SDK_IS_NOT_READY: 2999, LONG_POLL_KICK_OUT: 91101, MESSAGE_A2KEY_EXPIRED: 20002, ACCOUNT_A2KEY_EXPIRED: 70001, LONG_POLL_API_PARAM_ERROR: 90001, HELLO_ANSWER_KICKED_OUT: 1002 },to = "无 SDKAppID",no = "无 userID",oo = "无 userSig",ao = "无 tinyID",so = "无 a2key",ro = "用户未登录",io = "重复登录",co = "未检测到 COS 上传插件",uo = "获取 COS 预签名 URL 失败",lo = "消息发送失败",go = "需要 Message 的实例",po = 'Message.conversationType 只能为 "C2C" 或 "GROUP"',ho = "无法发送空文件",_o = "回调函数运行时遇到错误，请检查接入侧代码",fo = "消息撤回失败",mo = "消息删除失败",Mo = "请先选择一个图片",vo = "只允许上传 jpg png jpeg gif bmp格式的图片",yo = "图片大小超过20M，无法发送",Io = "语音上传失败",To = "语音大小大于20M，无法发送",Do = "视频上传失败",So = "视频大小超过100M，无法发送",Eo = "只允许上传 mp4 格式的视频",ko = "文件上传失败",Co = "请先选择一个文件",No = "文件大小超过100M，无法发送 ",Ao = "缺少必要的参数文件 URL",Oo = "非合并消息",Lo = "合并消息的 messageKey 无效",Ro = "下载合并消息失败",Po = "选择的消息类型（如群提示消息）不可以转发",wo = "没有找到相应的会话，请检查传入参数",Go = "没有找到相应的用户或群组，请检查传入参数",bo = "未记录的会话类型",Uo = "非法的群类型，请检查传入参数",Fo = "不能加入 Work 类型的群组",qo = "AVChatRoom 类型的群组不能转让群主",Vo = "不能把群主转让给自己",Ko = "不能解散 Work 类型的群组",xo = "用户不在该群组内",Bo = "加群失败，请检查传入参数或重试",Ho = "AVChatRoom 类型的群不支持邀请群成员",jo = "非 AVChatRoom 类型的群组不允许匿名加群，请先登录后再加群",Yo = "不能在 AVChatRoom 类型的群组踢人",$o = "你不是群主，只有群主才有权限操作",zo = "不能在 Work / AVChatRoom 类型的群中设置群成员身份",Wo = "不合法的群成员身份，请检查传入参数",Jo = "不能设置自己的群成员身份，请检查传入参数",Xo = "不能将自己禁言，请检查传入参数",Qo = "传入 updateMyProfile 接口的参数无效",Zo = "updateMyProfile 无标配资料字段或自定义资料字段",ea = "传入 addToBlacklist 接口的参数无效",ta = "传入 removeFromBlacklist 接口的参数无效",na = "不能拉黑自己",oa = "网络错误",aa = "请求超时",sa = "未连接到网络",ra = "无效操作，如调用了未定义或者未实现的方法等",ia = "无法找到协议",ca = "无法找到模块",ua = "接口需要 SDK 处于 ready 状态后才能调用",la = "upload",da = "networkRTT",ga = "messageE2EDelay",pa = "sendMessageC2C",ha = "sendMessageGroup",_a = "sendMessageGroupAV",fa = "sendMessageRichMedia",ma = "cosUpload",Ma = "messageReceivedGroup",va = "messageReceivedGroupAVPush",ya = "messageReceivedGroupAVPull",Ia = (a(_t = {}, da, 2), a(_t, ga, 3), a(_t, pa, 4), a(_t, ha, 5), a(_t, _a, 6), a(_t, fa, 7), a(_t, Ma, 8), a(_t, va, 9), a(_t, ya, 10), a(_t, ma, 11), _t),Ta = { info: 4, warning: 5, error: 6 },Da = { wifi: 1, "2g": 2, "3g": 3, "4g": 4, "5g": 5, unknown: 6, none: 7, online: 8 },Sa = function () {function n(e) {t(this, n), this.eventType = 0, this.timestamp = 0, this.networkType = 8, this.code = 0, this.message = "", this.moreMessage = "", this.extension = e, this.costTime = 0, this.duplicate = !1, this.level = 4, this._sentFlag = !1, this._startts = ye();}return o(n, [{ key: "updateTimeStamp", value: function value() {this.timestamp = ye();} }, { key: "start", value: function value(e) {return this._startts = e, this;} }, { key: "end", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];if (!this._sentFlag) {var n = ye();this.costTime = n - this._startts, this.setMoreMessage("host:".concat(at(), " startts:").concat(this._startts, " endts:").concat(n)), t ? (this._sentFlag = !0, this._eventStatModule && this._eventStatModule.pushIn(this)) : setTimeout(function () {e._sentFlag = !0, e._eventStatModule && e._eventStatModule.pushIn(e);}, 0);}} }, { key: "setError", value: function value(e, t, n) {return e instanceof Error ? (this._sentFlag || (this.setNetworkType(n), t ? (e.code && this.setCode(e.code), e.message && this.setMoreMessage(e.message)) : (this.setCode(eo.NO_NETWORK), this.setMoreMessage(sa)), this.setLevel("error")), this) : (Ee.warn("SSOLogData.setError value not instanceof Error, please check!"), this);} }, { key: "setCode", value: function value(t) {return Re(t) || this._sentFlag || ("ECONNABORTED" === t && (this.code = 103), Ce(t) ? this.code = t : Ee.warn("SSOLogData.setCode value not a number, please check!", t, e(t))), this;} }, { key: "setMessage", value: function value(e) {return Re(e) || this._sentFlag || (Ce(e) && (this.message = e.toString()), Ne(e) && (this.message = e)), this;} }, { key: "setLevel", value: function value(e) {return Re(e) || this._sentFlag || (this.level = Ta[e]), this;} }, { key: "setMoreMessage", value: function value(e) {return gt(this.moreMessage) ? this.moreMessage = "".concat(e) : this.moreMessage += " ".concat(e), this;} }, { key: "setNetworkType", value: function value(e) {return Re(e) || Re(Da[e]) ? Ee.warn("SSOLogData.setNetworkType value is undefined, please check!") : this.networkType = Da[e], this;} }, { key: "getStartTs", value: function value() {return this._startts;} }], [{ key: "bindEventStatModule", value: function value(e) {n.prototype._eventStatModule = e;} }]), n;}(),Ea = "sdkConstruct",ka = "sdkReady",Ca = "login",Na = "logout",Aa = "kickedOut",Oa = "registerPlugin",La = "wsConnect",Ra = "wsOnOpen",Pa = "wsOnClose",wa = "wsOnError",Ga = "getCosAuthKey",ba = "getCosPreSigUrl",Ua = "upload",Fa = "sendMessage",qa = "getC2CRoamingMessages",Va = "getGroupRoamingMessages",Ka = "revokeMessage",xa = "deleteMessage",Ba = "setC2CMessageRead",Ha = "setGroupMessageRead",ja = "emptyMessageBody",Ya = "getPeerReadTime",$a = "uploadMergerMessage",za = "downloadMergerMessage",Wa = "jsonParseError",Ja = "messageE2EDelayException",Xa = "getConversationList",Qa = "getConversationProfile",Za = "deleteConversation",es = "getConversationListInStorage",ts = "syncConversationList",ns = "createGroup",os = "applyJoinGroup",as = "quitGroup",ss = "searchGroupByID",rs = "changeGroupOwner",is = "handleGroupApplication",cs = "handleGroupInvitation",us = "setMessageRemindType",ls = "dismissGroup",ds = "updateGroupProfile",gs = "getGroupList",ps = "getGroupProfile",hs = "getGroupListInStorage",_s = "getGroupLastSequence",fs = "getGroupMissingMessage",ms = "pagingGetGroupList",Ms = "getGroupSimplifiedInfo",vs = "joinWithoutAuth",ys = "getGroupMemberList",Is = "getGroupMemberProfile",Ts = "addGroupMember",Ds = "deleteGroupMember",Ss = "setGroupMemberMuteTime",Es = "setGroupMemberNameCard",ks = "setGroupMemberRole",Cs = "setGroupMemberCustomField",Ns = "getGroupOnlineMemberCount",As = "longPollingAVError",Os = "messageLoss",Ls = "messageStacked",Rs = "getUserProfile",Ps = "updateMyProfile",ws = "getBlacklist",Gs = "addToBlacklist",bs = "removeFromBlacklist",Us = "callbackFunctionError",Fs = "fetchCloudControlConfig",qs = "pushedCloudControlConfig",Vs = "error",Ks = function () {function e(n) {t(this, e), this.type = k.MSG_TEXT, this.content = { text: n.text || "" };}return o(e, [{ key: "setText", value: function value(e) {this.content.text = e;} }, { key: "sendable", value: function value() {return 0 !== this.content.text.length;} }]), e;}(),xs = { JSON: { TYPE: { C2C: { NOTICE: 1, COMMON: 9, EVENT: 10 }, GROUP: { COMMON: 3, TIP: 4, SYSTEM: 5, TIP2: 6 }, FRIEND: { NOTICE: 7 }, PROFILE: { NOTICE: 8 } }, SUBTYPE: { C2C: { COMMON: 0, READED: 92, KICKEDOUT: 96 }, GROUP: { COMMON: 0, LOVEMESSAGE: 1, TIP: 2, REDPACKET: 3 } }, OPTIONS: { GROUP: { JOIN: 1, QUIT: 2, KICK: 3, SET_ADMIN: 4, CANCEL_ADMIN: 5, MODIFY_GROUP_INFO: 6, MODIFY_MEMBER_INFO: 7 } } }, PROTOBUF: {}, IMAGE_TYPES: { ORIGIN: 1, LARGE: 2, SMALL: 3 }, IMAGE_FORMAT: { JPG: 1, JPEG: 1, GIF: 2, PNG: 3, BMP: 4, UNKNOWN: 255 } },Bs = { NICK: "Tag_Profile_IM_Nick", GENDER: "Tag_Profile_IM_Gender", BIRTHDAY: "Tag_Profile_IM_BirthDay", LOCATION: "Tag_Profile_IM_Location", SELFSIGNATURE: "Tag_Profile_IM_SelfSignature", ALLOWTYPE: "Tag_Profile_IM_AllowType", LANGUAGE: "Tag_Profile_IM_Language", AVATAR: "Tag_Profile_IM_Image", MESSAGESETTINGS: "Tag_Profile_IM_MsgSettings", ADMINFORBIDTYPE: "Tag_Profile_IM_AdminForbidType", LEVEL: "Tag_Profile_IM_Level", ROLE: "Tag_Profile_IM_Role" },Hs = { UNKNOWN: "Gender_Type_Unknown", FEMALE: "Gender_Type_Female", MALE: "Gender_Type_Male" },js = { NONE: "AdminForbid_Type_None", SEND_OUT: "AdminForbid_Type_SendOut" },Ys = { NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_ANY: "AllowType_Type_AllowAny", DENY_ANY: "AllowType_Type_DenyAny" },$s = "JoinedSuccess",zs = "WaitAdminApproval",Ws = function () {function e(n) {t(this, e), this._imageMemoryURL = "", z ? this.createImageDataASURLInWXMiniApp(n.file) : this.createImageDataASURLInWeb(n.file), this._initImageInfoModel(), this.type = k.MSG_IMAGE, this._percent = 0, this.content = { imageFormat: n.imageFormat || xs.IMAGE_FORMAT.UNKNOWN, uuid: n.uuid, imageInfoArray: [] }, this.initImageInfoArray(n.imageInfoArray), this._defaultImage = "http://imgcache.qq.com/open/qcloud/video/act/webim-images/default.jpg", this._autoFixUrl();}return o(e, [{ key: "_initImageInfoModel", value: function value() {var e = this;this._ImageInfoModel = function (t) {this.instanceID = Be(9999999), this.sizeType = t.type || 0, this.type = 0, this.size = t.size || 0, this.width = t.width || 0, this.height = t.height || 0, this.imageUrl = t.url || "", this.url = t.url || e._imageMemoryURL || e._defaultImage;}, this._ImageInfoModel.prototype = { setSizeType: function setSizeType(e) {this.sizeType = e;}, setType: function setType(e) {this.type = e;}, setImageUrl: function setImageUrl(e) {e && (this.imageUrl = e);}, getImageUrl: function getImageUrl() {return this.imageUrl;} };} }, { key: "initImageInfoArray", value: function value(e) {for (var t = 0, n = null, o = null; t <= 2;) {o = Re(e) || Re(e[t]) ? { type: 0, size: 0, width: 0, height: 0, url: "" } : e[t], (n = new this._ImageInfoModel(o)).setSizeType(t + 1), n.setType(t), this.addImageInfo(n), t++;}this.updateAccessSideImageInfoArray();} }, { key: "updateImageInfoArray", value: function value(e) {for (var t, n = this.content.imageInfoArray.length, o = 0; o < n; o++) {t = this.content.imageInfoArray[o], e[o].size && (t.size = e[o].size), e[o].url && t.setImageUrl(e[o].url), e[o].width && (t.width = e[o].width), e[o].height && (t.height = e[o].height);}} }, { key: "_autoFixUrl", value: function value() {for (var e = this.content.imageInfoArray.length, t = "", n = "", o = ["http", "https"], a = null, s = 0; s < e; s++) {this.content.imageInfoArray[s].url && "" !== (a = this.content.imageInfoArray[s]).imageUrl && (n = a.imageUrl.slice(0, a.imageUrl.indexOf("://") + 1), t = a.imageUrl.slice(a.imageUrl.indexOf("://") + 1), o.indexOf(n) < 0 && (n = "https:"), this.content.imageInfoArray[s].setImageUrl([n, t].join("")));}} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateImageFormat", value: function value(e) {this.content.imageFormat = xs.IMAGE_FORMAT[e.toUpperCase()] || xs.IMAGE_FORMAT.UNKNOWN;} }, { key: "createImageDataASURLInWeb", value: function value(e) {void 0 !== e && e.files.length > 0 && (this._imageMemoryURL = window.URL.createObjectURL(e.files[0]));} }, { key: "createImageDataASURLInWXMiniApp", value: function value(e) {e && e.url && (this._imageMemoryURL = e.url);} }, { key: "replaceImageInfo", value: function value(e, t) {this.content.imageInfoArray[t] instanceof this._ImageInfoModel || (this.content.imageInfoArray[t] = e);} }, { key: "addImageInfo", value: function value(e) {this.content.imageInfoArray.length >= 3 || this.content.imageInfoArray.push(e);} }, { key: "updateAccessSideImageInfoArray", value: function value() {var e = this.content.imageInfoArray,t = e[0],n = t.width,o = void 0 === n ? 0 : n,a = t.height,s = void 0 === a ? 0 : a;0 !== o && 0 !== s && (rt(e), Object.assign(e[2], st({ originWidth: o, originHeight: s, min: 720 })));} }, { key: "sendable", value: function value() {return 0 !== this.content.imageInfoArray.length && "" !== this.content.imageInfoArray[0].imageUrl && 0 !== this.content.imageInfoArray[0].size;} }]), e;}(),Js = function () {function e(n) {t(this, e), this.type = k.MSG_FACE, this.content = n || null;}return o(e, [{ key: "sendable", value: function value() {return null !== this.content;} }]), e;}(),Xs = function () {function e(n) {t(this, e), this.type = k.MSG_AUDIO, this._percent = 0, this.content = { downloadFlag: 2, second: n.second, size: n.size, url: n.url, remoteAudioUrl: n.url || "", uuid: n.uuid };}return o(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateAudioUrl", value: function value(e) {this.content.remoteAudioUrl = e;} }, { key: "sendable", value: function value() {return "" !== this.content.remoteAudioUrl;} }]), e;}(),Qs = { from: !0, groupID: !0, groupName: !0, to: !0 },Zs = function () {function e(n) {t(this, e), this.type = k.MSG_GRP_TIP, this.content = {}, this._initContent(n);}return o(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "remarkInfo":break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;case "operatorInfo":case "memberInfoList":break;case "msgMemberInfo":t.content.memberList = e[n], Object.defineProperty(t.content, "msgMemberInfo", { get: function get() {return Ee.warn("!!! 禁言的群提示消息中的 payload.msgMemberInfo 属性即将废弃，请使用 payload.memberList 属性替代。 \n", "msgMemberInfo 中的 shutupTime 属性对应更改为 memberList 中的 muteTime 属性，表示禁言时长。 \n", "参考：群提示消息 https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html#.GroupTipPayload"), t.content.memberList.map(function (e) {return { userID: e.userID, shutupTime: e.muteTime };});} });break;case "onlineMemberInfo":break;case "memberNum":t.content[n] = e[n], t.content.memberCount = e[n];break;default:t.content[n] = e[n];}}), this.content.userIDList || (this.content.userIDList = [this.content.operatorID]);} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var o = t[n];Qs[o] && (this.content.groupProfile[o] = e[o]);}} }]), e;}(),er = { from: !0, groupID: !0, groupName: !0, to: !0 },tr = function () {function e(n) {t(this, e), this.type = k.MSG_GRP_SYS_NOTICE, this.content = {}, this._initContent(n);}return o(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "memberInfoList":break;case "remarkInfo":t.content.handleMessage = e[n];break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;default:t.content[n] = e[n];}});} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var o = t[n];er[o] && ("groupName" === o ? this.content.groupProfile.name = e[o] : this.content.groupProfile[o] = e[o]);}} }]), e;}(),nr = function () {function e(n) {t(this, e), this.type = k.MSG_FILE, this._percent = 0;var o = this._getFileInfo(n);this.content = { downloadFlag: 2, fileUrl: n.url || "", uuid: n.uuid, fileName: o.name || "", fileSize: o.size || 0 };}return o(e, [{ key: "_getFileInfo", value: function value(e) {if (e.fileName && e.fileSize) return { size: e.fileSize, name: e.fileName };if (z) return {};var t = e.file.files[0];return { size: t.size, name: t.name, type: t.type.slice(t.type.lastIndexOf("/") + 1).toLowerCase() };} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateFileUrl", value: function value(e) {this.content.fileUrl = e;} }, { key: "sendable", value: function value() {return "" !== this.content.fileUrl && "" !== this.content.fileName && 0 !== this.content.fileSize;} }]), e;}(),or = function () {function e(n) {t(this, e), this.type = k.MSG_CUSTOM, this.content = { data: n.data || "", description: n.description || "", extension: n.extension || "" };}return o(e, [{ key: "setData", value: function value(e) {return this.content.data = e, this;} }, { key: "setDescription", value: function value(e) {return this.content.description = e, this;} }, { key: "setExtension", value: function value(e) {return this.content.extension = e, this;} }, { key: "sendable", value: function value() {return 0 !== this.content.data.length || 0 !== this.content.description.length || 0 !== this.content.extension.length;} }]), e;}(),ar = function () {function e(n) {t(this, e), this.type = k.MSG_VIDEO, this._percent = 0, this.content = { remoteVideoUrl: n.remoteVideoUrl || n.videoUrl || "", videoFormat: n.videoFormat, videoSecond: parseInt(n.videoSecond, 10), videoSize: n.videoSize, videoUrl: n.videoUrl, videoDownloadFlag: 2, videoUUID: n.videoUUID, thumbUUID: n.thumbUUID, thumbFormat: n.thumbFormat, thumbWidth: n.thumbWidth, thumbHeight: n.thumbHeight, thumbSize: n.thumbSize, thumbDownloadFlag: 2, thumbUrl: n.thumbUrl };}return o(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateVideoUrl", value: function value(e) {e && (this.content.remoteVideoUrl = e);} }, { key: "sendable", value: function value() {return "" !== this.content.remoteVideoUrl;} }]), e;}(),sr = function e(n) {t(this, e), this.type = k.MSG_GEO, this.content = n;},rr = function () {function e(n) {if (t(this, e), this.from = n.from, this.messageSender = n.from, this.time = n.time, this.messageSequence = n.sequence, this.clientSequence = n.clientSequence || n.sequence, this.messageRandom = n.random, this.cloudCustomData = n.cloudCustomData || "", n.ID) this.nick = n.nick || "", this.avatar = n.avatar || "", this.messageBody = [{ type: n.type, payload: n.payload }], n.conversationType.startsWith(k.CONV_C2C) ? this.receiverUserID = n.to : n.conversationType.startsWith(k.CONV_GROUP) && (this.receiverGroupID = n.to), this.messageReceiver = n.to;else {this.nick = n.nick || "", this.avatar = n.avatar || "", this.messageBody = [];var o = n.elements[0].type,a = n.elements[0].content;this._patchRichMediaPayload(o, a), o === k.MSG_MERGER ? this.messageBody.push({ type: o, payload: new ir(a).content }) : this.messageBody.push({ type: o, payload: a }), n.groupID && (this.receiverGroupID = n.groupID, this.messageReceiver = n.groupID), n.to && (this.receiverUserID = n.to, this.messageReceiver = n.to);}}return o(e, [{ key: "_patchRichMediaPayload", value: function value(e, t) {e === k.MSG_IMAGE ? t.imageInfoArray.forEach(function (e) {!e.imageUrl && e.url && (e.imageUrl = e.url, e.sizeType = e.type, 1 === e.type ? e.type = 0 : 3 === e.type && (e.type = 1));}) : e === k.MSG_VIDEO ? !t.remoteVideoUrl && t.videoUrl && (t.remoteVideoUrl = t.videoUrl) : e === k.MSG_AUDIO ? !t.remoteAudioUrl && t.url && (t.remoteAudioUrl = t.url) : e === k.MSG_FILE && !t.fileUrl && t.url && (t.fileUrl = t.url, t.url = void 0);} }]), e;}(),ir = function () {function e(n) {if (t(this, e), this.type = k.MSG_MERGER, this.content = { downloadKey: "", pbDownloadKey: "", messageList: [], title: "", abstractList: [], compatibleText: "", version: 0, layersOverLimit: !1 }, n.downloadKey) {var o = n.downloadKey,a = n.pbDownloadKey,s = n.title,r = n.abstractList,i = n.compatibleText,c = n.version;this.content.downloadKey = o, this.content.pbDownloadKey = a, this.content.title = s, this.content.abstractList = r, this.content.compatibleText = i, this.content.version = c || 0;} else if (gt(n.messageList)) 1 === n.layersOverLimit && (this.content.layersOverLimit = !0);else {var u = n.messageList,l = n.title,d = n.abstractList,g = n.compatibleText,p = n.version,h = [];u.forEach(function (e) {if (!gt(e)) {var t = new rr(e);h.push(t);}}), this.content.messageList = h, this.content.title = l, this.content.abstractList = d, this.content.compatibleText = g, this.content.version = p || 0;}Ee.debug("MergerElement.content:", this.content);}return o(e, [{ key: "sendable", value: function value() {return !gt(this.content.messageList) || !gt(this.content.downloadKey);} }]), e;}(),cr = { 1: k.MSG_PRIORITY_HIGH, 2: k.MSG_PRIORITY_NORMAL, 3: k.MSG_PRIORITY_LOW, 4: k.MSG_PRIORITY_LOWEST },ur = function () {function e(n) {t(this, e), this.ID = "", this.conversationID = n.conversationID || null, this.conversationType = n.conversationType || k.CONV_C2C, this.conversationSubType = n.conversationSubType, this.time = n.time || Math.ceil(Date.now() / 1e3), this.sequence = n.sequence || 0, this.clientSequence = n.clientSequence || n.sequence || 0, this.random = n.random || 0 === n.random ? n.random : Be(), this.priority = this._computePriority(n.priority), this.nick = n.nick || "", this.avatar = n.avatar || "", this.isPeerRead = !1, this.nameCard = "", this._elements = [], this.isPlaceMessage = n.isPlaceMessage || 0, this.isRevoked = 2 === n.isPlaceMessage || 8 === n.msgFlagBits, this.geo = {}, this.from = n.from || null, this.to = n.to || null, this.flow = "", this.isSystemMessage = n.isSystemMessage || !1, this.protocol = n.protocol || "JSON", this.isResend = !1, this.isRead = !1, this.status = n.status || ft.SUCCESS, this._onlineOnlyFlag = !1, this._groupAtInfoList = [], this._relayFlag = !1, this.atUserList = [], this.cloudCustomData = n.cloudCustomData || "", this.isDeleted = !1, this.isModified = !1, this.reInitialize(n.currentUser), this.extractGroupInfo(n.groupProfile || null), this.handleGroupAtInfo(n);}return o(e, [{ key: "getElements", value: function value() {return this._elements;} }, { key: "extractGroupInfo", value: function value(e) {if (null !== e) {Ne(e.nick) && (this.nick = e.nick), Ne(e.avatar) && (this.avatar = e.avatar);var t = e.messageFromAccountExtraInformation;Oe(t) && Ne(t.nameCard) && (this.nameCard = t.nameCard);}} }, { key: "handleGroupAtInfo", value: function value(e) {var t = this;e.payload && e.payload.atUserList && e.payload.atUserList.forEach(function (e) {e !== k.MSG_AT_ALL ? (t._groupAtInfoList.push({ groupAtAllFlag: 0, groupAtUserID: e }), t.atUserList.push(e)) : (t._groupAtInfoList.push({ groupAtAllFlag: 1 }), t.atUserList.push(k.MSG_AT_ALL));}), Le(e.groupAtInfo) && e.groupAtInfo.forEach(function (e) {1 === e.groupAtAllFlag ? t.atUserList.push(e.groupAtUserID) : 2 === e.groupAtAllFlag && t.atUserList.push(k.MSG_AT_ALL);});} }, { key: "getGroupAtInfoList", value: function value() {return this._groupAtInfoList;} }, { key: "_initProxy", value: function value() {this._elements[0] && (this.payload = this._elements[0].content, this.type = this._elements[0].type);} }, { key: "reInitialize", value: function value(e) {e && (this.status = this.from ? ft.SUCCESS : ft.UNSEND, !this.from && (this.from = e)), this._initFlow(e), this._initSequence(e), this._concatConversationID(e), this.generateMessageID(e);} }, { key: "isSendable", value: function value() {return 0 !== this._elements.length && ("function" != typeof this._elements[0].sendable ? (Ee.warn("".concat(this._elements[0].type, ' need "boolean : sendable()" method')), !1) : this._elements[0].sendable());} }, { key: "_initTo", value: function value(e) {this.conversationType === k.CONV_GROUP && (this.to = e.groupID);} }, { key: "_initSequence", value: function value(e) {0 === this.clientSequence && e && (this.clientSequence = function (e) {if (!e) return Ee.error("autoIncrementIndex(string: key) need key parameter"), !1;if (void 0 === $e[e]) {var t = new Date(),n = "3".concat(t.getHours()).slice(-2),o = "0".concat(t.getMinutes()).slice(-2),a = "0".concat(t.getSeconds()).slice(-2);$e[e] = parseInt([n, o, a, "0001"].join("")), n = null, o = null, a = null, Ee.log("autoIncrementIndex start index:".concat($e[e]));}return $e[e]++;}(e)), 0 === this.sequence && this.conversationType === k.CONV_C2C && (this.sequence = this.clientSequence);} }, { key: "generateMessageID", value: function value(e) {var t = e === this.from ? 1 : 0,n = this.sequence > 0 ? this.sequence : this.clientSequence;this.ID = "".concat(this.conversationID, "-").concat(n, "-").concat(this.random, "-").concat(t);} }, { key: "_initFlow", value: function value(e) {"" !== e && (e === this.from ? (this.flow = "out", this.isRead = !0) : this.flow = "in");} }, { key: "_concatConversationID", value: function value(e) {var t = this.to,n = "",o = this.conversationType;o !== k.CONV_SYSTEM ? (n = o === k.CONV_C2C ? e === this.from ? t : this.from : this.to, this.conversationID = "".concat(o).concat(n)) : this.conversationID = k.CONV_SYSTEM;} }, { key: "isElement", value: function value(e) {return e instanceof Ks || e instanceof Ws || e instanceof Js || e instanceof Xs || e instanceof nr || e instanceof ar || e instanceof Zs || e instanceof tr || e instanceof or || e instanceof sr || e instanceof ir;} }, { key: "setElement", value: function value(e) {var t = this;if (this.isElement(e)) return this._elements = [e], void this._initProxy();var n = function n(e) {if (e.type && e.content) switch (e.type) {case k.MSG_TEXT:t.setTextElement(e.content);break;case k.MSG_IMAGE:t.setImageElement(e.content);break;case k.MSG_AUDIO:t.setAudioElement(e.content);break;case k.MSG_FILE:t.setFileElement(e.content);break;case k.MSG_VIDEO:t.setVideoElement(e.content);break;case k.MSG_CUSTOM:t.setCustomElement(e.content);break;case k.MSG_GEO:t.setGEOElement(e.content);break;case k.MSG_GRP_TIP:t.setGroupTipElement(e.content);break;case k.MSG_GRP_SYS_NOTICE:t.setGroupSystemNoticeElement(e.content);break;case k.MSG_FACE:t.setFaceElement(e.content);break;case k.MSG_MERGER:t.setMergerElement(e.content);break;default:Ee.warn(e.type, e.content, "no operation......");}};if (Le(e)) for (var o = 0; o < e.length; o++) {n(e[o]);} else n(e);this._initProxy();} }, { key: "clearElement", value: function value() {this._elements.length = 0;} }, { key: "setTextElement", value: function value(e) {var t = "string" == typeof e ? e : e.text,n = new Ks({ text: t });this._elements.push(n);} }, { key: "setImageElement", value: function value(e) {var t = new Ws(e);this._elements.push(t);} }, { key: "setAudioElement", value: function value(e) {var t = new Xs(e);this._elements.push(t);} }, { key: "setFileElement", value: function value(e) {var t = new nr(e);this._elements.push(t);} }, { key: "setVideoElement", value: function value(e) {var t = new ar(e);this._elements.push(t);} }, { key: "setGEOElement", value: function value(e) {var t = new sr(e);this._elements.push(t);} }, { key: "setCustomElement", value: function value(e) {var t = new or(e);this._elements.push(t);} }, { key: "setGroupTipElement", value: function value(e) {var t = {},n = e.operationType;gt(e.memberInfoList) ? e.operatorInfo && (t = e.operatorInfo) : n !== k.GRP_TIP_MBR_JOIN && n !== k.GRP_TIP_MBR_KICKED_OUT && n !== k.GRP_TIP_MBR_SET_ADMIN && n !== k.GRP_TIP_MBR_CANCELED_ADMIN || (t = e.memberInfoList[0]);var o = t,a = o.nick,s = o.avatar;Ne(a) && (this.nick = a), Ne(s) && (this.avatar = s);var r = new Zs(e);this._elements.push(r);} }, { key: "setGroupSystemNoticeElement", value: function value(e) {var t = new tr(e);this._elements.push(t);} }, { key: "setFaceElement", value: function value(e) {var t = new Js(e);this._elements.push(t);} }, { key: "setMergerElement", value: function value(e) {var t = new ir(e);this._elements.push(t);} }, { key: "setIsRead", value: function value(e) {this.isRead = e;} }, { key: "setRelayFlag", value: function value(e) {this._relayFlag = e;} }, { key: "getRelayFlag", value: function value() {return this._relayFlag;} }, { key: "setOnlineOnlyFlag", value: function value(e) {this._onlineOnlyFlag = e;} }, { key: "getOnlineOnlyFlag", value: function value() {return this._onlineOnlyFlag;} }, { key: "_computePriority", value: function value(e) {if (Re(e)) return k.MSG_PRIORITY_NORMAL;if (Ne(e) && -1 !== Object.values(cr).indexOf(e)) return e;if (Ce(e)) {var t = "" + e;if (-1 !== Object.keys(cr).indexOf(t)) return cr[t];}return k.MSG_PRIORITY_NORMAL;} }, { key: "setNickAndAvatar", value: function value(e) {var t = e.nick,n = e.avatar;Ne(t) && (this.nick = t), Ne(n) && (this.avatar = n);} }, { key: "elements", get: function get() {return Ee.warn("！！！Message 实例的 elements 属性即将废弃，请尽快修改。使用 type 和 payload 属性处理单条消息，兼容组合消息使用 _elements 属性！！！"), this._elements;} }]), e;}(),lr = function lr(e) {return { code: 0, data: e || {} };},dr = "https://cloud.tencent.com/document/product/",gr = "您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。",pr = "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(".concat(dr, "269/32688)。"),hr = "#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement",_r = { 70001: "UserSig 已过期，请重新生成。建议 UserSig 有效期设置不小于24小时。", 70002: "UserSig 长度为0，请检查传入的 UserSig 是否正确。", 70003: pr, 70005: pr, 70009: "UserSig 验证失败，可能因为生成 UserSig 时混用了其他 SDKAppID 的私钥或密钥导致，请使用对应 SDKAppID 下的私钥或密钥重新生成 UserSig(".concat(dr, "269/32688)。"), 70013: "请求中的 UserID 与生成 UserSig 时使用的 UserID 不匹配。".concat(gr), 70014: "请求中的 SDKAppID 与生成 UserSig 时使用的 SDKAppID 不匹配。".concat(gr), 70016: "密钥不存在，UserSig 验证失败，请在即时通信 IM 控制台获取密钥(".concat(dr, "269/32578#.E8.8E.B7.E5.8F.96.E5.AF.86.E9.92.A5)。"), 70020: "SDKAppID 未找到，请在即时通信 IM 控制台确认应用信息。", 70050: "UserSig 验证次数过于频繁。请检查 UserSig 是否正确，并于1分钟后重新验证。".concat(gr), 70051: "帐号被拉入黑名单。", 70052: "UserSig 已经失效，请重新生成，再次尝试。", 70107: "因安全原因被限制登录，请不要频繁登录。", 70169: "请求的用户帐号不存在。", 70114: "".concat("服务端内部超时，请稍后重试。"), 70202: "".concat("服务端内部超时，请稍后重试。"), 70206: "请求中批量数量不合法。", 70402: "参数非法，请检查必填字段是否填充，或者字段的填充是否满足协议要求。", 70403: "请求失败，需要 App 管理员权限。", 70398: "帐号数超限。如需创建多于100个帐号，请将应用升级为专业版，具体操作指引请参见购买指引(".concat(dr, "269/32458)。"), 70500: "".concat("服务端内部错误，请重试。"), 71e3: "删除帐号失败。仅支持删除体验版帐号，您当前应用为专业版，暂不支持帐号删除。", 20001: "请求包非法。", 20002: "UserSig 或 A2 失效。", 20003: "消息发送方或接收方 UserID 无效或不存在，请检查 UserID 是否已导入即时通信 IM。", 20004: "网络异常，请重试。", 20005: "".concat("服务端内部错误，请重试。"), 20006: "触发发送".concat("单聊消息", "之前回调，App 后台返回禁止下发该消息。"), 20007: "发送".concat("单聊消息", "，被对方拉黑，禁止发送。消息发送状态默认展示为失败，您可以登录控制台修改该场景下的消息发送状态展示结果，具体操作请参见消息保留设置(").concat(dr, "269/38656)。"), 20009: "消息发送双方互相不是好友，禁止发送（配置".concat("单聊消息", "校验好友关系才会出现）。"), 20010: "发送".concat("单聊消息", "，自己不是对方的好友（单向关系），禁止发送。"), 20011: "发送".concat("单聊消息", "，对方不是自己的好友（单向关系），禁止发送。"), 20012: "发送方被禁言，该条消息被禁止发送。", 20016: "消息撤回超过了时间限制（默认2分钟）。", 20018: "删除漫游内部错误。", 90001: "JSON 格式解析失败，请检查请求包是否符合 JSON 规范。", 90002: "".concat("JSON 格式请求包体", "中 MsgBody 不符合消息格式描述，或者 MsgBody 不是 Array 类型，请参考 TIMMsgElement 对象的定义(").concat(dr, "269/2720").concat(hr, ")。"), 90003: "".concat("JSON 格式请求包体", "中缺少 To_Account 字段或者 To_Account 帐号不存在。"), 90005: "".concat("JSON 格式请求包体", "中缺少 MsgRandom 字段或者 MsgRandom 字段不是 Integer 类型。"), 90006: "".concat("JSON 格式请求包体", "中缺少 MsgTimeStamp 字段或者 MsgTimeStamp 字段不是 Integer 类型。"), 90007: "".concat("JSON 格式请求包体", "中 MsgBody 类型不是 Array 类型，请将其修改为 Array 类型。"), 90008: "".concat("JSON 格式请求包体", "中缺少 From_Account 字段或者 From_Account 帐号不存在。"), 90009: "请求需要 App 管理员权限。", 90010: "".concat("JSON 格式请求包体", "不符合消息格式描述，请参考 TIMMsgElement 对象的定义(").concat(dr, "269/2720").concat(hr, ")。"), 90011: "批量发消息目标帐号超过500，请减少 To_Account 中目标帐号数量。", 90012: "To_Account 没有注册或不存在，请确认 To_Account 是否导入即时通信 IM 或者是否拼写错误。", 90026: "消息离线存储时间错误（最多不能超过7天）。", 90031: "".concat("JSON 格式请求包体", "中 SyncOtherMachine 字段不是 Integer 类型。"), 90044: "".concat("JSON 格式请求包体", "中 MsgLifeTime 字段不是 Integer 类型。"), 90048: "请求的用户帐号不存在。", 90054: "撤回请求中的 MsgKey 不合法。", 90994: "".concat("服务端内部错误，请重试。"), 90995: "".concat("服务端内部错误，请重试。"), 91e3: "".concat("服务端内部错误，请重试。"), 90992: "".concat("服务端内部错误，请重试。", "如果所有请求都返回该错误码，且 App 配置了第三方回调，请检查 App 服务端是否正常向即时通信 IM 后台服务端返回回调结果。"), 93e3: "JSON 数据包超长，消息包体请不要超过8k。", 91101: "Web 端长轮询被踢（Web 端同时在线实例个数超出限制）。", 10002: "".concat("服务端内部错误，请重试。"), 10003: "请求中的接口名称错误，请核对接口名称并重试。", 10004: "参数非法，请根据错误描述检查请求是否正确。", 10005: "请求包体中携带的帐号数量过多。", 10006: "操作频率限制，请尝试降低调用的频率。", 10007: "操作权限不足，例如 Work ".concat("群组", "中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。"), 10008: "请求非法，可能是请求中携带的签名信息验证不正确，请再次尝试。", 10009: "该群不允许群主主动退出。", 10010: "".concat("群组", "不存在，或者曾经存在过，但是目前已经被解散。"), 10011: "解析 JSON 包体失败，请检查包体的格式是否符合 JSON 格式。", 10012: "发起操作的 UserID 非法，请检查发起操作的用户 UserID 是否填写正确。", 10013: "被邀请加入的用户已经是群成员。", 10014: "群已满员，无法将请求中的用户加入".concat("群组", "，如果是批量加人，可以尝试减少加入用户的数量。"), 10015: "找不到指定 ID 的".concat("群组", "。"), 10016: "App 后台通过第三方回调拒绝本次操作。", 10017: "因被禁言而不能发送消息，请检查发送者是否被设置禁言。", 10018: "应答包长度超过最大包长（1MB），请求的内容过多，请尝试减少单次请求的数据量。", 10019: "请求的用户帐号不存在。", 10021: "".concat("群组", " ID 已被使用，请选择其他的").concat("群组", " ID。"), 10023: "发消息的频率超限，请延长两次发消息时间的间隔。", 10024: "此邀请或者申请请求已经被处理。", 10025: "".concat("群组", " ID 已被使用，并且操作者为群主，可以直接使用。"), 10026: "该 SDKAppID 请求的命令字已被禁用。", 10030: "请求撤回的消息不存在。", 10031: "消息撤回超过了时间限制（默认2分钟）。", 10032: "请求撤回的消息不支持撤回操作。", 10033: "".concat("群组", "类型不支持消息撤回操作。"), 10034: "该消息类型不支持删除操作。", 10035: "直播群和在线成员广播大群不支持删除消息。", 10036: "直播群创建数量超过了限制，请参考价格说明(".concat(dr, "269/11673)购买预付费套餐“IM直播群”。"), 10037: "单个用户可创建和加入的".concat("群组", "数量超过了限制，请参考价格说明(").concat(dr, "269/11673)购买或升级预付费套餐“单人可创建与加入").concat("群组", "数”。"), 10038: "群成员数量超过限制，请参考价格说明(".concat(dr, "269/11673)购买或升级预付费套餐“扩展群人数上限”。"), 10041: "该应用（SDKAppID）已配置不支持群消息撤回。", 30001: "请求参数错误，请根据错误描述检查请求参数", 30002: "SDKAppID 不匹配", 30003: "请求的用户帐号不存在", 30004: "请求需要 App 管理员权限", 30005: "关系链字段中包含敏感词", 30006: "".concat("服务端内部错误，请重试。"), 30007: "".concat("网络超时，请稍后重试. "), 30008: "并发写导致写冲突，建议使用批量方式", 30009: "后台禁止该用户发起加好友请求", 30010: "自己的好友数已达系统上限", 30011: "分组已达系统上限", 30012: "未决数已达系统上限", 30014: "对方的好友数已达系统上限", 30515: "请求添加好友时，对方在自己的黑名单中，不允许加好友", 30516: "请求添加好友时，对方的加好友验证方式是不允许任何人添加自己为好友", 30525: "请求添加好友时，自己在对方的黑名单中，不允许加好友", 30539: "等待对方同意", 30540: "添加好友请求被安全策略打击，请勿频繁发起添加好友请求", 31704: "与请求删除的帐号之间不存在好友关系", 31707: "删除好友请求被安全策略打击，请勿频繁发起删除好友请求" },fr = function (e) {i(o, e);var n = f(o);function o(e) {var a;return t(this, o), (a = n.call(this)).code = e.code, a.message = _r[e.code] || e.message, a.data = e.data || {}, a;}return o;}(g(Error)),mr = null,Mr = function Mr(e) {mr = e;},vr = function vr(e) {return Promise.resolve(lr(e));},yr = function yr(e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e instanceof fr) return t && null !== mr && mr.emit(E.ERROR, e), Promise.reject(e);if (e instanceof Error) {var n = new fr({ code: eo.UNCAUGHT_ERROR, message: e.message });return t && null !== mr && mr.emit(E.ERROR, n), Promise.reject(n);}if (Re(e) || Re(e.code) || Re(e.message)) Ee.error("IMPromise.reject 必须指定code(错误码)和message(错误信息)!!!");else {if (Ce(e.code) && Ne(e.message)) {var o = new fr(e);return t && null !== mr && mr.emit(E.ERROR, o), Promise.reject(o);}Ee.error("IMPromise.reject code(错误码)必须为数字，message(错误信息)必须为字符串!!!");}},Ir = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "C2CModule", o;}return o(a, [{ key: "onNewC2CMessage", value: function value(e) {var t = e.dataList,n = e.isInstantMessage,o = e.C2CRemainingUnreadList;Ee.debug("".concat(this._className, ".onNewC2CMessage count:").concat(t.length, " isInstantMessage:").concat(n));var a = this._newC2CMessageStoredAndSummary({ dataList: t, C2CRemainingUnreadList: o, isInstantMessage: n }),s = a.conversationOptionsList,r = a.messageList;(this.filterModifiedMessage(r), s.length > 0) && this.getModule(Pt).onNewMessage({ conversationOptionsList: s, isInstantMessage: n });var i = this.filterUnmodifiedMessage(r);n && i.length > 0 && this.emitOuterEvent(E.MESSAGE_RECEIVED, i), r.length = 0;} }, { key: "_newC2CMessageStoredAndSummary", value: function value(e) {for (var t = e.dataList, n = e.C2CRemainingUnreadList, o = e.isInstantMessage, a = null, s = [], r = [], i = {}, c = this.getModule(Ft), u = 0, l = t.length; u < l; u++) {var d = t[u];d.currentUser = this.getMyUserID(), d.conversationType = k.CONV_C2C, d.isSystemMessage = !!d.isSystemMessage, a = new ur(d), d.elements = c.parseElements(d.elements, d.from), a.setElement(d.elements), a.setNickAndAvatar({ nick: d.nick, avatar: d.avatar });var g = a.conversationID;if (o) {var p = !1,h = this.getModule(Pt);if (a.from !== this.getMyUserID()) {var _ = h.getLatestMessageSentByPeer(g);if (_) {var f = _.nick,m = _.avatar;f === a.nick && m === a.avatar || (p = !0);}} else {var M = h.getLatestMessageSentByMe(g);if (M) {var v = M.nick,y = M.avatar;v === a.nick && y === a.avatar || h.modifyMessageSentByMe({ conversationID: g, latestNick: a.nick, latestAvatar: a.avatar });}}var I = 1 === t[u].isModified;if (h.isMessageSentByCurrentInstance(a) ? a.isModified = I : I = !1, 0 === d.msgLifeTime) a.setOnlineOnlyFlag(!0), r.push(a);else {if (!h.pushIntoMessageList(r, a, I)) continue;p && (h.modifyMessageSentByPeer(g), h.updateUserProfileSpecifiedKey({ conversationID: g, nick: a.nick, avatar: a.avatar }));}this.getModule($t).addMessageDelay({ currentTime: Date.now(), time: a.time });}if (0 !== d.msgLifeTime) {if (!1 === a.getOnlineOnlyFlag()) if (Re(i[g])) i[g] = s.push({ conversationID: g, unreadCount: "out" === a.flow ? 0 : 1, type: a.conversationType, subType: a.conversationSubType, lastMessage: a }) - 1;else {var T = i[g];s[T].type = a.conversationType, s[T].subType = a.conversationSubType, s[T].lastMessage = a, "in" === a.flow && s[T].unreadCount++;}} else a.setOnlineOnlyFlag(!0);}if (Le(n)) for (var D = function D(e, t) {var o = s.find(function (t) {return t.conversationID === "C2C".concat(n[e].from);});o ? o.unreadCount += n[e].count : s.push({ conversationID: "C2C".concat(n[e].from), unreadCount: n[e].count, type: k.CONV_C2C, lastMsgTime: n[e].lastMsgTime });}, S = 0, E = n.length; S < E; S++) {D(S);}return { conversationOptionsList: s, messageList: r };} }, { key: "onC2CMessageRevoked", value: function value(e) {var t = this;Ee.debug("".concat(this._className, ".onC2CMessageRevoked count:").concat(e.dataList.length));var n = this.getModule(Pt),o = [],a = null;e.dataList.forEach(function (e) {if (e.c2cMessageRevokedNotify) {var s = e.c2cMessageRevokedNotify.revokedInfos;Re(s) || s.forEach(function (e) {var s = t.getMyUserID() === e.from ? "".concat(k.CONV_C2C).concat(e.to) : "".concat(k.CONV_C2C).concat(e.from);(a = n.revoke(s, e.sequence, e.random)) && o.push(a);});}}), 0 !== o.length && (n.onMessageRevoked(o), this.emitOuterEvent(E.MESSAGE_REVOKED, o));} }, { key: "onC2CMessageReadReceipt", value: function value(e) {var t = this;e.dataList.forEach(function (e) {if (!gt(e.c2cMessageReadReceipt)) {var n = e.c2cMessageReadReceipt.to;e.c2cMessageReadReceipt.uinPairReadArray.forEach(function (e) {var o = e.peerReadTime;Ee.debug("".concat(t._className, "._onC2CMessageReadReceipt to:").concat(n, " peerReadTime:").concat(o));var a = "".concat(k.CONV_C2C).concat(n),s = t.getModule(Pt);s.recordPeerReadTime(a, o), s.updateMessageIsPeerReadProperty(a, o);});}});} }, { key: "onC2CMessageReadNotice", value: function value(e) {var t = this;e.dataList.forEach(function (e) {if (!gt(e.c2cMessageReadNotice)) {var n = t.getModule(Pt);e.c2cMessageReadNotice.uinPairReadArray.forEach(function (e) {var o = e.from,a = e.peerReadTime;Ee.debug("".concat(t._className, ".onC2CMessageReadNotice from:").concat(o, " lastReadTime:").concat(a));var s = "".concat(k.CONV_C2C).concat(o);n.updateIsReadAfterReadReport({ conversationID: s, lastMessageTime: a }), n.updateUnreadCount(s);});}});} }, { key: "sendMessage", value: function value(e, t) {var n = this._createC2CMessagePack(e, t);return this.request(n);} }, { key: "_createC2CMessagePack", value: function value(e, t) {var n = null;t && (t.offlinePushInfo && (n = t.offlinePushInfo), !0 === t.onlineUserOnly && (n ? n.disablePush = !0 : n = { disablePush: !0 }));var o = "";return Ne(e.cloudCustomData) && e.cloudCustomData.length > 0 && (o = e.cloudCustomData), { protocolName: en, tjgID: this.generateTjgID(e), requestData: { fromAccount: this.getMyUserID(), toAccount: e.to, msgTimeStamp: Math.ceil(Date.now() / 1e3), msgBody: e.getElements(), cloudCustomData: o, msgSeq: e.sequence, msgRandom: e.random, msgLifeTime: this.isOnlineMessage(e, t) ? 0 : void 0, nick: e.nick, avatar: e.avatar, offlinePushInfo: n ? { pushFlag: !0 === n.disablePush ? 1 : 0, title: n.title || "", desc: n.description || "", ext: n.extension || "", apnsInfo: { badgeMode: !0 === n.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: n.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "isOnlineMessage", value: function value(e, t) {return !(!t || !0 !== t.onlineUserOnly);} }, { key: "revokeMessage", value: function value(e) {return this.request({ protocolName: cn, requestData: { msgInfo: { fromAccount: e.from, toAccount: e.to, msgSeq: e.sequence, msgRandom: e.random, msgTimeStamp: e.time } } });} }, { key: "deleteMessage", value: function value(e) {var t = e.to,n = e.keyList;return Ee.log("".concat(this._className, ".deleteMessage toAccount:").concat(t, " count:").concat(n.length)), this.request({ protocolName: gn, requestData: { fromAccount: this.getMyUserID(), to: t, keyList: n } });} }, { key: "setMessageRead", value: function value(e) {var t = this,n = e.conversationID,o = e.lastMessageTime,a = "".concat(this._className, ".setMessageRead");Ee.log("".concat(a, " conversationID:").concat(n, " lastMessageTime:").concat(o)), Ce(o) || Ee.warn("".concat(a, " 请勿修改 Conversation.lastMessage.lastTime，否则可能会导致已读上报结果不准确"));var s = new Sa(Ba);return s.setMessage("conversationID:".concat(n, " lastMessageTime:").concat(o)), this.request({ protocolName: un, requestData: { C2CMsgReaded: { cookie: "", C2CMsgReadedItem: [{ toAccount: n.replace("C2C", ""), lastMessageTime: o, receipt: 1 }] } } }).then(function () {s.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(a, " ok"));var e = t.getModule(Pt);return e.updateIsReadAfterReadReport({ conversationID: n, lastMessageTime: o }), e.updateUnreadCount(n), lr();}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];s.setError(e, o, a).end();}), Ee.log("".concat(a, " failed. error:"), e), yr(e);});} }, { key: "getRoamingMessage", value: function value(e) {var t = this,n = "".concat(this._className, ".getRoamingMessage"),o = e.peerAccount,a = e.conversationID,s = e.count,r = e.lastMessageTime,i = e.messageKey,c = "peerAccount:".concat(o, " count:").concat(s || 15, " lastMessageTime:").concat(r || 0, " messageKey:").concat(i);Ee.log("".concat(n, " ").concat(c));var u = new Sa(qa);return this.request({ protocolName: ln, requestData: { peerAccount: o, count: s || 15, lastMessageTime: r || 0, messageKey: i } }).then(function (e) {var o = e.data,s = o.complete,r = o.messageList,i = o.messageKey;Re(r) ? Ee.log("".concat(n, " ok. complete:").concat(s, " but messageList is undefined!")) : Ee.log("".concat(n, " ok. complete:").concat(s, " count:").concat(r.length)), u.setNetworkType(t.getNetworkType()).setMessage("".concat(c, " complete:").concat(s, " length:").concat(r.length)).end();var l = t.getModule(Pt);1 === s && l.setCompleted(a);var d = l.storeRoamingMessage(r, a);l.modifyMessageList(a), l.updateIsRead(a), l.updateRoamingMessageKey(a, i);var g = l.getPeerReadTime(a);if (Ee.log("".concat(n, " update isPeerRead property. conversationID:").concat(a, " peerReadTime:").concat(g)), g) l.updateMessageIsPeerReadProperty(a, g);else {var p = a.replace(k.CONV_C2C, "");t.getRemotePeerReadTime([p]).then(function () {l.updateMessageIsPeerReadProperty(a, l.getPeerReadTime(a));});}return d;}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];u.setMessage(c).setError(e, o, a).end();}), Ee.warn("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "getRemotePeerReadTime", value: function value(e) {var t = this,n = "".concat(this._className, ".getRemotePeerReadTime");if (gt(e)) return Ee.warn("".concat(n, " userIDList is empty!")), Promise.resolve();var o = new Sa(Ya);return Ee.log("".concat(n, " userIDList:").concat(e)), this.request({ protocolName: dn, requestData: { userIDList: e } }).then(function (a) {var s = a.data.peerReadTimeList;Ee.log("".concat(n, " ok. peerReadTimeList:").concat(s));for (var r = "", i = t.getModule(Pt), c = 0; c < e.length; c++) {r += "".concat(e[c], "-").concat(s[c], " "), s[c] > 0 && i.recordPeerReadTime("C2C".concat(e[c]), s[c]);}o.setNetworkType(t.getNetworkType()).setMessage(r).end();}).catch(function (e) {t.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.warn("".concat(n, " failed. error:"), e);});} }]), a;}(zt),Tr = function () {function e(n) {t(this, e), this.list = new Map(), this._className = "MessageListHandler", this._latestMessageSentByPeerMap = new Map(), this._latestMessageSentByMeMap = new Map(), this._groupLocalLastMessageSequenceMap = new Map();}return o(e, [{ key: "getLocalOldestMessageByConversationID", value: function value(e) {if (!e) return null;if (!this.list.has(e)) return null;var t = this.list.get(e).values();return t ? t.next().value : null;} }, { key: "pushIn", value: function value(e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],n = e.conversationID,o = e.ID,a = !0;this.list.has(n) || this.list.set(n, new Map());var s = this.list.get(n).has(o);if (s) {var r = this.list.get(n).get(o);if (!t || !0 === r.isModified) return a = !1;}return this.list.get(n).set(o, e), this._setLatestMessageSentByPeer(n, e), this._setLatestMessageSentByMe(n, e), this._setGroupLocalLastMessageSequence(n, e), a;} }, { key: "unshift", value: function value(e) {var t;if (Le(e)) {if (e.length > 0) {t = e[0].conversationID;var n = e.length;this._unshiftMultipleMessages(e), this._setGroupLocalLastMessageSequence(t, e[n - 1]);}} else t = e.conversationID, this._unshiftSingleMessage(e), this._setGroupLocalLastMessageSequence(t, e);if (t && t.startsWith(k.CONV_C2C)) {var o = Array.from(this.list.get(t).values()),a = o.length;if (0 === a) return;for (var s = a - 1; s >= 0; s--) {if ("out" === o[s].flow) {this._setLatestMessageSentByMe(t, o[s]);break;}}for (var r = a - 1; r >= 0; r--) {if ("in" === o[r].flow) {this._setLatestMessageSentByPeer(t, o[r]);break;}}}} }, { key: "_unshiftSingleMessage", value: function value(e) {var t = e.conversationID,n = e.ID;if (!this.list.has(t)) return this.list.set(t, new Map()), void this.list.get(t).set(n, e);var o = Array.from(this.list.get(t));o.unshift([n, e]), this.list.set(t, new Map(o));} }, { key: "_unshiftMultipleMessages", value: function value(e) {for (var t = e.length, n = [], o = e[0].conversationID, a = this.list.has(o) ? Array.from(this.list.get(o)) : [], s = 0; s < t; s++) {n.push([e[s].ID, e[s]]);}this.list.set(o, new Map(n.concat(a)));} }, { key: "remove", value: function value(e) {var t = e.conversationID,n = e.ID;this.list.has(t) && this.list.get(t).delete(n);} }, { key: "revoke", value: function value(e, t, n) {if (Ee.debug("revoke message", e, t, n), this.list.has(e)) {var o,a = S(this.list.get(e));try {for (a.s(); !(o = a.n()).done;) {var s = m(o.value, 2)[1];if (s.sequence === t && !s.isRevoked && (Re(n) || s.random === n)) return s.isRevoked = !0, s;}} catch (r) {a.e(r);} finally {a.f();}}return null;} }, { key: "removeByConversationID", value: function value(e) {this.list.has(e) && (this.list.delete(e), this._latestMessageSentByPeerMap.delete(e), this._latestMessageSentByMeMap.delete(e));} }, { key: "updateMessageIsPeerReadProperty", value: function value(e, t) {var n = [];if (this.list.has(e)) {var o,a = S(this.list.get(e));try {for (a.s(); !(o = a.n()).done;) {var s = m(o.value, 2)[1];s.time <= t && !s.isPeerRead && "out" === s.flow && (s.isPeerRead = !0, n.push(s));}} catch (r) {a.e(r);} finally {a.f();}Ee.log("".concat(this._className, ".updateMessageIsPeerReadProperty conversationID:").concat(e, " peerReadTime:").concat(t, " count:").concat(n.length));}return n;} }, { key: "updateMessageIsModifiedProperty", value: function value(e) {var t = e.conversationID,n = e.ID;if (this.list.has(t)) {var o = this.list.get(t).get(n);o && (o.isModified = !0);}} }, { key: "hasLocalMessageList", value: function value(e) {return this.list.has(e);} }, { key: "getLocalMessageList", value: function value(e) {return this.hasLocalMessageList(e) ? M(this.list.get(e).values()) : [];} }, { key: "hasLocalMessage", value: function value(e, t) {return !!this.hasLocalMessageList(e) && this.list.get(e).has(t);} }, { key: "getLocalMessage", value: function value(e, t) {return this.hasLocalMessage(e, t) ? this.list.get(e).get(t) : null;} }, { key: "_setLatestMessageSentByPeer", value: function value(e, t) {e.startsWith(k.CONV_C2C) && "in" === t.flow && this._latestMessageSentByPeerMap.set(e, t);} }, { key: "_setLatestMessageSentByMe", value: function value(e, t) {e.startsWith(k.CONV_C2C) && "out" === t.flow && this._latestMessageSentByMeMap.set(e, t);} }, { key: "_setGroupLocalLastMessageSequence", value: function value(e, t) {e.startsWith(k.CONV_GROUP) && this._groupLocalLastMessageSequenceMap.set(e, t.sequence);} }, { key: "getLatestMessageSentByPeer", value: function value(e) {return this._latestMessageSentByPeerMap.get(e);} }, { key: "getLatestMessageSentByMe", value: function value(e) {return this._latestMessageSentByMeMap.get(e);} }, { key: "getGroupLocalLastMessageSequence", value: function value(e) {return this._groupLocalLastMessageSequenceMap.get(e) || 0;} }, { key: "modifyMessageSentByPeer", value: function value(e, t) {var n = this.list.get(e);if (!gt(n)) {var o = Array.from(n.values()),a = o.length;if (0 !== a) {var s = null,r = null;t && (r = t);for (var i = 0, c = !1, u = a - 1; u >= 0; u--) {"in" === o[u].flow && (null === r ? r = o[u] : ((s = o[u]).nick !== r.nick && (s.setNickAndAvatar({ nick: r.nick }), c = !0), s.avatar !== r.avatar && (s.setNickAndAvatar({ avatar: r.avatar }), c = !0), c && (i += 1)));}Ee.log("".concat(this._className, ".modifyMessageSentByPeer conversationID:").concat(e, " count:").concat(i));}}} }, { key: "modifyMessageSentByMe", value: function value(e) {var t = e.conversationID,n = e.latestNick,o = e.latestAvatar,a = this.list.get(t);if (!gt(a)) {var s = Array.from(a.values()),r = s.length;if (0 !== r) {for (var i = null, c = 0, u = !1, l = r - 1; l >= 0; l--) {"out" === s[l].flow && ((i = s[l]).nick !== n && (i.setNickAndAvatar({ nick: n }), u = !0), i.avatar !== o && (i.setNickAndAvatar({ avatar: o }), u = !0), u && (c += 1));}Ee.log("".concat(this._className, ".modifyMessageSentByMe conversationID:").concat(t, " count:").concat(c));}}} }, { key: "traversal", value: function value() {if (0 !== this.list.size && -1 === Ee.getLevel()) {console.group("conversationID-messageCount");var e,t = S(this.list);try {for (t.s(); !(e = t.n()).done;) {var n = m(e.value, 2),o = n[0],a = n[1];console.log("".concat(o, "-").concat(a.size));}} catch (s) {t.e(s);} finally {t.f();}console.groupEnd();}} }, { key: "reset", value: function value() {this.list.clear(), this._latestMessageSentByPeerMap.clear(), this._latestMessageSentByMeMap.clear(), this._groupLocalLastMessageSequenceMap.clear();} }]), e;}(),Dr = { CONTEXT_A2KEY_AND_TINYID_UPDATED: "_a2KeyAndTinyIDUpdated", CLOUD_CONFIG_UPDATED: "_cloudConfigUpdated" };function Sr(e) {this.mixin(e);}Sr.mixin = function (e) {var t = e.prototype || e;t._isReady = !1, t.ready = function (e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e) return this._isReady ? void (t ? e.call(this) : setTimeout(e, 1)) : (this._readyQueue = this._readyQueue || [], void this._readyQueue.push(e));}, t.triggerReady = function () {var e = this;this._isReady = !0, setTimeout(function () {var t = e._readyQueue;e._readyQueue = [], t && t.length > 0 && t.forEach(function (e) {e.call(this);}, e);}, 1);}, t.resetReady = function () {this._isReady = !1, this._readyQueue = [];}, t.isReady = function () {return this._isReady;};};var Er = ["jpg", "jpeg", "gif", "png", "bmp"],kr = ["mp4"],Cr = 1,Nr = 2,Ar = 3,Or = 255,Lr = function () {function e(n) {var o = this;t(this, e), gt(n) || (this.userID = n.userID || "", this.nick = n.nick || "", this.gender = n.gender || "", this.birthday = n.birthday || 0, this.location = n.location || "", this.selfSignature = n.selfSignature || "", this.allowType = n.allowType || k.ALLOW_TYPE_ALLOW_ANY, this.language = n.language || 0, this.avatar = n.avatar || "", this.messageSettings = n.messageSettings || 0, this.adminForbidType = n.adminForbidType || k.FORBID_TYPE_NONE, this.level = n.level || 0, this.role = n.role || 0, this.lastUpdatedTime = 0, this.profileCustomField = [], gt(n.profileCustomField) || n.profileCustomField.forEach(function (e) {o.profileCustomField.push({ key: e.key, value: e.value });}));}return o(e, [{ key: "validate", value: function value(e) {var t = !0,n = "";if (gt(e)) return { valid: !1, tips: "empty options" };if (e.profileCustomField) for (var o = e.profileCustomField.length, a = null, s = 0; s < o; s++) {if (a = e.profileCustomField[s], !Ne(a.key) || -1 === a.key.indexOf("Tag_Profile_Custom")) return { valid: !1, tips: "自定义资料字段的前缀必须是 Tag_Profile_Custom" };if (!Ne(a.value)) return { valid: !1, tips: "自定义资料字段的 value 必须是字符串" };}for (var r in e) {if (Object.prototype.hasOwnProperty.call(e, r)) {if ("profileCustomField" === r) continue;if (gt(e[r]) && !Ne(e[r]) && !Ce(e[r])) {n = "key:" + r + ", invalid value:" + e[r], t = !1;continue;}switch (r) {case "nick":Ne(e[r]) || (n = "nick should be a string", t = !1), xe(e[r]) > 500 && (n = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(xe(e[r]), " bytes"), t = !1);break;case "gender":Ye(Hs, e.gender) || (n = "key:gender, invalid value:" + e.gender, t = !1);break;case "birthday":Ce(e.birthday) || (n = "birthday should be a number", t = !1);break;case "location":Ne(e.location) || (n = "location should be a string", t = !1);break;case "selfSignature":Ne(e.selfSignature) || (n = "selfSignature should be a string", t = !1);break;case "allowType":Ye(Ys, e.allowType) || (n = "key:allowType, invalid value:" + e.allowType, t = !1);break;case "language":Ce(e.language) || (n = "language should be a number", t = !1);break;case "avatar":Ne(e.avatar) || (n = "avatar should be a string", t = !1);break;case "messageSettings":0 !== e.messageSettings && 1 !== e.messageSettings && (n = "messageSettings should be 0 or 1", t = !1);break;case "adminForbidType":Ye(js, e.adminForbidType) || (n = "key:adminForbidType, invalid value:" + e.adminForbidType, t = !1);break;case "level":Ce(e.level) || (n = "level should be a number", t = !1);break;case "role":Ce(e.role) || (n = "role should be a number", t = !1);break;default:n = "unknown key:" + r + "  " + e[r], t = !1;}}}return { valid: t, tips: n };} }]), e;}(),Rr = function e(n) {t(this, e), this.value = n, this.next = null;},Pr = function () {function e(n) {t(this, e), this.MAX_LENGTH = n, this.pTail = null, this.pNodeToDel = null, this.map = new Map(), Ee.debug("SinglyLinkedList init MAX_LENGTH:".concat(this.MAX_LENGTH));}return o(e, [{ key: "set", value: function value(e) {var t = new Rr(e);if (this.map.size < this.MAX_LENGTH) null === this.pTail ? (this.pTail = t, this.pNodeToDel = t) : (this.pTail.next = t, this.pTail = t), this.map.set(e, 1);else {var n = this.pNodeToDel;this.pNodeToDel = this.pNodeToDel.next, this.map.delete(n.value), n.next = null, n = null, this.pTail.next = t, this.pTail = t, this.map.set(e, 1);}} }, { key: "has", value: function value(e) {return this.map.has(e);} }, { key: "delete", value: function value(e) {this.has(e) && this.map.delete(e);} }, { key: "tail", value: function value() {return this.pTail;} }, { key: "size", value: function value() {return this.map.size;} }, { key: "data", value: function value() {return Array.from(this.map.keys());} }, { key: "reset", value: function value() {for (var e; null !== this.pNodeToDel;) {e = this.pNodeToDel, this.pNodeToDel = this.pNodeToDel.next, e.next = null, e = null;}this.pTail = null, this.map.clear();} }]), e;}(),wr = ["groupID", "name", "avatar", "type", "introduction", "notification", "ownerID", "selfInfo", "createTime", "infoSequence", "lastInfoTime", "lastMessage", "nextMessageSeq", "memberNum", "maxMemberNum", "memberList", "joinOption", "groupCustomField", "muteAllMembers"],Gr = function () {function e(n) {t(this, e), this.groupID = "", this.name = "", this.avatar = "", this.type = "", this.introduction = "", this.notification = "", this.ownerID = "", this.createTime = "", this.infoSequence = "", this.lastInfoTime = "", this.selfInfo = { messageRemindType: "", joinTime: "", nameCard: "", role: "" }, this.lastMessage = { lastTime: "", lastSequence: "", fromAccount: "", messageForShow: "" }, this.nextMessageSeq = "", this.memberNum = "", this.memberCount = "", this.maxMemberNum = "", this.maxMemberCount = "", this.joinOption = "", this.groupCustomField = [], this.muteAllMembers = void 0, this._initGroup(n);}return o(e, [{ key: "_initGroup", value: function value(e) {for (var t in e) {wr.indexOf(t) < 0 || ("selfInfo" !== t ? ("memberNum" === t && (this.memberCount = e[t]), "maxMemberNum" === t && (this.maxMemberCount = e[t]), this[t] = e[t]) : this.updateSelfInfo(e[t]));}} }, { key: "updateGroup", value: function value(e) {var t = JSON.parse(JSON.stringify(e));t.lastMsgTime && (this.lastMessage.lastTime = t.lastMsgTime), Re(t.muteAllMembers) || ("On" === t.muteAllMembers ? t.muteAllMembers = !0 : t.muteAllMembers = !1), t.groupCustomField && Xe(this.groupCustomField, t.groupCustomField), Re(t.memberNum) || (this.memberCount = t.memberNum), Re(t.maxMemberNum) || (this.maxMemberCount = t.maxMemberNum), Ve(this, t, ["members", "errorCode", "lastMsgTime", "groupCustomField", "memberNum", "maxMemberNum"]);} }, { key: "updateSelfInfo", value: function value(e) {var t = e.nameCard,n = e.joinTime,o = e.role,a = e.messageRemindType;Ve(this.selfInfo, { nameCard: t, joinTime: n, role: o, messageRemindType: a }, [], ["", null, void 0, 0, NaN]);} }, { key: "setSelfNameCard", value: function value(e) {this.selfInfo.nameCard = e;} }, { key: "memberNum", set: function set(e) {}, get: function get() {return Ee.warn("！！！v2.8.0起弃用memberNum，请使用 memberCount"), this.memberCount;} }, { key: "maxMemberNum", set: function set(e) {}, get: function get() {return Ee.warn("！！！v2.8.0起弃用maxMemberNum，请使用 maxMemberCount"), this.maxMemberCount;} }]), e;}(),br = function br(e, t) {if (Re(t)) return "";switch (e) {case k.MSG_TEXT:return t.text;case k.MSG_IMAGE:return "[图片]";case k.MSG_GEO:return "[位置]";case k.MSG_AUDIO:return "[语音]";case k.MSG_VIDEO:return "[视频]";case k.MSG_FILE:return "[文件]";case k.MSG_CUSTOM:return "[自定义消息]";case k.MSG_GRP_TIP:return "[群提示消息]";case k.MSG_GRP_SYS_NOTICE:return "[群系统通知]";case k.MSG_FACE:return "[动画表情]";case k.MSG_MERGER:return "[聊天记录]";default:return "";}},Ur = function Ur(e) {return Re(e) ? { lastTime: 0, lastSequence: 0, fromAccount: 0, messageForShow: "", payload: null, type: "", isRevoked: !1, cloudCustomData: "", onlineOnlyFlag: !1 } : e instanceof ur ? { lastTime: e.time || 0, lastSequence: e.sequence || 0, fromAccount: e.from || "", messageForShow: br(e.type, e.payload), payload: e.payload || null, type: e.type || null, isRevoked: e.isRevoked || !1, cloudCustomData: e.cloudCustomData || "", onlineOnlyFlag: !!we(e.getOnlineOnlyFlag) && e.getOnlineOnlyFlag() } : r({}, e, { messageForShow: br(e.type, e.payload) });},Fr = function () {function e(n) {t(this, e), this.conversationID = n.conversationID || "", this.unreadCount = n.unreadCount || 0, this.type = n.type || "", this.lastMessage = Ur(n.lastMessage), n.lastMsgTime && (this.lastMessage.lastTime = n.lastMsgTime), this._isInfoCompleted = !1, this.peerReadTime = n.peerReadTime || 0, this.groupAtInfoList = [], this.remark = "", this._initProfile(n);}return o(e, [{ key: "_initProfile", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "userProfile":t.userProfile = e.userProfile;break;case "groupProfile":t.groupProfile = e.groupProfile;}}), Re(this.userProfile) && this.type === k.CONV_C2C ? this.userProfile = new Lr({ userID: e.conversationID.replace("C2C", "") }) : Re(this.groupProfile) && this.type === k.CONV_GROUP && (this.groupProfile = new Gr({ groupID: e.conversationID.replace("GROUP", "") }));} }, { key: "updateUnreadCount", value: function value(e, t) {Re(e) || (Ze(this.subType) ? this.unreadCount = 0 : t && this.type === k.CONV_GROUP ? this.unreadCount = e : this.unreadCount = this.unreadCount + e);} }, { key: "updateLastMessage", value: function value(e) {this.lastMessage = Ur(e);} }, { key: "updateGroupAtInfoList", value: function value(e) {var t,n = (v(t = e.groupAtType) || y(t) || I(t) || D()).slice(0);-1 !== n.indexOf(k.CONV_AT_ME) && -1 !== n.indexOf(k.CONV_AT_ALL) && (n = [k.CONV_AT_ALL_AT_ME]);var o = { from: e.from, groupID: e.groupID, messageSequence: e.sequence, atTypeArray: n, __random: e.__random, __sequence: e.__sequence };this.groupAtInfoList.push(o), Ee.debug("Conversation.updateGroupAtInfoList conversationID:".concat(this.conversationID), this.groupAtInfoList);} }, { key: "clearGroupAtInfoList", value: function value() {this.groupAtInfoList.length = 0;} }, { key: "reduceUnreadCount", value: function value() {this.unreadCount >= 1 && (this.unreadCount -= 1);} }, { key: "isLastMessageRevoked", value: function value(e) {var t = e.sequence,n = e.time;return this.type === k.CONV_C2C && t === this.lastMessage.lastSequence && n === this.lastMessage.lastTime || this.type === k.CONV_GROUP && t === this.lastMessage.lastSequence;} }, { key: "setLastMessageRevoked", value: function value(e) {this.lastMessage.isRevoked = e;} }, { key: "toAccount", get: function get() {return this.conversationID.replace("C2C", "").replace("GROUP", "");} }, { key: "subType", get: function get() {return this.groupProfile ? this.groupProfile.type : "";} }]), e;}(),qr = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "ConversationModule", Sr.mixin(h(o)), o._messageListHandler = new Tr(), o.singlyLinkedList = new Pr(100), o._pagingStatus = mt.NOT_START, o._pagingTimeStamp = 0, o._conversationMap = new Map(), o._tmpGroupList = [], o._tmpGroupAtTipsList = [], o._peerReadTimeMap = new Map(), o._completedMap = new Map(), o._roamingMessageKeyMap = new Map(), o._initListeners(), o;}return o(a, [{ key: "_initListeners", value: function value() {this.getInnerEmitterInstance().on(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initLocalConversationList, this);} }, { key: "onCheckTimer", value: function value(e) {e % 60 == 0 && this._messageListHandler.traversal();} }, { key: "_initLocalConversationList", value: function value() {var e = this,t = new Sa(es);Ee.log("".concat(this._className, "._initLocalConversationList."));var n = "",o = this._getStorageConversationList();if (o) {for (var a = o.length, s = 0; s < a; s++) {var r = o[s];if (r && r.groupProfile) {var i = r.groupProfile.type;if (Ze(i)) continue;}this._conversationMap.set(o[s].conversationID, new Fr(o[s]));}this._emitConversationUpdate(!0, !1), n = "count:".concat(a);} else n = "count:0";t.setNetworkType(this.getNetworkType()).setMessage(n).end(), this.getModule(At) || this.triggerReady(), this.ready(function () {e._tmpGroupList.length > 0 && (e.updateConversationGroupProfile(e._tmpGroupList), e._tmpGroupList.length = 0);}), this._syncConversationList();} }, { key: "onMessageSent", value: function value(e) {this._onSendOrReceiveMessage(e.conversationOptionsList, !0);} }, { key: "onNewMessage", value: function value(e) {this._onSendOrReceiveMessage(e.conversationOptionsList, e.isInstantMessage);} }, { key: "_onSendOrReceiveMessage", value: function value(e) {var t = this,n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];this._isReady ? 0 !== e.length && (this._getC2CPeerReadTime(e), this._updateLocalConversationList(e, !1, n), this._setStorageConversationList(), this._emitConversationUpdate()) : this.ready(function () {t._onSendOrReceiveMessage(e, n);});} }, { key: "updateConversationGroupProfile", value: function value(e) {var t = this;Le(e) && 0 === e.length || (0 !== this._conversationMap.size ? (e.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t._conversationMap.has(n)) {var o = t._conversationMap.get(n);o.groupProfile = e, o.lastMessage.lastSequence < e.nextMessageSeq && (o.lastMessage.lastSequence = e.nextMessageSeq - 1), o.subType || (o.subType = e.type);}}), this._emitConversationUpdate(!0, !1)) : this._tmpGroupList = e);} }, { key: "_updateConversationUserProfile", value: function value(e) {var t = this;e.data.forEach(function (e) {var n = "C2C".concat(e.userID);t._conversationMap.has(n) && (t._conversationMap.get(n).userProfile = e);}), this._emitConversationUpdate(!0, !1);} }, { key: "onMessageRevoked", value: function value(e) {var t = this;if (0 !== e.length) {var n = null,o = !1;e.forEach(function (e) {(n = t._conversationMap.get(e.conversationID)) && n.isLastMessageRevoked(e) && (o = !0, n.setLastMessageRevoked(!0));}), o && this._emitConversationUpdate(!0, !1);}} }, { key: "onMessageDeleted", value: function value(e) {if (0 !== e.length) {e.forEach(function (e) {e.isDeleted = !0;});for (var t = e[0].conversationID, n = this._messageListHandler.getLocalMessageList(t), o = {}, a = n.length - 1; a > 0; a--) {if (!n[a].isDeleted) {o = n[a];break;}}var s = this._conversationMap.get(t);if (s) {var r = !1;s.lastMessage.lastSequence !== o.sequence && s.lastMessage.lastTime !== o.time && (s.updateLastMessage(o), r = !0, Ee.log("".concat(this._className, ".onMessageDeleted. update conversationID:").concat(t, " with lastMessage:"), s.lastMessage)), t.startsWith(k.CONV_C2C) && this.updateUnreadCount(t), r && this._emitConversationUpdate(!0, !1);}}} }, { key: "onNewGroupAtTips", value: function value(e) {var t = this,n = e.dataList,o = null;n.forEach(function (e) {e.groupAtTips ? o = e.groupAtTips : e.elements && (o = e.elements), o.__random = e.random, o.__sequence = e.clientSequence, t._tmpGroupAtTipsList.push(o);}), Ee.debug("".concat(this._className, ".onNewGroupAtTips isReady:").concat(this._isReady), this._tmpGroupAtTipsList), this._isReady && this._handleGroupAtTipsList();} }, { key: "_handleGroupAtTipsList", value: function value() {var e = this;if (0 !== this._tmpGroupAtTipsList.length) {var t = !1;this._tmpGroupAtTipsList.forEach(function (n) {var o = n.groupID;if (n.from !== e.getMyUserID()) {var a = e._conversationMap.get("".concat(k.CONV_GROUP).concat(o));a && (a.updateGroupAtInfoList(n), t = !0);}}), t && this._emitConversationUpdate(!0, !1), this._tmpGroupAtTipsList.length = 0;}} }, { key: "_getC2CPeerReadTime", value: function value(e) {var t = this,n = [];if (e.forEach(function (e) {t._conversationMap.has(e.conversationID) || e.type !== k.CONV_C2C || n.push(e.conversationID.replace(k.CONV_C2C, ""));}), n.length > 0) {Ee.debug("".concat(this._className, "._getC2CPeerReadTime userIDList:").concat(n));var o = this.getModule(At);o && o.getRemotePeerReadTime(n);}} }, { key: "_getStorageConversationList", value: function value() {return this.getModule(Gt).getItem("conversationMap");} }, { key: "_setStorageConversationList", value: function value() {var e = this.getLocalConversationList().slice(0, 20).map(function (e) {return { conversationID: e.conversationID, type: e.type, subType: e.subType, lastMessage: e.lastMessage, groupProfile: e.groupProfile, userProfile: e.userProfile };});this.getModule(Gt).setItem("conversationMap", e);} }, { key: "_emitConversationUpdate", value: function value() {var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],n = M(this._conversationMap.values());if (t) {var o = this.getModule(Ot);o && o.updateGroupLastMessage(n);}e && this.emitOuterEvent(E.CONVERSATION_LIST_UPDATED, n);} }, { key: "getLocalConversationList", value: function value() {return M(this._conversationMap.values());} }, { key: "getLocalConversation", value: function value(e) {return this._conversationMap.get(e);} }, { key: "_syncConversationList", value: function value() {var e = this,t = new Sa(ts);return this._pagingStatus === mt.NOT_START && this._conversationMap.clear(), this._pagingGetConversationList().then(function (n) {return e._pagingStatus = mt.RESOLVED, e._setStorageConversationList(), e._handleC2CPeerReadTime(), e.checkAndPatchRemark(), t.setMessage(e._conversationMap.size).setNetworkType(e.getNetworkType()).end(), n;}).catch(function (n) {return e._pagingStatus = mt.REJECTED, t.setMessage(e._pagingTimeStamp), e.probeNetwork().then(function (e) {var o = m(e, 2),a = o[0],s = o[1];t.setError(n, a, s).end();}), yr(n);});} }, { key: "_pagingGetConversationList", value: function value() {var e = this,t = "".concat(this._className, "._pagingGetConversationList");return this._pagingStatus = mt.PENDING, this.request({ protocolName: pn, requestData: { fromAccount: this.getMyUserID(), timeStamp: this._pagingTimeStamp, orderType: 1, messageAssistFlags: 4 } }).then(function (n) {var o = n.data,a = o.completeFlag,s = o.conversations,r = void 0 === s ? [] : s,i = o.timeStamp;if (Ee.log("".concat(t, " completeFlag:").concat(a, " count:").concat(r.length)), r.length > 0) {var c = e._getConversationOptions(r);e._updateLocalConversationList(c, !0);}if (e._isReady) e._emitConversationUpdate();else {if (!e.isLoggedIn()) return vr();e.triggerReady();}return e._pagingTimeStamp = i, 1 !== a ? e._pagingGetConversationList() : (e._handleGroupAtTipsList(), vr());}).catch(function (n) {throw e.isLoggedIn() && (e._isReady || (Ee.warn("".concat(t, " failed. error:"), n), e.triggerReady())), n;});} }, { key: "_updateLocalConversationList", value: function value(e, t, n) {var o,a = Date.now();o = this._getTmpConversationListMapping(e, t, n), this._conversationMap = new Map(this._sortConversationList([].concat(M(o.toBeUpdatedConversationList), M(this._conversationMap)))), t || this._updateUserOrGroupProfile(o.newConversationList), Ee.debug("".concat(this._className, "._updateLocalConversationList cost ").concat(Date.now() - a, " ms"));} }, { key: "_getTmpConversationListMapping", value: function value(e, t, n) {for (var o = [], a = [], s = this.getModule(Ot), r = this.getModule(Lt), i = 0, c = e.length; i < c; i++) {var u = new Fr(e[i]),l = u.conversationID;if (this._conversationMap.has(l)) {var d = this._conversationMap.get(l),g = ["unreadCount", "allowType", "adminForbidType", "payload"];n || g.push("lastMessage"), Ve(d, u, g, [null, void 0, "", 0, NaN]), d.updateUnreadCount(u.unreadCount, t), n && (d.lastMessage.payload = e[i].lastMessage.payload), e[i].lastMessage && d.lastMessage.cloudCustomData !== e[i].lastMessage.cloudCustomData && (d.lastMessage.cloudCustomData = e[i].lastMessage.cloudCustomData || ""), this._conversationMap.delete(l), o.push([l, d]);} else {if (u.type === k.CONV_GROUP && s) {var p = u.groupProfile.groupID,h = s.getLocalGroupProfile(p);h && (u.groupProfile = h, u.updateUnreadCount(0));} else if (u.type === k.CONV_C2C) {var _ = l.replace(k.CONV_C2C, "");r && r.isMyFriend(_) && (u.remark = r.getFriendRemark(_));}a.push(u), o.push([l, u]);}}return { toBeUpdatedConversationList: o, newConversationList: a };} }, { key: "_sortConversationList", value: function value(e) {return e.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;});} }, { key: "_updateUserOrGroupProfile", value: function value(e) {var t = this;if (0 !== e.length) {var n = [],o = [],a = this.getModule(Nt),s = this.getModule(Ot);e.forEach(function (e) {if (e.type === k.CONV_C2C) n.push(e.toAccount);else if (e.type === k.CONV_GROUP) {var t = e.toAccount;s.hasLocalGroup(t) ? e.groupProfile = s.getLocalGroupProfile(t) : o.push(t);}}), Ee.log("".concat(this._className, "._updateUserOrGroupProfile c2cUserIDList:").concat(n, " groupIDList:").concat(o)), n.length > 0 && a.getUserProfile({ userIDList: n }).then(function (e) {var n = e.data;Le(n) ? n.forEach(function (e) {t._conversationMap.get("C2C".concat(e.userID)).userProfile = e;}) : t._conversationMap.get("C2C".concat(n.userID)).userProfile = n;}), o.length > 0 && s.getGroupProfileAdvance({ groupIDList: o, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "FaceUrl"] } }).then(function (e) {e.data.successGroupList.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t._conversationMap.has(n)) {var o = t._conversationMap.get(n);Ve(o.groupProfile, e, [], [null, void 0, "", 0, NaN]), !o.subType && e.type && (o.subType = e.type);}});});}} }, { key: "_getConversationOptions", value: function value(e) {var t = [],n = e.filter(function (e) {var t = e.lastMsg;return Oe(t);}).map(function (e) {if (1 === e.type) {var n = { userID: e.userID, nick: e.c2CNick, avatar: e.c2CImage };return t.push(n), { conversationID: "C2C".concat(e.userID), type: "C2C", lastMessage: { lastTime: e.time, lastSequence: e.sequence, fromAccount: e.lastC2CMsgFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null, cloudCustomData: e.cloudCustomData || "", isRevoked: 8 === e.lastMessageFlag, onlineOnlyFlag: !1 }, userProfile: new Lr(n), peerReadTime: e.c2cPeerReadTime };}return { conversationID: "GROUP".concat(e.groupID), type: "GROUP", lastMessage: { lastTime: e.time, lastSequence: e.messageReadSeq + e.unreadCount, fromAccount: e.msgGroupFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null, cloudCustomData: e.cloudCustomData || "", isRevoked: 2 === e.lastMessageFlag, onlineOnlyFlag: !1 }, groupProfile: new Gr({ groupID: e.groupID, name: e.groupNick, avatar: e.groupImage }), unreadCount: e.unreadCount, peerReadTime: 0 };});t.length > 0 && this.getModule(Nt).onConversationsProfileUpdated(t);return n;} }, { key: "getLocalMessageList", value: function value(e) {return this._messageListHandler.getLocalMessageList(e);} }, { key: "deleteLocalMessage", value: function value(e) {e instanceof ur && this._messageListHandler.remove(e);} }, { key: "getMessageList", value: function value(e) {var t = this,n = e.conversationID,o = e.nextReqMessageID,a = e.count,s = "".concat(this._className, ".getMessageList"),r = this.getLocalConversation(n),i = "";if (r && r.groupProfile && (i = r.groupProfile.type), Ze(i)) return Ee.log("".concat(s, " not available in avchatroom. conversationID:").concat(n)), vr({ messageList: [], nextReqMessageID: "", isCompleted: !0 });(Re(a) || a > 15) && (a = 15);var c = this._computeLeftCount({ conversationID: n, nextReqMessageID: o });return Ee.log("".concat(s, " conversationID:").concat(n, " leftCount:").concat(c, " count:").concat(a, " nextReqMessageID:").concat(o)), this._needGetHistory({ conversationID: n, leftCount: c, count: a }) ? this.getHistoryMessages({ conversationID: n, nextReqMessageID: o, count: 20 }).then(function () {return c = t._computeLeftCount({ conversationID: n, nextReqMessageID: o }), lr(t._computeResult({ conversationID: n, nextReqMessageID: o, count: a, leftCount: c }));}) : (Ee.log("".concat(s, ".getMessageList get message list from memory")), this.modifyMessageList(n), vr(this._computeResult({ conversationID: n, nextReqMessageID: o, count: a, leftCount: c })));} }, { key: "_computeLeftCount", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID;return n ? this._messageListHandler.getLocalMessageList(t).findIndex(function (e) {return e.ID === n;}) : this._getMessageListSize(t);} }, { key: "_getMessageListSize", value: function value(e) {return this._messageListHandler.getLocalMessageList(e).length;} }, { key: "_needGetHistory", value: function value(e) {var t = e.conversationID,n = e.leftCount,o = e.count,a = this.getLocalConversation(t),s = "";return a && a.groupProfile && (s = a.groupProfile.type), !et(t) && !Ze(s) && n < o && !this._completedMap.has(t);} }, { key: "_computeResult", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,o = e.count,a = e.leftCount,s = this._computeMessageList({ conversationID: t, nextReqMessageID: n, count: o }),r = this._computeIsCompleted({ conversationID: t, leftCount: a, count: o }),i = this._computeNextReqMessageID({ messageList: s, isCompleted: r, conversationID: t }),c = "".concat(this._className, "._computeResult. conversationID:").concat(t);return Ee.log("".concat(c, " leftCount:").concat(a, " count:").concat(o, " nextReqMessageID:").concat(i, " isCompleted:").concat(r)), { messageList: s, nextReqMessageID: i, isCompleted: r };} }, { key: "_computeMessageList", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,o = e.count,a = this._messageListHandler.getLocalMessageList(t),s = this._computeIndexEnd({ nextReqMessageID: n, messageList: a }),r = this._computeIndexStart({ indexEnd: s, count: o });return a.slice(r, s);} }, { key: "_computeNextReqMessageID", value: function value(e) {var t = e.messageList,n = e.isCompleted,o = e.conversationID;if (!n) return 0 === t.length ? "" : t[0].ID;var a = this._messageListHandler.getLocalMessageList(o);return 0 === a.length ? "" : a[0].ID;} }, { key: "_computeIndexEnd", value: function value(e) {var t = e.messageList,n = void 0 === t ? [] : t,o = e.nextReqMessageID;return o ? n.findIndex(function (e) {return e.ID === o;}) : n.length;} }, { key: "_computeIndexStart", value: function value(e) {var t = e.indexEnd,n = e.count;return t > n ? t - n : 0;} }, { key: "_computeIsCompleted", value: function value(e) {var t = e.conversationID;return !!(e.leftCount <= e.count && this._completedMap.has(t));} }, { key: "getHistoryMessages", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID;if (t === k.CONV_SYSTEM) return vr();e.count ? e.count > 20 && (e.count = 20) : e.count = 15;var o = this._messageListHandler.getLocalOldestMessageByConversationID(t);o || ((o = {}).time = 0, o.sequence = 0, 0 === t.indexOf(k.CONV_C2C) ? (o.to = t.replace(k.CONV_C2C, ""), o.conversationType = k.CONV_C2C) : 0 === t.indexOf(k.CONV_GROUP) && (o.to = t.replace(k.CONV_GROUP, ""), o.conversationType = k.CONV_GROUP));var a = "",s = null;switch (o.conversationType) {case k.CONV_C2C:return a = t.replace(k.CONV_C2C, ""), (s = this.getModule(At)) ? s.getRoamingMessage({ conversationID: e.conversationID, peerAccount: a, count: e.count, lastMessageTime: this._roamingMessageKeyMap.has(t) ? o.time : 0, messageKey: this._roamingMessageKeyMap.get(t) }) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });case k.CONV_GROUP:return (s = this.getModule(Ot)) ? s.getRoamingMessage({ conversationID: e.conversationID, groupID: o.to, count: e.count, sequence: n && !1 === o.getOnlineOnlyFlag() ? o.sequence - 1 : o.sequence }) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });default:return vr();}} }, { key: "patchConversationLastMessage", value: function value(e) {var t = this.getLocalConversation(e);if (t) {var n = t.lastMessage,o = n.messageForShow,a = n.payload;if (gt(o) || gt(a)) {var s = this._messageListHandler.getLocalMessageList(e);if (0 === s.length) return;var r = s[s.length - 1];Ee.log("".concat(this._className, ".patchConversationLastMessage conversationID:").concat(e, " payload:"), r.payload), t.updateLastMessage(r);}}} }, { key: "storeRoamingMessage", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],t = arguments.length > 1 ? arguments[1] : void 0,n = t.startsWith(k.CONV_C2C) ? k.CONV_C2C : k.CONV_GROUP,o = null,a = [],s = 0,i = e.length,c = null,u = n === k.CONV_GROUP,l = this.getModule(Ft),d = function d() {s = u ? e.length - 1 : 0, i = u ? 0 : e.length;},g = function g() {u ? --s : ++s;},p = function p() {return u ? s >= i : s < i;};for (d(); p(); g()) {if (u && 1 === e[s].sequence && this.setCompleted(t), 1 !== e[s].isPlaceMessage) if ((o = new ur(e[s])).to = e[s].to, o.isSystemMessage = !!e[s].isSystemMessage, o.conversationType = n, 4 === e[s].event ? c = { type: k.MSG_GRP_TIP, content: r({}, e[s].elements, { groupProfile: e[s].groupProfile }) } : (e[s].elements = l.parseElements(e[s].elements, e[s].from), c = e[s].elements), u || o.setNickAndAvatar({ nick: e[s].nick, avatar: e[s].avatar }), gt(c)) {var h = new Sa(ja);h.setMessage("from:".concat(o.from, " to:").concat(o.to, " sequence:").concat(o.sequence, " event:").concat(e[s].event)), h.setNetworkType(this.getNetworkType()).setLevel("warning").end();} else o.setElement(c), o.reInitialize(this.getMyUserID()), a.push(o);}return this._messageListHandler.unshift(a), d = g = p = null, a;} }, { key: "setMessageRead", value: function value(e) {var t = e.conversationID,n = e.messageID,o = this.getLocalConversation(t);if (Ee.log("".concat(this._className, ".setMessageRead conversationID:").concat(t, " unreadCount:").concat(o ? o.unreadCount : 0)), !o) return vr();if (o.type !== k.CONV_GROUP || gt(o.groupAtInfoList) || this.deleteGroupAtTips(t), 0 === o.unreadCount) return vr();var a = this._messageListHandler.getLocalMessage(t, n),s = null;switch (o.type) {case k.CONV_C2C:return (s = this.getModule(At)) ? s.setMessageRead({ conversationID: t, lastMessageTime: a ? a.time : o.lastMessage.lastTime }) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });case k.CONV_GROUP:return (s = this._moduleManager.getModule(Ot)) ? s.setMessageRead({ conversationID: t, lastMessageSeq: a ? a.sequence : o.lastMessage.lastSequence }) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });case k.CONV_SYSTEM:return o.unreadCount = 0, vr();default:return vr();}} }, { key: "updateIsReadAfterReadReport", value: function value(e) {var t = e.conversationID,n = e.lastMessageSeq,o = e.lastMessageTime,a = this._messageListHandler.getLocalMessageList(t);if (0 !== a.length) for (var s, r = a.length - 1; r >= 0; r--) {if (s = a[r], !(o && s.time > o || n && s.sequence > n)) {if ("in" === s.flow && s.isRead) break;s.setIsRead(!0);}}} }, { key: "updateUnreadCount", value: function value(e) {var t = this.getLocalConversation(e),n = this._messageListHandler.getLocalMessageList(e);if (t) {var o = t.unreadCount,a = n.filter(function (e) {return !e.isRead && !e.getOnlineOnlyFlag() && !e.isDeleted;}).length;o !== a && (t.unreadCount = a, Ee.log("".concat(this._className, ".updateUnreadCount from ").concat(o, " to ").concat(a, ", conversationID:").concat(e)), this._emitConversationUpdate(!0, !1));}} }, { key: "updateIsRead", value: function value(e) {var t = this.getLocalConversation(e),n = this.getLocalMessageList(e);if (t && 0 !== n.length && !et(t.type)) {for (var o = [], a = 0, s = n.length; a < s; a++) {"in" !== n[a].flow ? "out" !== n[a].flow || n[a].isRead || n[a].setIsRead(!0) : o.push(n[a]);}var r = 0;if (t.type === k.CONV_C2C) {var i = o.slice(-t.unreadCount).filter(function (e) {return e.isRevoked;}).length;r = o.length - t.unreadCount - i;} else r = o.length - t.unreadCount;for (var c = 0; c < r && !o[c].isRead; c++) {o[c].setIsRead(!0);}}} }, { key: "deleteGroupAtTips", value: function value(e) {var t = "".concat(this._className, ".deleteGroupAtTips");Ee.log("".concat(t));var n = this._conversationMap.get(e);if (!n) return Promise.resolve();var o = n.groupAtInfoList;if (0 === o.length) return Promise.resolve();var a = this.getMyUserID();return this.request({ protocolName: fn, requestData: { messageListToDelete: o.map(function (e) {return { from: e.from, to: a, messageSeq: e.__sequence, messageRandom: e.__random, groupID: e.groupID };}) } }).then(function () {return Ee.log("".concat(t, " ok. count:").concat(o.length)), n.clearGroupAtInfoList(), Promise.resolve();}).catch(function (e) {return Ee.error("".concat(t, " failed. error:"), e), yr(e);});} }, { key: "appendToMessageList", value: function value(e) {this._messageListHandler.pushIn(e);} }, { key: "setMessageRandom", value: function value(e) {this.singlyLinkedList.set(e.random);} }, { key: "deleteMessageRandom", value: function value(e) {this.singlyLinkedList.delete(e.random);} }, { key: "pushIntoMessageList", value: function value(e, t, n) {return !(!this._messageListHandler.pushIn(t, n) || this._isMessageFromCurrentInstance(t) && !n) && (e.push(t), !0);} }, { key: "_isMessageFromCurrentInstance", value: function value(e) {return this.singlyLinkedList.has(e.random);} }, { key: "revoke", value: function value(e, t, n) {return this._messageListHandler.revoke(e, t, n);} }, { key: "getPeerReadTime", value: function value(e) {return this._peerReadTimeMap.get(e);} }, { key: "recordPeerReadTime", value: function value(e, t) {this._peerReadTimeMap.has(e) ? this._peerReadTimeMap.get(e) < t && this._peerReadTimeMap.set(e, t) : this._peerReadTimeMap.set(e, t);} }, { key: "updateMessageIsPeerReadProperty", value: function value(e, t) {if (e.startsWith(k.CONV_C2C) && t > 0) {var n = this._messageListHandler.updateMessageIsPeerReadProperty(e, t);n.length > 0 && this.emitOuterEvent(E.MESSAGE_READ_BY_PEER, n);}} }, { key: "updateMessageIsReadProperty", value: function value(e) {var t = this.getLocalConversation(e),n = this._messageListHandler.getLocalMessageList(e);if (t && 0 !== n.length && !et(t.type)) {for (var o = [], a = 0; a < n.length; a++) {"in" !== n[a].flow ? "out" !== n[a].flow || n[a].isRead || n[a].setIsRead(!0) : o.push(n[a]);}var s = 0;if (t.type === k.CONV_C2C) {var r = o.slice(-t.unreadCount).filter(function (e) {return e.isRevoked;}).length;s = o.length - t.unreadCount - r;} else s = o.length - t.unreadCount;for (var i = 0; i < s && !o[i].isRead; i++) {o[i].setIsRead(!0);}}} }, { key: "updateMessageIsModifiedProperty", value: function value(e) {this._messageListHandler.updateMessageIsModifiedProperty(e);} }, { key: "setCompleted", value: function value(e) {Ee.log("".concat(this._className, ".setCompleted. conversationID:").concat(e)), this._completedMap.set(e, !0);} }, { key: "updateRoamingMessageKey", value: function value(e, t) {this._roamingMessageKeyMap.set(e, t);} }, { key: "getConversationList", value: function value() {var e = this,t = "".concat(this._className, ".getConversationList");Ee.log(t), this._pagingStatus === mt.REJECTED && (Ee.log("".concat(t, ". continue to sync conversationList")), this._syncConversationList());var n = new Sa(Xa);return this.request({ protocolName: hn, requestData: { fromAccount: this.getMyUserID() } }).then(function (o) {var a = o.data.conversations,s = void 0 === a ? [] : a,r = e._getConversationOptions(s);return e._updateLocalConversationList(r, !0), e._setStorageConversationList(), e._handleC2CPeerReadTime(), n.setMessage("conversation count: ".concat(s.length)).setNetworkType(e.getNetworkType()).end(), Ee.log("".concat(t, " ok")), vr({ conversationList: e.getLocalConversationList() });}).catch(function (o) {return e.probeNetwork().then(function (e) {var t = m(e, 2),a = t[0],s = t[1];n.setError(o, a, s).end();}), Ee.error("".concat(t, " failed. error:"), o), yr(o);});} }, { key: "_handleC2CPeerReadTime", value: function value() {var e,t = S(this._conversationMap);try {for (t.s(); !(e = t.n()).done;) {var n = m(e.value, 2),o = n[0],a = n[1];a.type === k.CONV_C2C && (Ee.debug("".concat(this._className, "._handleC2CPeerReadTime conversationID:").concat(o, " peerReadTime:").concat(a.peerReadTime)), this.recordPeerReadTime(o, a.peerReadTime));}} catch (s) {t.e(s);} finally {t.f();}} }, { key: "getConversationProfile", value: function value(e) {var t,n = this;if ((t = this._conversationMap.has(e) ? this._conversationMap.get(e) : new Fr({ conversationID: e, type: e.slice(0, 3) === k.CONV_C2C ? k.CONV_C2C : k.CONV_GROUP }))._isInfoCompleted || t.type === k.CONV_SYSTEM) return vr({ conversation: t });var o = new Sa(Qa),a = "".concat(this._className, ".getConversationProfile");return Ee.log("".concat(a, ". conversationID:").concat(e, " remark:").concat(t.remark, " lastMessage:"), t.lastMessage), this._updateUserOrGroupProfileCompletely(t).then(function (s) {o.setNetworkType(n.getNetworkType()).setMessage("conversationID:".concat(e, " unreadCount:").concat(s.data.conversation.unreadCount)).end();var r = n.getModule(Lt);if (r && t.type === k.CONV_C2C) {var i = e.replace(k.CONV_C2C, "");if (r.isMyFriend(i)) {var c = r.getFriendRemark(i);t.remark !== c && (t.remark = c, Ee.log("".concat(a, ". conversationID:").concat(e, " patch remark:").concat(t.remark)));}}return Ee.log("".concat(a, " ok. conversationID:").concat(e)), s;}).catch(function (t) {return n.probeNetwork().then(function (n) {var a = m(n, 2),s = a[0],r = a[1];o.setError(t, s, r).setMessage("conversationID:".concat(e)).end();}), Ee.error("".concat(a, " failed. error:"), t), yr(t);});} }, { key: "_updateUserOrGroupProfileCompletely", value: function value(e) {var t = this;return e.type === k.CONV_C2C ? this.getModule(Nt).getUserProfile({ userIDList: [e.toAccount] }).then(function (n) {var o = n.data;return 0 === o.length ? yr(new fr({ code: eo.USER_OR_GROUP_NOT_FOUND, message: Go })) : (e.userProfile = o[0], e._isInfoCompleted = !0, t._unshiftConversation(e), vr({ conversation: e }));}) : this.getModule(Ot).getGroupProfile({ groupID: e.toAccount }).then(function (n) {return e.groupProfile = n.data.group, e._isInfoCompleted = !0, t._unshiftConversation(e), vr({ conversation: e });});} }, { key: "_unshiftConversation", value: function value(e) {e instanceof Fr && !this._conversationMap.has(e.conversationID) && (this._conversationMap = new Map([[e.conversationID, e]].concat(M(this._conversationMap))), this._setStorageConversationList(), this._emitConversationUpdate(!0, !1));} }, { key: "deleteConversation", value: function value(e) {var t = this,n = { fromAccount: this.getMyUserID(), toAccount: void 0, type: void 0 };if (!this._conversationMap.has(e)) {var o = new fr({ code: eo.CONVERSATION_NOT_FOUND, message: wo });return yr(o);}switch (this._conversationMap.get(e).type) {case k.CONV_C2C:n.type = 1, n.toAccount = e.replace(k.CONV_C2C, "");break;case k.CONV_GROUP:n.type = 2, n.toGroupID = e.replace(k.CONV_GROUP, "");break;case k.CONV_SYSTEM:return this.getModule(Ot).deleteGroupSystemNotice({ messageList: this._messageListHandler.getLocalMessageList(e) }), this.deleteLocalConversation(e), vr({ conversationID: e });default:var a = new fr({ code: eo.CONVERSATION_UN_RECORDED_TYPE, message: bo });return yr(a);}var s = new Sa(Za);s.setMessage("conversationID:".concat(e));var r = "".concat(this._className, ".deleteConversation");return Ee.log("".concat(r, ". conversationID:").concat(e)), this.setMessageRead({ conversationID: e }).then(function () {return t.request({ protocolName: _n, requestData: n });}).then(function () {return s.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(r, " ok")), t.deleteLocalConversation(e), vr({ conversationID: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];s.setError(e, o, a).end();}), Ee.error("".concat(r, " failed. error:"), e), yr(e);});} }, { key: "deleteLocalConversation", value: function value(e) {this._conversationMap.delete(e), this._setStorageConversationList(), this._messageListHandler.removeByConversationID(e), this._completedMap.delete(e), this._emitConversationUpdate(!0, !1);} }, { key: "isMessageSentByCurrentInstance", value: function value(e) {return !(!this._messageListHandler.hasLocalMessage(e.conversationID, e.ID) && !this.singlyLinkedList.has(e.random));} }, { key: "modifyMessageList", value: function value(e) {if (e.startsWith(k.CONV_C2C)) {var t = Date.now();this._messageListHandler.modifyMessageSentByPeer(e);var n = this.getModule(Nt).getNickAndAvatarByUserID(this.getMyUserID());this._messageListHandler.modifyMessageSentByMe({ conversationID: e, latestNick: n.nick, latestAvatar: n.avatar }), Ee.log("".concat(this._className, ".modifyMessageList conversationID:").concat(e, " cost ").concat(Date.now() - t, " ms"));}} }, { key: "updateUserProfileSpecifiedKey", value: function value(e) {Ee.log("".concat(this._className, ".updateUserProfileSpecifiedKey options:"), e);var t = e.conversationID,n = e.nick,o = e.avatar;if (this._conversationMap.has(t)) {var a = this._conversationMap.get(t).userProfile;Ne(n) && a.nick !== n && (a.nick = n), Ne(o) && a.avatar !== o && (a.avatar = o), this._emitConversationUpdate(!0, !1);}} }, { key: "onMyProfileModified", value: function value(e) {var t = this,n = this.getLocalConversationList(),o = Date.now();n.forEach(function (n) {t.modifyMessageSentByMe(r({ conversationID: n.conversationID }, e));}), Ee.log("".concat(this._className, ".onMyProfileModified. modify all messages sent by me, cost ").concat(Date.now() - o, " ms"));} }, { key: "modifyMessageSentByMe", value: function value(e) {this._messageListHandler.modifyMessageSentByMe(e);} }, { key: "getLatestMessageSentByMe", value: function value(e) {return this._messageListHandler.getLatestMessageSentByMe(e);} }, { key: "modifyMessageSentByPeer", value: function value(e, t) {this._messageListHandler.modifyMessageSentByPeer(e, t);} }, { key: "getLatestMessageSentByPeer", value: function value(e) {return this._messageListHandler.getLatestMessageSentByPeer(e);} }, { key: "pushIntoNoticeResult", value: function value(e, t) {return !(!this._messageListHandler.pushIn(t) || this.singlyLinkedList.has(t.random)) && (e.push(t), !0);} }, { key: "getGroupLocalLastMessageSequence", value: function value(e) {return this._messageListHandler.getGroupLocalLastMessageSequence(e);} }, { key: "checkAndPatchRemark", value: function value() {if (0 !== this._conversationMap.size) {var e = this.getModule(Lt);if (e) {var t = M(this._conversationMap.values()).filter(function (e) {return e.type === k.CONV_C2C;});if (0 !== t.length) {var n = !1,o = 0;t.forEach(function (t) {var a = t.conversationID.replace(k.CONV_C2C, "");if (e.isMyFriend(a)) {var s = e.getFriendRemark(a);t.remark !== s && (t.remark = s, o += 1, n = !0);}}), Ee.log("".concat(this._className, ".checkAndPatchRemark. c2c conversation count:").concat(t.length, ", patched count:").concat(o)), n && this._emitConversationUpdate(!0, !1);}}}} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._pagingStatus = mt.NOT_START, this._messageListHandler.reset(), this._roamingMessageKeyMap.clear(), this.singlyLinkedList.reset(), this._peerReadTimeMap.clear(), this._completedMap.clear(), this._conversationMap.clear(), this._pagingTimeStamp = 0, this.resetReady();} }]), a;}(zt),Vr = function () {function e(n) {t(this, e), this._groupModule = n, this._className = "GroupTipsHandler", this._cachedGroupTipsMap = new Map(), this._checkCountMap = new Map(), this.MAX_CHECK_COUNT = 4;}return o(e, [{ key: "onCheckTimer", value: function value(e) {e % 1 == 0 && this._cachedGroupTipsMap.size > 0 && this._checkCachedGroupTips();} }, { key: "_checkCachedGroupTips", value: function value() {var e = this;this._cachedGroupTipsMap.forEach(function (t, n) {var o = e._checkCountMap.get(n),a = e._groupModule.hasLocalGroup(n);Ee.log("".concat(e._className, "._checkCachedGroupTips groupID:").concat(n, " hasLocalGroup:").concat(a, " checkCount:").concat(o)), a ? (e._notifyCachedGroupTips(n), e._checkCountMap.delete(n), e._groupModule.deleteUnjoinedAVChatRoom(n)) : o >= e.MAX_CHECK_COUNT ? (e._deleteCachedGroupTips(n), e._checkCountMap.delete(n)) : (o++, e._checkCountMap.set(n, o));});} }, { key: "onNewGroupTips", value: function value(e) {Ee.debug("".concat(this._className, ".onReceiveGroupTips count:").concat(e.dataList.length));var t = this.newGroupTipsStoredAndSummary(e),n = t.eventDataList,o = t.result,a = t.AVChatRoomMessageList;(a.length > 0 && this._groupModule.onAVChatRoomMessage(a), n.length > 0) && (this._groupModule.getModule(Pt).onNewMessage({ conversationOptionsList: n, isInstantMessage: !0 }), this._groupModule.updateNextMessageSeq(n));o.length > 0 && (this._groupModule.emitOuterEvent(E.MESSAGE_RECEIVED, o), this.handleMessageList(o));} }, { key: "newGroupTipsStoredAndSummary", value: function value(e) {for (var t = e.event, n = e.dataList, o = null, a = [], s = [], i = {}, c = [], u = 0, l = n.length; u < l; u++) {var d = n[u],g = d.groupProfile.groupID,p = this._groupModule.hasLocalGroup(g);if (p || !this._groupModule.isUnjoinedAVChatRoom(g)) if (p) {if (this._groupModule.isMessageFromAVChatroom(g)) {var h = Je(d);h.event = t, c.push(h);} else {d.currentUser = this._groupModule.getMyUserID(), d.conversationType = k.CONV_GROUP, (o = new ur(d)).setElement({ type: k.MSG_GRP_TIP, content: r({}, d.elements, { groupProfile: d.groupProfile }) }), o.isSystemMessage = !1;var _ = this._groupModule.getModule(Pt),f = o.conversationID;if (6 === t) o.setOnlineOnlyFlag(!0), s.push(o);else if (!_.pushIntoNoticeResult(s, o)) continue;if (6 !== t || !_.getLocalConversation(f)) {if (6 !== t) this._groupModule.getModule($t).addMessageSequence({ key: Ma, message: o });if (Re(i[f])) i[f] = a.push({ conversationID: f, unreadCount: "in" === o.flow && o.getOnlineOnlyFlag() ? 0 : 1, type: o.conversationType, subType: o.conversationSubType, lastMessage: o }) - 1;else {var m = i[f];a[m].type = o.conversationType, a[m].subType = o.conversationSubType, a[m].lastMessage = o, "in" !== o.flow || o.getOnlineOnlyFlag() || a[m].unreadCount++;}}}} else this._cacheGroupTipsAndProbe({ groupID: g, event: t, item: d });}return { eventDataList: a, result: s, AVChatRoomMessageList: c };} }, { key: "handleMessageList", value: function value(e) {var t = this;e.forEach(function (e) {switch (e.payload.operationType) {case 1:t._onNewMemberComeIn(e);break;case 2:t._onMemberQuit(e);break;case 3:t._onMemberKickedOut(e);break;case 4:t._onMemberSetAdmin(e);break;case 5:t._onMemberCancelledAdmin(e);break;case 6:t._onGroupProfileModified(e);break;case 7:t._onMemberInfoModified(e);break;default:Ee.warn("".concat(t._className, ".handleMessageList unknown operationType:").concat(e.payload.operationType));}});} }, { key: "_onNewMemberComeIn", value: function value(e) {var t = e.payload,n = t.memberNum,o = t.groupProfile.groupID,a = this._groupModule.getLocalGroupProfile(o);a && Ce(n) && (a.memberNum = n);} }, { key: "_onMemberQuit", value: function value(e) {var t = e.payload,n = t.memberNum,o = t.groupProfile.groupID,a = this._groupModule.getLocalGroupProfile(o);a && Ce(n) && (a.memberNum = n), this._groupModule.deleteLocalGroupMembers(o, e.payload.userIDList);} }, { key: "_onMemberKickedOut", value: function value(e) {var t = e.payload,n = t.memberNum,o = t.groupProfile.groupID,a = this._groupModule.getLocalGroupProfile(o);a && Ce(n) && (a.memberNum = n), this._groupModule.deleteLocalGroupMembers(o, e.payload.userIDList);} }, { key: "_onMemberSetAdmin", value: function value(e) {var t = e.payload.groupProfile.groupID,n = e.payload.userIDList,o = this._groupModule.getModule(Rt);n.forEach(function (e) {var n = o.getLocalGroupMemberInfo(t, e);n && n.updateRole(k.GRP_MBR_ROLE_ADMIN);});} }, { key: "_onMemberCancelledAdmin", value: function value(e) {var t = e.payload.groupProfile.groupID,n = e.payload.userIDList,o = this._groupModule.getModule(Rt);n.forEach(function (e) {var n = o.getLocalGroupMemberInfo(t, e);n && n.updateRole(k.GRP_MBR_ROLE_MEMBER);});} }, { key: "_onGroupProfileModified", value: function value(e) {var t = this,n = e.payload.newGroupProfile,o = e.payload.groupProfile.groupID,a = this._groupModule.getLocalGroupProfile(o);Object.keys(n).forEach(function (e) {switch (e) {case "ownerID":t._ownerChanged(a, n);break;default:a[e] = n[e];}}), this._groupModule.emitGroupListUpdate(!0, !0);} }, { key: "_ownerChanged", value: function value(e, t) {var n = e.groupID,o = this._groupModule.getLocalGroupProfile(n),a = this.tim.context.identifier;if (a === t.ownerID) {o.updateGroup({ selfInfo: { role: k.GRP_MBR_ROLE_OWNER } });var s = this._groupModule.getModule(Rt),r = s.getLocalGroupMemberInfo(n, a),i = this._groupModule.getLocalGroupProfile(n).ownerID,c = s.getLocalGroupMemberInfo(n, i);r && r.updateRole(k.GRP_MBR_ROLE_OWNER), c && c.updateRole(k.GRP_MBR_ROLE_MEMBER);}} }, { key: "_onMemberInfoModified", value: function value(e) {var t = e.payload.groupProfile.groupID,n = this._groupModule.getModule(Rt);e.payload.memberList.forEach(function (e) {var o = n.getLocalGroupMemberInfo(t, e.userID);o && e.muteTime && o.updateMuteUntil(e.muteTime);});} }, { key: "_cacheGroupTips", value: function value(e, t) {this._cachedGroupTipsMap.has(e) || this._cachedGroupTipsMap.set(e, []), this._cachedGroupTipsMap.get(e).push(t);} }, { key: "_deleteCachedGroupTips", value: function value(e) {this._cachedGroupTipsMap.has(e) && this._cachedGroupTipsMap.delete(e);} }, { key: "_notifyCachedGroupTips", value: function value(e) {var t = this,n = this._cachedGroupTipsMap.get(e) || [];n.forEach(function (e) {t.onNewGroupTips(e);}), this._deleteCachedGroupTips(e), Ee.log("".concat(this._className, "._notifyCachedGroupTips groupID:").concat(e, " count:").concat(n.length));} }, { key: "_cacheGroupTipsAndProbe", value: function value(e) {var t = this,n = e.groupID,o = e.event,a = e.item;this._cacheGroupTips(n, { event: o, dataList: [a] }), this._groupModule.getGroupSimplifiedInfo(n).then(function (e) {e.type === k.GRP_AVCHATROOM ? t._groupModule.hasLocalGroup(n) ? t._notifyCachedGroupTips(n) : t._groupModule.setUnjoinedAVChatRoom(n) : (t._groupModule.updateGroupMap([e]), t._notifyCachedGroupTips(n));}), this._checkCountMap.has(n) || this._checkCountMap.set(n, 0), Ee.log("".concat(this._className, "._cacheGroupTipsAndProbe groupID:").concat(n));} }, { key: "reset", value: function value() {this._cachedGroupTipsMap.clear(), this._checkCountMap.clear();} }]), e;}(),Kr = function () {function e(n) {t(this, e), this._groupModule = n, this._className = "CommonGroupHandler", this.tempConversationList = null, this._cachedGroupMessageMap = new Map(), this._checkCountMap = new Map(), this.MAX_CHECK_COUNT = 4, n.getInnerEmitterInstance().once(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initGroupList, this);}return o(e, [{ key: "onCheckTimer", value: function value(e) {e % 1 == 0 && this._cachedGroupMessageMap.size > 0 && this._checkCachedGroupMessage();} }, { key: "_checkCachedGroupMessage", value: function value() {var e = this;this._cachedGroupMessageMap.forEach(function (t, n) {var o = e._checkCountMap.get(n),a = e._groupModule.hasLocalGroup(n);Ee.log("".concat(e._className, "._checkCachedGroupMessage groupID:").concat(n, " hasLocalGroup:").concat(a, " checkCount:").concat(o)), a ? (e._notifyCachedGroupMessage(n), e._checkCountMap.delete(n), e._groupModule.deleteUnjoinedAVChatRoom(n)) : o >= e.MAX_CHECK_COUNT ? (e._deleteCachedGroupMessage(n), e._checkCountMap.delete(n)) : (o++, e._checkCountMap.set(n, o));});} }, { key: "_initGroupList", value: function value() {var e = this;Ee.log("".concat(this._className, "._initGroupList"));var t = new Sa(hs),n = this._groupModule.getStorageGroupList();if (Le(n) && n.length > 0) {n.forEach(function (t) {e._groupModule.initGroupMap(t);}), this._groupModule.emitGroupListUpdate(!0, !1);var o = this._groupModule.getLocalGroupList().length;t.setNetworkType(this._groupModule.getNetworkType()).setMessage("group count:".concat(o)).end();} else t.setNetworkType(this._groupModule.getNetworkType()).setMessage("group count:0").end();Ee.log("".concat(this._className, "._initGroupList ok")), this.getGroupList();} }, { key: "handleUpdateGroupLastMessage", value: function value(e) {var t = "".concat(this._className, ".handleUpdateGroupLastMessage");if (Ee.debug("".concat(t, " conversation count:").concat(e.length, ", local group count:").concat(this._groupModule.getLocalGroupList().length)), 0 !== this._groupModule.getGroupMap().size) {for (var n, o, a, s = !1, r = 0, i = e.length; r < i; r++) {(n = e[r]).type === k.CONV_GROUP && (o = n.conversationID.split(/^GROUP/)[1], (a = this._groupModule.getLocalGroupProfile(o)) && (a.lastMessage = n.lastMessage, s = !0));}s && (this._groupModule.sortLocalGroupList(), this._groupModule.emitGroupListUpdate(!0, !1));} else this.tempConversationList = e;} }, { key: "onNewGroupMessage", value: function value(e) {Ee.debug("".concat(this._className, ".onNewGroupMessage count:").concat(e.dataList.length));var t = this._newGroupMessageStoredAndSummary(e),n = t.conversationOptionsList,o = t.messageList,a = t.AVChatRoomMessageList;(a.length > 0 && this._groupModule.onAVChatRoomMessage(a), this._groupModule.filterModifiedMessage(o), n.length > 0) && (this._groupModule.getModule(Pt).onNewMessage({ conversationOptionsList: n, isInstantMessage: !0 }), this._groupModule.updateNextMessageSeq(n));var s = this._groupModule.filterUnmodifiedMessage(o);s.length > 0 && this._groupModule.emitOuterEvent(E.MESSAGE_RECEIVED, s), o.length = 0;} }, { key: "_newGroupMessageStoredAndSummary", value: function value(e) {var t = e.dataList,n = e.event,o = e.isInstantMessage,a = null,s = [],r = [],i = [],c = {},u = k.CONV_GROUP,l = this._groupModule.getModule(Ft),d = t.length;d > 1 && t.sort(function (e, t) {return e.sequence - t.sequence;});for (var g = 0; g < d; g++) {var p = t[g],h = p.groupProfile.groupID,_ = this._groupModule.hasLocalGroup(h);if (_ || !this._groupModule.isUnjoinedAVChatRoom(h)) if (_) {if (this._groupModule.isMessageFromAVChatroom(h)) {var f = Je(p);f.event = n, i.push(f);} else {p.currentUser = this._groupModule.getMyUserID(), p.conversationType = u, p.isSystemMessage = !!p.isSystemMessage, a = new ur(p), p.elements = l.parseElements(p.elements, p.from), a.setElement(p.elements);var m = 1 === t[g].isModified,M = this._groupModule.getModule(Pt);M.isMessageSentByCurrentInstance(a) ? a.isModified = m : m = !1;var v = this._groupModule.getModule($t);if (o && v.addMessageDelay({ currentTime: Date.now(), time: a.time }), 1 === p.onlineOnlyFlag) a.setOnlineOnlyFlag(!0), r.push(a);else {if (!M.pushIntoMessageList(r, a, m)) continue;v.addMessageSequence({ key: Ma, message: a });var y = a.conversationID;if (Re(c[y])) c[y] = s.push({ conversationID: y, unreadCount: "out" === a.flow ? 0 : 1, type: a.conversationType, subType: a.conversationSubType, lastMessage: a }) - 1;else {var I = c[y];s[I].type = a.conversationType, s[I].subType = a.conversationSubType, s[I].lastMessage = a, "in" === a.flow && s[I].unreadCount++;}}}} else this._cacheGroupMessageAndProbe({ groupID: h, event: n, item: p });}return { conversationOptionsList: s, messageList: r, AVChatRoomMessageList: i };} }, { key: "onGroupMessageRevoked", value: function value(e) {Ee.debug("".concat(this._className, ".onGroupMessageRevoked nums:").concat(e.dataList.length));var t = this._groupModule.getModule(Pt),n = [],o = null;e.dataList.forEach(function (e) {var a = e.elements.revokedInfos;Re(a) || a.forEach(function (e) {(o = t.revoke("GROUP".concat(e.groupID), e.sequence, e.random)) && n.push(o);});}), 0 !== n.length && (t.onMessageRevoked(n), this._groupModule.emitOuterEvent(E.MESSAGE_REVOKED, n));} }, { key: "_groupListTreeShaking", value: function value(e) {for (var t = new Map(M(this._groupModule.getGroupMap())), n = 0, o = e.length; n < o; n++) {t.delete(e[n].groupID);}this._groupModule.hasJoinedAVChatRoom() && this._groupModule.getJoinedAVChatRoom().forEach(function (e) {t.delete(e);});for (var a = M(t.keys()), s = 0, r = a.length; s < r; s++) {this._groupModule.deleteGroup(a[s]);}} }, { key: "getGroupList", value: function value(e) {var t = this,n = "".concat(this._className, ".getGroupList"),o = new Sa(gs);Ee.log("".concat(n));var a = { introduction: "Introduction", notification: "Notification", createTime: "CreateTime", ownerID: "Owner_Account", lastInfoTime: "LastInfoTime", memberNum: "MemberNum", maxMemberNum: "MaxMemberNum", joinOption: "ApplyJoinOption", muteAllMembers: "ShutUpAllMember" },s = ["Type", "Name", "FaceUrl", "NextMsgSeq", "LastMsgTime"],r = [];return e && e.groupProfileFilter && e.groupProfileFilter.forEach(function (e) {a[e] && s.push(a[e]);}), this._pagingGetGroupList({ limit: 50, offset: 0, groupBaseInfoFilter: s, groupList: r }).then(function () {Ee.log("".concat(n, " ok. count:").concat(r.length)), t._groupListTreeShaking(r), t._groupModule.updateGroupMap(r);var e = t._groupModule.getLocalGroupList().length;return o.setNetworkType(t._groupModule.getNetworkType()).setMessage("remote count:".concat(r.length, ", after tree shaking, local count:").concat(e)).end(), t.tempConversationList && (Ee.log("".concat(n, " update last message with tempConversationList, count:").concat(t.tempConversationList.length)), t.handleUpdateGroupLastMessage({ data: t.tempConversationList }), t.tempConversationList = null), t._groupModule.emitGroupListUpdate(), lr({ groupList: t._groupModule.getLocalGroupList() });}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "_pagingGetGroupList", value: function value(e) {var t = this,n = "".concat(this._className, "._pagingGetGroupList"),o = e.limit,a = e.offset,s = e.groupBaseInfoFilter,r = e.groupList,i = new Sa(ms);return this._groupModule.request({ protocolName: mn, requestData: { memberAccount: this._groupModule.getMyUserID(), limit: o, offset: a, responseFilter: { groupBaseInfoFilter: s, selfInfoFilter: ["Role", "JoinTime", "MsgFlag"] } } }).then(function (e) {var c = e.data,u = c.groups,l = c.totalCount;r.push.apply(r, M(u));var d = a + o,g = !(l > d);return i.setNetworkType(t._groupModule.getNetworkType()).setMessage("offset:".concat(a, " totalCount:").concat(l, " isCompleted:").concat(g, " currentCount:").concat(r.length)).end(), g ? (Ee.log("".concat(n, " ok. totalCount:").concat(l)), lr({ groupList: r })) : (a = d, t._pagingGetGroupList({ limit: o, offset: a, groupBaseInfoFilter: s, groupList: r }));}).catch(function (e) {return t._groupModule.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];i.setError(e, o, a).end();}), yr(e);});} }, { key: "_cacheGroupMessage", value: function value(e, t) {this._cachedGroupMessageMap.has(e) || this._cachedGroupMessageMap.set(e, []), this._cachedGroupMessageMap.get(e).push(t);} }, { key: "_deleteCachedGroupMessage", value: function value(e) {this._cachedGroupMessageMap.has(e) && this._cachedGroupMessageMap.delete(e);} }, { key: "_notifyCachedGroupMessage", value: function value(e) {var t = this,n = this._cachedGroupMessageMap.get(e) || [];n.forEach(function (e) {t.onNewGroupMessage(e);}), this._deleteCachedGroupMessage(e), Ee.log("".concat(this._className, "._notifyCachedGroupMessage groupID:").concat(e, " count:").concat(n.length));} }, { key: "_cacheGroupMessageAndProbe", value: function value(e) {var t = this,n = e.groupID,o = e.event,a = e.item;this._cacheGroupMessage(n, { event: o, dataList: [a] }), this._groupModule.getGroupSimplifiedInfo(n).then(function (e) {e.type === k.GRP_AVCHATROOM ? t._groupModule.hasLocalGroup(n) ? t._notifyCachedGroupMessage(n) : t._groupModule.setUnjoinedAVChatRoom(n) : (t._groupModule.updateGroupMap([e]), t._notifyCachedGroupMessage(n));}), this._checkCountMap.has(n) || this._checkCountMap.set(n, 0), Ee.log("".concat(this._className, "._cacheGroupMessageAndProbe groupID:").concat(n));} }, { key: "reset", value: function value() {this._cachedGroupMessageMap.clear(), this._checkCountMap.clear(), this._groupModule.getInnerEmitterInstance().once(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, this._initGroupList, this);} }]), e;}(),xr = function () {function e(n) {t(this, e);var o = n.groupModule,a = n.groupID,s = n.onInit,r = n.onSuccess,i = n.onFail;this._groupModule = o, this._className = "Polling", this._onInit = s, this._onSuccess = r, this._onFail = i, this._groupID = a, this._timeoutID = -1, this._isRunning = !1, this._pollingInterval = 0, this.MAX_POLLING_INTERVAL = 2e3;}return o(e, [{ key: "start", value: function value() {Ee.log("".concat(this._className, ".start")), this._isRunning = !0, this._request();} }, { key: "isRunning", value: function value() {return this._isRunning;} }, { key: "_request", value: function value() {var e = this,t = this._onInit(this._groupID),n = wn;this._groupModule.isLoggedIn() || (n = Gn), this._groupModule.request({ protocolName: n, requestData: t }).then(function (t) {e._onSuccess(e._groupID, t), e.isRunning() && (clearTimeout(e._timeoutID), e._timeoutID = setTimeout(e._request.bind(e), 0));}).catch(function (t) {e._onFail(e._groupID, t), e.isRunning() && (clearTimeout(e._timeoutID), e._timeoutID = setTimeout(e._request.bind(e), e.MAX_POLLING_INTERVAL));});} }, { key: "stop", value: function value() {Ee.log("".concat(this._className, ".stop")), this._timeoutID > 0 && (clearTimeout(this._timeoutID), this._timeoutID = -1, this._pollingInterval = 0), this._isRunning = !1;} }]), e;}(),Br = { 3: !0, 4: !0, 5: !0, 6: !0 },Hr = function () {function e(n) {t(this, e), this._groupModule = n, this._className = "AVChatRoomHandler", this._joinedGroupMap = new Map(), this._pollingRequestInfoMap = new Map(), this._pollingInstanceMap = new Map(), this.sequencesLinkedList = new Pr(100), this.messageIDLinkedList = new Pr(100), this.receivedMessageCount = 0, this._reportMessageStackedCount = 0, this._onlineMemberCountMap = new Map(), this.DEFAULT_EXPIRE_TIME = 60;}return o(e, [{ key: "hasJoinedAVChatRoom", value: function value() {return this._joinedGroupMap.size > 0;} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return this._joinedGroupMap.has(e);} }, { key: "getJoinedAVChatRoom", value: function value() {return this._joinedGroupMap.size > 0 ? M(this._joinedGroupMap.keys()) : null;} }, { key: "_updateRequestData", value: function value(e) {return r({}, this._pollingRequestInfoMap.get(e));} }, { key: "_handleSuccess", value: function value(e, t) {var n = t.data,o = n.key,a = n.nextSeq,s = n.rspMsgList;if (0 !== n.errorCode) {var r = this._pollingRequestInfoMap.get(e),i = new Sa(As),c = r ? "".concat(r.key, "-").concat(r.startSeq) : "requestInfo is undefined";i.setMessage("".concat(e, "-").concat(c, "-").concat(t.errorInfo)).setCode(t.errorCode).setNetworkType(this._groupModule.getNetworkType()).end(!0);} else {if (!this.checkJoinedAVChatRoomByID(e)) return;Ne(o) && Ce(a) && this._pollingRequestInfoMap.set(e, { key: o, startSeq: a }), Le(s) && s.length > 0 && (s.forEach(function (e) {e.to = e.groupID;}), this.onMessage(s));}} }, { key: "_handleFailure", value: function value(e, t) {} }, { key: "onMessage", value: function value(e) {if (Le(e) && 0 !== e.length) {var t = null,n = [],o = this._getModule(Pt),a = e.length;a > 1 && e.sort(function (e, t) {return e.sequence - t.sequence;});for (var s = this._getModule(wt), r = 0; r < a; r++) {if (Br[e[r].event]) {this.receivedMessageCount += 1, t = this.packMessage(e[r], e[r].event);var i = 1 === e[r].isModified;if ((s.isUnlimitedAVChatRoom() || !this.sequencesLinkedList.has(t.sequence)) && !this.messageIDLinkedList.has(t.ID)) {var c = t.conversationID;if (this.receivedMessageCount % 40 == 0 && this._getModule(Ht).detectMessageLoss(c, this.sequencesLinkedList.data()), null !== this.sequencesLinkedList.tail()) {var u = this.sequencesLinkedList.tail().value,l = t.sequence - u;l > 1 && l <= 20 ? this._getModule(Ht).onMessageMaybeLost(c, u + 1, l - 1) : l < -1 && l >= -20 && this._getModule(Ht).onMessageMaybeLost(c, t.sequence + 1, Math.abs(l) - 1);}this.sequencesLinkedList.set(t.sequence), this.messageIDLinkedList.set(t.ID);var d = !1;if (this._isMessageSentByCurrentInstance(t) ? i && (d = !0, t.isModified = i, o.updateMessageIsModifiedProperty(t)) : d = !0, d) {if (t.conversationType, k.CONV_SYSTEM, t.conversationType !== k.CONV_SYSTEM) {var g = this._getModule($t),p = t.conversationID.replace(k.CONV_GROUP, "");this._pollingInstanceMap.has(p) ? g.addMessageSequence({ key: ya, message: t }) : (t.type !== k.MSG_GRP_TIP && g.addMessageDelay({ currentTime: Date.now(), time: t.time }), g.addMessageSequence({ key: va, message: t }));}n.push(t);}}} else Ee.warn("".concat(this._className, ".onMessage 未处理的 event 类型: ").concat(e[r].event));}if (0 !== n.length) {this._groupModule.filterModifiedMessage(n);var h = this.packConversationOption(n);if (h.length > 0) this._getModule(Pt).onNewMessage({ conversationOptionsList: h, isInstantMessage: !0 });Ee.debug("".concat(this._className, ".onMessage count:").concat(n.length)), this._checkMessageStacked(n);var _ = this._groupModule.filterUnmodifiedMessage(n);_.length > 0 && this._groupModule.emitOuterEvent(E.MESSAGE_RECEIVED, _), n.length = 0;}}} }, { key: "_checkMessageStacked", value: function value(e) {var t = e.length;t >= 100 && (Ee.warn("".concat(this._className, "._checkMessageStacked 直播群消息堆积数:").concat(e.length, '！可能会导致微信小程序渲染时遇到 "Dom limit exceeded" 的错误，建议接入侧此时只渲染最近的10条消息')), this._reportMessageStackedCount < 5 && (new Sa(Ls).setNetworkType(this._groupModule.getNetworkType()).setMessage("count:".concat(t, " groupID:").concat(M(this._joinedGroupMap.keys()))).setLevel("warning").end(), this._reportMessageStackedCount += 1));} }, { key: "_isMessageSentByCurrentInstance", value: function value(e) {return !!this._getModule(Pt).isMessageSentByCurrentInstance(e);} }, { key: "packMessage", value: function value(e, t) {e.currentUser = this._groupModule.getMyUserID(), e.conversationType = 5 === t ? k.CONV_SYSTEM : k.CONV_GROUP, e.isSystemMessage = !!e.isSystemMessage;var n = new ur(e),o = this.packElements(e, t);return n.setElement(o), n;} }, { key: "packElements", value: function value(e, t) {return 4 === t || 6 === t ? (this._updateMemberCountByGroupTips(e), { type: k.MSG_GRP_TIP, content: r({}, e.elements, { groupProfile: e.groupProfile }) }) : 5 === t ? { type: k.MSG_GRP_SYS_NOTICE, content: r({}, e.elements, { groupProfile: e.groupProfile }) } : this._getModule(Ft).parseElements(e.elements, e.from);} }, { key: "packConversationOption", value: function value(e) {for (var t = new Map(), n = 0; n < e.length; n++) {var o = e[n],a = o.conversationID;if (t.has(a)) {var s = t.get(a);s.lastMessage = o, "in" === o.flow && s.unreadCount++;} else t.set(a, { conversationID: o.conversationID, unreadCount: "out" === o.flow ? 0 : 1, type: o.conversationType, subType: o.conversationSubType, lastMessage: o });}return M(t.values());} }, { key: "_updateMemberCountByGroupTips", value: function value(e) {var t = e.groupProfile.groupID,n = e.elements.onlineMemberInfo,o = void 0 === n ? void 0 : n;if (!gt(o)) {var a = o.onlineMemberNum,s = void 0 === a ? 0 : a,r = o.expireTime,i = void 0 === r ? this.DEFAULT_EXPIRE_TIME : r,c = this._onlineMemberCountMap.get(t) || {},u = Date.now();gt(c) ? Object.assign(c, { lastReqTime: 0, lastSyncTime: 0, latestUpdateTime: u, memberCount: s, expireTime: i }) : (c.latestUpdateTime = u, c.memberCount = s), Ee.debug("".concat(this._className, "._updateMemberCountByGroupTips info:"), c), this._onlineMemberCountMap.set(t, c);}} }, { key: "start", value: function value(e) {if (this._pollingInstanceMap.has(e)) {var t = this._pollingInstanceMap.get(e);t.isRunning() || t.start();} else {var n = new xr({ groupModule: this._groupModule, groupID: e, onInit: this._updateRequestData.bind(this), onSuccess: this._handleSuccess.bind(this), onFail: this._handleFailure.bind(this) });n.start(), this._pollingInstanceMap.set(e, n), Ee.log("".concat(this._className, ".start groupID:").concat(e));}} }, { key: "handleJoinResult", value: function value(e) {var t = this;return this._preCheck().then(function () {var n = e.longPollingKey,o = e.group,a = o.groupID;return t._joinedGroupMap.set(a, o), t._groupModule.updateGroupMap([o]), t._groupModule.deleteUnjoinedAVChatRoom(a), t._groupModule.emitGroupListUpdate(!0, !1), Re(n) ? vr({ status: $s, group: o }) : Promise.resolve();});} }, { key: "startRunLoop", value: function value(e) {var t = this;return this.handleJoinResult(e).then(function () {var n = e.longPollingKey,o = e.group,a = o.groupID;return t._pollingRequestInfoMap.set(a, { key: n, startSeq: 0 }), t.start(a), t._groupModule.isLoggedIn() ? vr({ status: $s, group: o }) : vr({ status: $s });});} }, { key: "_preCheck", value: function value() {if (this._getModule(wt).isUnlimitedAVChatRoom()) return Promise.resolve();if (!this.hasJoinedAVChatRoom()) return Promise.resolve();var e = m(this._joinedGroupMap.entries().next().value, 2),t = e[0],n = e[1];if (this._groupModule.isLoggedIn()) {if (!(n.selfInfo.role === k.GRP_MBR_ROLE_OWNER || n.ownerID === this._groupModule.getMyUserID())) return this._groupModule.quitGroup(t);this._groupModule.deleteLocalGroupAndConversation(t);} else this._groupModule.deleteLocalGroupAndConversation(t);return this.reset(t), Promise.resolve();} }, { key: "joinWithoutAuth", value: function value(e) {var t = this,n = e.groupID,o = "".concat(this._className, ".joinWithoutAuth"),a = new Sa(vs);return this._groupModule.request({ protocolName: Dn, requestData: e }).then(function (e) {var s = e.data.longPollingKey;if (a.setNetworkType(t._groupModule.getNetworkType()).setMessage("groupID:".concat(n, " longPollingKey:").concat(s)).end(!0), Re(s)) return yr(new fr({ code: eo.CANNOT_JOIN_NON_AVCHATROOM_WITHOUT_LOGIN, message: jo }));Ee.log("".concat(o, " ok. groupID:").concat(n)), t._getModule(Pt).setCompleted("".concat(k.CONV_GROUP).concat(n));var r = new Gr({ groupID: n });return t.startRunLoop({ group: r, longPollingKey: s }), lr({ status: $s });}).catch(function (e) {return Ee.error("".concat(o, " failed. groupID:").concat(n, " error:"), e), t._groupModule.probeNetwork().then(function (t) {var o = m(t, 2),s = o[0],r = o[1];a.setError(e, s, r).setMessage("groupID:".concat(n)).end(!0);}), yr(e);}).finally(function () {t._groupModule.getModule(bt).reportAtOnce();});} }, { key: "getGroupOnlineMemberCount", value: function value(e) {var t = this._onlineMemberCountMap.get(e) || {},n = Date.now();return gt(t) || n - t.lastSyncTime > 1e3 * t.expireTime && n - t.latestUpdateTime > 1e4 && n - t.lastReqTime > 3e3 ? (t.lastReqTime = n, this._onlineMemberCountMap.set(e, t), this._getGroupOnlineMemberCount(e).then(function (e) {return lr({ memberCount: e.memberCount });}).catch(function (e) {return yr(e);})) : vr({ memberCount: t.memberCount });} }, { key: "_getGroupOnlineMemberCount", value: function value(e) {var t = this,n = "".concat(this._className, "._getGroupOnlineMemberCount");return this._groupModule.request({ protocolName: bn, requestData: { groupID: e } }).then(function (o) {var a = t._onlineMemberCountMap.get(e) || {},s = o.data,r = s.onlineMemberNum,i = void 0 === r ? 0 : r,c = s.expireTime,u = void 0 === c ? t.DEFAULT_EXPIRE_TIME : c;Ee.log("".concat(n, " ok. groupID:").concat(e, " memberCount:").concat(i, " expireTime:").concat(u));var l = Date.now();return gt(a) && (a.lastReqTime = l), t._onlineMemberCountMap.set(e, Object.assign(a, { lastSyncTime: l, latestUpdateTime: l, memberCount: i, expireTime: u })), { memberCount: i };}).catch(function (o) {return Ee.warn("".concat(n, " failed. error:"), o), new Sa(Ns).setCode(o.code).setMessage("groupID:".concat(e, " error:").concat(JSON.stringify(o))).setNetworkType(t._groupModule.getNetworkType()).end(), Promise.reject(o);});} }, { key: "_getModule", value: function value(e) {return this._groupModule.getModule(e);} }, { key: "reset", value: function value(e) {if (e) {Ee.log("".concat(this._className, ".reset groupID:").concat(e));var t = this._pollingInstanceMap.get(e);t && t.stop(), this._pollingInstanceMap.delete(e), this._joinedGroupMap.delete(e), this._pollingRequestInfoMap.delete(e), this._onlineMemberCountMap.delete(e);} else {Ee.log("".concat(this._className, ".reset all"));var n,o = S(this._pollingInstanceMap.values());try {for (o.s(); !(n = o.n()).done;) {n.value.stop();}} catch (a) {o.e(a);} finally {o.f();}this._pollingInstanceMap.clear(), this._joinedGroupMap.clear(), this._pollingRequestInfoMap.clear(), this._onlineMemberCountMap.clear();}this.sequencesLinkedList.reset(), this.messageIDLinkedList.reset(), this.receivedMessageCount = 0, this._reportMessageStackedCount = 0;} }]), e;}(),jr = 1,Yr = 15,$r = function () {function e(n) {t(this, e), this._groupModule = n, this._className = "GroupSystemNoticeHandler", this.pendencyMap = new Map();}return o(e, [{ key: "onNewGroupSystemNotice", value: function value(e) {var t = e.dataList,n = e.isSyncingEnded,o = e.isInstantMessage;Ee.debug("".concat(this._className, ".onReceiveSystemNotice count:").concat(t.length));var a = this.newSystemNoticeStoredAndSummary({ notifiesList: t, isInstantMessage: o }),s = a.eventDataList,r = a.result;s.length > 0 && (this._groupModule.getModule(Pt).onNewMessage({ conversationOptionsList: s, isInstantMessage: o }), this._onReceivedGroupSystemNotice({ result: r, isInstantMessage: o }));o ? r.length > 0 && this._groupModule.emitOuterEvent(E.MESSAGE_RECEIVED, r) : !0 === n && this._clearGroupSystemNotice();} }, { key: "newSystemNoticeStoredAndSummary", value: function value(e) {var t = e.notifiesList,n = e.isInstantMessage,o = null,a = t.length,s = 0,i = [],c = { conversationID: k.CONV_SYSTEM, unreadCount: 0, type: k.CONV_SYSTEM, subType: null, lastMessage: null };for (s = 0; s < a; s++) {var u = t[s];if (u.elements.operationType !== Yr) u.currentUser = this._groupModule.getMyUserID(), u.conversationType = k.CONV_SYSTEM, u.conversationID = k.CONV_SYSTEM, (o = new ur(u)).setElement({ type: k.MSG_GRP_SYS_NOTICE, content: r({}, u.elements, { groupProfile: u.groupProfile }) }), o.isSystemMessage = !0, (1 === o.sequence && 1 === o.random || 2 === o.sequence && 2 === o.random) && (o.sequence = Be(), o.random = Be(), o.generateMessageID(u.currentUser), Ee.log("".concat(this._className, ".newSystemNoticeStoredAndSummary sequence and random maybe duplicated, regenerate. ID:").concat(o.ID))), this._groupModule.getModule(Pt).pushIntoNoticeResult(i, o) && (n ? c.unreadCount++ : o.setIsRead(!0), c.subType = o.conversationSubType);}return c.lastMessage = i[i.length - 1], { eventDataList: i.length > 0 ? [c] : [], result: i };} }, { key: "_clearGroupSystemNotice", value: function value() {var e = this;this.getPendencyList().then(function (t) {t.forEach(function (t) {e.pendencyMap.set("".concat(t.from, "_").concat(t.groupID, "_").concat(t.to), t);});var n = e._groupModule.getModule(Pt).getLocalMessageList(k.CONV_SYSTEM),o = [];n.forEach(function (t) {var n = t.payload,a = n.operatorID,s = n.operationType,r = n.groupProfile;if (s === jr) {var i = "".concat(a, "_").concat(r.groupID, "_").concat(r.to),c = e.pendencyMap.get(i);c && Ce(c.handled) && 0 !== c.handled && o.push(t);}}), e.deleteGroupSystemNotice({ messageList: o });});} }, { key: "deleteGroupSystemNotice", value: function value(e) {var t = this,n = "".concat(this._className, ".deleteGroupSystemNotice");return Le(e.messageList) && 0 !== e.messageList.length ? (Ee.log("".concat(n) + e.messageList.map(function (e) {return e.ID;})), this._groupModule.request({ protocolName: Pn, requestData: { messageListToDelete: e.messageList.map(function (e) {return { from: k.CONV_SYSTEM, messageSeq: e.clientSequence, messageRandom: e.random };}) } }).then(function () {Ee.log("".concat(n, " ok"));var o = t._groupModule.getModule(Pt);return e.messageList.forEach(function (e) {o.deleteLocalMessage(e);}), lr();}).catch(function (e) {return Ee.error("".concat(n, " error:"), e), yr(e);})) : vr();} }, { key: "getPendencyList", value: function value(e) {var t = this;return this._groupModule.request({ protocolName: Rn, requestData: { startTime: e && e.startTime ? e.startTime : 0, limit: e && e.limit ? e.limit : 10, handleAccount: this._groupModule.getMyUserID() } }).then(function (e) {var n = e.data.pendencyList;return 0 !== e.data.nextStartTime ? t.getPendencyList({ startTime: e.data.nextStartTime }).then(function (e) {return [].concat(M(n), M(e));}) : n;});} }, { key: "_onReceivedGroupSystemNotice", value: function value(e) {var t = this,n = e.result;e.isInstantMessage && n.forEach(function (e) {switch (e.payload.operationType) {case 1:break;case 2:t._onApplyGroupRequestAgreed(e);break;case 3:break;case 4:t._onMemberKicked(e);break;case 5:t._onGroupDismissed(e);break;case 6:break;case 7:t._onInviteGroup(e);break;case 8:t._onQuitGroup(e);break;case 9:t._onSetManager(e);break;case 10:t._onDeleteManager(e);}});} }, { key: "_onApplyGroupRequestAgreed", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(n) || this._groupModule.getGroupProfile({ groupID: n }).then(function (e) {var n = e.data.group;n && (t._groupModule.updateGroupMap([n]), t._groupModule.emitGroupListUpdate());});} }, { key: "_onMemberKicked", value: function value(e) {var t = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(t) && this._groupModule.deleteLocalGroupAndConversation(t);} }, { key: "_onGroupDismissed", value: function value(e) {var t = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(t) && this._groupModule.deleteLocalGroupAndConversation(t);var n = this._groupModule._AVChatRoomHandler;n && n.checkJoinedAVChatRoomByID(t) && n.reset(t);} }, { key: "_onInviteGroup", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(n) || this._groupModule.getGroupProfile({ groupID: n }).then(function (e) {var n = e.data.group;n && (t._groupModule.updateGroupMap([n]), t._groupModule.emitGroupListUpdate());});} }, { key: "_onQuitGroup", value: function value(e) {var t = e.payload.groupProfile.groupID;this._groupModule.hasLocalGroup(t) && this._groupModule.deleteLocalGroupAndConversation(t);} }, { key: "_onSetManager", value: function value(e) {var t = e.payload.groupProfile,n = t.to,o = t.groupID,a = this._groupModule.getModule(Rt).getLocalGroupMemberInfo(o, n);a && a.updateRole(k.GRP_MBR_ROLE_ADMIN);} }, { key: "_onDeleteManager", value: function value(e) {var t = e.payload.groupProfile,n = t.to,o = t.groupID,a = this._groupModule.getModule(Rt).getLocalGroupMemberInfo(o, n);a && a.updateRole(k.GRP_MBR_ROLE_MEMBER);} }, { key: "reset", value: function value() {this.pendencyMap.clear();} }]), e;}(),zr = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "GroupModule", o._commonGroupHandler = null, o._AVChatRoomHandler = null, o._groupSystemNoticeHandler = null, o._commonGroupHandler = new Kr(h(o)), o._AVChatRoomHandler = new Hr(h(o)), o._groupTipsHandler = new Vr(h(o)), o._groupSystemNoticeHandler = new $r(h(o)), o.groupMap = new Map(), o._unjoinedAVChatRoomList = new Map(), o;}return o(a, [{ key: "onCheckTimer", value: function value(e) {this.isLoggedIn() && (this._commonGroupHandler.onCheckTimer(e), this._groupTipsHandler.onCheckTimer(e));} }, { key: "guardForAVChatRoom", value: function value(e) {var t = this;if (e.conversationType === k.CONV_GROUP) {var n = e.to;return this.hasLocalGroup(n) ? vr() : this.getGroupProfile({ groupID: n }).then(function (o) {var a = o.data.group.type;if (Ee.log("".concat(t._className, ".guardForAVChatRoom. groupID:").concat(n, " type:").concat(a)), a === k.GRP_AVCHATROOM) {var s = "userId:".concat(e.from, " 未加入群 groupID:").concat(n, "。发消息前先使用 joinGroup 接口申请加群，详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#joinGroup");return Ee.warn("".concat(t._className, ".guardForAVChatRoom sendMessage not allowed. ").concat(s)), yr(new fr({ code: eo.MESSAGE_SEND_FAIL, message: s, data: { message: e } }));}return vr();});}return vr();} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return !!this._AVChatRoomHandler && this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e);} }, { key: "onNewGroupMessage", value: function value(e) {this._commonGroupHandler && this._commonGroupHandler.onNewGroupMessage(e);} }, { key: "updateNextMessageSeq", value: function value(e) {var t = this;Le(e) && e.forEach(function (e) {var n = e.conversationID.replace(k.CONV_GROUP, "");t.groupMap.has(n) && (t.groupMap.get(n).nextMessageSeq = e.lastMessage.sequence + 1);});} }, { key: "onNewGroupTips", value: function value(e) {this._groupTipsHandler && this._groupTipsHandler.onNewGroupTips(e);} }, { key: "onGroupMessageRevoked", value: function value(e) {this._commonGroupHandler && this._commonGroupHandler.onGroupMessageRevoked(e);} }, { key: "onNewGroupSystemNotice", value: function value(e) {this._groupSystemNoticeHandler && this._groupSystemNoticeHandler.onNewGroupSystemNotice(e);} }, { key: "onGroupMessageReadNotice", value: function value(e) {var t = this;e.dataList.forEach(function (e) {var n = e.elements.groupMessageReadNotice;if (!Re(n)) {var o = t.getModule(Pt);n.forEach(function (e) {var n = e.groupID,a = e.lastMessageSeq;Ee.debug("".concat(t._className, ".onGroupMessageReadNotice groupID:").concat(n, " lastMessageSeq:").concat(a));var s = "".concat(k.CONV_GROUP).concat(n);o.updateIsReadAfterReadReport({ conversationID: s, lastMessageSeq: a }), o.updateUnreadCount(s);});}});} }, { key: "deleteGroupSystemNotice", value: function value(e) {this._groupSystemNoticeHandler && this._groupSystemNoticeHandler.deleteGroupSystemNotice(e);} }, { key: "initGroupMap", value: function value(e) {this.groupMap.set(e.groupID, new Gr(e));} }, { key: "deleteGroup", value: function value(e) {this.groupMap.delete(e);} }, { key: "updateGroupMap", value: function value(e) {var t = this;e.forEach(function (e) {t.groupMap.has(e.groupID) ? t.groupMap.get(e.groupID).updateGroup(e) : t.groupMap.set(e.groupID, new Gr(e));}), this._setStorageGroupList();} }, { key: "getStorageGroupList", value: function value() {return this.getModule(Gt).getItem("groupMap");} }, { key: "_setStorageGroupList", value: function value() {var e = this.getLocalGroupList().filter(function (e) {var t = e.type;return !Ze(t);}).slice(0, 20).map(function (e) {return { groupID: e.groupID, name: e.name, avatar: e.avatar, type: e.type };});this.getModule(Gt).setItem("groupMap", e);} }, { key: "getGroupMap", value: function value() {return this.groupMap;} }, { key: "getLocalGroupList", value: function value() {return M(this.groupMap.values());} }, { key: "getLocalGroupProfile", value: function value(e) {return this.groupMap.get(e);} }, { key: "sortLocalGroupList", value: function value() {var e = M(this.groupMap).filter(function (e) {var t = m(e, 2);t[0];return !gt(t[1].lastMessage);});e.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;}), this.groupMap = new Map(M(e));} }, { key: "updateGroupLastMessage", value: function value(e) {this._commonGroupHandler && this._commonGroupHandler.handleUpdateGroupLastMessage(e);} }, { key: "emitGroupListUpdate", value: function value() {var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],n = this.getLocalGroupList();if (e && this.emitOuterEvent(E.GROUP_LIST_UPDATED, n), t) {var o = JSON.parse(JSON.stringify(n)),a = this.getModule(Pt);a.updateConversationGroupProfile(o);}} }, { key: "getGroupList", value: function value(e) {return this._commonGroupHandler ? this._commonGroupHandler.getGroupList(e) : vr();} }, { key: "getGroupProfile", value: function value(e) {var t = this,n = new Sa(ps),o = "".concat(this._className, ".getGroupProfile"),a = e.groupID,s = e.groupCustomFieldFilter;Ee.log("".concat(o, " groupID:").concat(a));var r = { groupIDList: [a], responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember"], groupCustomFieldFilter: s } };return this.getGroupProfileAdvance(r).then(function (e) {var s,r = e.data,i = r.successGroupList,c = r.failureGroupList;return Ee.log("".concat(o, " ok")), c.length > 0 ? yr(c[0]) : (Ze(i[0].type) && !t.hasLocalGroup(a) ? s = new Gr(i[0]) : (t.updateGroupMap(i), s = t.getLocalGroupProfile(a)), n.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(a, " type:").concat(s.type, " muteAllMembers:").concat(s.muteAllMembers, " ownerID:").concat(s.ownerID)).end(), s && s.selfInfo && !s.selfInfo.nameCard ? t.updateSelfInfo(s).then(function (e) {return lr({ group: e });}) : lr({ group: s }));}).catch(function (a) {return t.probeNetwork().then(function (t) {var o = m(t, 2),s = o[0],r = o[1];n.setError(a, s, r).setMessage("groupID:".concat(e.groupID)).end();}), Ee.error("".concat(o, " failed. error:"), a), yr(a);});} }, { key: "getGroupProfileAdvance", value: function value(e) {var t = "".concat(this._className, ".getGroupProfileAdvance");return Le(e.groupIDList) && e.groupIDList.length > 50 && (Ee.warn("".concat(t, " 获取群资料的数量不能超过50个")), e.groupIDList.length = 50), Ee.log("".concat(t, " groupIDList:").concat(e.groupIDList)), this.request({ protocolName: Mn, requestData: e }).then(function (e) {Ee.log("".concat(t, " ok"));var n = e.data.groups,o = n.filter(function (e) {return Re(e.errorCode) || 0 === e.errorCode;}),a = n.filter(function (e) {return e.errorCode && 0 !== e.errorCode;}).map(function (e) {return new fr({ code: e.errorCode, message: e.errorInfo, data: { groupID: e.groupID } });});return lr({ successGroupList: o, failureGroupList: a });}).catch(function (e) {return Ee.error("".concat(t, " failed. error:"), e), yr(e);});} }, { key: "updateSelfInfo", value: function value(e) {var t = "".concat(this._className, ".updateSelfInfo"),n = e.groupID;return Ee.log("".concat(t, " groupID:").concat(n)), this.getModule(Rt).getGroupMemberProfile({ groupID: n, userIDList: [this.getMyUserID()] }).then(function (n) {var o = n.data.memberList;return Ee.log("".concat(t, " ok")), e && 0 !== o.length && e.updateSelfInfo(o[0]), e;});} }, { key: "createGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".createGroup");if (!["Public", "Private", "ChatRoom", "AVChatRoom"].includes(e.type)) {var o = new fr({ code: eo.ILLEGAL_GROUP_TYPE, message: Uo });return yr(o);}Ze(e.type) && !Re(e.memberList) && e.memberList.length > 0 && (Ee.warn("".concat(n, " 创建 AVChatRoom 时不能添加群成员，自动忽略该字段")), e.memberList = void 0), Qe(e.type) || Re(e.joinOption) || (Ee.warn("".concat(n, " 创建 Work/Meeting/AVChatRoom 群时不能设置字段 joinOption，自动忽略该字段")), e.joinOption = void 0);var a = new Sa(ns);Ee.log("".concat(n, " options:"), e);var s = [];return this.request({ protocolName: vn, requestData: r({}, e, { ownerID: this.getMyUserID(), webPushFlag: 1 }) }).then(function (o) {var i = o.data,c = i.groupID,u = i.overLimitUserIDList,l = void 0 === u ? [] : u;if (s = l, a.setNetworkType(t.getNetworkType()).setMessage("groupType:".concat(e.type, " groupID:").concat(c, " overLimitUserIDList=").concat(l)).end(), Ee.log("".concat(n, " ok groupID:").concat(c, " overLimitUserIDList:"), l), e.type === k.GRP_AVCHATROOM) return t.getGroupProfile({ groupID: c });gt(e.memberList) || gt(l) || (e.memberList = e.memberList.filter(function (e) {return -1 === l.indexOf(e.userID);})), t.updateGroupMap([r({}, e, { groupID: c })]);var d = t.getModule(Ct),g = d.createCustomMessage({ to: c, conversationType: k.CONV_GROUP, payload: { data: "group_create", extension: "".concat(t.getMyUserID(), "创建群组") } });return d.sendMessageInstance(g), t.emitGroupListUpdate(), t.getGroupProfile({ groupID: c });}).then(function (e) {var t = e.data.group,n = t.selfInfo,o = n.nameCard,a = n.joinTime;return t.updateSelfInfo({ nameCard: o, joinTime: a, messageRemindType: k.MSG_REMIND_ACPT_AND_NOTE, role: k.GRP_MBR_ROLE_OWNER }), lr({ group: t, overLimitUserIDList: s });}).catch(function (o) {return a.setMessage("groupType:".concat(e.type)), t.probeNetwork().then(function (e) {var t = m(e, 2),n = t[0],s = t[1];a.setError(o, n, s).end();}), Ee.error("".concat(n, " failed. error:"), o), yr(o);});} }, { key: "dismissGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".dismissGroup");if (this.hasLocalGroup(e) && this.getLocalGroupProfile(e).type === k.GRP_WORK) return yr(new fr({ code: eo.CANNOT_DISMISS_WORK, message: Ko }));var o = new Sa(ls);return o.setMessage("groupID:".concat(e)), Ee.log("".concat(n, " groupID:").concat(e)), this.request({ protocolName: yn, requestData: { groupID: e } }).then(function () {return o.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), t.deleteLocalGroupAndConversation(e), t.checkJoinedAVChatRoomByID(e) && t._AVChatRoomHandler.reset(e), lr({ groupID: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "updateGroupProfile", value: function value(e) {var t = this,n = "".concat(this._className, ".updateGroupProfile");!this.hasLocalGroup(e.groupID) || Qe(this.getLocalGroupProfile(e.groupID).type) || Re(e.joinOption) || (Ee.warn("".concat(n, " Work/Meeting/AVChatRoom 群不能设置字段 joinOption，自动忽略该字段")), e.joinOption = void 0), Re(e.muteAllMembers) || (e.muteAllMembers ? e.muteAllMembers = "On" : e.muteAllMembers = "Off");var o = new Sa(ds);return o.setMessage(JSON.stringify(e)), Ee.log("".concat(n, " groupID:").concat(e.groupID)), this.request({ protocolName: In, requestData: e }).then(function () {(o.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), t.hasLocalGroup(e.groupID)) && (t.groupMap.get(e.groupID).updateGroup(e), t._setStorageGroupList());return lr({ group: t.groupMap.get(e.groupID) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.log("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "joinGroup", value: function value(e) {var t = this,n = e.groupID,o = e.type,a = "".concat(this._className, ".joinGroup");if (o === k.GRP_WORK) {var s = new fr({ code: eo.CANNOT_JOIN_WORK, message: Fo });return yr(s);}if (this.deleteUnjoinedAVChatRoom(n), this.hasLocalGroup(n)) {if (!this.isLoggedIn()) return vr({ status: k.JOIN_STATUS_ALREADY_IN_GROUP });var r = new Sa(os);return this.getGroupProfile({ groupID: n }).then(function () {return r.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(n, " joinedStatus:").concat(k.JOIN_STATUS_ALREADY_IN_GROUP)).end(), vr({ status: k.JOIN_STATUS_ALREADY_IN_GROUP });}).catch(function (o) {return r.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(n, " unjoined")).end(), Ee.warn("".concat(a, " ").concat(n, " was unjoined, now join!")), t.groupMap.delete(n), t.applyJoinGroup(e);});}return Ee.log("".concat(a, " groupID:").concat(n)), this.isLoggedIn() ? this.applyJoinGroup(e) : this._AVChatRoomHandler.joinWithoutAuth(e);} }, { key: "applyJoinGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".applyJoinGroup"),o = e.groupID,a = new Sa(os);return this.request({ protocolName: Tn, requestData: e }).then(function (e) {var s = e.data,r = s.joinedStatus,i = s.longPollingKey,c = s.avChatRoomFlag,u = "groupID:".concat(o, " joinedStatus:").concat(r, " longPollingKey:").concat(i, " avChatRoomFlag:").concat(c);switch (a.setNetworkType(t.getNetworkType()).setMessage("".concat(u)).end(), Ee.log("".concat(n, " ok. ").concat(u)), r) {case zs:return lr({ status: zs });case $s:return t.getGroupProfile({ groupID: o }).then(function (e) {var n = e.data.group,a = { status: $s, group: n };return 1 === c ? (t.getModule(Pt).setCompleted("".concat(k.CONV_GROUP).concat(o)), Re(i) ? t._AVChatRoomHandler.handleJoinResult({ group: n }) : t._AVChatRoomHandler.startRunLoop({ longPollingKey: i, group: n })) : (t.emitGroupListUpdate(!0, !1), lr(a));});default:var l = new fr({ code: eo.JOIN_GROUP_FAIL, message: Bo });return Ee.error("".concat(n, " error:"), l), yr(l);}}).catch(function (o) {return a.setMessage("groupID:".concat(e.groupID)), t.probeNetwork().then(function (e) {var t = m(e, 2),n = t[0],s = t[1];a.setError(o, n, s).end();}), Ee.error("".concat(n, " error:"), o), yr(o);});} }, { key: "quitGroup", value: function value(e) {var t = this,n = "".concat(this._className, ".quitGroup");Ee.log("".concat(n, " groupID:").concat(e));var o = this.checkJoinedAVChatRoomByID(e);if (!o && !this.hasLocalGroup(e)) {var a = new fr({ code: eo.MEMBER_NOT_IN_GROUP, message: xo });return yr(a);}if (o && !this.isLoggedIn()) return Ee.log("".concat(n, " anonymously ok. groupID:").concat(e)), this.deleteLocalGroupAndConversation(e), this._AVChatRoomHandler.reset(e), vr({ groupID: e });var s = new Sa(as);return s.setMessage("groupID:".concat(e)), this.request({ protocolName: Sn, requestData: { groupID: e } }).then(function () {return s.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), o && t._AVChatRoomHandler.reset(e), t.deleteLocalGroupAndConversation(e), lr({ groupID: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];s.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "searchGroupByID", value: function value(e) {var t = this,n = "".concat(this._className, ".searchGroupByID"),o = { groupIDList: [e] },a = new Sa(ss);return a.setMessage("groupID:".concat(e)), Ee.log("".concat(n, " groupID:").concat(e)), this.request({ protocolName: En, requestData: o }).then(function (e) {var o = e.data.groupProfile;if (0 !== o[0].errorCode) throw new fr({ code: o[0].errorCode, message: o[0].errorInfo });return a.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), lr({ group: new Gr(o[0]) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],s = n[1];a.setError(e, o, s).end();}), Ee.warn("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "changeGroupOwner", value: function value(e) {var t = this,n = "".concat(this._className, ".changeGroupOwner");if (this.hasLocalGroup(e.groupID) && this.getLocalGroupProfile(e.groupID).type === k.GRP_AVCHATROOM) return yr(new fr({ code: eo.CANNOT_CHANGE_OWNER_IN_AVCHATROOM, message: qo }));if (e.newOwnerID === this.getMyUserID()) return yr(new fr({ code: eo.CANNOT_CHANGE_OWNER_TO_SELF, message: Vo }));var o = new Sa(rs);return o.setMessage("groupID:".concat(e.groupID, " newOwnerID:").concat(e.newOwnerID)), Ee.log("".concat(n, " groupID:").concat(e.groupID)), this.request({ protocolName: kn, requestData: e }).then(function () {o.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok"));var a = e.groupID,s = e.newOwnerID;t.groupMap.get(a).ownerID = s;var r = t.getModule(Rt).getLocalGroupMemberList(a);if (r instanceof Map) {var i = r.get(t.getMyUserID());Re(i) || (i.updateRole("Member"), t.groupMap.get(a).selfInfo.role = "Member");var c = r.get(s);Re(c) || c.updateRole("Owner");}return t.emitGroupListUpdate(!0, !1), lr({ group: t.groupMap.get(a) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "handleGroupApplication", value: function value(e) {var t = this,n = "".concat(this._className, ".handleGroupApplication"),o = e.message.payload,a = o.groupProfile.groupID,s = o.authentication,i = o.messageKey,c = o.operatorID,u = new Sa(is);return u.setMessage("groupID:".concat(a)), Ee.log("".concat(n, " groupID:").concat(a)), this.request({ protocolName: Cn, requestData: r({}, e, { applicant: c, groupID: a, authentication: s, messageKey: i }) }).then(function () {return u.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), t._groupSystemNoticeHandler.deleteGroupSystemNotice({ messageList: [e.message] }), lr({ group: t.getLocalGroupProfile(a) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];u.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error"), e), yr(e);});} }, { key: "handleGroupInvitation", value: function value(e) {var t = this,n = "".concat(this._className, ".handleGroupInvitation"),o = e.message.payload,a = o.groupProfile.groupID,s = o.authentication,i = o.messageKey,c = o.operatorID,u = e.handleAction,l = new Sa(cs);return l.setMessage("groupID:".concat(a, " inviter:").concat(c, " handleAction:").concat(u)), Ee.log("".concat(n, " groupID:").concat(a, " inviter:").concat(c, " handleAction:").concat(u)), this.request({ protocolName: Nn, requestData: r({}, e, { inviter: c, groupID: a, authentication: s, messageKey: i }) }).then(function () {return l.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), t._groupSystemNoticeHandler.deleteGroupSystemNotice({ messageList: [e.message] }), lr({ group: t.getLocalGroupProfile(a) });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];l.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error"), e), yr(e);});} }, { key: "getGroupOnlineMemberCount", value: function value(e) {return this._AVChatRoomHandler ? this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e) ? this._AVChatRoomHandler.getGroupOnlineMemberCount(e) : vr({ memberCount: 0 }) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "hasLocalGroup", value: function value(e) {return this.groupMap.has(e);} }, { key: "deleteLocalGroupAndConversation", value: function value(e) {this._deleteLocalGroup(e), this.getModule(Pt).deleteLocalConversation("GROUP".concat(e)), this.emitGroupListUpdate(!0, !1);} }, { key: "_deleteLocalGroup", value: function value(e) {this.groupMap.delete(e), this.getModule(Rt).deleteGroupMemberList(e), this._setStorageGroupList();} }, { key: "sendMessage", value: function value(e, t) {var n = this.createGroupMessagePack(e, t);return this.request(n);} }, { key: "createGroupMessagePack", value: function value(e, t) {var n = null;t && t.offlinePushInfo && (n = t.offlinePushInfo);var o = "";Ne(e.cloudCustomData) && e.cloudCustomData.length > 0 && (o = e.cloudCustomData);var a = e.getGroupAtInfoList();return { protocolName: tn, tjgID: this.generateTjgID(e), requestData: { fromAccount: this.getMyUserID(), groupID: e.to, msgBody: e.getElements(), cloudCustomData: o, random: e.random, priority: e.priority, clientSequence: e.clientSequence, groupAtInfo: e.type !== k.MSG_TEXT || gt(a) ? void 0 : a, onlineOnlyFlag: this.isOnlineMessage(e, t) ? 1 : 0, offlinePushInfo: n ? { pushFlag: !0 === n.disablePush ? 1 : 0, title: n.title || "", desc: n.description || "", ext: n.extension || "", apnsInfo: { badgeMode: !0 === n.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: n.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "revokeMessage", value: function value(e) {return this.request({ protocolName: An, requestData: { to: e.to, msgSeqList: [{ msgSeq: e.sequence }] } });} }, { key: "deleteMessage", value: function value(e) {var t = e.to,n = e.keyList;return Ee.log("".concat(this._className, ".deleteMessage groupID:").concat(t, " count:").concat(n.length)), this.request({ protocolName: Un, requestData: { groupID: t, deleter: this.getMyUserID(), keyList: n } });} }, { key: "getRoamingMessage", value: function value(e) {var t = this,n = "".concat(this._className, ".getRoamingMessage"),o = new Sa(Va),a = 0;return this._computeLastSequence(e).then(function (n) {return a = n, Ee.log("".concat(t._className, ".getRoamingMessage groupID:").concat(e.groupID, " lastSequence:").concat(a)), t.request({ protocolName: Ln, requestData: { groupID: e.groupID, count: 21, sequence: a } });}).then(function (s) {var r = s.data,i = r.messageList,c = r.complete;Re(i) ? Ee.log("".concat(n, " ok. complete:").concat(c, " but messageList is undefined!")) : Ee.log("".concat(n, " ok. complete:").concat(c, " count:").concat(i.length)), o.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(e.groupID, " lastSequence:").concat(a, " complete:").concat(c, " count:").concat(i ? i.length : "undefined")).end();var u = "GROUP".concat(e.groupID),l = t.getModule(Pt);if (2 === c || gt(i)) return l.setCompleted(u), [];var d = l.storeRoamingMessage(i, u);return l.updateIsRead(u), l.patchConversationLastMessage(u), d;}).catch(function (s) {return t.probeNetwork().then(function (t) {var n = m(t, 2),r = n[0],i = n[1];o.setError(s, r, i).setMessage("groupID:".concat(e.groupID, " lastSequence:").concat(a)).end();}), Ee.warn("".concat(n, " failed. error:"), s), yr(s);});} }, { key: "setMessageRead", value: function value(e) {var t = this,n = e.conversationID,o = e.lastMessageSeq,a = "".concat(this._className, ".setMessageRead");Ee.log("".concat(a, " conversationID:").concat(n, " lastMessageSeq:").concat(o)), Ce(o) || Ee.warn("".concat(a, " 请勿修改 Conversation.lastMessage.lastSequence，否则可能会导致已读上报结果不准确"));var s = new Sa(Ha);return s.setMessage("".concat(n, "-").concat(o)), this.request({ protocolName: On, requestData: { groupID: n.replace("GROUP", ""), messageReadSeq: o } }).then(function () {s.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(a, " ok."));var e = t.getModule(Pt);return e.updateIsReadAfterReadReport({ conversationID: n, lastMessageSeq: o }), e.updateUnreadCount(n), lr();}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];s.setError(e, o, a).end();}), Ee.log("".concat(a, " failed. error:"), e), yr(e);});} }, { key: "_computeLastSequence", value: function value(e) {return e.sequence > 0 ? Promise.resolve(e.sequence) : this.getGroupLastSequence(e.groupID);} }, { key: "getGroupLastSequence", value: function value(e) {var t = this,n = "".concat(this._className, ".getGroupLastSequence"),o = new Sa(_s),a = 0,s = "";if (this.hasLocalGroup(e)) {var r = this.getLocalGroupProfile(e),i = r.lastMessage;if (i.lastSequence > 0 && !1 === i.onlineOnlyFlag) return a = i.lastSequence, s = "got lastSequence:".concat(a, " from local group profile[lastMessage.lastSequence]. groupID:").concat(e), Ee.log("".concat(n, " ").concat(s)), o.setNetworkType(this.getNetworkType()).setMessage("".concat(s)).end(), Promise.resolve(a);if (r.nextMessageSeq > 1) return a = r.nextMessageSeq - 1, s = "got lastSequence:".concat(a, " from local group profile[nextMessageSeq]. groupID:").concat(e), Ee.log("".concat(n, " ").concat(s)), o.setNetworkType(this.getNetworkType()).setMessage("".concat(s)).end(), Promise.resolve(a);}var c = "GROUP".concat(e),u = this.getModule(Pt).getLocalConversation(c);if (u && u.lastMessage.lastSequence && !1 === u.lastMessage.onlineOnlyFlag) return a = u.lastMessage.lastSequence, s = "got lastSequence:".concat(a, " from local conversation profile[lastMessage.lastSequence]. groupID:").concat(e), Ee.log("".concat(n, " ").concat(s)), o.setNetworkType(this.getNetworkType()).setMessage("".concat(s)).end(), Promise.resolve(a);var l = { groupIDList: [e], responseFilter: { groupBaseInfoFilter: ["NextMsgSeq"] } };return this.getGroupProfileAdvance(l).then(function (r) {var i = r.data.successGroupList;return gt(i) ? Ee.log("".concat(n, " successGroupList is empty. groupID:").concat(e)) : (a = i[0].nextMessageSeq - 1, s = "got lastSequence:".concat(a, " from getGroupProfileAdvance. groupID:").concat(e), Ee.log("".concat(n, " ").concat(s))), o.setNetworkType(t.getNetworkType()).setMessage("".concat(s)).end(), a;}).catch(function (a) {return t.probeNetwork().then(function (t) {var n = m(t, 2),s = n[0],r = n[1];o.setError(a, s, r).setMessage("get lastSequence failed from getGroupProfileAdvance. groupID:".concat(e)).end();}), Ee.warn("".concat(n, " failed. error:"), a), yr(a);});} }, { key: "isMessageFromAVChatroom", value: function value(e) {return !!this._AVChatRoomHandler && this._AVChatRoomHandler.checkJoinedAVChatRoomByID(e);} }, { key: "hasJoinedAVChatRoom", value: function value() {return this._AVChatRoomHandler ? this._AVChatRoomHandler.hasJoinedAVChatRoom() : 0;} }, { key: "getJoinedAVChatRoom", value: function value() {return this._AVChatRoomHandler ? this._AVChatRoomHandler.getJoinedAVChatRoom() : [];} }, { key: "isOnlineMessage", value: function value(e, t) {return !(!this._canIUseOnlineOnlyFlag(e) || !t || !0 !== t.onlineUserOnly);} }, { key: "_canIUseOnlineOnlyFlag", value: function value(e) {var t = this.getJoinedAVChatRoom();return !t || !t.includes(e.to) || e.conversationType !== k.CONV_GROUP;} }, { key: "deleteLocalGroupMembers", value: function value(e, t) {this.getModule(Rt).deleteLocalGroupMembers(e, t);} }, { key: "onAVChatRoomMessage", value: function value(e) {this._AVChatRoomHandler && this._AVChatRoomHandler.onMessage(e);} }, { key: "getGroupSimplifiedInfo", value: function value(e) {var t = this,n = new Sa(Ms),o = { groupIDList: [e], responseFilter: { groupBaseInfoFilter: ["Type", "Name"] } };return this.getGroupProfileAdvance(o).then(function (o) {var a = o.data.successGroupList;return n.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(e, " type:").concat(a[0].type)).end(), a[0];}).catch(function (o) {t.probeNetwork().then(function (t) {var a = m(t, 2),s = a[0],r = a[1];n.setError(o, s, r).setMessage("groupID:".concat(e)).end();});});} }, { key: "setUnjoinedAVChatRoom", value: function value(e) {this._unjoinedAVChatRoomList.set(e, 1);} }, { key: "deleteUnjoinedAVChatRoom", value: function value(e) {this._unjoinedAVChatRoomList.has(e) && this._unjoinedAVChatRoomList.delete(e);} }, { key: "isUnjoinedAVChatRoom", value: function value(e) {return this._unjoinedAVChatRoomList.has(e);} }, { key: "reset", value: function value() {this.groupMap.clear(), this._unjoinedAVChatRoomList.clear(), this._commonGroupHandler.reset(), this._groupSystemNoticeHandler.reset(), this._groupTipsHandler.reset(), this._AVChatRoomHandler && this._AVChatRoomHandler.reset();} }]), a;}(zt),Wr = function () {function e(n) {t(this, e), this.userID = "", this.avatar = "", this.nick = "", this.role = "", this.joinTime = "", this.lastSendMsgTime = "", this.nameCard = "", this.muteUntil = 0, this.memberCustomField = [], this._initMember(n);}return o(e, [{ key: "_initMember", value: function value(e) {this.updateMember(e);} }, { key: "updateMember", value: function value(e) {var t = [null, void 0, "", 0, NaN];e.memberCustomField && Xe(this.memberCustomField, e.memberCustomField), Ve(this, e, ["memberCustomField"], t);} }, { key: "updateRole", value: function value(e) {["Owner", "Admin", "Member"].indexOf(e) < 0 || (this.role = e);} }, { key: "updateMuteUntil", value: function value(e) {Re(e) || (this.muteUntil = Math.floor((Date.now() + 1e3 * e) / 1e3));} }, { key: "updateNameCard", value: function value(e) {Re(e) || (this.nameCard = e);} }, { key: "updateMemberCustomField", value: function value(e) {e && Xe(this.memberCustomField, e);} }]), e;}(),Jr = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "GroupMemberModule", o.groupMemberListMap = new Map(), o.getInnerEmitterInstance().on(Dr.PROFILE_UPDATED, o._onProfileUpdated, h(o)), o;}return o(a, [{ key: "_onProfileUpdated", value: function value(e) {for (var t = this, n = e.data, o = function o(e) {var o = n[e];t.groupMemberListMap.forEach(function (e) {e.has(o.userID) && e.get(o.userID).updateMember({ nick: o.nick, avatar: o.avatar });});}, a = 0; a < n.length; a++) {o(a);}} }, { key: "deleteGroupMemberList", value: function value(e) {this.groupMemberListMap.delete(e);} }, { key: "getGroupMemberList", value: function value(e) {var t = this,n = e.groupID,o = e.offset,a = void 0 === o ? 0 : o,s = e.count,r = void 0 === s ? 15 : s,i = "".concat(this._className, ".getGroupMemberList"),c = new Sa(ys);Ee.log("".concat(i, " groupID:").concat(n, " offset:").concat(a, " count:").concat(r));var u = [];return this.request({ protocolName: Fn, requestData: { groupID: n, offset: a, limit: r > 100 ? 100 : r } }).then(function (e) {var o = e.data,a = o.members,s = o.memberNum;if (!Le(a) || 0 === a.length) return Promise.resolve([]);var r = t.getModule(Ot);return r.hasLocalGroup(n) && (r.getLocalGroupProfile(n).memberNum = s), u = t._updateLocalGroupMemberMap(n, a), t.getModule(Nt).getUserProfile({ userIDList: a.map(function (e) {return e.userID;}), tagList: [Bs.NICK, Bs.AVATAR] });}).then(function (e) {var o = e.data;if (!Le(o) || 0 === o.length) return vr({ memberList: [] });var s = o.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});return t._updateLocalGroupMemberMap(n, s), c.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(n, " offset:").concat(a, " count:").concat(r)).end(), Ee.log("".concat(i, " ok.")), lr({ memberList: u });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];c.setError(e, o, a).end();}), Ee.error("".concat(i, " failed. error:"), e), yr(e);});} }, { key: "getGroupMemberProfile", value: function value(e) {var t = this,n = "".concat(this._className, ".getGroupMemberProfile"),o = new Sa(Is);o.setMessage(e.userIDList.length > 5 ? "userIDList.length:".concat(e.userIDList.length) : "userIDList:".concat(e.userIDList)), Ee.log("".concat(n, " groupID:").concat(e.groupID, " userIDList:").concat(e.userIDList.join(","))), e.userIDList.length > 50 && (e.userIDList = e.userIDList.slice(0, 50));var a = e.groupID,s = e.userIDList;return this._getGroupMemberProfileAdvance(r({}, e, { userIDList: s })).then(function (e) {var n = e.data.members;return Le(n) && 0 !== n.length ? (t._updateLocalGroupMemberMap(a, n), t.getModule(Nt).getUserProfile({ userIDList: n.map(function (e) {return e.userID;}), tagList: [Bs.NICK, Bs.AVATAR] })) : vr([]);}).then(function (e) {var n = e.data.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});t._updateLocalGroupMemberMap(a, n);var r = s.filter(function (e) {return t.hasLocalGroupMember(a, e);}).map(function (e) {return t.getLocalGroupMemberInfo(a, e);});return o.setNetworkType(t.getNetworkType()).end(), lr({ memberList: r });});} }, { key: "addGroupMember", value: function value(e) {var t = this,n = "".concat(this._className, ".addGroupMember"),o = e.groupID,a = this.getModule(Ot).getLocalGroupProfile(o),s = a.type,r = new Sa(Ts);if (r.setMessage("groupID:".concat(o, " groupType:").concat(s)), Ze(s)) {var i = new fr({ code: eo.CANNOT_ADD_MEMBER_IN_AVCHATROOM, message: Ho });return r.setCode(eo.CANNOT_ADD_MEMBER_IN_AVCHATROOM).setError(Ho).setNetworkType(this.getNetworkType()).end(), yr(i);}return e.userIDList = e.userIDList.map(function (e) {return { userID: e };}), Ee.log("".concat(n, " groupID:").concat(o)), this.request({ protocolName: Vn, requestData: e }).then(function (o) {var s = o.data.members;Ee.log("".concat(n, " ok"));var i = s.filter(function (e) {return 1 === e.result;}).map(function (e) {return e.userID;}),c = s.filter(function (e) {return 0 === e.result;}).map(function (e) {return e.userID;}),u = s.filter(function (e) {return 2 === e.result;}).map(function (e) {return e.userID;}),l = s.filter(function (e) {return 4 === e.result;}).map(function (e) {return e.userID;}),d = "groupID:".concat(e.groupID, ", ") + "successUserIDList:".concat(i, ", ") + "failureUserIDList:".concat(c, ", ") + "existedUserIDList:".concat(u, ", ") + "overLimitUserIDList:".concat(l);return r.setNetworkType(t.getNetworkType()).setMoreMessage(d).end(), 0 === i.length ? lr({ successUserIDList: i, failureUserIDList: c, existedUserIDList: u, overLimitUserIDList: l }) : (a.memberNum += i.length, lr({ successUserIDList: i, failureUserIDList: c, existedUserIDList: u, overLimitUserIDList: l, group: a }));}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];r.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "deleteGroupMember", value: function value(e) {var t = this,n = "".concat(this._className, ".deleteGroupMember"),o = e.groupID,a = e.userIDList,s = new Sa(Ds),r = "groupID:".concat(o, " ").concat(a.length > 5 ? "userIDList.length:".concat(a.length) : "userIDList:".concat(a));s.setMessage(r), Ee.log("".concat(n, " groupID:").concat(o, " userIDList:"), a);var i = this.getModule(Ot).getLocalGroupProfile(o);return Ze(i.type) ? yr(new fr({ code: eo.CANNOT_KICK_MEMBER_IN_AVCHATROOM, message: Yo })) : this.request({ protocolName: Kn, requestData: e }).then(function () {return s.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), i.memberNum--, t.deleteLocalGroupMembers(o, a), lr({ group: i, userIDList: a });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];s.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "setGroupMemberMuteTime", value: function value(e) {var t = this,n = e.groupID,o = e.userID,a = e.muteTime,s = "".concat(this._className, ".setGroupMemberMuteTime");if (o === this.getMyUserID()) return yr(new fr({ code: eo.CANNOT_MUTE_SELF, message: Xo }));Ee.log("".concat(s, " groupID:").concat(n, " userID:").concat(o));var r = new Sa(Ss);return r.setMessage("groupID:".concat(n, " userID:").concat(o, " muteTime:").concat(a)), this._modifyGroupMemberInfo({ groupID: n, userID: o, muteTime: a }).then(function (e) {r.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(s, " ok"));var o = t.getModule(Ot);return lr({ group: o.getLocalGroupProfile(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];r.setError(e, o, a).end();}), Ee.error("".concat(s, " failed. error:"), e), yr(e);});} }, { key: "setGroupMemberRole", value: function value(e) {var t = this,n = "".concat(this._className, ".setGroupMemberRole"),o = e.groupID,a = e.userID,s = e.role,r = this.getModule(Ot).getLocalGroupProfile(o);if (r.selfInfo.role !== k.GRP_MBR_ROLE_OWNER) return yr(new fr({ code: eo.NOT_OWNER, message: $o }));if ([k.GRP_WORK, k.GRP_AVCHATROOM].includes(r.type)) return yr(new fr({ code: eo.CANNOT_SET_MEMBER_ROLE_IN_WORK_AND_AVCHATROOM, message: zo }));if ([k.GRP_MBR_ROLE_ADMIN, k.GRP_MBR_ROLE_MEMBER].indexOf(s) < 0) return yr(new fr({ code: eo.INVALID_MEMBER_ROLE, message: Wo }));if (a === this.getMyUserID()) return yr(new fr({ code: eo.CANNOT_SET_SELF_MEMBER_ROLE, message: Jo }));var i = new Sa(ks);return i.setMessage("groupID:".concat(o, " userID:").concat(a, " role:").concat(s)), Ee.log("".concat(n, " groupID:").concat(o, " userID:").concat(a)), this._modifyGroupMemberInfo({ groupID: o, userID: a, role: s }).then(function (e) {return i.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok")), lr({ group: r, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];i.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "setGroupMemberNameCard", value: function value(e) {var t = this,n = "".concat(this._className, ".setGroupMemberNameCard"),o = e.groupID,a = e.userID,s = void 0 === a ? this.getMyUserID() : a,r = e.nameCard;Ee.log("".concat(n, " groupID:").concat(o, " userID:").concat(s));var i = new Sa(Es);return i.setMessage("groupID:".concat(o, " userID:").concat(s, " nameCard:").concat(r)), this._modifyGroupMemberInfo({ groupID: o, userID: s, nameCard: r }).then(function (e) {Ee.log("".concat(n, " ok")), i.setNetworkType(t.getNetworkType()).end();var a = t.getModule(Ot).getLocalGroupProfile(o);return s === t.getMyUserID() && a && a.setSelfNameCard(r), lr({ group: a, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];i.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "setGroupMemberCustomField", value: function value(e) {var t = this,n = "".concat(this._className, ".setGroupMemberCustomField"),o = e.groupID,a = e.userID,s = void 0 === a ? this.getMyUserID() : a,r = e.memberCustomField;Ee.log("".concat(n, " groupID:").concat(o, " userID:").concat(s));var i = new Sa(Cs);return i.setMessage("groupID:".concat(o, " userID:").concat(s, " memberCustomField:").concat(JSON.stringify(r))), this._modifyGroupMemberInfo({ groupID: o, userID: s, memberCustomField: r }).then(function (e) {i.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok"));var a = t.getModule(Ot).getLocalGroupProfile(o);return lr({ group: a, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];i.setError(e, o, a).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "setMessageRemindType", value: function value(e) {var t = this,n = "".concat(this._className, ".setMessageRemindType"),o = new Sa(us);o.setMessage("groupID:".concat(e.groupID)), Ee.log("".concat(n, " groupID:").concat(e.groupID));var a = e.groupID,s = e.messageRemindType;return this._modifyGroupMemberInfo({ groupID: a, messageRemindType: s, userID: this.getMyUserID() }).then(function () {o.setNetworkType(t.getNetworkType()).end(), Ee.log("".concat(n, " ok. groupID:").concat(e.groupID));var a = t.getModule(Ot).getLocalGroupProfile(e.groupID);return a && (a.selfInfo.messageRemindType = s), lr({ group: a });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "_modifyGroupMemberInfo", value: function value(e) {var t = this,n = e.groupID,o = e.userID;return this.request({ protocolName: xn, requestData: e }).then(function () {if (t.hasLocalGroupMember(n, o)) {var a = t.getLocalGroupMemberInfo(n, o);return Re(e.muteTime) || a.updateMuteUntil(e.muteTime), Re(e.role) || a.updateRole(e.role), Re(e.nameCard) || a.updateNameCard(e.nameCard), Re(e.memberCustomField) || a.updateMemberCustomField(e.memberCustomField), a;}return t.getGroupMemberProfile({ groupID: n, userIDList: [o] }).then(function (e) {return m(e.data.memberList, 1)[0];});});} }, { key: "_getGroupMemberProfileAdvance", value: function value(e) {return this.request({ protocolName: qn, requestData: r({}, e, { memberInfoFilter: e.memberInfoFilter ? e.memberInfoFilter : ["Role", "JoinTime", "NameCard", "ShutUpUntil"] }) });} }, { key: "_updateLocalGroupMemberMap", value: function value(e, t) {var n = this;return Le(t) && 0 !== t.length ? t.map(function (t) {return n.hasLocalGroupMember(e, t.userID) ? n.getLocalGroupMemberInfo(e, t.userID).updateMember(t) : n.setLocalGroupMember(e, new Wr(t)), n.getLocalGroupMemberInfo(e, t.userID);}) : [];} }, { key: "deleteLocalGroupMembers", value: function value(e, t) {var n = this.groupMemberListMap.get(e);n && t.forEach(function (e) {n.delete(e);});} }, { key: "getLocalGroupMemberInfo", value: function value(e, t) {return this.groupMemberListMap.has(e) ? this.groupMemberListMap.get(e).get(t) : null;} }, { key: "setLocalGroupMember", value: function value(e, t) {if (this.groupMemberListMap.has(e)) this.groupMemberListMap.get(e).set(t.userID, t);else {var n = new Map().set(t.userID, t);this.groupMemberListMap.set(e, n);}} }, { key: "getLocalGroupMemberList", value: function value(e) {return this.groupMemberListMap.get(e);} }, { key: "hasLocalGroupMember", value: function value(e, t) {return this.groupMemberListMap.has(e) && this.groupMemberListMap.get(e).has(t);} }, { key: "hasLocalGroupMemberMap", value: function value(e) {return this.groupMemberListMap.has(e);} }, { key: "reset", value: function value() {this.groupMemberListMap.clear();} }]), a;}(zt),Xr = function () {function e(n) {t(this, e), this._userModule = n, this._className = "ProfileHandler", this.TAG = "profile", this.accountProfileMap = new Map(), this.expirationTime = 864e5;}return o(e, [{ key: "setExpirationTime", value: function value(e) {this.expirationTime = e;} }, { key: "getUserProfile", value: function value(e) {var t = this,n = e.userIDList;e.fromAccount = this._userModule.getMyAccount(), n.length > 100 && (Ee.warn("".concat(this._className, ".getUserProfile 获取用户资料人数不能超过100人")), n.length = 100);for (var o, a = [], s = [], r = 0, i = n.length; r < i; r++) {o = n[r], this._userModule.isMyFriend(o) && this._containsAccount(o) ? s.push(this._getProfileFromMap(o)) : a.push(o);}if (0 === a.length) return vr(s);e.toAccount = a;var c = e.bFromGetMyProfile || !1,u = [];e.toAccount.forEach(function (e) {u.push({ toAccount: e, standardSequence: 0, customSequence: 0 });}), e.userItem = u;var l = new Sa(Rs);return l.setMessage(n.length > 5 ? "userIDList.length:".concat(n.length) : "userIDList:".concat(n)), this._userModule.request({ protocolName: nn, requestData: e }).then(function (e) {l.setNetworkType(t._userModule.getNetworkType()).end(), Ee.info("".concat(t._className, ".getUserProfile ok"));var n = t._handleResponse(e).concat(s);return lr(c ? n[0] : n);}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];l.setError(e, o, a).end();}), Ee.error("".concat(t._className, ".getUserProfile failed. error:"), e), yr(e);});} }, { key: "getMyProfile", value: function value() {var e = this._userModule.getMyAccount();if (Ee.log("".concat(this._className, ".getMyProfile myAccount:").concat(e)), this._fillMap(), this._containsAccount(e)) {var t = this._getProfileFromMap(e);return Ee.debug("".concat(this._className, ".getMyProfile from cache, myProfile:") + JSON.stringify(t)), vr(t);}return this.getUserProfile({ fromAccount: e, userIDList: [e], bFromGetMyProfile: !0 });} }, { key: "_handleResponse", value: function value(e) {for (var t, n, o = qe.now(), a = e.data.userProfileItem, s = [], r = 0, i = a.length; r < i; r++) {"@TLS#NOT_FOUND" !== a[r].to && "" !== a[r].to && (t = a[r].to, n = this._updateMap(t, this._getLatestProfileFromResponse(t, a[r].profileItem)), s.push(n));}return Ee.log("".concat(this._className, "._handleResponse cost ").concat(qe.now() - o, " ms")), s;} }, { key: "_getLatestProfileFromResponse", value: function value(e, t) {var n = {};if (n.userID = e, n.profileCustomField = [], !gt(t)) for (var o = 0, a = t.length; o < a; o++) {if (t[o].tag.indexOf("Tag_Profile_Custom") > -1) n.profileCustomField.push({ key: t[o].tag, value: t[o].value });else switch (t[o].tag) {case Bs.NICK:n.nick = t[o].value;break;case Bs.GENDER:n.gender = t[o].value;break;case Bs.BIRTHDAY:n.birthday = t[o].value;break;case Bs.LOCATION:n.location = t[o].value;break;case Bs.SELFSIGNATURE:n.selfSignature = t[o].value;break;case Bs.ALLOWTYPE:n.allowType = t[o].value;break;case Bs.LANGUAGE:n.language = t[o].value;break;case Bs.AVATAR:n.avatar = t[o].value;break;case Bs.MESSAGESETTINGS:n.messageSettings = t[o].value;break;case Bs.ADMINFORBIDTYPE:n.adminForbidType = t[o].value;break;case Bs.LEVEL:n.level = t[o].value;break;case Bs.ROLE:n.role = t[o].value;break;default:Ee.warn("".concat(this._className, "._handleResponse unknown tag:"), t[o].tag, t[o].value);}}return n;} }, { key: "updateMyProfile", value: function value(e) {var t = this,n = "".concat(this._className, ".updateMyProfile"),o = new Sa(Ps);o.setMessage(JSON.stringify(e));var a = new Lr().validate(e);if (!a.valid) return o.setCode(eo.UPDATE_PROFILE_INVALID_PARAM).setMoreMessage("".concat(n, " info:").concat(a.tips)).setNetworkType(this._userModule.getNetworkType()).end(), Ee.error("".concat(n, " info:").concat(a.tips, "，请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#updateMyProfile")), yr({ code: eo.UPDATE_PROFILE_INVALID_PARAM, message: Qo });var s = [];for (var r in e) {Object.prototype.hasOwnProperty.call(e, r) && ("profileCustomField" === r ? e.profileCustomField.forEach(function (e) {s.push({ tag: e.key, value: e.value });}) : s.push({ tag: Bs[r.toUpperCase()], value: e[r] }));}return 0 === s.length ? (o.setCode(eo.UPDATE_PROFILE_NO_KEY).setMoreMessage(Zo).setNetworkType(this._userModule.getNetworkType()).end(), Ee.error("".concat(n, " info:").concat(Zo, "，请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#updateMyProfile")), yr({ code: eo.UPDATE_PROFILE_NO_KEY, message: Zo })) : this._userModule.request({ protocolName: on, requestData: { fromAccount: this._userModule.getMyAccount(), profileItem: s } }).then(function (a) {o.setNetworkType(t._userModule.getNetworkType()).end(), Ee.info("".concat(n, " ok"));var s = t._updateMap(t._userModule.getMyAccount(), e);return t._userModule.emitOuterEvent(E.PROFILE_UPDATED, [s]), vr(s);}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);});} }, { key: "onProfileModified", value: function value(e) {var t = e.dataList;if (!gt(t)) {var n,o,a = t.length;Ee.info("".concat(this._className, ".onProfileModified count:").concat(a));for (var s = [], r = this._userModule.getModule(Pt), i = 0; i < a; i++) {n = t[i].userID, o = this._updateMap(n, this._getLatestProfileFromResponse(n, t[i].profileList)), s.push(o), n === this._userModule.getMyAccount() && r.onMyProfileModified({ latestNick: o.nick, latestAvatar: o.avatar });}this._userModule.emitInnerEvent(Dr.PROFILE_UPDATED, s), this._userModule.emitOuterEvent(E.PROFILE_UPDATED, s);}} }, { key: "_fillMap", value: function value() {if (0 === this.accountProfileMap.size) {for (var e = this._getCachedProfiles(), t = Date.now(), n = 0, o = e.length; n < o; n++) {t - e[n].lastUpdatedTime < this.expirationTime && this.accountProfileMap.set(e[n].userID, e[n]);}Ee.log("".concat(this._className, "._fillMap from cache, map.size:").concat(this.accountProfileMap.size));}} }, { key: "_updateMap", value: function value(e, t) {var n,o = Date.now();return this._containsAccount(e) ? (n = this._getProfileFromMap(e), t.profileCustomField && Xe(n.profileCustomField, t.profileCustomField), Ve(n, t, ["profileCustomField"]), n.lastUpdatedTime = o) : (n = new Lr(t), (this._userModule.isMyFriend(e) || e === this._userModule.getMyAccount()) && (n.lastUpdatedTime = o, this.accountProfileMap.set(e, n))), this._flushMap(e === this._userModule.getMyAccount()), n;} }, { key: "_flushMap", value: function value(e) {var t = M(this.accountProfileMap.values()),n = this._userModule.getStorageModule();Ee.debug("".concat(this._className, "._flushMap length:").concat(t.length, " flushAtOnce:").concat(e)), n.setItem(this.TAG, t, e);} }, { key: "_containsAccount", value: function value(e) {return this.accountProfileMap.has(e);} }, { key: "_getProfileFromMap", value: function value(e) {return this.accountProfileMap.get(e);} }, { key: "_getCachedProfiles", value: function value() {var e = this._userModule.getStorageModule().getItem(this.TAG);return gt(e) ? [] : e;} }, { key: "onConversationsProfileUpdated", value: function value(e) {for (var t, n, o, a = [], s = 0, r = e.length; s < r; s++) {n = (t = e[s]).userID, this._userModule.isMyFriend(n) || (this._containsAccount(n) ? (o = this._getProfileFromMap(n), Ve(o, t) > 0 && a.push(n)) : a.push(t.userID));}0 !== a.length && (Ee.info("".concat(this._className, ".onConversationsProfileUpdated toAccountList:").concat(a)), this.getUserProfile({ userIDList: a }));} }, { key: "getNickAndAvatarByUserID", value: function value(e) {if (this._containsAccount(e)) {var t = this._getProfileFromMap(e);return { nick: t.nick, avatar: t.avatar };}return { nick: "", avatar: "" };} }, { key: "reset", value: function value() {this._flushMap(!0), this.accountProfileMap.clear();} }]), e;}(),Qr = function e(n) {t(this, e), gt || (this.userID = n.userID || "", this.timeStamp = n.timeStamp || 0);},Zr = function () {function e(n) {t(this, e), this._userModule = n, this._className = "BlacklistHandler", this._blacklistMap = new Map(), this.startIndex = 0, this.maxLimited = 100, this.currentSequence = 0;}return o(e, [{ key: "getLocalBlacklist", value: function value() {return M(this._blacklistMap.keys());} }, { key: "getBlacklist", value: function value() {var e = this,t = "".concat(this._className, ".getBlacklist"),n = { fromAccount: this._userModule.getMyAccount(), maxLimited: this.maxLimited, startIndex: 0, lastSequence: this.currentSequence },o = new Sa(ws);return this._userModule.request({ protocolName: an, requestData: n }).then(function (n) {var a = n.data,s = a.blackListItem,r = a.currentSequence,i = gt(s) ? 0 : s.length;o.setNetworkType(e._userModule.getNetworkType()).setMessage("blackList count:".concat(i)).end(), Ee.info("".concat(t, " ok")), e.currentSequence = r, e._handleResponse(s, !0), e._userModule.emitOuterEvent(E.BLACKLIST_UPDATED, M(e._blacklistMap.keys()));}).catch(function (n) {return e._userModule.probeNetwork().then(function (e) {var t = m(e, 2),a = t[0],s = t[1];o.setError(n, a, s).end();}), Ee.error("".concat(t, " failed. error:"), n), yr(n);});} }, { key: "addBlacklist", value: function value(e) {var t = this,n = "".concat(this._className, ".addBlacklist"),o = new Sa(Gs);if (!Le(e.userIDList)) return o.setCode(eo.ADD_BLACKLIST_INVALID_PARAM).setMessage(ea).setNetworkType(this._userModule.getNetworkType()).end(), Ee.error("".concat(n, " options.userIDList 必需是数组")), yr({ code: eo.ADD_BLACKLIST_INVALID_PARAM, message: ea });var a = this._userModule.getMyAccount();return 1 === e.userIDList.length && e.userIDList[0] === a ? (o.setCode(eo.CANNOT_ADD_SELF_TO_BLACKLIST).setMessage(na).setNetworkType(this._userModule.getNetworkType()).end(), Ee.error("".concat(n, " 不能把自己拉黑")), yr({ code: eo.CANNOT_ADD_SELF_TO_BLACKLIST, message: na })) : (e.userIDList.includes(a) && (e.userIDList = e.userIDList.filter(function (e) {return e !== a;}), Ee.warn("".concat(n, " 不能把自己拉黑，已过滤"))), e.fromAccount = this._userModule.getMyAccount(), e.toAccount = e.userIDList, this._userModule.request({ protocolName: sn, requestData: e }).then(function (a) {return o.setNetworkType(t._userModule.getNetworkType()).setMessage(e.userIDList.length > 5 ? "userIDList.length:".concat(e.userIDList.length) : "userIDList:".concat(e.userIDList)).end(), Ee.info("".concat(n, " ok")), t._handleResponse(a.resultItem, !0), lr(M(t._blacklistMap.keys()));}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);}));} }, { key: "_handleResponse", value: function value(e, t) {if (!gt(e)) for (var n, o, a, s = 0, r = e.length; s < r; s++) {o = e[s].to, a = e[s].resultCode, (Re(a) || 0 === a) && (t ? ((n = this._blacklistMap.has(o) ? this._blacklistMap.get(o) : new Qr()).userID = o, !gt(e[s].addBlackTimeStamp) && (n.timeStamp = e[s].addBlackTimeStamp), this._blacklistMap.set(o, n)) : this._blacklistMap.has(o) && (n = this._blacklistMap.get(o), this._blacklistMap.delete(o)));}Ee.log("".concat(this._className, "._handleResponse total:").concat(this._blacklistMap.size, " bAdd:").concat(t));} }, { key: "deleteBlacklist", value: function value(e) {var t = this,n = "".concat(this._className, ".deleteBlacklist"),o = new Sa(bs);return Le(e.userIDList) ? (e.fromAccount = this._userModule.getMyAccount(), e.toAccount = e.userIDList, this._userModule.request({ protocolName: rn, requestData: e }).then(function (a) {return o.setNetworkType(t._userModule.getNetworkType()).setMessage(e.userIDList.length > 5 ? "userIDList.length:".concat(e.userIDList.length) : "userIDList:".concat(e.userIDList)).end(), Ee.info("".concat(n, " ok")), t._handleResponse(a.data.resultItem, !1), lr(M(t._blacklistMap.keys()));}).catch(function (e) {return t._userModule.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), Ee.error("".concat(n, " failed. error:"), e), yr(e);})) : (o.setCode(eo.DEL_BLACKLIST_INVALID_PARAM).setMessage(ta).setNetworkType(this._userModule.getNetworkType()).end(), Ee.error("".concat(n, " options.userIDList 必需是数组")), yr({ code: eo.DEL_BLACKLIST_INVALID_PARAM, message: ta }));} }, { key: "onAccountDeleted", value: function value(e) {for (var t, n = [], o = 0, a = e.length; o < a; o++) {t = e[o], this._blacklistMap.has(t) && (this._blacklistMap.delete(t), n.push(t));}n.length > 0 && (Ee.log("".concat(this._className, ".onAccountDeleted count:").concat(n.length, " userIDList:"), n), this._userModule.emitOuterEvent(E.BLACKLIST_UPDATED, M(this._blacklistMap.keys())));} }, { key: "onAccountAdded", value: function value(e) {for (var t, n = [], o = 0, a = e.length; o < a; o++) {t = e[o], this._blacklistMap.has(t) || (this._blacklistMap.set(t, new Qr({ userID: t })), n.push(t));}n.length > 0 && (Ee.log("".concat(this._className, ".onAccountAdded count:").concat(n.length, " userIDList:"), n), this._userModule.emitOuterEvent(E.BLACKLIST_UPDATED, M(this._blacklistMap.keys())));} }, { key: "reset", value: function value() {this._blacklistMap.clear(), this.startIndex = 0, this.maxLimited = 100, this.currentSequence = 0;} }]), e;}(),ei = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "UserModule", o._profileHandler = new Xr(h(o)), o._blacklistHandler = new Zr(h(o)), o.getInnerEmitterInstance().on(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, o.onContextUpdated, h(o)), o;}return o(a, [{ key: "onContextUpdated", value: function value(e) {this._profileHandler.getMyProfile(), this._blacklistHandler.getBlacklist();} }, { key: "onProfileModified", value: function value(e) {this._profileHandler.onProfileModified(e);} }, { key: "onRelationChainModified", value: function value(e) {var t = e.dataList;if (!gt(t)) {var n = [];t.forEach(function (e) {e.blackListDelAccount && n.push.apply(n, M(e.blackListDelAccount));}), n.length > 0 && this._blacklistHandler.onAccountDeleted(n);var o = [];t.forEach(function (e) {e.blackListAddAccount && o.push.apply(o, M(e.blackListAddAccount));}), o.length > 0 && this._blacklistHandler.onAccountAdded(o);}} }, { key: "onConversationsProfileUpdated", value: function value(e) {this._profileHandler.onConversationsProfileUpdated(e);} }, { key: "getMyAccount", value: function value() {return this.getMyUserID();} }, { key: "getMyProfile", value: function value() {return this._profileHandler.getMyProfile();} }, { key: "getStorageModule", value: function value() {return this.getModule(Gt);} }, { key: "isMyFriend", value: function value(e) {var t = this.getModule(Lt);return !!t && t.isMyFriend(e);} }, { key: "getUserProfile", value: function value(e) {return this._profileHandler.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this._profileHandler.updateMyProfile(e);} }, { key: "getNickAndAvatarByUserID", value: function value(e) {return this._profileHandler.getNickAndAvatarByUserID(e);} }, { key: "getLocalBlacklist", value: function value() {var e = this._blacklistHandler.getLocalBlacklist();return vr(e);} }, { key: "addBlacklist", value: function value(e) {return this._blacklistHandler.addBlacklist(e);} }, { key: "deleteBlacklist", value: function value(e) {return this._blacklistHandler.deleteBlacklist(e);} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._profileHandler.reset(), this._blacklistHandler.reset();} }]), a;}(zt),ti = function () {function e(n, o) {t(this, e), this._moduleManager = n, this._isLoggedIn = !1, this._SDKAppID = o.SDKAppID, this._userID = o.userID || "", this._userSig = o.userSig || "", this._version = "2.13.1", this._a2Key = "", this._tinyID = "", this._contentType = "json", this._unlimitedAVChatRoom = o.unlimitedAVChatRoom, this._scene = o.scene || "", this._oversea = o.oversea, this._instanceID = o.instanceID, this._statusInstanceID = 0;}return o(e, [{ key: "isLoggedIn", value: function value() {return this._isLoggedIn;} }, { key: "isOversea", value: function value() {return this._oversea;} }, { key: "isUnlimitedAVChatRoom", value: function value() {return this._unlimitedAVChatRoom;} }, { key: "getUserID", value: function value() {return this._userID;} }, { key: "setUserID", value: function value(e) {this._userID = e;} }, { key: "setUserSig", value: function value(e) {this._userSig = e;} }, { key: "getUserSig", value: function value() {return this._userSig;} }, { key: "getSDKAppID", value: function value() {return this._SDKAppID;} }, { key: "getTinyID", value: function value() {return this._tinyID;} }, { key: "setTinyID", value: function value(e) {this._tinyID = e, this._isLoggedIn = !0;} }, { key: "getScene", value: function value() {return function () {var e = !1,t = [];z && (t = Object.keys(J)), W && (t = Object.keys(window));for (var n = 0, o = t.length; n < o; n++) {if (t[n].toLowerCase().includes("uikit")) {e = !0;break;}}return t = null, e;}() ? "tuikit" : this._scene;} }, { key: "getInstanceID", value: function value() {return this._instanceID;} }, { key: "getStatusInstanceID", value: function value() {return this._statusInstanceID;} }, { key: "setStatusInstanceID", value: function value(e) {this._statusInstanceID = e;} }, { key: "getVersion", value: function value() {return this._version;} }, { key: "getA2Key", value: function value() {return this._a2Key;} }, { key: "setA2Key", value: function value(e) {this._a2Key = e;} }, { key: "getContentType", value: function value() {return this._contentType;} }, { key: "reset", value: function value() {this._isLoggedIn = !1, this._userSig = "", this._a2Key = "", this._tinyID = "", this._statusInstanceID = 0;} }]), e;}(),ni = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "SignModule", o._helloInterval = 120, o._lastLoginTs = 0, Sr.mixin(h(o)), o;}return o(a, [{ key: "onCheckTimer", value: function value(e) {this.isLoggedIn() && e % this._helloInterval == 0 && this._hello();} }, { key: "login", value: function value(e) {if (this.isLoggedIn()) {var t = "您已经登录账号".concat(e.userID, "！如需切换账号登录，请先调用 logout 接口登出，再调用 login 接口登录。");return Ee.warn(t), vr({ actionStatus: "OK", errorCode: 0, errorInfo: t, repeatLogin: !0 });}if (Date.now() - this._lastLoginTs <= 15e3) return Ee.warn("您正在尝试登录账号".concat(e.userID, "！请勿重复登录。")), yr({ code: eo.REPEAT_LOGIN, message: io });Ee.log("".concat(this._className, ".login userID:").concat(e.userID));var n = this._checkLoginInfo(e);if (0 !== n.code) return yr(n);var o = this.getModule(wt),a = e.userID,s = e.userSig;return o.setUserID(a), o.setUserSig(s), this.getModule(xt).updateProtocolConfig(), this._login();} }, { key: "_login", value: function value() {var e = this,t = this.getModule(wt),n = new Sa(Ca);return n.setMessage("".concat(t.getScene())).setMoreMessage("identifier:".concat(this.getMyUserID())), this._lastLoginTs = Date.now(), this.request({ protocolName: Wt }).then(function (o) {e._lastLoginTs = 0;var a = Date.now(),s = null,r = o.data,i = r.a2Key,c = r.tinyID,u = r.helloInterval,l = r.instanceID,d = r.timeStamp;Ee.log("".concat(e._className, ".login ok. helloInterval:").concat(u, " instanceID:").concat(l, " timeStamp:").concat(d));var g = 1e3 * d,p = a - n.getStartTs(),h = g + parseInt(p / 2) - a,_ = n.getStartTs() + h;if (n.start(_), function (e, t) {ve = t;var n = new Date();n.setTime(e), Ee.info("baseTime from server: ".concat(n, " offset: ").concat(ve));}(g, h), !c) throw s = new fr({ code: eo.NO_TINYID, message: ao }), n.setError(s, !0, e.getNetworkType()).end(), s;if (!i) throw s = new fr({ code: eo.NO_A2KEY, message: so }), n.setError(s, !0, e.getNetworkType()).end(), s;return n.setNetworkType(e.getNetworkType()).setMoreMessage("helloInterval:".concat(u, " instanceID:").concat(l, " offset:").concat(h)).end(), t.setA2Key(i), t.setTinyID(c), t.setStatusInstanceID(l), e.getModule(xt).updateProtocolConfig(), e.emitInnerEvent(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED), e._helloInterval = u, e.triggerReady(), e._fetchCloudControlConfig(), o;}).catch(function (t) {return e.probeNetwork().then(function (e) {var o = m(e, 2),a = o[0],s = o[1];n.setError(t, a, s).end(!0);}), Ee.error("".concat(e._className, ".login failed. error:"), t), e._moduleManager.onLoginFailed(), yr(t);});} }, { key: "logout", value: function value() {var e = this;return this.isLoggedIn() ? (new Sa(Na).setNetworkType(this.getNetworkType()).setMessage("identifier:".concat(this.getMyUserID())).end(!0), Ee.info("".concat(this._className, ".logout")), this.request({ protocolName: Jt }).then(function () {return e.resetReady(), vr({});}).catch(function (t) {return Ee.error("".concat(e._className, "._logout error:"), t), e.resetReady(), vr({});})) : yr({ code: eo.USER_NOT_LOGGED_IN, message: ro });} }, { key: "_fetchCloudControlConfig", value: function value() {this.getModule(jt).fetchConfig();} }, { key: "_hello", value: function value() {var e = this;this.request({ protocolName: Xt }).catch(function (t) {Ee.warn("".concat(e._className, "._hello error:"), t);});} }, { key: "_checkLoginInfo", value: function value(e) {var t = 0,n = "";return gt(this.getModule(wt).getSDKAppID()) ? (t = eo.NO_SDKAPPID, n = to) : gt(e.userID) ? (t = eo.NO_IDENTIFIER, n = no) : gt(e.userSig) && (t = eo.NO_USERSIG, n = oo), { code: t, message: n };} }, { key: "onMultipleAccountKickedOut", value: function value(e) {var t = this;new Sa(Aa).setNetworkType(this.getNetworkType()).setMessage("type:".concat(k.KICKED_OUT_MULT_ACCOUNT, " newInstanceInfo:").concat(JSON.stringify(e))).end(!0), Ee.warn("".concat(this._className, ".onMultipleAccountKickedOut userID:").concat(this.getMyUserID(), " newInstanceInfo:"), e), this.logout().then(function () {t.emitOuterEvent(E.KICKED_OUT, { type: k.KICKED_OUT_MULT_ACCOUNT }), t._moduleManager.reset();});} }, { key: "onMultipleDeviceKickedOut", value: function value(e) {var t = this;new Sa(Aa).setNetworkType(this.getNetworkType()).setMessage("type:".concat(k.KICKED_OUT_MULT_DEVICE, " newInstanceInfo:").concat(JSON.stringify(e))).end(!0), Ee.warn("".concat(this._className, ".onMultipleDeviceKickedOut userID:").concat(this.getMyUserID(), " newInstanceInfo:"), e), this.logout().then(function () {t.emitOuterEvent(E.KICKED_OUT, { type: k.KICKED_OUT_MULT_DEVICE }), t._moduleManager.reset();});} }, { key: "onUserSigExpired", value: function value() {new Sa(Aa).setNetworkType(this.getNetworkType()).setMessage(k.KICKED_OUT_USERSIG_EXPIRED).end(!0), Ee.warn("".concat(this._className, ".onUserSigExpired: userSig 签名过期被踢下线")), 0 !== this.getModule(wt).getStatusInstanceID() && (this.emitOuterEvent(E.KICKED_OUT, { type: k.KICKED_OUT_USERSIG_EXPIRED }), this._moduleManager.reset());} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this.resetReady(), this._helloInterval = 120, this._lastLoginTs = 0;} }]), a;}(zt);function oi() {return null;}var ai = function () {function e(n) {t(this, e), this._moduleManager = n, this._className = "StorageModule", this._storageQueue = new Map(), this._errorTolerantHandle();}return o(e, [{ key: "_errorTolerantHandle", value: function value() {z || !Re(window) && !Re(window.localStorage) || (this.getItem = oi, this.setItem = oi, this.removeItem = oi, this.clear = oi);} }, { key: "onCheckTimer", value: function value(e) {if (e % 20 == 0) {if (0 === this._storageQueue.size) return;this._doFlush();}} }, { key: "_doFlush", value: function value() {try {var e,t = S(this._storageQueue);try {for (t.s(); !(e = t.n()).done;) {var n = m(e.value, 2),o = n[0],a = n[1];this._setStorageSync(this._getKey(o), a);}} catch (s) {t.e(s);} finally {t.f();}this._storageQueue.clear();} catch (r) {Ee.warn("".concat(this._className, "._doFlush error:"), r);}} }, { key: "_getPrefix", value: function value() {var e = this._moduleManager.getModule(wt);return "TIM_".concat(e.getSDKAppID(), "_").concat(e.getUserID(), "_");} }, { key: "_getKey", value: function value(e) {return "".concat(this._getPrefix()).concat(e);} }, { key: "getItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;return this._getStorageSync(n);} catch (o) {return Ee.warn("".concat(this._className, ".getItem error:"), o), {};}} }, { key: "setItem", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];if (n) {var a = o ? this._getKey(e) : e;this._setStorageSync(a, t);} else this._storageQueue.set(e, t);} }, { key: "clear", value: function value() {try {z ? J.clearStorageSync() : localStorage && localStorage.clear();} catch (e) {Ee.warn("".concat(this._className, ".clear error:"), e);}} }, { key: "removeItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;this._removeStorageSync(n);} catch (o) {Ee.warn("".concat(this._className, ".removeItem error:"), o);}} }, { key: "getSize", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b";try {var o = { size: 0, limitSize: 5242880, unit: n };if (Object.defineProperty(o, "leftSize", { enumerable: !0, get: function get() {return o.limitSize - o.size;} }), z && (o.limitSize = 1024 * J.getStorageInfoSync().limitSize), e) o.size = JSON.stringify(this.getItem(e)).length + this._getKey(e).length;else if (z) {var a = J.getStorageInfoSync(),s = a.keys;s.forEach(function (e) {o.size += JSON.stringify(t._getStorageSync(e)).length + t._getKey(e).length;});} else if (localStorage) for (var r in localStorage) {localStorage.hasOwnProperty(r) && (o.size += localStorage.getItem(r).length + r.length);}return this._convertUnit(o);} catch (i) {Ee.warn("".concat(this._className, " error:"), i);}} }, { key: "_convertUnit", value: function value(e) {var t = {},n = e.unit;for (var o in t.unit = n, e) {"number" == typeof e[o] && ("kb" === n.toLowerCase() ? t[o] = Math.round(e[o] / 1024) : "mb" === n.toLowerCase() ? t[o] = Math.round(e[o] / 1024 / 1024) : t[o] = e[o]);}return t;} }, { key: "_setStorageSync", value: function value(e, t) {z ? Y ? my.setStorageSync({ key: e, data: t }) : J.setStorageSync(e, t) : localStorage && localStorage.setItem(e, JSON.stringify(t));} }, { key: "_getStorageSync", value: function value(e) {return z ? Y ? my.getStorageSync({ key: e }).data : J.getStorageSync(e) : localStorage ? JSON.parse(localStorage.getItem(e)) : {};} }, { key: "_removeStorageSync", value: function value(e) {z ? Y ? my.removeStorageSync({ key: e }) : J.removeStorageSync(e) : localStorage && localStorage.removeItem(e);} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._doFlush();} }]), e;}(),si = function () {function e(n) {t(this, e), this._className = "SSOLogBody", this._report = [];}return o(e, [{ key: "pushIn", value: function value(e) {Ee.debug("".concat(this._className, ".pushIn"), this._report.length, e), this._report.push(e);} }, { key: "backfill", value: function value(e) {var t;Le(e) && 0 !== e.length && (Ee.debug("".concat(this._className, ".backfill"), this._report.length, e.length), (t = this._report).unshift.apply(t, M(e)));} }, { key: "getLogsNumInMemory", value: function value() {return this._report.length;} }, { key: "isEmpty", value: function value() {return 0 === this._report.length;} }, { key: "_reset", value: function value() {this._report.length = 0, this._report = [];} }, { key: "getLogsInMemory", value: function value() {var e = this._report.slice();return this._reset(), e;} }]), e;}(),ri = function ri(e) {var t = e.getModule(wt);return { SDKType: 10, SDKAppID: t.getSDKAppID(), SDKVersion: t.getVersion(), tinyID: Number(t.getTinyID()), userID: t.getUserID(), platform: e.getPlatform(), instanceID: t.getInstanceID(), traceID: ye() };},ii = function (e) {i(a, e);var n = f(a);function a(e) {var o;t(this, a), (o = n.call(this, e))._className = "EventStatModule", o.TAG = "im-ssolog-event", o._reportBody = new si(), o.MIN_THRESHOLD = 20, o.MAX_THRESHOLD = 100, o.WAITING_TIME = 6e4, o.REPORT_LEVEL = [4, 5, 6], o.REPORT_SDKAPPID_BLACKLIST = [], o.REPORT_TINYID_WHITELIST = [], o._lastReportTime = Date.now();var s = o.getInnerEmitterInstance();return s.on(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._onLoginSuccess, h(o)), s.on(Dr.CLOUD_CONFIG_UPDATED, o._onCloudConfigUpdated, h(o)), o;}return o(a, [{ key: "reportAtOnce", value: function value() {Ee.debug("".concat(this._className, ".reportAtOnce")), this._report();} }, { key: "_onLoginSuccess", value: function value() {var e = this,t = this.getModule(Gt),n = t.getItem(this.TAG, !1);!gt(n) && we(n.forEach) && (Ee.log("".concat(this._className, "._onLoginSuccess get ssolog in storage, count:").concat(n.length)), n.forEach(function (t) {e._reportBody.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "_onCloudConfigUpdated", value: function value() {var e = this.getCloudConfig("evt_rpt_threshold"),t = this.getCloudConfig("evt_rpt_waiting"),n = this.getCloudConfig("evt_rpt_level"),o = this.getCloudConfig("evt_rpt_sdkappid_bl"),a = this.getCloudConfig("evt_rpt_tinyid_wl");Re(e) || (this.MIN_THRESHOLD = Number(e)), Re(t) || (this.WAITING_TIME = Number(t)), Re(n) || (this.REPORT_LEVEL = n.split(",").map(function (e) {return Number(e);})), Re(o) || (this.REPORT_SDKAPPID_BLACKLIST = o.split(",").map(function (e) {return Number(e);})), Re(a) || (this.REPORT_TINYID_WHITELIST = a.split(","));} }, { key: "pushIn", value: function value(e) {e instanceof Sa && (e.updateTimeStamp(), this._reportBody.pushIn(e), this._reportBody.getLogsNumInMemory() >= this.MIN_THRESHOLD && this._report());} }, { key: "onCheckTimer", value: function value() {Date.now() < this._lastReportTime + this.WAITING_TIME || this._reportBody.isEmpty() || this._report();} }, { key: "_filterLogs", value: function value(e) {var t = this,n = this.getModule(wt),o = n.getSDKAppID(),a = n.getTinyID();return ut(this.REPORT_SDKAPPID_BLACKLIST, o) && !lt(this.REPORT_TINYID_WHITELIST, a) ? [] : e.filter(function (e) {return t.REPORT_LEVEL.includes(e.level);});} }, { key: "_report", value: function value() {var e = this;if (!this._reportBody.isEmpty()) {var t = this._reportBody.getLogsInMemory(),n = this._filterLogs(t);if (0 !== n.length) {var o = { header: ri(this), event: n };this.request({ protocolName: jn, requestData: r({}, o) }).then(function () {e._lastReportTime = Date.now();}).catch(function (n) {Ee.warn("".concat(e._className, ".report failed. networkType:").concat(e.getNetworkType(), " error:"), n), e._reportBody.backfill(t), e._reportBody.getLogsNumInMemory() > e.MAX_THRESHOLD && e._flushAtOnce();});} else this._lastReportTime = Date.now();}} }, { key: "_flushAtOnce", value: function value() {var e = this.getModule(Gt),t = e.getItem(this.TAG, !1),n = this._reportBody.getLogsInMemory();if (gt(t)) Ee.log("".concat(this._className, "._flushAtOnce count:").concat(n.length)), e.setItem(this.TAG, n, !0, !1);else {var o = n.concat(t);o.length > this.MAX_THRESHOLD && (o = o.slice(0, this.MAX_THRESHOLD)), Ee.log("".concat(this._className, "._flushAtOnce count:").concat(o.length)), e.setItem(this.TAG, o, !0, !1);}} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._lastReportTime = 0, this._report(), this.REPORT_SDKAPPID_BLACKLIST = [], this.REPORT_TINYID_WHITELIST = [];} }]), a;}(zt),ci = "none",ui = "online",li = function () {function e(n) {t(this, e), this._moduleManager = n, this._networkType = "", this._className = "NetMonitorModule", this.MAX_WAIT_TIME = 3e3;}return o(e, [{ key: "start", value: function value() {var e = this;if (z) {J.getNetworkType({ success: function success(t) {e._networkType = t.networkType, t.networkType === ci ? Ee.warn("".concat(e._className, ".start no network, please check!")) : Ee.info("".concat(e._className, ".start networkType:").concat(t.networkType));} });var t = this._onNetworkStatusChange.bind(this);J.offNetworkStatusChange && ($ || H ? J.offNetworkStatusChange(t) : J.offNetworkStatusChange()), J.onNetworkStatusChange(t);} else this._networkType = ui;} }, { key: "_onNetworkStatusChange", value: function value(e) {e.isConnected ? (Ee.info("".concat(this._className, "._onNetworkStatusChange previousNetworkType:").concat(this._networkType, " currentNetworkType:").concat(e.networkType)), this._networkType !== e.networkType && this._moduleManager.getModule(Bt).reConnect()) : Ee.warn("".concat(this._className, "._onNetworkStatusChange no network, please check!"));this._networkType = e.networkType;} }, { key: "probe", value: function value() {var e = this;return new Promise(function (t, n) {if (z) J.getNetworkType({ success: function success(n) {e._networkType = n.networkType, n.networkType === ci ? (Ee.warn("".concat(e._className, ".probe no network, please check!")), t([!1, n.networkType])) : (Ee.info("".concat(e._className, ".probe networkType:").concat(n.networkType)), t([!0, n.networkType]));} });else if (window && window.fetch) fetch("".concat(ze(), "//web.sdk.qcloud.com/im/assets/speed.xml?random=").concat(Math.random())).then(function (e) {e.ok ? t([!0, ui]) : t([!1, ci]);}).catch(function (e) {t([!1, ci]);});else {var o = new XMLHttpRequest(),a = setTimeout(function () {Ee.warn("".concat(e._className, ".probe fetch timeout. Probably no network, please check!")), o.abort(), e._networkType = ci, t([!1, ci]);}, e.MAX_WAIT_TIME);o.onreadystatechange = function () {4 === o.readyState && (clearTimeout(a), 200 === o.status || 304 === o.status ? (this._networkType = ui, t([!0, ui])) : (Ee.warn("".concat(this.className, ".probe fetch status:").concat(o.status, ". Probably no network, please check!")), this._networkType = ci, t([!1, ci])));}, o.open("GET", "".concat(ze(), "//web.sdk.qcloud.com/im/assets/speed.xml?random=").concat(Math.random())), o.send();}});} }, { key: "getNetworkType", value: function value() {return this._networkType;} }]), e;}(),di = A(function (e) {var t = Object.prototype.hasOwnProperty,n = "~";function o() {}function a(e, t, n) {this.fn = e, this.context = t, this.once = n || !1;}function s(e, t, o, s, r) {if ("function" != typeof o) throw new TypeError("The listener must be a function");var i = new a(o, s || e, r),c = n ? n + t : t;return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], i] : e._events[c].push(i) : (e._events[c] = i, e._eventsCount++), e;}function r(e, t) {0 == --e._eventsCount ? e._events = new o() : delete e._events[t];}function i() {this._events = new o(), this._eventsCount = 0;}Object.create && (o.prototype = Object.create(null), new o().__proto__ || (n = !1)), i.prototype.eventNames = function () {var e,o,a = [];if (0 === this._eventsCount) return a;for (o in e = this._events) {t.call(e, o) && a.push(n ? o.slice(1) : o);}return Object.getOwnPropertySymbols ? a.concat(Object.getOwnPropertySymbols(e)) : a;}, i.prototype.listeners = function (e) {var t = n ? n + e : e,o = this._events[t];if (!o) return [];if (o.fn) return [o.fn];for (var a = 0, s = o.length, r = new Array(s); a < s; a++) {r[a] = o[a].fn;}return r;}, i.prototype.listenerCount = function (e) {var t = n ? n + e : e,o = this._events[t];return o ? o.fn ? 1 : o.length : 0;}, i.prototype.emit = function (e, t, o, a, s, r) {var i = n ? n + e : e;if (!this._events[i]) return !1;var c,u,l = this._events[i],d = arguments.length;if (l.fn) {switch (l.once && this.removeListener(e, l.fn, void 0, !0), d) {case 1:return l.fn.call(l.context), !0;case 2:return l.fn.call(l.context, t), !0;case 3:return l.fn.call(l.context, t, o), !0;case 4:return l.fn.call(l.context, t, o, a), !0;case 5:return l.fn.call(l.context, t, o, a, s), !0;case 6:return l.fn.call(l.context, t, o, a, s, r), !0;}for (u = 1, c = new Array(d - 1); u < d; u++) {c[u - 1] = arguments[u];}l.fn.apply(l.context, c);} else {var g,p = l.length;for (u = 0; u < p; u++) {switch (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), d) {case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context, t);break;case 3:l[u].fn.call(l[u].context, t, o);break;case 4:l[u].fn.call(l[u].context, t, o, a);break;default:if (!c) for (g = 1, c = new Array(d - 1); g < d; g++) {c[g - 1] = arguments[g];}l[u].fn.apply(l[u].context, c);}}}return !0;}, i.prototype.on = function (e, t, n) {return s(this, e, t, n, !1);}, i.prototype.once = function (e, t, n) {return s(this, e, t, n, !0);}, i.prototype.removeListener = function (e, t, o, a) {var s = n ? n + e : e;if (!this._events[s]) return this;if (!t) return r(this, s), this;var i = this._events[s];if (i.fn) i.fn !== t || a && !i.once || o && i.context !== o || r(this, s);else {for (var c = 0, u = [], l = i.length; c < l; c++) {(i[c].fn !== t || a && !i[c].once || o && i[c].context !== o) && u.push(i[c]);}u.length ? this._events[s] = 1 === u.length ? u[0] : u : r(this, s);}return this;}, i.prototype.removeAllListeners = function (e) {var t;return e ? (t = n ? n + e : e, this._events[t] && r(this, t)) : (this._events = new o(), this._eventsCount = 0), this;}, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prefixed = n, i.EventEmitter = i, e.exports = i;}),gi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "BigDataChannelModule", o.FILETYPE = { SOUND: 2106, FILE: 2107, VIDEO: 2113 }, o._bdh_download_server = "grouptalk.c2c.qq.com", o._BDHBizID = 10001, o._authKey = "", o._expireTime = 0, o.getInnerEmitterInstance().on(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._getAuthKey, h(o)), o;}return o(a, [{ key: "_getAuthKey", value: function value() {var e = this;this.request({ protocolName: Zt }).then(function (t) {t.data.authKey && (e._authKey = t.data.authKey, e._expireTime = parseInt(t.data.expireTime));});} }, { key: "_isFromOlderVersion", value: function value(e) {return !(!e.content || 2 === e.content.downloadFlag);} }, { key: "parseElements", value: function value(e, t) {if (!Le(e) || !t) return [];for (var n = [], o = null, a = 0; a < e.length; a++) {o = e[a], this._needParse(o) ? n.push(this._parseElement(o, t)) : n.push(e[a]);}return n;} }, { key: "_needParse", value: function value(e) {return !e.cloudCustomData && !(!this._isFromOlderVersion(e) || e.type !== k.MSG_AUDIO && e.type !== k.MSG_FILE && e.type !== k.MSG_VIDEO);} }, { key: "_parseElement", value: function value(e, t) {switch (e.type) {case k.MSG_AUDIO:return this._parseAudioElement(e, t);case k.MSG_FILE:return this._parseFileElement(e, t);case k.MSG_VIDEO:return this._parseVideoElement(e, t);}} }, { key: "_parseAudioElement", value: function value(e, t) {return e.content.url = this._genAudioUrl(e.content.uuid, t), e;} }, { key: "_parseFileElement", value: function value(e, t) {return e.content.url = this._genFileUrl(e.content.uuid, t, e.content.fileName), e;} }, { key: "_parseVideoElement", value: function value(e, t) {return e.content.url = this._genVideoUrl(e.content.uuid, t), e;} }, { key: "_genAudioUrl", value: function value(e, t) {if ("" === this._authKey) return Ee.warn("".concat(this._className, "._genAudioUrl no authKey!")), "";var n = this.getModule(wt).getSDKAppID();return "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(n, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.SOUND, "&openid=").concat(t, "&ver=0");} }, { key: "_genFileUrl", value: function value(e, t, n) {if ("" === this._authKey) return Ee.warn("".concat(this._className, "._genFileUrl no authKey!")), "";n || (n = "".concat(Math.floor(1e5 * Math.random()), "-").concat(Date.now()));var o = this.getModule(wt).getSDKAppID();return "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(o, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.FILE, "&openid=").concat(t, "&ver=0&filename=").concat(encodeURIComponent(n));} }, { key: "_genVideoUrl", value: function value(e, t) {if ("" === this._authKey) return Ee.warn("".concat(this._className, "._genVideoUrl no authKey!")), "";var n = this.getModule(wt).getSDKAppID();return "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(n, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.VIDEO, "&openid=").concat(t, "&ver=0");} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._authKey = "", this.expireTime = 0;} }]), a;}(zt),pi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "UploadModule", o.TIMUploadPlugin = null, o.timUploadPlugin = null, o.COSSDK = null, o._cosUploadMethod = null, o.expiredTimeLimit = 600, o.appid = 0, o.bucketName = "", o.ciUrl = "", o.directory = "", o.downloadUrl = "", o.uploadUrl = "", o.region = "ap-shanghai", o.cos = null, o.cosOptions = { secretId: "", secretKey: "", sessionToken: "", expiredTime: 0 }, o.uploadFileType = "", o.duration = 900, o.tryCount = 0, o.getInnerEmitterInstance().on(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._init, h(o)), o;}return o(a, [{ key: "_init", value: function value() {var e = "".concat(this._className, "._init"),t = this.getModule(Vt);if (this.TIMUploadPlugin = t.getPlugin("tim-upload-plugin"), this.TIMUploadPlugin) this._initUploaderMethod();else {var n = z ? "cos-wx-sdk" : "cos-js-sdk";this.COSSDK = t.getPlugin(n), this.COSSDK ? (this._getAuthorizationKey(), Ee.warn("".concat(e, " v2.9.2起推荐使用 tim-upload-plugin 代替 ").concat(n, "，上传更快更安全。详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#registerPlugin"))) : Ee.warn("".concat(e, " 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#registerPlugin"));}} }, { key: "_getAuthorizationKey", value: function value() {var e = this,t = new Sa(Ga),n = Math.ceil(Date.now() / 1e3);this.request({ protocolName: Bn, requestData: { duration: this.expiredTimeLimit } }).then(function (o) {var a = o.data;Ee.log("".concat(e._className, "._getAuthorizationKey ok. data:"), a);var s = a.expiredTime - n;t.setMessage("requestId:".concat(a.requestId, " requestTime:").concat(n, " expiredTime:").concat(a.expiredTime, " diff:").concat(s, "s")).setNetworkType(e.getNetworkType()).end(), !z && a.region && (e.region = a.region), e.appid = a.appid, e.bucketName = a.bucketName, e.ciUrl = a.ciUrl, e.directory = a.directory, e.downloadUrl = a.downloadUrl, e.uploadUrl = a.uploadUrl, e.cosOptions = { secretId: a.secretId, secretKey: a.secretKey, sessionToken: a.sessionToken, expiredTime: a.expiredTime }, Ee.log("".concat(e._className, "._getAuthorizationKey ok. region:").concat(e.region, " bucketName:").concat(e.bucketName)), e._initUploaderMethod();}).catch(function (n) {e.probeNetwork().then(function (e) {var o = m(e, 2),a = o[0],s = o[1];t.setError(n, a, s).end();}), Ee.warn("".concat(e._className, "._getAuthorizationKey failed. error:"), n);});} }, { key: "_getCosPreSigUrl", value: function value(e) {var t = this,n = "".concat(this._className, "._getCosPreSigUrl"),o = Math.ceil(Date.now() / 1e3),a = new Sa(ba);return this.request({ protocolName: Hn, requestData: { fileType: e.fileType, fileName: e.fileName, uploadMethod: e.uploadMethod, duration: e.duration } }).then(function (e) {t.tryCount = 0;var s = e.data || {},r = s.expiredTime - o;return Ee.log("".concat(n, " ok. data:"), s), a.setMessage("requestId:".concat(s.requestId, " expiredTime:").concat(s.expiredTime, " diff:").concat(r, "s")).setNetworkType(t.getNetworkType()).end(), s;}).catch(function (o) {return -1 === o.code && (o.code = eo.COS_GET_SIG_FAIL), t.probeNetwork().then(function (e) {var t = m(e, 2),n = t[0],s = t[1];a.setError(o, n, s).end();}), Ee.warn("".concat(n, " failed. error:"), o), t.tryCount < 1 ? (t.tryCount++, t._getCosPreSigUrl(e)) : (t.tryCount = 0, yr({ code: eo.COS_GET_SIG_FAIL, message: uo }));});} }, { key: "_initUploaderMethod", value: function value() {var e = this;if (this.TIMUploadPlugin) return this.timUploadPlugin = new this.TIMUploadPlugin(), void (this._cosUploadMethod = function (t, n) {e.timUploadPlugin.uploadFile(t, n);});this.appid && (this.cos = z ? new this.COSSDK({ ForcePathStyle: !0, getAuthorization: this._getAuthorization.bind(this) }) : new this.COSSDK({ getAuthorization: this._getAuthorization.bind(this) }), this._cosUploadMethod = z ? function (t, n) {e.cos.postObject(t, n);} : function (t, n) {e.cos.uploadFiles(t, n);});} }, { key: "onCheckTimer", value: function value(e) {this.COSSDK && (this.TIMUploadPlugin || this.isLoggedIn() && e % 60 == 0 && Math.ceil(Date.now() / 1e3) >= this.cosOptions.expiredTime - 120 && this._getAuthorizationKey());} }, { key: "_getAuthorization", value: function value(e, t) {t({ TmpSecretId: this.cosOptions.secretId, TmpSecretKey: this.cosOptions.secretKey, XCosSecurityToken: this.cosOptions.sessionToken, ExpiredTime: this.cosOptions.expiredTime });} }, { key: "upload", value: function value(e) {if (!0 === e.getRelayFlag()) return Promise.resolve();var t = this.getModule($t);switch (e.type) {case k.MSG_IMAGE:return t.addTotalCount(ma), this._uploadImage(e);case k.MSG_FILE:return t.addTotalCount(ma), this._uploadFile(e);case k.MSG_AUDIO:return t.addTotalCount(ma), this._uploadAudio(e);case k.MSG_VIDEO:return t.addTotalCount(ma), this._uploadVideo(e);default:return Promise.resolve();}} }, { key: "_uploadImage", value: function value(e) {var t = this.getModule(Ct),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadImage({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), we(o.onProgress)) try {o.onProgress(e);} catch (t) {return yr({ code: eo.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: _o });}} }).then(function (t) {var o = t.location,a = t.fileType,s = t.fileSize,i = t.width,c = t.height,u = We(o);n.updateImageFormat(a);var l = st({ originUrl: u, originWidth: i, originHeight: c, min: 198 }),d = st({ originUrl: u, originWidth: i, originHeight: c, min: 720 });return n.updateImageInfoArray([{ size: s, url: u, width: i, height: c }, r({}, d), r({}, l)]), e;});} }, { key: "_uploadFile", value: function value(e) {var t = this.getModule(Ct),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadFile({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), we(o.onProgress)) try {o.onProgress(e);} catch (t) {return yr({ code: eo.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: _o });}} }).then(function (t) {var o = t.location,a = We(o);return n.updateFileUrl(a), e;});} }, { key: "_uploadAudio", value: function value(e) {var t = this.getModule(Ct),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadAudio({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), we(o.onProgress)) try {o.onProgress(e);} catch (t) {return yr({ code: eo.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: _o });}} }).then(function (t) {var o = t.location,a = We(o);return n.updateAudioUrl(a), e;});} }, { key: "_uploadVideo", value: function value(e) {var t = this.getModule(Ct),n = e.getElements()[0],o = t.getMessageOptionByID(e.ID);return this.doUploadVideo({ file: o.payload.file, to: o.to, onProgress: function onProgress(e) {if (n.updatePercent(e), we(o.onProgress)) try {o.onProgress(e);} catch (t) {return yr({ code: eo.MESSAGE_ONPROGRESS_FUNCTION_ERROR, message: _o });}} }).then(function (t) {var o = We(t.location);return n.updateVideoUrl(o), e;});} }, { key: "doUploadImage", value: function value(e) {if (!e.file) return yr({ code: eo.MESSAGE_IMAGE_SELECT_FILE_FIRST, message: Mo });var t = this._checkImageType(e.file);if (!0 !== t) return t;var n = this._checkImageSize(e.file);if (!0 !== n) return n;var o = null;return this._setUploadFileType(Cr), this.uploadByCOS(e).then(function (e) {return o = e, t = "https://".concat(e.location), z ? new Promise(function (e, n) {J.getImageInfo({ src: t, success: function success(t) {e({ width: t.width, height: t.height });}, fail: function fail() {e({ width: 0, height: 0 });} });}) : ce && 9 === ue ? Promise.resolve({ width: 0, height: 0 }) : new Promise(function (e, n) {var o = new Image();o.onload = function () {e({ width: this.width, height: this.height }), o = null;}, o.onerror = function () {e({ width: 0, height: 0 }), o = null;}, o.src = t;});var t;}).then(function (e) {return o.width = e.width, o.height = e.height, Promise.resolve(o);});} }, { key: "_checkImageType", value: function value(e) {var t = "";return t = z ? e.url.slice(e.url.lastIndexOf(".") + 1) : e.files[0].name.slice(e.files[0].name.lastIndexOf(".") + 1), Er.indexOf(t.toLowerCase()) >= 0 || yr({ code: eo.MESSAGE_IMAGE_TYPES_LIMIT, message: vo });} }, { key: "_checkImageSize", value: function value(e) {var t = 0;return 0 === (t = z ? e.size : e.files[0].size) ? yr({ code: eo.MESSAGE_FILE_IS_EMPTY, message: "".concat(ho) }) : t < 20971520 || yr({ code: eo.MESSAGE_IMAGE_SIZE_LIMIT, message: "".concat(yo) });} }, { key: "doUploadFile", value: function value(e) {var t = null;return e.file ? e.file.files[0].size > 104857600 ? yr(t = { code: eo.MESSAGE_FILE_SIZE_LIMIT, message: No }) : 0 === e.file.files[0].size ? (t = { code: eo.MESSAGE_FILE_IS_EMPTY, message: "".concat(ho) }, yr(t)) : (this._setUploadFileType(Or), this.uploadByCOS(e)) : yr(t = { code: eo.MESSAGE_FILE_SELECT_FILE_FIRST, message: Co });} }, { key: "doUploadVideo", value: function value(e) {return e.file.videoFile.size > 104857600 ? yr({ code: eo.MESSAGE_VIDEO_SIZE_LIMIT, message: "".concat(So) }) : 0 === e.file.videoFile.size ? yr({ code: eo.MESSAGE_FILE_IS_EMPTY, message: "".concat(ho) }) : -1 === kr.indexOf(e.file.videoFile.type) ? yr({ code: eo.MESSAGE_VIDEO_TYPES_LIMIT, message: "".concat(Eo) }) : (this._setUploadFileType(Nr), z ? this.handleVideoUpload({ file: e.file.videoFile, onProgress: e.onProgress }) : W ? this.handleVideoUpload(e) : void 0);} }, { key: "handleVideoUpload", value: function value(e) {var t = this;return new Promise(function (n, o) {t.uploadByCOS(e).then(function (e) {n(e);}).catch(function () {t.uploadByCOS(e).then(function (e) {n(e);}).catch(function () {o(new fr({ code: eo.MESSAGE_VIDEO_UPLOAD_FAIL, message: Do }));});});});} }, { key: "doUploadAudio", value: function value(e) {return e.file ? e.file.size > 20971520 ? yr(new fr({ code: eo.MESSAGE_AUDIO_SIZE_LIMIT, message: "".concat(To) })) : 0 === e.file.size ? yr(new fr({ code: eo.MESSAGE_FILE_IS_EMPTY, message: "".concat(ho) })) : (this._setUploadFileType(Ar), this.uploadByCOS(e)) : yr(new fr({ code: eo.MESSAGE_AUDIO_UPLOAD_FAIL, message: Io }));} }, { key: "uploadByCOS", value: function value(e) {var t = this,n = "".concat(this._className, ".uploadByCOS");if (!we(this._cosUploadMethod)) return Ee.warn("".concat(n, " 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#registerPlugin")), yr({ code: eo.COS_UNDETECTED, message: co });if (this.timUploadPlugin) return this._uploadWithPreSigUrl(e);var o = new Sa(Ua),a = Date.now(),s = z ? e.file : e.file.files[0];return new Promise(function (r, i) {var c = z ? t._createCosOptionsWXMiniApp(e) : t._createCosOptionsWeb(e),u = t;t._cosUploadMethod(c, function (e, c) {var l = Object.create(null);if (c) {if (e || Le(c.files) && c.files[0].error) {var d = new fr({ code: eo.MESSAGE_FILE_UPLOAD_FAIL, message: ko });return o.setError(d, !0, t.getNetworkType()).end(), Ee.log("".concat(n, " failed. error:"), c.files[0].error), 403 === c.files[0].error.statusCode && (Ee.warn("".concat(n, " failed. cos AccessKeyId was invalid, regain auth key!")), t._getAuthorizationKey()), void i(d);}l.fileName = s.name, l.fileSize = s.size, l.fileType = s.type.slice(s.type.indexOf("/") + 1).toLowerCase(), l.location = z ? c.Location : c.files[0].data.Location;var g = Date.now() - a,p = u._formatFileSize(s.size),h = u._formatSpeed(1e3 * s.size / g),_ = "size:".concat(p, " time:").concat(g, "ms speed:").concat(h);Ee.log("".concat(n, " success. name:").concat(s.name, " ").concat(_)), r(l);var f = t.getModule($t);return f.addCost(ma, g), f.addFileSize(ma, s.size), void o.setNetworkType(t.getNetworkType()).setMessage(_).end();}var m = new fr({ code: eo.MESSAGE_FILE_UPLOAD_FAIL, message: ko });o.setError(m, !0, u.getNetworkType()).end(), Ee.warn("".concat(n, " failed. error:"), e), 403 === e.statusCode && (Ee.warn("".concat(n, " failed. cos AccessKeyId was invalid, regain auth key!")), t._getAuthorizationKey()), i(m);});});} }, { key: "_uploadWithPreSigUrl", value: function value(e) {var t = this,n = "".concat(this._className, "._uploadWithPreSigUrl"),o = z ? e.file : e.file.files[0];return this._createCosOptionsPreSigUrl(e).then(function (e) {return new Promise(function (a, s) {var r = new Sa(Ua);Ee.time(la), t._cosUploadMethod(e, function (e, i) {var c = Object.create(null);if (e || 403 === i.statusCode) {var u = new fr({ code: eo.MESSAGE_FILE_UPLOAD_FAIL, message: ko });return r.setError(u, !0, t.getNetworkType()).end(), Ee.log("".concat(n, " failed, error:"), e), void s(u);}var l = i.data.location || "";0 !== l.indexOf("https://") && 0 !== l.indexOf("http://") || (l = l.split("//")[1]), c.fileName = o.name, c.fileSize = o.size, c.fileType = o.type.slice(o.type.indexOf("/") + 1).toLowerCase(), c.location = l;var d = Ee.timeEnd(la),g = t._formatFileSize(o.size),p = t._formatSpeed(1e3 * o.size / d),h = "size:".concat(g, ",time:").concat(d, "ms,speed:").concat(p);Ee.log("".concat(n, " success name:").concat(o.name, ",").concat(h)), r.setNetworkType(t.getNetworkType()).setMessage(h).end();var _ = t.getModule($t);_.addCost(ma, d), _.addFileSize(ma, o.size), a(c);});});});} }, { key: "_formatFileSize", value: function value(e) {return e < 1024 ? e + "B" : e < 1048576 ? Math.floor(e / 1024) + "KB" : Math.floor(e / 1048576) + "MB";} }, { key: "_formatSpeed", value: function value(e) {return e <= 1048576 ? ct(e / 1024, 1) + "KB/s" : ct(e / 1048576, 1) + "MB/s";} }, { key: "_createCosOptionsWeb", value: function value(e) {var t = this.getMyUserID(),n = this._genFileName(t, e.to, e.file.files[0].name);return { files: [{ Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), Body: e.file.files[0] }], SliceSize: 1048576, onProgress: function onProgress(t) {if ("function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {Ee.warn("onProgress callback error:", n);}}, onFileFinish: function onFileFinish(e, t, n) {} };} }, { key: "_createCosOptionsWXMiniApp", value: function value(e) {var t = this.getMyUserID(),n = this._genFileName(t, e.to, e.file.name),o = e.file.url;return { Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), FilePath: o, onProgress: function onProgress(t) {if (Ee.log(JSON.stringify(t)), "function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {Ee.warn("onProgress callback error:", n);}} };} }, { key: "_createCosOptionsPreSigUrl", value: function value(e) {var t = this,n = "",o = "",a = 0;return z ? (n = this._genFileName(e.file.name), o = e.file.url, a = 1) : (n = this._genFileName("".concat(Be(999999))), o = e.file.files[0], a = 0), this._getCosPreSigUrl({ fileType: this.uploadFileType, fileName: n, uploadMethod: a, duration: this.duration }).then(function (a) {var s = a.uploadUrl,r = a.downloadUrl;return { url: s, fileType: t.uploadFileType, fileName: n, resources: o, downloadUrl: r, onProgress: function onProgress(t) {if ("function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {Ee.warn("onProgress callback error:", n), Ee.error(n);}} };});} }, { key: "_genFileName", value: function value(e) {return "".concat(ot(), "-").concat(e);} }, { key: "_setUploadFileType", value: function value(e) {this.uploadFileType = e;} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset"));} }]), a;}(zt),hi = function () {function e(n) {t(this, e), this._className = "MergerMessageHandler", this._messageModule = n;}return o(e, [{ key: "uploadMergerMessage", value: function value(e, t) {var n = this;Ee.debug("".concat(this._className, ".uploadMergerMessage message:"), e, "messageBytes:".concat(t));var o = e.payload.messageList,a = o.length,s = new Sa($a);return this._messageModule.request({ protocolName: Jn, requestData: { messageList: o } }).then(function (e) {Ee.debug("".concat(n._className, ".uploadMergerMessage ok. response:"), e.data);var o = e.data,r = o.pbDownloadKey,i = o.downloadKey,c = { pbDownloadKey: r, downloadKey: i, messageNumber: a };return s.setNetworkType(n._messageModule.getNetworkType()).setMessage("".concat(a, "-").concat(t, "-").concat(i)).end(), c;}).catch(function (e) {throw Ee.warn("".concat(n._className, ".uploadMergerMessage failed. error:"), e), n._messageModule.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];s.setError(e, o, a).end();}), e;});} }, { key: "downloadMergerMessage", value: function value(e) {var t = this;Ee.debug("".concat(this._className, ".downloadMergerMessage message:"), e);var n = e.payload.downloadKey,o = new Sa(za);return o.setMessage("downloadKey:".concat(n)), this._messageModule.request({ protocolName: Xn, requestData: { downloadKey: n } }).then(function (n) {if (Ee.debug("".concat(t._className, ".downloadMergerMessage ok. response:"), n.data), we(e.clearElement)) {var a = e.payload,s = (a.downloadKey, a.pbDownloadKey, a.messageList, p(a, ["downloadKey", "pbDownloadKey", "messageList"]));e.clearElement(), e.setElement({ type: e.type, content: r({ messageList: n.data.messageList }, s) });} else {var i = [];n.data.messageList.forEach(function (e) {if (!gt(e)) {var t = new rr(e);i.push(t);}}), e.payload.messageList = i, e.payload.downloadKey = "", e.payload.pbDownloadKey = "";}return o.setNetworkType(t._messageModule.getNetworkType()).end(), e;}).catch(function (e) {throw Ee.warn("".concat(t._className, ".downloadMergerMessage failed. key:").concat(n, " error:"), e), t._messageModule.probeNetwork().then(function (t) {var n = m(t, 2),a = n[0],s = n[1];o.setError(e, a, s).end();}), e;});} }, { key: "createMergerMessagePack", value: function value(e, t, n) {return e.conversationType === k.CONV_C2C ? this._createC2CMergerMessagePack(e, t, n) : this._createGroupMergerMessagePack(e, t, n);} }, { key: "_createC2CMergerMessagePack", value: function value(e, t, n) {var o = null;t && (t.offlinePushInfo && (o = t.offlinePushInfo), !0 === t.onlineUserOnly && (o ? o.disablePush = !0 : o = { disablePush: !0 }));var a = "";Ne(e.cloudCustomData) && e.cloudCustomData.length > 0 && (a = e.cloudCustomData);var s = n.pbDownloadKey,r = n.downloadKey,i = n.messageNumber,c = e.payload,u = c.title,l = c.abstractList,d = c.compatibleText,g = this._messageModule.getModule(At);return { protocolName: en, tjgID: this._messageModule.generateTjgID(e), requestData: { fromAccount: this._messageModule.getMyUserID(), toAccount: e.to, msgBody: [{ msgType: e.type, msgContent: { pbDownloadKey: s, downloadKey: r, title: u, abstractList: l, compatibleText: d, messageNumber: i } }], cloudCustomData: a, msgSeq: e.sequence, msgRandom: e.random, msgLifeTime: g && g.isOnlineMessage(e, t) ? 0 : void 0, offlinePushInfo: o ? { pushFlag: !0 === o.disablePush ? 1 : 0, title: o.title || "", desc: o.description || "", ext: o.extension || "", apnsInfo: { badgeMode: !0 === o.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: o.androidOPPOChannelID || "" } } : void 0 } };} }, { key: "_createGroupMergerMessagePack", value: function value(e, t, n) {var o = null;t && t.offlinePushInfo && (o = t.offlinePushInfo);var a = "";Ne(e.cloudCustomData) && e.cloudCustomData.length > 0 && (a = e.cloudCustomData);var s = n.pbDownloadKey,r = n.downloadKey,i = n.messageNumber,c = e.payload,u = c.title,l = c.abstractList,d = c.compatibleText,g = this._messageModule.getModule(Ot);return { protocolName: tn, tjgID: this._messageModule.generateTjgID(e), requestData: { fromAccount: this._messageModule.getMyUserID(), groupID: e.to, msgBody: [{ msgType: e.type, msgContent: { pbDownloadKey: s, downloadKey: r, title: u, abstractList: l, compatibleText: d, messageNumber: i } }], random: e.random, priority: e.priority, clientSequence: e.clientSequence, groupAtInfo: void 0, cloudCustomData: a, onlineOnlyFlag: g && g.isOnlineMessage(e, t) ? 1 : 0, offlinePushInfo: o ? { pushFlag: !0 === o.disablePush ? 1 : 0, title: o.title || "", desc: o.description || "", ext: o.extension || "", apnsInfo: { badgeMode: !0 === o.ignoreIOSBadge ? 1 : 0 }, androidInfo: { OPPOChannelID: o.androidOPPOChannelID || "" } } : void 0 } };} }]), e;}(),_i = { ERR_SVR_COMM_SENSITIVE_TEXT: 80001, ERR_SVR_COMM_BODY_SIZE_LIMIT: 80002, ERR_SVR_MSG_PKG_PARSE_FAILED: 20001, ERR_SVR_MSG_INTERNAL_AUTH_FAILED: 20002, ERR_SVR_MSG_INVALID_ID: 20003, ERR_SVR_MSG_PUSH_DENY: 20006, ERR_SVR_MSG_IN_PEER_BLACKLIST: 20007, ERR_SVR_MSG_BOTH_NOT_FRIEND: 20009, ERR_SVR_MSG_NOT_PEER_FRIEND: 20010, ERR_SVR_MSG_NOT_SELF_FRIEND: 20011, ERR_SVR_MSG_SHUTUP_DENY: 20012, ERR_SVR_GROUP_INVALID_PARAMETERS: 10004, ERR_SVR_GROUP_PERMISSION_DENY: 10007, ERR_SVR_GROUP_NOT_FOUND: 10010, ERR_SVR_GROUP_INVALID_GROUPID: 10015, ERR_SVR_GROUP_REJECT_FROM_THIRDPARTY: 10016, ERR_SVR_GROUP_SHUTUP_DENY: 10017, MESSAGE_SEND_FAIL: 2100 },fi = [eo.MESSAGE_ONPROGRESS_FUNCTION_ERROR, eo.MESSAGE_IMAGE_SELECT_FILE_FIRST, eo.MESSAGE_IMAGE_TYPES_LIMIT, eo.MESSAGE_FILE_IS_EMPTY, eo.MESSAGE_IMAGE_SIZE_LIMIT, eo.MESSAGE_FILE_SELECT_FILE_FIRST, eo.MESSAGE_FILE_SIZE_LIMIT, eo.MESSAGE_VIDEO_SIZE_LIMIT, eo.MESSAGE_VIDEO_TYPES_LIMIT, eo.MESSAGE_AUDIO_UPLOAD_FAIL, eo.MESSAGE_AUDIO_SIZE_LIMIT, eo.COS_UNDETECTED];var mi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "MessageModule", o._messageOptionsMap = new Map(), o._mergerMessageHandler = new hi(h(o)), o;}return o(a, [{ key: "createTextMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new ur(e),o = "string" == typeof e.payload ? e.payload : e.payload.text,a = new Ks({ text: o }),s = this._getNickAndAvatarByUserID(t);return n.setElement(a), n.setNickAndAvatar(s), n;} }, { key: "createImageMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new ur(e);if (z) {var o = e.payload.file;if (ke(o)) return void Ee.warn("小程序环境下调用 createImageMessage 接口时，payload.file 不支持传入 File 对象");var a = o.tempFilePaths[0],s = { url: a, name: a.slice(a.lastIndexOf("/") + 1), size: o.tempFiles && o.tempFiles[0].size || 1, type: a.slice(a.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = s;} else if (W) if (ke(e.payload.file)) {var r = e.payload.file;e.payload.file = { files: [r] };} else if (Oe(e.payload.file) && "undefined" != typeof uni) {var i = e.payload.file.tempFiles[0];e.payload.file = { files: [i] };}var c = new Ws({ imageFormat: xs.IMAGE_FORMAT.UNKNOWN, uuid: this._generateUUID(), file: e.payload.file }),u = this._getNickAndAvatarByUserID(t);return n.setElement(c), n.setNickAndAvatar(u), this._messageOptionsMap.set(n.ID, e), n;} }, { key: "createAudioMessage", value: function value(e) {if (z) {var t = e.payload.file;if (z) {var n = { url: t.tempFilePath, name: t.tempFilePath.slice(t.tempFilePath.lastIndexOf("/") + 1), size: t.fileSize, second: parseInt(t.duration) / 1e3, type: t.tempFilePath.slice(t.tempFilePath.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = n;}var o = this.getMyUserID();e.currentUser = o;var a = new ur(e),s = new Xs({ second: Math.floor(t.duration / 1e3), size: t.fileSize, url: t.tempFilePath, uuid: this._generateUUID() }),r = this._getNickAndAvatarByUserID(o);return a.setElement(s), a.setNickAndAvatar(r), this._messageOptionsMap.set(a.ID, e), a;}Ee.warn("createAudioMessage 目前只支持小程序环境下发语音消息");} }, { key: "createVideoMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t, e.payload.file.thumbUrl = "https://web.sdk.qcloud.com/im/assets/images/transparent.png", e.payload.file.thumbSize = 1668;var n = {};if (z) {if (Y) return void Ee.warn("createVideoMessage 不支持在支付宝小程序环境下使用");if (ke(e.payload.file)) return void Ee.warn("小程序环境下调用 createVideoMessage 接口时，payload.file 不支持传入 File 对象");var o = e.payload.file;n.url = o.tempFilePath, n.name = o.tempFilePath.slice(o.tempFilePath.lastIndexOf("/") + 1), n.size = o.size, n.second = o.duration, n.type = o.tempFilePath.slice(o.tempFilePath.lastIndexOf(".") + 1).toLowerCase();} else if (W) {if (ke(e.payload.file)) {var a = e.payload.file;e.payload.file.files = [a];} else if (Oe(e.payload.file) && "undefined" != typeof uni) {var s = e.payload.file.tempFile;e.payload.file.files = [s];}var r = e.payload.file;n.url = window.URL.createObjectURL(r.files[0]), n.name = r.files[0].name, n.size = r.files[0].size, n.second = r.files[0].duration || 0, n.type = r.files[0].type.split("/")[1];}e.payload.file.videoFile = n;var i = new ur(e),c = new ar({ videoFormat: n.type, videoSecond: ct(n.second, 0), videoSize: n.size, remoteVideoUrl: "", videoUrl: n.url, videoUUID: this._generateUUID(), thumbUUID: this._generateUUID(), thumbWidth: e.payload.file.width || 200, thumbHeight: e.payload.file.height || 200, thumbUrl: e.payload.file.thumbUrl, thumbSize: e.payload.file.thumbSize, thumbFormat: e.payload.file.thumbUrl.slice(e.payload.file.thumbUrl.lastIndexOf(".") + 1).toLowerCase() }),u = this._getNickAndAvatarByUserID(t);return i.setElement(c), i.setNickAndAvatar(u), this._messageOptionsMap.set(i.ID, e), i;} }, { key: "createCustomMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new ur(e),o = new or({ data: e.payload.data, description: e.payload.description, extension: e.payload.extension }),a = this._getNickAndAvatarByUserID(t);return n.setElement(o), n.setNickAndAvatar(a), n;} }, { key: "createFaceMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = new ur(e),o = new Js(e.payload),a = this._getNickAndAvatarByUserID(t);return n.setElement(o), n.setNickAndAvatar(a), n;} }, { key: "createMergerMessage", value: function value(e) {var t = this.getMyUserID();e.currentUser = t;var n = this._getNickAndAvatarByUserID(t),o = new ur(e),a = new ir(e.payload);return o.setElement(a), o.setNickAndAvatar(n), o.setRelayFlag(!0), o;} }, { key: "createForwardMessage", value: function value(e) {var t = e.to,n = e.conversationType,o = e.priority,a = e.payload,s = this.getMyUserID(),r = this._getNickAndAvatarByUserID(s);if (a.type === k.MSG_GRP_TIP) return yr(new fr({ code: eo.MESSAGE_FORWARD_TYPE_INVALID, message: Po }));var i = { to: t, conversationType: n, conversationID: "".concat(n).concat(t), priority: o, isPlaceMessage: 0, status: ft.UNSEND, currentUser: s, cloudCustomData: e.cloudCustomData || a.cloudCustomData || "" },c = new ur(i);return c.setElement(a.getElements()[0]), c.setNickAndAvatar(r), c.setRelayFlag(!0), c;} }, { key: "downloadMergerMessage", value: function value(e) {return this._mergerMessageHandler.downloadMergerMessage(e);} }, { key: "createFileMessage", value: function value(e) {if (!z) {if (W) if (ke(e.payload.file)) {var t = e.payload.file;e.payload.file = { files: [t] };} else if (Oe(e.payload.file) && "undefined" != typeof uni) {var n = e.payload.file.tempFiles[0];e.payload.file = { files: [n] };}var o = this.getMyUserID();e.currentUser = o;var a = new ur(e),s = new nr({ uuid: this._generateUUID(), file: e.payload.file }),r = this._getNickAndAvatarByUserID(o);return a.setElement(s), a.setNickAndAvatar(r), this._messageOptionsMap.set(a.ID, e), a;}Ee.warn("小程序目前不支持选择文件， createFileMessage 接口不可用！");} }, { key: "_onCannotFindModule", value: function value() {return yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "sendMessageInstance", value: function value(e, t) {var n,o = this,a = null;switch (e.conversationType) {case k.CONV_C2C:if (!(a = this.getModule(At))) return this._onCannotFindModule();break;case k.CONV_GROUP:if (!(a = this.getModule(Ot))) return this._onCannotFindModule();break;default:return yr({ code: eo.MESSAGE_SEND_INVALID_CONVERSATION_TYPE, message: po });}var s = this.getModule(qt),r = this.getModule(Ot);return s.upload(e).then(function () {o._getSendMessageSpecifiedKey(e) === fa && o.getModule($t).addSuccessCount(ma);return r.guardForAVChatRoom(e).then(function () {if (!e.isSendable()) return yr({ code: eo.MESSAGE_FILE_URL_IS_EMPTY, message: Ao });o._addSendMessageTotalCount(e), n = Date.now();var s = function (e) {var t = "utf-8";W && document && (t = document.charset.toLowerCase());var n,o,a = 0;if (o = e.length, "utf-8" === t || "utf8" === t) for (var s = 0; s < o; s++) {(n = e.codePointAt(s)) <= 127 ? a += 1 : n <= 2047 ? a += 2 : n <= 65535 ? a += 3 : (a += 4, s++);} else if ("utf-16" === t || "utf16" === t) for (var r = 0; r < o; r++) {(n = e.codePointAt(r)) <= 65535 ? a += 2 : (a += 4, r++);} else a = e.replace(/[^\x00-\xff]/g, "aa").length;return a;}(JSON.stringify(e));return e.type === k.MSG_MERGER && s > 7e3 ? o._mergerMessageHandler.uploadMergerMessage(e, s).then(function (n) {var a = o._mergerMessageHandler.createMergerMessagePack(e, t, n);return o.request(a);}) : (o.getModule(Pt).setMessageRandom(e), e.conversationType === k.CONV_C2C || e.conversationType === k.CONV_GROUP ? a.sendMessage(e, t) : void 0);}).then(function (s) {var r = s.data,i = r.time,c = r.sequence;o._addSendMessageSuccessCount(e, n), o._messageOptionsMap.delete(e.ID);var u = o.getModule(Pt);e.status = ft.SUCCESS, e.time = i;var l = !1;if (e.conversationType === k.CONV_GROUP) e.sequence = c, e.generateMessageID(o.getMyUserID());else if (e.conversationType === k.CONV_C2C) {var d = u.getLatestMessageSentByMe(e.conversationID);if (d) {var g = d.nick,p = d.avatar;g === e.nick && p === e.avatar || (l = !0);}}return u.appendToMessageList(e), l && u.modifyMessageSentByMe({ conversationID: e.conversationID, latestNick: e.nick, latestAvatar: e.avatar }), a.isOnlineMessage(e, t) ? e.setOnlineOnlyFlag(!0) : u.onMessageSent({ conversationOptionsList: [{ conversationID: e.conversationID, unreadCount: 0, type: e.conversationType, subType: e.conversationSubType, lastMessage: e }] }), e.getRelayFlag() || "TIMImageElem" !== e.type || rt(e.payload.imageInfoArray), lr({ message: e });});}).catch(function (t) {return o._onSendMessageFailed(e, t);});} }, { key: "_onSendMessageFailed", value: function value(e, t) {e.status = ft.FAIL, this.getModule(Pt).deleteMessageRandom(e), this._addSendMessageFailCountOnUser(e, t);var n = new Sa(Fa);return n.setMessage("tjg_id:".concat(this.generateTjgID(e), " type:").concat(e.type, " from:").concat(e.from, " to:").concat(e.to)), this.probeNetwork().then(function (e) {var o = m(e, 2),a = o[0],s = o[1];n.setError(t, a, s).end();}), Ee.error("".concat(this._className, "._onSendMessageFailed error:"), t), yr(new fr({ code: t && t.code ? t.code : eo.MESSAGE_SEND_FAIL, message: t && t.message ? t.message : lo, data: { message: e } }));} }, { key: "_getSendMessageSpecifiedKey", value: function value(e) {if ([k.MSG_IMAGE, k.MSG_AUDIO, k.MSG_VIDEO, k.MSG_FILE].includes(e.type)) return fa;if (e.conversationType === k.CONV_C2C) return pa;if (e.conversationType === k.CONV_GROUP) {var t = this.getModule(Ot).getLocalGroupProfile(e.to);if (!t) return;var n = t.type;return Ze(n) ? _a : ha;}} }, { key: "_addSendMessageTotalCount", value: function value(e) {var t = this._getSendMessageSpecifiedKey(e);t && this.getModule($t).addTotalCount(t);} }, { key: "_addSendMessageSuccessCount", value: function value(e, t) {var n = Math.abs(Date.now() - t),o = this._getSendMessageSpecifiedKey(e);if (o) {var a = this.getModule($t);a.addSuccessCount(o), a.addCost(o, n);}} }, { key: "_addSendMessageFailCountOnUser", value: function value(e, t) {var n,o,a = t.code,s = void 0 === a ? -1 : a,r = this.getModule($t),i = this._getSendMessageSpecifiedKey(e);i === fa && (n = s, o = !1, fi.includes(n) && (o = !0), o) ? r.addFailedCountOfUserSide(ma) : function (e) {var t = !1;return Object.values(_i).includes(e) && (t = !0), (e >= 120001 && e <= 13e4 || e >= 10100 && e <= 10200) && (t = !0), t;}(s) && i && r.addFailedCountOfUserSide(i);} }, { key: "resendMessage", value: function value(e) {return e.isResend = !0, e.status = ft.UNSEND, this.sendMessageInstance(e);} }, { key: "revokeMessage", value: function value(e) {var t = this,n = null;if (e.conversationType === k.CONV_C2C) {if (!(n = this.getModule(At))) return this._onCannotFindModule();} else if (e.conversationType === k.CONV_GROUP && !(n = this.getModule(Ot))) return this._onCannotFindModule();var o = new Sa(Ka);return o.setMessage("tjg_id:".concat(this.generateTjgID(e), " type:").concat(e.type, " from:").concat(e.from, " to:").concat(e.to)), n.revokeMessage(e).then(function (n) {var a = n.data.recallRetList;if (!gt(a) && 0 !== a[0].retCode) {var s = new fr({ code: a[0].retCode, message: _r[a[0].retCode] || fo, data: { message: e } });return o.setCode(s.code).setMoreMessage(s.message).end(), yr(s);}return Ee.info("".concat(t._className, ".revokeMessage ok. ID:").concat(e.ID)), e.isRevoked = !0, o.end(), t.getModule(Pt).onMessageRevoked([e]), lr({ message: e });}).catch(function (n) {t.probeNetwork().then(function (e) {var t = m(e, 2),a = t[0],s = t[1];o.setError(n, a, s).end();});var a = new fr({ code: n && n.code ? n.code : eo.MESSAGE_REVOKE_FAIL, message: n && n.message ? n.message : fo, data: { message: e } });return Ee.warn("".concat(t._className, ".revokeMessage failed. error:"), n), yr(a);});} }, { key: "deleteMessage", value: function value(e) {var t = this,n = null,o = e[0],a = o.conversationID,s = "",r = [],i = [];if (o.conversationType === k.CONV_C2C ? (n = this.getModule(At), s = a.replace(k.CONV_C2C, ""), e.forEach(function (e) {e && e.status === ft.SUCCESS && e.conversationID === a && (e.getOnlineOnlyFlag() || r.push("".concat(e.sequence, "_").concat(e.random, "_").concat(e.time)), i.push(e));})) : o.conversationType === k.CONV_GROUP && (n = this.getModule(Ot), s = a.replace(k.CONV_GROUP, ""), e.forEach(function (e) {e && e.status === ft.SUCCESS && e.conversationID === a && (e.getOnlineOnlyFlag() || r.push("".concat(e.sequence)), i.push(e));})), !n) return this._onCannotFindModule();if (0 === r.length) return this._onMessageDeleted(i);r.length > 30 && (r = r.slice(0, 30), i = i.slice(0, 30));var c = new Sa(xa);return c.setMessage("to:".concat(s, " count:").concat(r.length)), n.deleteMessage({ to: s, keyList: r }).then(function (e) {return c.end(), Ee.info("".concat(t._className, ".deleteMessage ok")), t._onMessageDeleted(i);}).catch(function (e) {t.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];c.setError(e, o, a).end();}), Ee.warn("".concat(t._className, ".deleteMessage failed. error:"), e);var n = new fr({ code: e && e.code ? e.code : eo.MESSAGE_DELETE_FAIL, message: e && e.message ? e.message : mo });return yr(n);});} }, { key: "_onMessageDeleted", value: function value(e) {return this.getModule(Pt).onMessageDeleted(e), vr({ messageList: e });} }, { key: "_generateUUID", value: function value() {var e = this.getModule(wt);return "".concat(e.getSDKAppID(), "-").concat(e.getUserID(), "-").concat(function () {for (var e = "", t = 32; t > 0; --t) {e += He[Math.floor(Math.random() * je)];}return e;}());} }, { key: "getMessageOptionByID", value: function value(e) {return this._messageOptionsMap.get(e);} }, { key: "_getNickAndAvatarByUserID", value: function value(e) {return this.getModule(Nt).getNickAndAvatarByUserID(e);} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._messageOptionsMap.clear();} }]), a;}(zt),Mi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "PluginModule", o.plugins = {}, o;}return o(a, [{ key: "registerPlugin", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {t.plugins[n] = e[n];}), new Sa(Oa).setMessage("key=".concat(Object.keys(e))).end();} }, { key: "getPlugin", value: function value(e) {return this.plugins[e];} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset"));} }]), a;}(zt),vi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "SyncUnreadMessageModule", o._cookie = "", o._onlineSyncFlag = !1, o.getInnerEmitterInstance().on(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._onLoginSuccess, h(o)), o;}return o(a, [{ key: "_onLoginSuccess", value: function value(e) {this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 0 });} }, { key: "_startSync", value: function value(e) {var t = this,n = e.cookie,o = e.syncFlag,a = e.isOnlineSync;Ee.log("".concat(this._className, "._startSync cookie:").concat(n, " syncFlag:").concat(o, " isOnlineSync:").concat(a)), this.request({ protocolName: Qt, requestData: { cookie: n, syncFlag: o, isOnlineSync: a } }).then(function (e) {var n = e.data,o = n.cookie,a = n.syncFlag,s = n.eventArray,r = n.messageList,i = n.C2CRemainingUnreadList;if (t._cookie = o, gt(o)) ;else if (0 === a || 1 === a) {if (s) t.getModule(xt).onMessage({ head: {}, body: { eventArray: s, isInstantMessage: t._onlineSyncFlag, isSyncingEnded: !1 } });t.getModule(At).onNewC2CMessage({ dataList: r, isInstantMessage: !1, C2CRemainingUnreadList: i }), t._startSync({ cookie: o, syncFlag: a, isOnlineSync: 0 });} else if (2 === a) {if (s) t.getModule(xt).onMessage({ head: {}, body: { eventArray: s, isInstantMessage: t._onlineSyncFlag, isSyncingEnded: !0 } });t.getModule(At).onNewC2CMessage({ dataList: r, isInstantMessage: t._onlineSyncFlag, C2CRemainingUnreadList: i });}}).catch(function (e) {Ee.error("".concat(t._className, "._startSync failed. error:"), e);});} }, { key: "startOnlineSync", value: function value() {Ee.log("".concat(this._className, ".startOnlineSync")), this._onlineSyncFlag = !0, this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 1 });} }, { key: "startSyncOnReconnected", value: function value() {Ee.log("".concat(this._className, ".startSyncOnReconnected.")), this._onlineSyncFlag = !0, this._startSync({ cookie: this._cookie, syncFlag: 0, isOnlineSync: 0 });} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._onlineSyncFlag = !1, this._cookie = "";} }]), a;}(zt),yi = { request: { toAccount: "To_Account", fromAccount: "From_Account", to: "To_Account", from: "From_Account", groupID: "GroupId", groupAtUserID: "GroupAt_Account", extension: "Ext", data: "Data", description: "Desc", elements: "MsgBody", sizeType: "Type", downloadFlag: "Download_Flag", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", videoUrl: "", imageUrl: "URL", fileUrl: "Url", uuid: "UUID", priority: "MsgPriority", receiverUserID: "To_Account", receiverGroupID: "GroupId", messageSender: "SenderId", messageReceiver: "ReceiverId", nick: "From_AccountNick", avatar: "From_AccountHeadurl", messageNumber: "MsgNum", pbDownloadKey: "PbMsgKey", downloadKey: "JsonMsgKey", applicationType: "PendencyType", userIDList: "To_Account", groupNameList: "GroupName", userID: "To_Account" }, response: { MsgPriority: "priority", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID", Download_Flag: "downloadFlag", GroupId: "groupID", Member_Account: "userID", MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", MsgSeq: "sequence", MsgRandom: "random", MsgTime: "time", MsgTimeStamp: "time", MsgContent: "content", MsgBody: "elements", From_AccountNick: "nick", From_AccountHeadurl: "avatar", GroupWithdrawInfoArray: "revokedInfos", GroupReadInfoArray: "groupMessageReadNotice", LastReadMsgSeq: "lastMessageSeq", WithdrawC2cMsgNotify: "c2cMessageRevokedNotify", C2cWithdrawInfoArray: "revokedInfos", C2cReadedReceipt: "c2cMessageReadReceipt", ReadC2cMsgNotify: "c2cMessageReadNotice", LastReadTime: "peerReadTime", MsgRand: "random", MsgType: "type", MsgShow: "messageShow", NextMsgSeq: "nextMessageSeq", FaceUrl: "avatar", ProfileDataMod: "profileModify", Profile_Account: "userID", ValueBytes: "value", ValueNum: "value", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation", Operator_Account: "operatorID", OpType: "operationType", ReportType: "operationType", UserId: "userID", User_Account: "userID", List_Account: "userIDList", MsgOperatorMemberExtraInfo: "operatorInfo", MsgMemberExtraInfo: "memberInfoList", ImageUrl: "avatar", NickName: "nick", MsgGroupNewInfo: "newGroupProfile", MsgAppDefinedData: "groupCustomField", Owner_Account: "ownerID", GroupFaceUrl: "avatar", GroupIntroduction: "introduction", GroupNotification: "notification", GroupApplyJoinOption: "joinOption", MsgKey: "messageKey", GroupInfo: "groupProfile", ShutupTime: "muteTime", Desc: "description", Ext: "extension", GroupAt_Account: "groupAtUserID", MsgNum: "messageNumber", PbMsgKey: "pbDownloadKey", JsonMsgKey: "downloadKey", MsgModifiedFlag: "isModified", PendencyItem: "applicationItem", PendencyType: "applicationType", AddTime: "time", AddSource: "source", AddWording: "wording", ProfileImImage: "avatar", PendencyAdd: "friendApplicationAdded", FrienPencydDel_Account: "friendApplicationDeletedUserIDList" }, ignoreKeyWord: ["C2C", "ID", "USP"] };function Ii(e, t) {if ("string" != typeof e && !Array.isArray(e)) throw new TypeError("Expected the input to be `string | string[]`");t = Object.assign({ pascalCase: !1 }, t);var n;return 0 === (e = Array.isArray(e) ? e.map(function (e) {return e.trim();}).filter(function (e) {return e.length;}).join("-") : e.trim()).length ? "" : 1 === e.length ? t.pascalCase ? e.toUpperCase() : e.toLowerCase() : (e !== e.toLowerCase() && (e = Ti(e)), e = e.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (e, t) {return t.toUpperCase();}).replace(/\d+(\w|$)/g, function (e) {return e.toUpperCase();}), n = e, t.pascalCase ? n.charAt(0).toUpperCase() + n.slice(1) : n);}var Ti = function Ti(e) {for (var t = !1, n = !1, o = !1, a = 0; a < e.length; a++) {var s = e[a];t && /[a-zA-Z]/.test(s) && s.toUpperCase() === s ? (e = e.slice(0, a) + "-" + e.slice(a), t = !1, o = n, n = !0, a++) : n && o && /[a-zA-Z]/.test(s) && s.toLowerCase() === s ? (e = e.slice(0, a - 1) + "-" + e.slice(a - 1), o = n, n = !1, t = !0) : (t = s.toLowerCase() === s && s.toUpperCase() !== s, o = n, n = s.toUpperCase() === s && s.toLowerCase() !== s);}return e;};function Di(e, t) {var n = 0;return function e(t, o) {if (++n > 100) return n--, t;if (Le(t)) {var a = t.map(function (t) {return Ae(t) ? e(t, o) : t;});return n--, a;}if (Ae(t)) {var s = (r = t, i = function i(e, t) {if (!Ue(t)) return !1;if ((a = t) !== Ii(a)) for (var n = 0; n < yi.ignoreKeyWord.length && !t.includes(yi.ignoreKeyWord[n]); n++) {;}var a;return Re(o[t]) ? function (e) {return "OPPOChannelID" === e ? e : e[0].toUpperCase() + Ii(e).slice(1);}(t) : o[t];}, c = Object.create(null), Object.keys(r).forEach(function (e) {var t = i(r[e], e);t && (c[t] = r[e]);}), c);return s = nt(s, function (t, n) {return Le(t) || Ae(t) ? e(t, o) : t;}), n--, s;}var r, i, c;}(e, t);}function Si(e, t) {if (Le(e)) return e.map(function (e) {return Ae(e) ? Si(e, t) : e;});if (Ae(e)) {var n = (o = e, a = function a(e, n) {return Re(t[n]) ? Ii(n) : t[n];}, s = {}, Object.keys(o).forEach(function (e) {s[a(o[e], e)] = o[e];}), s);return n = nt(n, function (e) {return Le(e) || Ae(e) ? Si(e, t) : e;});}var o, a, s;}var Ei = function () {function e(n) {t(this, e), this._handler = n;var o = n.getURL();this._socket = null, this._id = Be(), z ? Y ? (J.connectSocket({ url: o, header: { "content-type": "application/json" } }), J.onSocketClose(this._onClose.bind(this)), J.onSocketOpen(this._onOpen.bind(this)), J.onSocketMessage(this._onMessage.bind(this)), J.onSocketError(this._onError.bind(this))) : (this._socket = J.connectSocket({ url: o, header: { "content-type": "application/json" }, complete: function complete() {} }), this._socket.onClose(this._onClose.bind(this)), this._socket.onOpen(this._onOpen.bind(this)), this._socket.onMessage(this._onMessage.bind(this)), this._socket.onError(this._onError.bind(this))) : W && (this._socket = new WebSocket(o), this._socket.onopen = this._onOpen.bind(this), this._socket.onmessage = this._onMessage.bind(this), this._socket.onclose = this._onClose.bind(this), this._socket.onerror = this._onError.bind(this));}return o(e, [{ key: "getID", value: function value() {return this._id;} }, { key: "_onOpen", value: function value() {this._handler.onOpen({ id: this._id });} }, { key: "_onClose", value: function value(e) {this._handler.onClose({ id: this._id, e: e });} }, { key: "_onMessage", value: function value(e) {this._handler.onMessage(e);} }, { key: "_onError", value: function value(e) {this._handler.onError({ id: this._id, e: e });} }, { key: "close", value: function value(e) {if (Y) return J.offSocketClose(), J.offSocketMessage(), J.offSocketOpen(), J.offSocketError(), void J.closeSocket();this._socket && (z ? (this._socket.onClose(function () {}), this._socket.onOpen(function () {}), this._socket.onMessage(function () {}), this._socket.onError(function () {})) : W && (this._socket.onopen = null, this._socket.onmessage = null, this._socket.onclose = null, this._socket.onerror = null), j ? this._socket.close({ code: e }) : this._socket.close(e), this._socket = null);} }, { key: "send", value: function value(e) {Y ? J.sendSocketMessage({ data: e.data, fail: function fail() {e.fail && e.requestID && e.fail(e.requestID);} }) : this._socket && (z ? this._socket.send({ data: e.data, fail: function fail() {e.fail && e.requestID && e.fail(e.requestID);} }) : W && this._socket.send(e.data));} }]), e;}(),ki = 4e3,Ci = 4001,Ni = "connected",Ai = "connecting",Oi = "disconnected",Li = function () {function e(n) {t(this, e), this._channelModule = n, this._className = "SocketHandler", this._promiseMap = new Map(), this._readyState = Oi, this._simpleRequestMap = new Map(), this.MAX_SIZE = 100, this._startSequence = Be(), this._startTs = 0, this._reConnectFlag = !1, this._nextPingTs = 0, this._reConnectCount = 0, this.MAX_RECONNECT_COUNT = 3, this._socketID = -1, this._random = 0, this._socket = null, this._url = "", this._onOpenTs = 0, this._setOverseaHost(), this._initConnection();}return o(e, [{ key: "_setOverseaHost", value: function value() {this._channelModule.isOversea() && U.HOST.setCurrent(b);} }, { key: "_initConnection", value: function value() {"" === this._url ? this._url = U.HOST.CURRENT.DEFAULT : this._url === U.HOST.CURRENT.DEFAULT ? this._url = U.HOST.CURRENT.BACKUP : this._url === U.HOST.CURRENT.BACKUP && (this._url = U.HOST.CURRENT.DEFAULT), this._connect(), this._nextPingTs = 0;} }, { key: "onCheckTimer", value: function value(e) {e % 1 == 0 && this._checkPromiseMap();} }, { key: "_checkPromiseMap", value: function value() {var e = this;0 !== this._promiseMap.size && this._promiseMap.forEach(function (t, n) {var o = t.reject,a = t.timestamp;Date.now() - a >= 15e3 && (Ee.log("".concat(e._className, "._checkPromiseMap request timeout, delete requestID:").concat(n)), e._promiseMap.delete(n), o(new fr({ code: eo.NETWORK_TIMEOUT, message: aa })), e._channelModule.onRequestTimeout(n));});} }, { key: "onOpen", value: function value(e) {this._onOpenTs = Date.now();var t = e.id;this._socketID = t, new Sa(Ra).setMessage(n).setMessage("socketID:".concat(t)).end();var n = Date.now() - this._startTs;Ee.log("".concat(this._className, "._onOpen cost ").concat(n, " ms. socketID:").concat(t)), e.id === this._socketID && (this._readyState = Ni, this._reConnectCount = 0, this._resend(), !0 === this._reConnectFlag && (this._channelModule.onReconnected(), this._reConnectFlag = !1), this._channelModule.onOpen());} }, { key: "onClose", value: function value(e) {var t = new Sa(Pa),n = e.id,o = e.e,a = "sourceSocketID:".concat(n, " currentSocketID:").concat(this._socketID),s = 0;0 !== this._onOpenTs && (s = Date.now() - this._onOpenTs), t.setMessage(s).setMoreMessage(a).setCode(o.code).end(), Ee.log("".concat(this._className, "._onClose code:").concat(o.code, " reason:").concat(o.reason, " ").concat(a, " onlineTime:").concat(s)), n === this._socketID && (this._readyState = Oi, s < 1e3 ? this._channelModule.onReconnectFailed() : this._channelModule.onClose());} }, { key: "onError", value: function value(e) {var t = e.id,n = e.e,o = "sourceSocketID:".concat(t, " currentSocketID:").concat(this._socketID);new Sa(wa).setMessage(n.errMsg || Ke(n)).setMoreMessage(o).setLevel("error").end(), Ee.warn("".concat(this._className, "._onError"), n, o), t === this._socketID && (this._readyState = "", this._channelModule.onError());} }, { key: "onMessage", value: function value(e) {var t;try {t = JSON.parse(e.data);} catch (u) {new Sa(Wa).setMessage(e.data).end();}if (t && t.head) {var n = this._getRequestIDFromHead(t.head),o = it(t.head),a = Si(t.body, this._getResponseKeyMap(o));if (Ee.debug("".concat(this._className, ".onMessage ret:").concat(JSON.stringify(a), " requestID:").concat(n, " has:").concat(this._promiseMap.has(n))), this._setNextPingTs(), this._promiseMap.has(n)) {var s = this._promiseMap.get(n),r = s.resolve,i = s.reject,c = s.timestamp;return this._promiseMap.delete(n), this._calcRTT(c), void (a.errorCode && 0 !== a.errorCode ? (this._channelModule.onErrorCodeNotZero(a), i(new fr({ code: a.errorCode, message: a.errorInfo || "" }))) : r(lr(a)));}this._channelModule.onMessage({ head: t.head, body: a });}} }, { key: "_calcRTT", value: function value(e) {var t = Date.now() - e;this._channelModule.getModule($t).addRTT(t);} }, { key: "_connect", value: function value() {new Sa(La).setMessage("url:".concat(this.getURL())).end(), Ee.log("".concat(this._className, "._connect url:").concat(this.getURL())), this._startTs = Date.now(), this._socket = new Ei(this), this._socketID = this._socket.getID(), this._readyState = Ai;} }, { key: "getURL", value: function value() {var e = this._channelModule.getModule(wt);return "".concat(this._url, "/info?sdkappid=").concat(e.getSDKAppID(), "&instanceid=").concat(e.getInstanceID(), "&random=").concat(this._getRandom());} }, { key: "_closeConnection", value: function value(e) {Ee.log("".concat(this._className, "._closeConnection")), this._socket && (this._socket.close(e), this._socketID = -1, this._socket = null, this._readyState = Oi);} }, { key: "_resend", value: function value() {var e = this;if (Ee.log("".concat(this._className, "._resend reConnectFlag:").concat(this._reConnectFlag), "promiseMap.size:".concat(this._promiseMap.size, " simpleRequestMap.size:").concat(this._simpleRequestMap.size)), this._promiseMap.size > 0 && this._promiseMap.forEach(function (t, n) {var o = t.uplinkData,a = t.resolve,s = t.reject;e._promiseMap.set(n, { resolve: a, reject: s, timestamp: Date.now(), uplinkData: o }), e._execute(n, o);}), this._simpleRequestMap.size > 0) {var t,n = S(this._simpleRequestMap);try {for (n.s(); !(t = n.n()).done;) {var o = m(t.value, 2),a = o[0],s = o[1];this._execute(a, s);}} catch (r) {n.e(r);} finally {n.f();}this._simpleRequestMap.clear();}} }, { key: "send", value: function value(e) {var t = this;e.head.seq = this._getSequence(), e.head.reqtime = Math.floor(Date.now() / 1e3);e.keyMap;var n = p(e, ["keyMap"]),o = this._getRequestIDFromHead(e.head),a = JSON.stringify(n);return new Promise(function (e, s) {(t._promiseMap.set(o, { resolve: e, reject: s, timestamp: Date.now(), uplinkData: a }), Ee.debug("".concat(t._className, ".send uplinkData:").concat(JSON.stringify(n), " requestID:").concat(o, " readyState:").concat(t._readyState)), t._readyState !== Ni) ? t._reConnect() : (t._execute(o, a), t._channelModule.getModule($t).addRequestCount());});} }, { key: "simplySend", value: function value(e) {e.head.seq = this._getSequence(), e.head.reqtime = Math.floor(Date.now() / 1e3);e.keyMap;var t = p(e, ["keyMap"]),n = this._getRequestIDFromHead(e.head),o = JSON.stringify(t);this._readyState !== Ni ? (this._simpleRequestMap.size < this.MAX_SIZE ? this._simpleRequestMap.set(n, o) : Ee.log("".concat(this._className, ".simplySend. simpleRequestMap is full, drop request!")), this._reConnect()) : this._execute(n, o);} }, { key: "_execute", value: function value(e, t) {this._socket.send({ data: t, fail: z ? this._onSendFail.bind(this) : void 0, requestID: e });} }, { key: "_onSendFail", value: function value(e) {Ee.log("".concat(this._className, "._onSendFail requestID:").concat(e));} }, { key: "_getSequence", value: function value() {var e;if (this._startSequence < 2415919103) return e = this._startSequence, this._startSequence += 1, 2415919103 === this._startSequence && (this._startSequence = Be()), e;} }, { key: "_getRequestIDFromHead", value: function value(e) {return e.servcmd + e.seq;} }, { key: "_getResponseKeyMap", value: function value(e) {var t = this._channelModule.getKeyMap(e);return r({}, yi.response, {}, t.response);} }, { key: "_reConnect", value: function value() {this._readyState !== Ni && this._readyState !== Ai && this.forcedReconnect();} }, { key: "forcedReconnect", value: function value() {var e = this;Ee.log("".concat(this._className, ".forcedReconnect count:").concat(this._reConnectCount, " readyState:").concat(this._readyState)), this._reConnectFlag = !0, this._resetRandom(), this._reConnectCount < this.MAX_RECONNECT_COUNT ? (this._reConnectCount += 1, this._closeConnection(Ci), this._initConnection()) : this._channelModule.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0];n[1];o ? (Ee.warn("".concat(e._className, ".forcedReconnect disconnected from wsserver but network is ok, continue...")), e._reConnectCount = 0, e._closeConnection(Ci), e._initConnection()) : e._channelModule.onReconnectFailed();});} }, { key: "getReconnectFlag", value: function value() {return this._reConnectFlag;} }, { key: "_setNextPingTs", value: function value() {this._nextPingTs = Date.now() + 1e4;} }, { key: "getNextPingTs", value: function value() {return this._nextPingTs;} }, { key: "isConnected", value: function value() {return this._readyState === Ni;} }, { key: "_getRandom", value: function value() {return 0 === this._random && (this._random = Math.random()), this._random;} }, { key: "_resetRandom", value: function value() {this._random = 0;} }, { key: "close", value: function value() {Ee.log("".concat(this._className, ".close")), this._closeConnection(ki), this._promiseMap.clear(), this._startSequence = Be(), this._readyState = Oi, this._simpleRequestMap.clear(), this._reConnectFlag = !1, this._reConnectCount = 0, this._onOpenTs = 0, this._url = "", this._random = 0;} }]), e;}(),Ri = function (e) {i(a, e);var n = f(a);function a(e) {var o;if (t(this, a), (o = n.call(this, e))._className = "ChannelModule", o._socketHandler = new Li(h(o)), o._probing = !1, o._isAppShowing = !0, o._previousState = k.NET_STATE_CONNECTED, z && "function" == typeof J.onAppShow && "function" == typeof J.onAppHide) {var s = o._onAppHide.bind(h(o)),r = o._onAppShow.bind(h(o));"function" == typeof J.offAppHide && J.offAppHide(s), "function" == typeof J.offAppShow && J.offAppShow(r), J.onAppHide(s), J.onAppShow(r);}return o._timerForNotLoggedIn = -1, o._timerForNotLoggedIn = setInterval(o.onCheckTimer.bind(h(o)), 1e3), o._fatalErrorFlag = !1, o;}return o(a, [{ key: "onCheckTimer", value: function value(e) {this._socketHandler && (this.isLoggedIn() ? (this._timerForNotLoggedIn > 0 && (clearInterval(this._timerForNotLoggedIn), this._timerForNotLoggedIn = -1), this._socketHandler.onCheckTimer(e)) : this._socketHandler.onCheckTimer(1), this._checkNextPing());} }, { key: "onErrorCodeNotZero", value: function value(e) {this.getModule(xt).onErrorCodeNotZero(e);} }, { key: "onMessage", value: function value(e) {this.getModule(xt).onMessage(e);} }, { key: "send", value: function value(e) {return this._socketHandler ? this._previousState !== k.NET_STATE_CONNECTED && e.head.servcmd.includes(jn) ? this._sendLogViaHTTP(e) : this._socketHandler.send(e) : Promise.reject();} }, { key: "_sendLogViaHTTP", value: function value(e) {return new Promise(function (t, n) {var o = "https://webim.tim.qq.com/v4/imopenstat/tim_web_report_v2?sdkappid=".concat(e.head.sdkappid, "&reqtime=").concat(Date.now()),a = JSON.stringify(e.body),s = "application/x-www-form-urlencoded;charset=UTF-8";if (z) J.request({ url: o, data: a, method: "POST", timeout: 3e3, header: { "content-type": s }, success: function success() {t();}, fail: function fail() {n(new fr({ code: eo.NETWORK_ERROR, message: oa }));} });else {var r = new XMLHttpRequest(),i = setTimeout(function () {r.abort(), n(new fr({ code: eo.NETWORK_TIMEOUT, message: aa }));}, 3e3);r.onreadystatechange = function () {4 === r.readyState && (clearTimeout(i), 200 === r.status || 304 === r.status ? t() : n(new fr({ code: eo.NETWORK_ERROR, message: oa })));}, r.open("POST", o, !0), r.setRequestHeader("Content-type", s), r.send(a);}});} }, { key: "simplySend", value: function value(e) {return this._socketHandler ? this._socketHandler.simplySend(e) : Promise.reject();} }, { key: "onOpen", value: function value() {this._ping();} }, { key: "onClose", value: function value() {this.reConnect();} }, { key: "onError", value: function value() {z && Ee.error("".concat(this._className, ".onError 从v2.11.2起，SDK 支持了 WebSocket，如您未添加相关受信域名，请先添加！升级指引: https://web.sdk.qcloud.com/im/doc/zh-cn/tutorial-02-upgradeguideline.html"));} }, { key: "getKeyMap", value: function value(e) {return this.getModule(xt).getKeyMap(e);} }, { key: "_onAppHide", value: function value() {this._isAppShowing = !1;} }, { key: "_onAppShow", value: function value() {this._isAppShowing = !0;} }, { key: "onRequestTimeout", value: function value(e) {} }, { key: "onReconnected", value: function value() {Ee.log("".concat(this._className, ".onReconnected")), this.getModule(xt).onReconnected(), this._emitNetStateChangeEvent(k.NET_STATE_CONNECTED);} }, { key: "onReconnectFailed", value: function value() {Ee.log("".concat(this._className, ".onReconnectFailed")), this._emitNetStateChangeEvent(k.NET_STATE_DISCONNECTED);} }, { key: "reConnect", value: function value() {if (!this._fatalErrorFlag && this._socketHandler) {var e = this._socketHandler.getReconnectFlag();if (Ee.log("".concat(this._className, ".reConnect previousState:").concat(this._previousState, " reconnectFlag:").concat(e)), this._previousState === k.NET_STATE_CONNECTING && e) return;this._socketHandler.forcedReconnect(), this._emitNetStateChangeEvent(k.NET_STATE_CONNECTING);}} }, { key: "_emitNetStateChangeEvent", value: function value(e) {this._previousState !== e && (this._previousState = e, this.emitOuterEvent(E.NET_STATE_CHANGE, { state: e }));} }, { key: "_ping", value: function value() {var e = this;if (!0 !== this._probing) {this._probing = !0;var t = this.getModule(xt).getProtocolData({ protocolName: Yn });this.send(t).then(function () {e._probing = !1;}).catch(function (t) {if (Ee.warn("".concat(e._className, "._ping failed. error:"), t), e._probing = !1, t && 60002 === t.code) return new Sa(Vs).setMessage("code:".concat(t.code, " message:").concat(t.message)).setNetworkType(e.getModule(Ut).getNetworkType()).end(), e._fatalErrorFlag = !0, void e.emitOuterEvent(E.NET_STATE_CHANGE, k.NET_STATE_DISCONNECTED);e.probeNetwork().then(function (t) {var n = m(t, 2),o = n[0],a = n[1];Ee.log("".concat(e._className, "._ping failed. isAppShowing:").concat(e._isAppShowing, " online:").concat(o, " networkType:").concat(a)), o ? e.reConnect() : e.emitOuterEvent(E.NET_STATE_CHANGE, k.NET_STATE_DISCONNECTED);});});}} }, { key: "_checkNextPing", value: function value() {this._socketHandler && this._socketHandler.isConnected() && Date.now() >= this._socketHandler.getNextPingTs() && this._ping();} }, { key: "dealloc", value: function value() {this._socketHandler && (this._socketHandler.close(), this._socketHandler = null), this._timerForNotLoggedIn > -1 && clearInterval(this._timerForNotLoggedIn);} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._previousState = k.NET_STATE_CONNECTED, this._probing = !1, this._fatalErrorFlag = !1, this._timerForNotLoggedIn = setInterval(this.onCheckTimer.bind(this), 1e3);} }]), a;}(zt),Pi = function () {function n(e) {t(this, n), this._className = "ProtocolHandler", this._sessionModule = e, this._configMap = new Map(), this._fillConfigMap();}return o(n, [{ key: "_fillConfigMap", value: function value() {this._configMap.clear();var e = this._sessionModule.genCommonHead(),t = this._sessionModule.genCosSpecifiedHead(),n = this._sessionModule.genSSOReportHead();this._configMap.set(Wt, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_OPEN_STATUS, ".").concat(U.CMD.LOGIN) }), body: { state: "Online" }, keyMap: { response: { TinyId: "tinyID", InstId: "instanceID", HelloInterval: "helloInterval" } } };}(e)), this._configMap.set(Jt, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_OPEN_STATUS, ".").concat(U.CMD.LOGOUT) }), body: {} };}(e)), this._configMap.set(Xt, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_OPEN_STATUS, ".").concat(U.CMD.HELLO) }), body: {}, keyMap: { response: { NewInstInfo: "newInstanceInfo" } } };}(e)), this._configMap.set(Bn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_COS_SIGN, ".").concat(U.CMD.COS_SIGN) }), body: { cmd: "open_im_cos_svc", subCmd: "get_cos_token", duration: 300, version: 2 }, keyMap: { request: { userSig: "usersig", subCmd: "sub_cmd", cmd: "cmd", duration: "duration", version: "version" }, response: { expired_time: "expiredTime", bucket_name: "bucketName", session_token: "sessionToken", tmp_secret_id: "secretId", tmp_secret_key: "secretKey" } } };}(t)), this._configMap.set(Hn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.CUSTOM_UPLOAD, ".").concat(U.CMD.COS_PRE_SIG) }), body: { fileType: void 0, fileName: void 0, uploadMethod: 0, duration: 900 }, keyMap: { request: { userSig: "usersig", fileType: "file_type", fileName: "file_name", uploadMethod: "upload_method" }, response: { expired_time: "expiredTime", request_id: "requestId", head_url: "headUrl", upload_url: "uploadUrl", download_url: "downloadUrl", ci_url: "ciUrl" } } };}(t)), this._configMap.set(Qn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.CLOUD_CONTROL, ".").concat(U.CMD.FETCH_CLOUD_CONTROL_CONFIG) }), body: { SDKAppID: 0, version: 0 }, keyMap: { request: { SDKAppID: "uint32_sdkappid", version: "uint64_version" }, response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_json_config: "cloudControlConfig", uint32_expired_time: "expiredTime", uint32_sdkappid: "SDKAppID", uint64_version: "version" } } };}(e)), this._configMap.set(Zn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.CLOUD_CONTROL, ".").concat(U.CMD.PUSHED_CLOUD_CONTROL_CONFIG) }), body: {}, keyMap: { response: { int32_error_code: "errorCode", str_error_message: "errorMessage", str_json_config: "cloudControlConfig", uint32_expired_time: "expiredTime", uint32_sdkappid: "SDKAppID", uint64_version: "version" } } };}(e)), this._configMap.set(Qt, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.GET_MESSAGES) }), body: { cookie: "", syncFlag: 0, needAbstract: 1, isOnlineSync: 0 }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", from: "From_Account", to: "To_Account", time: "MsgTimeStamp", sequence: "MsgSeq", random: "MsgRandom", elements: "MsgBody" }, response: { MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", ClientSeq: "clientSequence", MsgSeq: "sequence", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", ToGroupId: "groupID", MsgKey: "messageKey", GroupTips: "groupTips", MsgBody: "elements", MsgType: "type", C2CRemainingUnreadCount: "C2CRemainingUnreadList", C2CPairUnreadCount: "C2CPairUnreadList" } } };}(e)), this._configMap.set(Zt, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.BIG_DATA_HALLWAY_AUTH_KEY) }), body: {} };}(e)), this._configMap.set(en, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.SEND_MESSAGE) }), body: { fromAccount: "", toAccount: "", msgTimeStamp: void 0, msgSeq: 0, msgRandom: 0, msgBody: [], cloudCustomData: void 0, nick: "", avatar: "", msgLifeTime: void 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0 }, androidInfo: { OPPOChannelID: "" } } }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", count: "MaxCnt", lastMessageTime: "LastMsgTime", messageKey: "MsgKey", peerAccount: "Peer_Account", data: "Data", description: "Desc", extension: "Ext", type: "MsgType", content: "MsgContent", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", nick: "From_AccountNick", avatar: "From_AccountHeadurl", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", elements: "MsgBody", clientSequence: "ClientSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody" } } };}(e)), this._configMap.set(tn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.SEND_GROUP_MESSAGE) }), body: { fromAccount: "", groupID: "", random: 0, clientSequence: 0, priority: "", msgBody: [], cloudCustomData: void 0, onlineOnlyFlag: 0, offlinePushInfo: { pushFlag: 0, title: "", desc: "", ext: "", apnsInfo: { badgeMode: 0 }, androidInfo: { OPPOChannelID: "" } }, groupAtInfo: [] }, keyMap: { request: { to: "GroupId", extension: "Ext", data: "Data", description: "Desc", random: "Random", sequence: "ReqMsgSeq", count: "ReqMsgNumber", type: "MsgType", priority: "MsgPriority", content: "MsgContent", elements: "MsgBody", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", clientSequence: "ClientSeq", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody" }, response: { MsgTime: "time", MsgSeq: "sequence" } } };}(e)), this._configMap.set(cn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.REVOKE_C2C_MESSAGE) }), body: { msgInfo: { fromAccount: "", toAccount: "", msgTimeStamp: 0, msgSeq: 0, msgRandom: 0 } }, keyMap: { request: { msgInfo: "MsgInfo", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom" } } };}(e)), this._configMap.set(An, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.REVOKE_GROUP_MESSAGE) }), body: { to: "", msgSeqList: void 0 }, keyMap: { request: { to: "GroupId", msgSeqList: "MsgSeqList", msgSeq: "MsgSeq" } } };}(e)), this._configMap.set(ln, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.GET_C2C_ROAM_MESSAGES) }), body: { peerAccount: "", count: 15, lastMessageTime: 0, messageKey: "", withRecalledMessage: 1 }, keyMap: { request: { messageKey: "MsgKey", peerAccount: "Peer_Account", count: "MaxCnt", lastMessageTime: "LastMsgTime", withRecalledMessage: "WithRecalledMsg" } } };}(e)), this._configMap.set(Ln, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.GET_GROUP_ROAM_MESSAGES) }), body: { withRecalledMsg: 1, groupID: "", count: 15, sequence: "" }, keyMap: { request: { sequence: "ReqMsgSeq", count: "ReqMsgNumber", withRecalledMessage: "WithRecalledMsg" }, response: { Random: "random", MsgTime: "time", MsgSeq: "sequence", ReqMsgSeq: "sequence", RspMsgList: "messageList", IsPlaceMsg: "isPlaceMessage", IsSystemMsg: "isSystemMessage", ToGroupId: "to", EnumFrom_AccountType: "fromAccountType", EnumTo_AccountType: "toAccountType", GroupCode: "groupCode", MsgPriority: "priority", MsgBody: "elements", MsgType: "type", MsgContent: "content", IsFinished: "complete", Download_Flag: "downloadFlag", ClientSeq: "clientSequence", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } } };}(e)), this._configMap.set(un, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.SET_C2C_MESSAGE_READ) }), body: { C2CMsgReaded: void 0 }, keyMap: { request: { lastMessageTime: "LastedMsgTime" } } };}(e)), this._configMap.set(On, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.SET_GROUP_MESSAGE_READ) }), body: { groupID: void 0, messageReadSeq: void 0 }, keyMap: { request: { messageReadSeq: "MsgReadedSeq" } } };}(e)), this._configMap.set(gn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.DELETE_C2C_MESSAGE) }), body: { fromAccount: "", to: "", keyList: void 0 }, keyMap: { request: { keyList: "MsgKeyList" } } };}(e)), this._configMap.set(Un, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.DELETE_GROUP_MESSAGE) }), body: { groupID: "", deleter: "", keyList: void 0 }, keyMap: { request: { deleter: "Deleter_Account", keyList: "Seqs" } } };}(e)), this._configMap.set(dn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.GET_PEER_READ_TIME) }), body: { userIDList: void 0 }, keyMap: { request: { userIDList: "To_Account" }, response: { ReadTime: "peerReadTimeList" } } };}(e)), this._configMap.set(hn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.RECENT_CONTACT, ".").concat(U.CMD.GET_CONVERSATION_LIST) }), body: { fromAccount: void 0, count: 0 }, keyMap: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq", C2cPeerReadTime: "c2cPeerReadTime" } } };}(e)), this._configMap.set(pn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.RECENT_CONTACT, ".").concat(U.CMD.PAGING_GET_CONVERSATION_LIST) }), body: { fromAccount: void 0, timeStamp: void 0, orderType: void 0, messageAssistFlag: 4 }, keyMap: { request: { messageAssistFlag: "MsgAssistFlags" }, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq", C2cPeerReadTime: "c2cPeerReadTime", LastMsgFlags: "lastMessageFlag" } } };}(e)), this._configMap.set(_n, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.RECENT_CONTACT, ".").concat(U.CMD.DELETE_CONVERSATION) }), body: { fromAccount: "", toAccount: void 0, type: 1, toGroupID: void 0 }, keyMap: { request: { toGroupID: "ToGroupid" } } };}(e)), this._configMap.set(fn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.DELETE_GROUP_AT_TIPS) }), body: { messageListToDelete: void 0 }, keyMap: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } };}(e)), this._configMap.set(nn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.PROFILE, ".").concat(U.CMD.PORTRAIT_GET) }), body: { fromAccount: "", userItem: [] }, keyMap: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } };}(e)), this._configMap.set(on, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.PROFILE, ".").concat(U.CMD.PORTRAIT_SET) }), body: { fromAccount: "", profileItem: [{ tag: Bs.NICK, value: "" }, { tag: Bs.GENDER, value: "" }, { tag: Bs.ALLOWTYPE, value: "" }, { tag: Bs.AVATAR, value: "" }] }, keyMap: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } };}(e)), this._configMap.set(an, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.FRIEND, ".").concat(U.CMD.GET_BLACKLIST) }), body: { fromAccount: "", startIndex: 0, maxLimited: 30, lastSequence: 0 }, keyMap: { response: { CurruentSequence: "currentSequence" } } };}(e)), this._configMap.set(sn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.FRIEND, ".").concat(U.CMD.ADD_BLACKLIST) }), body: { fromAccount: "", toAccount: [] } };}(e)), this._configMap.set(rn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.FRIEND, ".").concat(U.CMD.DELETE_BLACKLIST) }), body: { fromAccount: "", toAccount: [] } };}(e)), this._configMap.set(mn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.GET_JOINED_GROUPS) }), body: { memberAccount: "", limit: void 0, offset: void 0, groupType: void 0, responseFilter: { groupBaseInfoFilter: void 0, selfInfoFilter: void 0 } }, keyMap: { request: { memberAccount: "Member_Account" }, response: { GroupIdList: "groups", MsgFlag: "messageRemindType" } } };}(e)), this._configMap.set(Mn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.GET_GROUP_INFO) }), body: { groupIDList: void 0, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember"], groupCustomFieldFilter: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 } }, keyMap: { request: { groupIDList: "GroupIdList", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData", groupCustomFieldFilter: "AppDefinedDataFilter_Group", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { GroupIdList: "groups", MsgFlag: "messageRemindType", AppDefinedData: "groupCustomField", AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_Group: "groupCustomFieldFilter", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", InfoSeq: "infoSequence", MemberList: "members", GroupInfo: "groups", ShutUpUntil: "muteUntil", ShutUpAllMember: "muteAllMembers", ApplyJoinOption: "joinOption" } } };}(e)), this._configMap.set(vn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.CREATE_GROUP) }), body: { type: void 0, name: void 0, groupID: void 0, ownerID: void 0, introduction: void 0, notification: void 0, maxMemberNum: void 0, joinOption: void 0, memberList: void 0, groupCustomField: void 0, memberCustomField: void 0, webPushFlag: 1, avatar: "FaceUrl" }, keyMap: { request: { ownerID: "Owner_Account", userID: "Member_Account", avatar: "FaceUrl", maxMemberNum: "MaxMemberCount", joinOption: "ApplyJoinOption", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData" }, response: { HugeGroupFlag: "avChatRoomFlag", OverJoinedGroupLimit_Account: "overLimitUserIDList" } } };}(e)), this._configMap.set(yn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.DESTROY_GROUP) }), body: { groupID: void 0 } };}(e)), this._configMap.set(In, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.MODIFY_GROUP_INFO) }), body: { groupID: void 0, name: void 0, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, groupCustomField: void 0, muteAllMembers: void 0 }, keyMap: { request: { maxMemberNum: "MaxMemberCount", groupCustomField: "AppDefinedData", muteAllMembers: "ShutUpAllMember", joinOption: "ApplyJoinOption", avatar: "FaceUrl" }, response: { AppDefinedData: "groupCustomField", ShutUpAllMember: "muteAllMembers", ApplyJoinOption: "joinOption" } } };}(e)), this._configMap.set(Tn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.APPLY_JOIN_GROUP) }), body: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0, webPushFlag: 1 }, keyMap: { response: { HugeGroupFlag: "avChatRoomFlag" } } };}(e)), this._configMap.set(Dn, function (e) {e.a2, e.tinyid;return { head: r({}, p(e, ["a2", "tinyid"]), { servcmd: "".concat(U.NAME.BIG_GROUP_NO_AUTH, ".").concat(U.CMD.APPLY_JOIN_GROUP) }), body: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0, webPushFlag: 1 }, keyMap: { response: { HugeGroupFlag: "avChatRoomFlag" } } };}(e)), this._configMap.set(Sn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.QUIT_GROUP) }), body: { groupID: void 0 } };}(e)), this._configMap.set(En, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.SEARCH_GROUP_BY_ID) }), body: { groupIDList: void 0, responseFilter: { groupBasePublicInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "CreateTime", "Owner_Account", "LastInfoTime", "LastMsgTime", "NextMsgSeq", "MemberNum", "MaxMemberNum", "ApplyJoinOption"] } }, keyMap: { response: { ApplyJoinOption: "joinOption" } } };}(e)), this._configMap.set(kn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.CHANGE_GROUP_OWNER) }), body: { groupID: void 0, newOwnerID: void 0 }, keyMap: { request: { newOwnerID: "NewOwner_Account" } } };}(e)), this._configMap.set(Cn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.HANDLE_APPLY_JOIN_GROUP) }), body: { groupID: void 0, applicant: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMap: { request: { applicant: "Applicant_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" } } };}(e)), this._configMap.set(Nn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.HANDLE_GROUP_INVITATION) }), body: { groupID: void 0, inviter: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMap: { request: { inviter: "Inviter_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" } } };}(e)), this._configMap.set(Rn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.GET_GROUP_APPLICATION) }), body: { startTime: void 0, limit: void 0, handleAccount: void 0 }, keyMap: { request: { handleAccount: "Handle_Account" } } };}(e)), this._configMap.set(Pn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.DELETE_GROUP_SYSTEM_MESSAGE) }), body: { messageListToDelete: void 0 }, keyMap: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } };}(e)), this._configMap.set(wn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.BIG_GROUP_LONG_POLLING, ".").concat(U.CMD.AVCHATROOM_LONG_POLL) }), body: { USP: 1, startSeq: 1, holdTime: 90, key: void 0 }, keyMap: { request: { USP: "USP" }, response: { ToGroupId: "groupID" } } };}(e)), this._configMap.set(Gn, function (e) {e.a2, e.tinyid;return { head: r({}, p(e, ["a2", "tinyid"]), { servcmd: "".concat(U.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH, ".").concat(U.CMD.AVCHATROOM_LONG_POLL) }), body: { USP: 1, startSeq: 1, holdTime: 90, key: void 0 }, keyMap: { request: { USP: "USP" }, response: { ToGroupId: "groupID" } } };}(e)), this._configMap.set(bn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.GET_ONLINE_MEMBER_NUM) }), body: { groupID: void 0 } };}(e)), this._configMap.set(Fn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.GET_GROUP_MEMBER_LIST) }), body: { groupID: void 0, limit: 0, offset: 0, memberRoleFilter: void 0, memberInfoFilter: ["Role", "NameCard", "ShutUpUntil", "JoinTime"], memberCustomFieldFilter: void 0 }, keyMap: { request: { memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", MemberList: "members", ShutUpUntil: "muteUntil" } } };}(e)), this._configMap.set(qn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.GET_GROUP_MEMBER_INFO) }), body: { groupID: void 0, userIDList: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 }, keyMap: { request: { userIDList: "Member_List_Account", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember" }, response: { MemberList: "members", ShutUpUntil: "muteUntil", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", AppMemberDefinedData: "memberCustomField" } } };}(e)), this._configMap.set(Vn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.ADD_GROUP_MEMBER) }), body: { groupID: void 0, silence: void 0, userIDList: void 0 }, keyMap: { request: { userID: "Member_Account", userIDList: "MemberList" }, response: { MemberList: "members" } } };}(e)), this._configMap.set(Kn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.DELETE_GROUP_MEMBER) }), body: { groupID: void 0, userIDList: void 0, reason: void 0 }, keyMap: { request: { userIDList: "MemberToDel_Account" } } };}(e)), this._configMap.set(xn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.GROUP, ".").concat(U.CMD.MODIFY_GROUP_MEMBER_INFO) }), body: { groupID: void 0, userID: void 0, messageRemindType: void 0, nameCard: void 0, role: void 0, memberCustomField: void 0, muteTime: void 0 }, keyMap: { request: { userID: "Member_Account", memberCustomField: "AppMemberDefinedData", muteTime: "ShutUpTime", messageRemindType: "MsgFlag" } } };}(e)), this._configMap.set(jn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_OPEN_STAT, ".").concat(U.CMD.TIM_WEB_REPORT_V2) }), body: { header: {}, event: [], quality: [] }, keyMap: { request: { SDKType: "sdk_type", SDKVersion: "sdk_version", deviceType: "device_type", platform: "platform", instanceID: "instance_id", traceID: "trace_id", SDKAppID: "sdk_app_id", userID: "user_id", tinyID: "tiny_id", extension: "extension", timestamp: "timestamp", networkType: "network_type", eventType: "event_type", code: "error_code", message: "error_message", moreMessage: "more_message", duplicate: "duplicate", costTime: "cost_time", level: "level", qualityType: "quality_type", reportIndex: "report_index", wholePeriod: "whole_period", totalCount: "total_count", rttCount: "success_count_business", successRateOfRequest: "percent_business", countLessThan1Second: "success_count_business", percentOfCountLessThan1Second: "percent_business", countLessThan3Second: "success_count_platform", percentOfCountLessThan3Second: "percent_platform", successCountOfBusiness: "success_count_business", successRateOfBusiness: "percent_business", successCountOfPlatform: "success_count_platform", successRateOfPlatform: "percent_platform", successCountOfMessageReceived: "success_count_business", successRateOfMessageReceived: "percent_business", avgRTT: "average_value", avgDelay: "average_value", avgValue: "average_value" } } };}(n)), this._configMap.set(Yn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.HEARTBEAT, ".").concat(U.CMD.ALIVE) }), body: {} };}(e)), this._configMap.set($n, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_OPEN_PUSH, ".").concat(U.CMD.MESSAGE_PUSH) }), body: {}, keyMap: { response: { C2cMsgArray: "C2CMessageArray", GroupMsgArray: "groupMessageArray", GroupTips: "groupTips", C2cNotifyMsgArray: "C2CNotifyMessageArray", ClientSeq: "clientSequence", MsgPriority: "priority", NoticeSeq: "noticeSequence", MsgContent: "content", MsgType: "type", MsgBody: "elements", ToGroupId: "to", Desc: "description", Ext: "extension", IsSyncMsg: "isSyncMessage", Flag: "needSync", NeedAck: "needAck", PendencyAdd_Account: "userID", ProfileImNick: "nick", PendencyType: "applicationType" } } };}(e)), this._configMap.set(zn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.OPEN_IM, ".").concat(U.CMD.MESSAGE_PUSH_ACK) }), body: { sessionData: void 0 }, keyMap: { request: { sessionData: "SessionData" } } };}(e)), this._configMap.set(Wn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_OPEN_STATUS, ".").concat(U.CMD.STATUS_FORCEOFFLINE) }), body: {}, keyMap: { response: { C2cNotifyMsgArray: "C2CNotifyMessageArray", NoticeSeq: "noticeSequence", KickoutMsgNotify: "kickoutMsgNotify", NewInstInfo: "newInstanceInfo" } } };}(e)), this._configMap.set(Xn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_LONG_MESSAGE, ".").concat(U.CMD.DOWNLOAD_MERGER_MESSAGE) }), body: { downloadKey: "" }, keyMap: { response: { Data: "data", Desc: "description", Ext: "extension", Download_Flag: "downloadFlag", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } } };}(e)), this._configMap.set(Jn, function (e) {return { head: r({}, e, { servcmd: "".concat(U.NAME.IM_LONG_MESSAGE, ".").concat(U.CMD.UPLOAD_MERGER_MESSAGE) }), body: { messageList: [] }, keyMap: { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", type: "MsgType", content: "MsgContent", data: "Data", description: "Desc", extension: "Ext", sizeType: "Type", uuid: "UUID", url: "", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", from: "From_Account", time: "MsgTimeStamp", messageRandom: "MsgRandom", messageSequence: "MsgSeq", elements: "MsgBody", clientSequence: "ClientSeq", payload: "MsgContent", messageList: "MsgList", messageNumber: "MsgNum", abstractList: "AbstractList", messageBody: "MsgBody" } } };}(e));} }, { key: "has", value: function value(e) {return this._configMap.has(e);} }, { key: "get", value: function value(e) {return this._configMap.get(e);} }, { key: "update", value: function value() {this._fillConfigMap();} }, { key: "getKeyMap", value: function value(e) {return this.has(e) ? this.get(e).keyMap || {} : (Ee.warn("".concat(this._className, ".getKeyMap unknown protocolName:").concat(e)), {});} }, { key: "getProtocolData", value: function value(e) {var t = e.protocolName,n = e.requestData,o = this.get(t),a = null;if (n) {var s = this._simpleDeepCopy(o),r = s.body,i = Object.create(null);for (var c in r) {if (Object.prototype.hasOwnProperty.call(r, c)) {if (i[c] = r[c], void 0 === n[c]) continue;i[c] = n[c];}}s.body = i, a = this._getUplinkData(s);} else a = this._getUplinkData(o);return a;} }, { key: "_getUplinkData", value: function value(e) {var t = this._requestDataCleaner(e),n = it(t.head),o = Di(t.body, this._getRequestKeyMap(n));return t.body = o, t;} }, { key: "_getRequestKeyMap", value: function value(e) {var t = this.getKeyMap(e);return r({}, yi.request, {}, t.request);} }, { key: "_requestDataCleaner", value: function value(t) {var n = Array.isArray(t) ? [] : Object.create(null);for (var o in t) {Object.prototype.hasOwnProperty.call(t, o) && Ue(o) && null !== t[o] && void 0 !== t[o] && ("object" !== e(t[o]) ? n[o] = t[o] : n[o] = this._requestDataCleaner.bind(this)(t[o]));}return n;} }, { key: "_simpleDeepCopy", value: function value(e) {for (var t, n = Object.keys(e), o = {}, a = 0, s = n.length; a < s; a++) {t = n[a], Le(e[t]) ? o[t] = Array.from(e[t]) : Ae(e[t]) ? o[t] = this._simpleDeepCopy(e[t]) : o[t] = e[t];}return o;} }]), n;}(),wi = [zn],Gi = function () {function e(n) {t(this, e), this._sessionModule = n, this._className = "DownlinkHandler", this._eventHandlerMap = new Map(), this._eventHandlerMap.set("C2CMessageArray", this._c2cMessageArrayHandler.bind(this)), this._eventHandlerMap.set("groupMessageArray", this._groupMessageArrayHandler.bind(this)), this._eventHandlerMap.set("groupTips", this._groupTipsHandler.bind(this)), this._eventHandlerMap.set("C2CNotifyMessageArray", this._C2CNotifyMessageArrayHandler.bind(this)), this._eventHandlerMap.set("profileModify", this._profileHandler.bind(this)), this._eventHandlerMap.set("friendListMod", this._relationChainHandler.bind(this)), this._keys = M(this._eventHandlerMap.keys());}return o(e, [{ key: "_c2cMessageArrayHandler", value: function value(e) {var t = this._sessionModule.getModule(At);if (t) {if (e.dataList.forEach(function (e) {if (1 === e.isSyncMessage) {var t = e.from;e.from = e.to, e.to = t;}}), 1 === e.needSync) this._sessionModule.getModule(Kt).startOnlineSync();t.onNewC2CMessage({ dataList: e.dataList, isInstantMessage: !0 });}} }, { key: "_groupMessageArrayHandler", value: function value(e) {var t = this._sessionModule.getModule(Ot);t && t.onNewGroupMessage({ event: e.event, dataList: e.dataList, isInstantMessage: !0 });} }, { key: "_groupTipsHandler", value: function value(e) {var t = this._sessionModule.getModule(Ot);if (t) {var n = e.event,o = e.dataList,a = e.isInstantMessage,s = void 0 === a || a,r = e.isSyncingEnded;switch (n) {case 4:case 6:t.onNewGroupTips({ event: n, dataList: o });break;case 5:o.forEach(function (e) {Le(e.elements.revokedInfos) ? t.onGroupMessageRevoked({ dataList: o }) : Le(e.elements.groupMessageReadNotice) ? t.onGroupMessageReadNotice({ dataList: o }) : t.onNewGroupSystemNotice({ dataList: o, isInstantMessage: s, isSyncingEnded: r });});break;case 12:this._sessionModule.getModule(Pt).onNewGroupAtTips({ dataList: o });break;default:Ee.log("".concat(this._className, "._groupTipsHandler unknown event:").concat(n, " dataList:"), o);}}} }, { key: "_C2CNotifyMessageArrayHandler", value: function value(e) {var t = this,n = e.dataList;if (Le(n)) {var o = this._sessionModule.getModule(At);n.forEach(function (e) {if (Oe(e)) if (e.hasOwnProperty("kickoutMsgNotify")) {var a = e.kickoutMsgNotify,s = a.kickType,r = a.newInstanceInfo,i = void 0 === r ? {} : r;1 === s ? t._sessionModule.onMultipleAccountKickedOut(i) : 2 === s && t._sessionModule.onMultipleDeviceKickedOut(i);} else e.hasOwnProperty("c2cMessageRevokedNotify") ? o && o.onC2CMessageRevoked({ dataList: n }) : e.hasOwnProperty("c2cMessageReadReceipt") ? o && o.onC2CMessageReadReceipt({ dataList: n }) : e.hasOwnProperty("c2cMessageReadNotice") && o && o.onC2CMessageReadNotice({ dataList: n });});}} }, { key: "_profileHandler", value: function value(e) {this._sessionModule.getModule(Nt).onProfileModified({ dataList: e.dataList });var t = this._sessionModule.getModule(Lt);t && t.onFriendProfileModified({ dataList: e.dataList });} }, { key: "_relationChainHandler", value: function value(e) {this._sessionModule.getModule(Nt).onRelationChainModified({ dataList: e.dataList });var t = this._sessionModule.getModule(Lt);t && t.onRelationChainModified({ dataList: e.dataList });} }, { key: "_cloudControlConfigHandler", value: function value(e) {this._sessionModule.getModule(jt).onPushedCloudControlConfig(e);} }, { key: "onMessage", value: function value(e) {var t = this,n = e.head,o = e.body;if (this._isPushedCloudControlConfig(n)) this._cloudControlConfigHandler(o);else {var a = o.eventArray,s = o.isInstantMessage,r = o.isSyncingEnded,i = o.needSync;if (Le(a)) for (var c = null, u = null, l = 0, d = 0, g = a.length; d < g; d++) {l = (c = a[d]).event;var p = Object.keys(c).find(function (e) {return -1 !== t._keys.indexOf(e);});p ? (u = c[p], this._eventHandlerMap.get(p)({ event: l, dataList: u, isInstantMessage: s, isSyncingEnded: r, needSync: i })) : Ee.log("".concat(this._className, ".onMessage unknown eventItem:").concat(c));}}} }, { key: "_isPushedCloudControlConfig", value: function value(e) {return e.servcmd && e.servcmd.includes(Zn);} }]), e;}(),bi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "SessionModule", o._platform = o.getPlatform(), o._protocolHandler = new Pi(h(o)), o._messageDispatcher = new Gi(h(o)), o;}return o(a, [{ key: "updateProtocolConfig", value: function value() {this._protocolHandler.update();} }, { key: "request", value: function value(e) {Ee.debug("".concat(this._className, ".request options:"), e);var t = e.protocolName,n = e.tjgID;if (!this._protocolHandler.has(t)) return Ee.warn("".concat(this._className, ".request unknown protocol:").concat(t)), yr({ code: eo.CANNOT_FIND_PROTOCOL, message: ia });var o = this.getProtocolData(e);gt(n) || (o.head.tjgID = n);var a = this.getModule(Bt);return wi.includes(t) ? a.simplySend(o) : a.send(o);} }, { key: "getKeyMap", value: function value(e) {return this._protocolHandler.getKeyMap(e);} }, { key: "genCommonHead", value: function value() {var e = this.getModule(wt);return { ver: "v4", platform: this._platform, websdkappid: P, websdkversion: R, a2: e.getA2Key() || void 0, tinyid: e.getTinyID() || void 0, status_instid: e.getStatusInstanceID(), sdkappid: e.getSDKAppID(), contenttype: e.getContentType(), reqtime: 0, identifier: e.getA2Key() ? void 0 : e.getUserID(), usersig: e.getA2Key() ? void 0 : e.getUserSig(), sdkability: 2, tjgID: "" };} }, { key: "genCosSpecifiedHead", value: function value() {var e = this.getModule(wt);return { ver: "v4", platform: this._platform, websdkappid: P, websdkversion: R, sdkappid: e.getSDKAppID(), contenttype: e.getContentType(), reqtime: 0, identifier: e.getUserID(), usersig: e.getUserSig(), status_instid: e.getStatusInstanceID(), sdkability: 2 };} }, { key: "genSSOReportHead", value: function value() {var e = this.getModule(wt);return { ver: "v4", platform: this._platform, websdkappid: P, websdkversion: R, sdkappid: e.getSDKAppID(), contenttype: "", reqtime: 0, identifier: "", usersig: "", status_instid: e.getStatusInstanceID(), sdkability: 2 };} }, { key: "getProtocolData", value: function value(e) {return this._protocolHandler.getProtocolData(e);} }, { key: "onErrorCodeNotZero", value: function value(e) {var t = e.errorCode;if (t === eo.HELLO_ANSWER_KICKED_OUT) {var n = e.kickType,o = e.newInstanceInfo,a = void 0 === o ? {} : o;1 === n ? this.onMultipleAccountKickedOut(a) : 2 === n && this.onMultipleDeviceKickedOut(a);}t !== eo.MESSAGE_A2KEY_EXPIRED && t !== eo.ACCOUNT_A2KEY_EXPIRED || (this._onUserSigExpired(), this.getModule(Bt).reConnect());} }, { key: "onMessage", value: function value(e) {var t = e.body,n = t.needAck,o = void 0 === n ? 0 : n,a = t.sessionData;1 === o && this._sendACK(a), this._messageDispatcher.onMessage(e);} }, { key: "onReconnected", value: function value() {var e = this;this.isLoggedIn() && this.request({ protocolName: Wt }).then(function (t) {var n = t.data.instanceID;e.getModule(wt).setStatusInstanceID(n), Ee.log("".concat(e._className, ".onReconnected, login ok. start to sync unread messages.")), e.getModule(Kt).startSyncOnReconnected(), e.getModule(Yt).startPull();});} }, { key: "onMultipleAccountKickedOut", value: function value(e) {this.getModule(kt).onMultipleAccountKickedOut(e);} }, { key: "onMultipleDeviceKickedOut", value: function value(e) {this.getModule(kt).onMultipleDeviceKickedOut(e);} }, { key: "_onUserSigExpired", value: function value() {this.getModule(kt).onUserSigExpired();} }, { key: "_sendACK", value: function value(e) {this.request({ protocolName: zn, requestData: { sessionData: e } });} }]), a;}(zt),Ui = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "MessageLossDetectionModule", o._maybeLostSequencesMap = new Map(), o;}return o(a, [{ key: "onMessageMaybeLost", value: function value(e, t, n) {this._maybeLostSequencesMap.has(e) || this._maybeLostSequencesMap.set(e, []);for (var o = this._maybeLostSequencesMap.get(e), a = 0; a < n; a++) {o.push(t + a);}Ee.debug("".concat(this._className, ".onMessageMaybeLost. maybeLostSequences:").concat(o));} }, { key: "detectMessageLoss", value: function value(e, t) {var n = this._maybeLostSequencesMap.get(e);if (!gt(n) && !gt(t)) {var o = t.filter(function (e) {return -1 !== n.indexOf(e);});if (Ee.debug("".concat(this._className, ".detectMessageLoss. matchedSequences:").concat(o)), n.length === o.length) Ee.info("".concat(this._className, ".detectMessageLoss no message loss. conversationID:").concat(e));else {var a,s = n.filter(function (e) {return -1 === o.indexOf(e);}),r = s.length;r <= 5 ? a = e + "-" + s.join("-") : (s.sort(function (e, t) {return e - t;}), a = e + " start:" + s[0] + " end:" + s[r - 1] + " count:" + r), new Sa(Os).setMessage(a).setNetworkType(this.getNetworkType()).setLevel("warning").end(), Ee.warn("".concat(this._className, ".detectMessageLoss message loss detected. conversationID:").concat(e, " lostSequences:").concat(s));}n.length = 0;}} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._maybeLostSequencesMap.clear();} }]), a;}(zt),Fi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "CloudControlModule", o._cloudConfig = new Map(), o._expiredTime = 0, o._version = 0, o._isFetching = !1, o;}return o(a, [{ key: "getCloudConfig", value: function value(e) {return Re(e) ? this._cloudConfig : this._cloudConfig.has(e) ? this._cloudConfig.get(e) : void 0;} }, { key: "_canFetchConfig", value: function value() {return this.isLoggedIn() && !this._isFetching && Date.now() >= this._expiredTime;} }, { key: "fetchConfig", value: function value() {var e = this,t = this._canFetchConfig();if (Ee.log("".concat(this._className, ".fetchConfig canFetchConfig:").concat(t)), t) {var n = new Sa(Fs),o = this.getModule(wt).getSDKAppID();this._isFetching = !0, this.request({ protocolName: Qn, requestData: { SDKAppID: o, version: this._version } }).then(function (t) {e._isFetching = !1, n.setMessage("version:".concat(e._version, " newVersion:").concat(t.data.version, " config:").concat(t.data.cloudControlConfig)).setNetworkType(e.getNetworkType()).end(), Ee.log("".concat(e._className, ".fetchConfig ok")), e._parseCloudControlConfig(t.data);}).catch(function (t) {e._isFetching = !1, e.probeNetwork().then(function (e) {var o = m(e, 2),a = o[0],s = o[1];n.setError(t, a, s).end();}), Ee.log("".concat(e._className, ".fetchConfig failed. error:"), t), e._setExpiredTimeOnResponseError(12e4);});}} }, { key: "onPushedCloudControlConfig", value: function value(e) {Ee.log("".concat(this._className, ".onPushedCloudControlConfig")), new Sa(qs).setNetworkType(this.getNetworkType()).setMessage("newVersion:".concat(e.version, " config:").concat(e.cloudControlConfig)).end(), this._parseCloudControlConfig(e);} }, { key: "onCheckTimer", value: function value(e) {this._canFetchConfig() && this.fetchConfig();} }, { key: "_parseCloudControlConfig", value: function value(e) {var t = this,n = "".concat(this._className, "._parseCloudControlConfig"),o = e.errorCode,a = e.errorMessage,s = e.cloudControlConfig,r = e.version,i = e.expiredTime;if (0 === o) {if (this._version !== r) {var c = null;try {c = JSON.parse(s);} catch (u) {Ee.error("".concat(n, " JSON parse error:").concat(s));}c && (this._cloudConfig.clear(), Object.keys(c).forEach(function (e) {t._cloudConfig.set(e, c[e]);}), this._version = r, this.emitInnerEvent(Dr.CLOUD_CONFIG_UPDATED));}this._expiredTime = Date.now() + 1e3 * i;} else Re(o) ? (Ee.log("".concat(n, " failed. Invalid message format:"), e), this._setExpiredTimeOnResponseError(36e5)) : (Ee.error("".concat(n, " errorCode:").concat(o, " errorMessage:").concat(a)), this._setExpiredTimeOnResponseError(12e4));} }, { key: "_setExpiredTimeOnResponseError", value: function value(e) {this._expiredTime = Date.now() + e;} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._cloudConfig.clear(), this._expiredTime = 0, this._version = 0, this._isFetching = !1;} }]), a;}(zt),qi = function (e) {i(a, e);var n = f(a);function a(e) {var o;return t(this, a), (o = n.call(this, e))._className = "PullGroupMessageModule", o._remoteLastMessageSequenceMap = new Map(), o.PULL_LIMIT_COUNT = 15, o;}return o(a, [{ key: "startPull", value: function value() {var e = this,t = this._getNeedPullConversationList();this._getRemoteLastMessageSequenceList().then(function () {var n = e.getModule(Pt);t.forEach(function (t) {var o = t.conversationID,a = o.replace(k.CONV_GROUP, ""),s = n.getGroupLocalLastMessageSequence(o),r = e._remoteLastMessageSequenceMap.get(a) || 0,i = r - s;Ee.log("".concat(e._className, ".startPull groupID:").concat(a, " localLastMessageSequence:").concat(s, " ") + "remoteLastMessageSequence:".concat(r, " diff:").concat(i)), s > 0 && i > 1 && i < 300 && e._pullMissingMessage({ groupID: a, localLastMessageSequence: s, remoteLastMessageSequence: r, diff: i });});});} }, { key: "_getNeedPullConversationList", value: function value() {return this.getModule(Pt).getLocalConversationList().filter(function (e) {return e.type === k.CONV_GROUP && e.groupProfile.type !== k.GRP_AVCHATROOM;});} }, { key: "_getRemoteLastMessageSequenceList", value: function value() {var e = this;return this.getModule(Ot).getGroupList().then(function (t) {for (var n = t.data.groupList, o = void 0 === n ? [] : n, a = 0; a < o.length; a++) {var s = o[a],r = s.groupID,i = s.nextMessageSeq;if (s.type !== k.GRP_AVCHATROOM) {var c = i - 1;e._remoteLastMessageSequenceMap.set(r, c);}}});} }, { key: "_pullMissingMessage", value: function value(e) {var t = this,n = e.localLastMessageSequence,o = e.remoteLastMessageSequence,a = e.diff;e.count = a > this.PULL_LIMIT_COUNT ? this.PULL_LIMIT_COUNT : a, e.sequence = a > this.PULL_LIMIT_COUNT ? n + this.PULL_LIMIT_COUNT : n + a, this._getGroupMissingMessage(e).then(function (s) {s.length > 0 && (s[0].sequence + 1 <= o && (e.localLastMessageSequence = n + t.PULL_LIMIT_COUNT, e.diff = a - t.PULL_LIMIT_COUNT, t._pullMissingMessage(e)), t.getModule(Ot).onNewGroupMessage({ dataList: s, isInstantMessage: !1 }));});} }, { key: "_getGroupMissingMessage", value: function value(e) {var t = this,n = new Sa(fs);return this.request({ protocolName: Ln, requestData: { groupID: e.groupID, count: e.count, sequence: e.sequence } }).then(function (o) {var a = o.data.messageList,s = void 0 === a ? [] : a;return n.setNetworkType(t.getNetworkType()).setMessage("groupID:".concat(e.groupID, " count:").concat(e.count, " sequence:").concat(e.sequence, " messageList length:").concat(s.length)).end(), s;}).catch(function (e) {t.probeNetwork().then(function (t) {var o = m(t, 2),a = o[0],s = o[1];n.setError(e, a, s).end();});});} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._remoteLastMessageSequenceMap.clear();} }]), a;}(zt),Vi = function () {function e() {t(this, e), this._className = "AvgE2EDelay", this._e2eDelayArray = [];}return o(e, [{ key: "addMessageDelay", value: function value(e) {var t = ct(e.currentTime / 1e3 - e.time, 2);this._e2eDelayArray.push(t);} }, { key: "_calcAvg", value: function value(e, t) {if (0 === t) return 0;var n = 0;return e.forEach(function (e) {n += e;}), ct(n / t, 1);} }, { key: "_calcTotalCount", value: function value() {return this._e2eDelayArray.length;} }, { key: "_calcCountWithLimit", value: function value(e) {var t = e.e2eDelayArray,n = e.min,o = e.max;return t.filter(function (e) {return n < e && e <= o;}).length;} }, { key: "_calcPercent", value: function value(e, t) {var n = ct(e / t * 100, 2);return n > 100 && (n = 100), n;} }, { key: "_checkE2EDelayException", value: function value(e, t) {var n = e.filter(function (e) {return e > t;});if (n.length > 0) {var o = n.length,a = Math.min.apply(Math, M(n)),s = Math.max.apply(Math, M(n)),r = this._calcAvg(n, o),i = ct(o / e.length * 100, 2);new Sa(Ja).setMessage("message e2e delay exception. count:".concat(o, " min:").concat(a, " max:").concat(s, " avg:").concat(r, " percent:").concat(i)).setLevel("warning").end();}} }, { key: "getStatResult", value: function value() {var e = this._calcTotalCount();if (0 === e) return null;var t = M(this._e2eDelayArray),n = this._calcCountWithLimit({ e2eDelayArray: t, min: 0, max: 1 }),o = this._calcCountWithLimit({ e2eDelayArray: t, min: 1, max: 3 }),a = this._calcPercent(n, e),s = this._calcPercent(o, e),r = this._calcAvg(t, e);return this._checkE2EDelayException(t, 3), this.reset(), { totalCount: e, countLessThan1Second: n, percentOfCountLessThan1Second: a, countLessThan3Second: o, percentOfCountLessThan3Second: s, avgDelay: r };} }, { key: "reset", value: function value() {this._e2eDelayArray.length = 0;} }]), e;}(),Ki = function () {function e() {t(this, e), this._className = "AvgRTT", this._requestCount = 0, this._rttArray = [];}return o(e, [{ key: "addRequestCount", value: function value() {this._requestCount += 1;} }, { key: "addRTT", value: function value(e) {this._rttArray.push(e);} }, { key: "_calcTotalCount", value: function value() {return this._requestCount;} }, { key: "_calcRTTCount", value: function value(e) {return e.length;} }, { key: "_calcSuccessRateOfRequest", value: function value(e, t) {if (0 === t) return 0;var n = ct(e / t * 100, 2);return n > 100 && (n = 100), n;} }, { key: "_calcAvg", value: function value(e, t) {if (0 === t) return 0;var n = 0;return e.forEach(function (e) {n += e;}), parseInt(n / t);} }, { key: "_calcMax", value: function value() {return Math.max.apply(Math, M(this._rttArray));} }, { key: "_calcMin", value: function value() {return Math.min.apply(Math, M(this._rttArray));} }, { key: "getStatResult", value: function value() {var e = this._calcTotalCount(),t = M(this._rttArray);if (0 === e) return null;var n = this._calcRTTCount(t),o = this._calcSuccessRateOfRequest(n, e),a = this._calcAvg(t, n);return Ee.log("".concat(this._className, ".getStatResult max:").concat(this._calcMax(), " min:").concat(this._calcMin(), " avg:").concat(a)), this.reset(), { totalCount: e, rttCount: n, successRateOfRequest: o, avgRTT: a };} }, { key: "reset", value: function value() {this._requestCount = 0, this._rttArray.length = 0;} }]), e;}(),xi = function () {function e(n) {var o = this;t(this, e), this._map = new Map(), n.forEach(function (e) {o._map.set(e, { totalCount: 0, successCount: 0, failedCountOfUserSide: 0, costArray: [], fileSizeArray: [] });});}return o(e, [{ key: "addTotalCount", value: function value(e) {return !(Re(e) || !this._map.has(e)) && (this._map.get(e).totalCount += 1, !0);} }, { key: "addSuccessCount", value: function value(e) {return !(Re(e) || !this._map.has(e)) && (this._map.get(e).successCount += 1, !0);} }, { key: "addFailedCountOfUserSide", value: function value(e) {return !(Re(e) || !this._map.has(e)) && (this._map.get(e).failedCountOfUserSide += 1, !0);} }, { key: "addCost", value: function value(e, t) {return !(Re(e) || !this._map.has(e)) && (this._map.get(e).costArray.push(t), !0);} }, { key: "addFileSize", value: function value(e, t) {return !(Re(e) || !this._map.has(e)) && (this._map.get(e).fileSizeArray.push(t), !0);} }, { key: "_calcSuccessRateOfBusiness", value: function value(e) {if (Re(e) || !this._map.has(e)) return -1;var t = this._map.get(e),n = ct(t.successCount / t.totalCount * 100, 2);return n > 100 && (n = 100), n;} }, { key: "_calcSuccessRateOfPlatform", value: function value(e) {if (Re(e) || !this._map.has(e)) return -1;var t = this._map.get(e),n = this._calcSuccessCountOfPlatform(e) / t.totalCount * 100;return (n = ct(n, 2)) > 100 && (n = 100), n;} }, { key: "_calcTotalCount", value: function value(e) {return Re(e) || !this._map.has(e) ? -1 : this._map.get(e).totalCount;} }, { key: "_calcSuccessCountOfBusiness", value: function value(e) {return Re(e) || !this._map.has(e) ? -1 : this._map.get(e).successCount;} }, { key: "_calcSuccessCountOfPlatform", value: function value(e) {if (Re(e) || !this._map.has(e)) return -1;var t = this._map.get(e);return t.successCount + t.failedCountOfUserSide;} }, { key: "_calcAvg", value: function value(e) {return Re(e) || !this._map.has(e) ? -1 : e === ma ? this._calcAvgSpeed(e) : this._calcAvgCost(e);} }, { key: "_calcAvgCost", value: function value(e) {var t = this._map.get(e).costArray.length;if (0 === t) return 0;var n = 0;return this._map.get(e).costArray.forEach(function (e) {n += e;}), parseInt(n / t);} }, { key: "_calcAvgSpeed", value: function value(e) {var t = 0,n = 0;return this._map.get(e).costArray.forEach(function (e) {t += e;}), this._map.get(e).fileSizeArray.forEach(function (e) {n += e;}), parseInt(1e3 * n / t);} }, { key: "getStatResult", value: function value(e) {var t = this._calcTotalCount(e);if (0 === t) return null;var n = this._calcSuccessCountOfBusiness(e),o = this._calcSuccessRateOfBusiness(e),a = this._calcSuccessCountOfPlatform(e),s = this._calcSuccessRateOfPlatform(e),r = this._calcAvg(e);return this.reset(e), { totalCount: t, successCountOfBusiness: n, successRateOfBusiness: o, successCountOfPlatform: a, successRateOfPlatform: s, avgValue: r };} }, { key: "reset", value: function value(e) {Re(e) ? this._map.clear() : this._map.set(e, { totalCount: 0, successCount: 0, failedCountOfUserSide: 0, costArray: [], fileSizeArray: [] });} }]), e;}(),Bi = function () {function e(n) {var o = this;t(this, e), this._lastMap = new Map(), this._currentMap = new Map(), n.forEach(function (e) {o._lastMap.set(e, new Map()), o._currentMap.set(e, new Map());});}return o(e, [{ key: "addMessageSequence", value: function value(e) {var t = e.key,n = e.message;if (Re(t) || !this._lastMap.has(t) || !this._currentMap.has(t)) return !1;var o = n.conversationID,a = n.sequence,s = o.replace(k.CONV_GROUP, "");if (0 === this._lastMap.get(t).size) this._addCurrentMap(e);else if (this._lastMap.get(t).has(s)) {var r = this._lastMap.get(t).get(s),i = r.length - 1;a > r[0] && a < r[i] ? (r.push(a), r.sort(), this._lastMap.get(t).set(s, r)) : this._addCurrentMap(e);} else this._addCurrentMap(e);return !0;} }, { key: "_addCurrentMap", value: function value(e) {var t = e.key,n = e.message,o = n.conversationID,a = n.sequence,s = o.replace(k.CONV_GROUP, "");this._currentMap.get(t).has(s) || this._currentMap.get(t).set(s, []), this._currentMap.get(t).get(s).push(a);} }, { key: "_copyData", value: function value(e) {if (!Re(e)) {this._lastMap.set(e, new Map());var t,n = this._lastMap.get(e),o = S(this._currentMap.get(e));try {for (o.s(); !(t = o.n()).done;) {var a = m(t.value, 2),s = a[0],r = a[1];n.set(s, r);}} catch (i) {o.e(i);} finally {o.f();}n = null, this._currentMap.set(e, new Map());}} }, { key: "getStatResult", value: function value(e) {if (Re(this._currentMap.get(e)) || Re(this._lastMap.get(e))) return null;if (0 === this._lastMap.get(e).size) return this._copyData(e), null;var t = 0,n = 0;if (this._lastMap.get(e).forEach(function (e, o) {var a = M(e.values()),s = a.length,r = a[s - 1] - a[0] + 1;t += r, n += s;}), 0 === t) return null;var o = ct(n / t * 100, 2);return o > 100 && (o = 100), this._copyData(e), { totalCount: t, successCountOfMessageReceived: n, successRateOfMessageReceived: o };} }, { key: "reset", value: function value() {this._currentMap.clear(), this._lastMap.clear();} }]), e;}(),Hi = function (e) {i(a, e);var n = f(a);function a(e) {var o;t(this, a), (o = n.call(this, e))._className = "QualityStatModule", o.TAG = "im-ssolog-quality-stat", o.reportIndex = 0, o.wholePeriod = !1, o._qualityItems = [da, ga, pa, ha, _a, fa, ma, Ma, va, ya], o.REPORT_INTERVAL = 120, o.REPORT_SDKAPPID_BLACKLIST = [], o.REPORT_TINYID_WHITELIST = [], o._statInfoArr = [], o._avgRTT = new Ki(), o._avgE2EDelay = new Vi();var s = [pa, ha, _a, fa, ma];o._rateMessageSend = new xi(s);var r = [Ma, va, ya];o._rateMessageReceived = new Bi(r);var i = o.getInnerEmitterInstance();return i.on(Dr.CONTEXT_A2KEY_AND_TINYID_UPDATED, o._onLoginSuccess, h(o)), i.on(Dr.CLOUD_CONFIG_UPDATED, o._onCloudConfigUpdated, h(o)), o;}return o(a, [{ key: "_onLoginSuccess", value: function value() {var e = this,t = this.getModule(Gt),n = t.getItem(this.TAG, !1);!gt(n) && we(n.forEach) && (Ee.log("".concat(this._className, "._onLoginSuccess.get quality stat log in storage, nums=").concat(n.length)), n.forEach(function (t) {e._statInfoArr.push(t);}), t.removeItem(this.TAG, !1));} }, { key: "_onCloudConfigUpdated", value: function value() {var e = this.getCloudConfig("q_rpt_interval"),t = this.getCloudConfig("q_rpt_sdkappid_bl"),n = this.getCloudConfig("q_rpt_tinyid_wl");Re(e) || (this.REPORT_INTERVAL = Number(e)), Re(t) || (this.REPORT_SDKAPPID_BLACKLIST = t.split(",").map(function (e) {return Number(e);})), Re(n) || (this.REPORT_TINYID_WHITELIST = n.split(","));} }, { key: "onCheckTimer", value: function value(e) {this.isLoggedIn() && e % this.REPORT_INTERVAL == 0 && (this.wholePeriod = !0, this._report());} }, { key: "addRequestCount", value: function value() {this._avgRTT.addRequestCount();} }, { key: "addRTT", value: function value(e) {this._avgRTT.addRTT(e);} }, { key: "addMessageDelay", value: function value(e) {this._avgE2EDelay.addMessageDelay(e);} }, { key: "addTotalCount", value: function value(e) {this._rateMessageSend.addTotalCount(e) || Ee.warn("".concat(this._className, ".addTotalCount invalid key:"), e);} }, { key: "addSuccessCount", value: function value(e) {this._rateMessageSend.addSuccessCount(e) || Ee.warn("".concat(this._className, ".addSuccessCount invalid key:"), e);} }, { key: "addFailedCountOfUserSide", value: function value(e) {this._rateMessageSend.addFailedCountOfUserSide(e) || Ee.warn("".concat(this._className, ".addFailedCountOfUserSide invalid key:"), e);} }, { key: "addCost", value: function value(e, t) {this._rateMessageSend.addCost(e, t) || Ee.warn("".concat(this._className, ".addCost invalid key or cost:"), e, t);} }, { key: "addFileSize", value: function value(e, t) {this._rateMessageSend.addFileSize(e, t) || Ee.warn("".concat(this._className, ".addFileSize invalid key or size:"), e, t);} }, { key: "addMessageSequence", value: function value(e) {this._rateMessageReceived.addMessageSequence(e) || Ee.warn("".concat(this._className, ".addMessageSequence invalid key:"), e.key);} }, { key: "_getQualityItem", value: function value(e) {var t = {},n = Da[this.getNetworkType()];Re(n) && (n = 8);var o = { qualityType: Ia[e], timestamp: ye(), networkType: n, extension: "" };switch (e) {case da:t = this._avgRTT.getStatResult();break;case ga:t = this._avgE2EDelay.getStatResult();break;case pa:case ha:case _a:case fa:case ma:t = this._rateMessageSend.getStatResult(e);break;case Ma:case va:case ya:t = this._rateMessageReceived.getStatResult(e);}return null === t ? null : r({}, o, {}, t);} }, { key: "_report", value: function value(e) {var t = this,n = [],o = null;Re(e) ? this._qualityItems.forEach(function (e) {null !== (o = t._getQualityItem(e)) && (o.reportIndex = t.reportIndex, o.wholePeriod = t.wholePeriod, n.push(o));}) : null !== (o = this._getQualityItem(e)) && (o.reportIndex = this.reportIndex, o.wholePeriod = this.wholePeriod, n.push(o)), Ee.debug("".concat(this._className, "._report"), n), this._statInfoArr.length > 0 && (n = n.concat(this._statInfoArr), this._statInfoArr = []);var a = this.getModule(wt),s = a.getSDKAppID(),r = a.getTinyID();ut(this.REPORT_SDKAPPID_BLACKLIST, s) && !lt(this.REPORT_TINYID_WHITELIST, r) && (n = []), n.length > 0 && this._doReport(n);} }, { key: "_doReport", value: function value(e) {var t = this,n = { header: ri(this), quality: e };this.request({ protocolName: jn, requestData: r({}, n) }).then(function () {t.reportIndex++, t.wholePeriod = !1;}).catch(function (n) {Ee.warn("".concat(t._className, "._doReport, online:").concat(t.getNetworkType(), " error:"), n), t._statInfoArr = t._statInfoArr.concat(e), t._flushAtOnce();});} }, { key: "_flushAtOnce", value: function value() {var e = this.getModule(Gt),t = e.getItem(this.TAG, !1),n = this._statInfoArr;if (gt(t)) Ee.log("".concat(this._className, "._flushAtOnce count:").concat(n.length)), e.setItem(this.TAG, n, !0, !1);else {var o = n.concat(t);o.length > 10 && (o = o.slice(0, 10)), Ee.log("".concat(this.className, "._flushAtOnce count:").concat(o.length)), e.setItem(this.TAG, o, !0, !1);}this._statInfoArr = [];} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), this._report(), this.reportIndex = 0, this.wholePeriod = !1, this.REPORT_SDKAPPID_BLACKLIST = [], this.REPORT_TINYID_WHITELIST = [], this._avgRTT.reset(), this._avgE2EDelay.reset(), this._rateMessageSend.reset(), this._rateMessageReceived.reset();} }]), a;}(zt),ji = function () {function e(n) {t(this, e);var o = new Sa(Ea);this._className = "ModuleManager", this._isReady = !1, this._startLoginTs = 0, this._moduleMap = new Map(), this._innerEmitter = null, this._outerEmitter = null, this._checkCount = 0, this._checkTimer = -1, this._moduleMap.set(wt, new ti(this, n)), this._moduleMap.set(jt, new Fi(this)), this._moduleMap.set($t, new Hi(this)), this._moduleMap.set(Bt, new Ri(this)), this._moduleMap.set(xt, new bi(this)), this._moduleMap.set(kt, new ni(this)), this._moduleMap.set(Ct, new mi(this)), this._moduleMap.set(Nt, new ei(this)), this._moduleMap.set(At, new Ir(this)), this._moduleMap.set(Pt, new qr(this)), this._moduleMap.set(Ot, new zr(this)), this._moduleMap.set(Rt, new Jr(this)), this._moduleMap.set(Gt, new ai(this)), this._moduleMap.set(bt, new ii(this)), this._moduleMap.set(Ut, new li(this)), this._moduleMap.set(Ft, new gi(this)), this._moduleMap.set(qt, new pi(this)), this._moduleMap.set(Vt, new Mi(this)), this._moduleMap.set(Kt, new vi(this)), this._moduleMap.set(Ht, new Ui(this)), this._moduleMap.set(Yt, new qi(this));var a = n.instanceID,s = n.oversea,r = n.SDKAppID,i = "instanceID:".concat(a, " oversea:").concat(s, " host:").concat(at(), " ") + "inBrowser:".concat(W, " inMiniApp:").concat(z, " SDKAppID:").concat(r, " UserAgent:").concat(Q);Sa.bindEventStatModule(this._moduleMap.get(bt)), o.setMessage("".concat(i)).end(), Ee.info("SDK ".concat(i)), this._readyList = void 0, this._ssoLogForReady = null, this._initReadyList();}return o(e, [{ key: "_startTimer", value: function value() {this._checkTimer < 0 && (this._checkTimer = setInterval(this._onCheckTimer.bind(this), 1e3));} }, { key: "stopTimer", value: function value() {this._checkTimer > 0 && (clearInterval(this._checkTimer), this._checkTimer = -1, this._checkCount = 0);} }, { key: "_onCheckTimer", value: function value() {this._checkCount += 1;var e,t = S(this._moduleMap);try {for (t.s(); !(e = t.n()).done;) {var n = m(e.value, 2)[1];n.onCheckTimer && n.onCheckTimer(this._checkCount);}} catch (o) {t.e(o);} finally {t.f();}} }, { key: "_initReadyList", value: function value() {var e = this;this._readyList = [this._moduleMap.get(kt), this._moduleMap.get(Pt)], this._readyList.forEach(function (t) {t.ready(function () {return e._onModuleReady();});});} }, { key: "_onModuleReady", value: function value() {var e = !0;if (this._readyList.forEach(function (t) {t.isReady() || (e = !1);}), e && !this._isReady) {this._isReady = !0, this._outerEmitter.emit(E.SDK_READY);var t = Date.now() - this._startLoginTs;Ee.warn("SDK is ready. cost ".concat(t, " ms")), this._startLoginTs = Date.now();var n = this._moduleMap.get(Ut).getNetworkType(),o = this._ssoLogForReady.getStartTs() + ve;this._ssoLogForReady.setNetworkType(n).setMessage(t).start(o).end();}} }, { key: "login", value: function value() {0 === this._startLoginTs && (Ie(), this._startLoginTs = Date.now(), this._startTimer(), this._moduleMap.get(Ut).start(), this._ssoLogForReady = new Sa(ka));} }, { key: "onLoginFailed", value: function value() {this._startLoginTs = 0;} }, { key: "getOuterEmitterInstance", value: function value() {return null === this._outerEmitter && (this._outerEmitter = new di(), Mr(this._outerEmitter), this._outerEmitter._emit = this._outerEmitter.emit, this._outerEmitter.emit = function (e, t) {var n = arguments[0],o = [n, { name: arguments[0], data: arguments[1] }];this._outerEmitter._emit.apply(this._outerEmitter, o);}.bind(this)), this._outerEmitter;} }, { key: "getInnerEmitterInstance", value: function value() {return null === this._innerEmitter && (this._innerEmitter = new di(), this._innerEmitter._emit = this._innerEmitter.emit, this._innerEmitter.emit = function (e, t) {var n;Oe(arguments[1]) && arguments[1].data ? (Ee.warn("inner eventData has data property, please check!"), n = [e, { name: arguments[0], data: arguments[1].data }]) : n = [e, { name: arguments[0], data: arguments[1] }], this._innerEmitter._emit.apply(this._innerEmitter, n);}.bind(this)), this._innerEmitter;} }, { key: "hasModule", value: function value(e) {return this._moduleMap.has(e);} }, { key: "getModule", value: function value(e) {return this._moduleMap.get(e);} }, { key: "isReady", value: function value() {return this._isReady;} }, { key: "onError", value: function value(e) {Ee.warn("Oops! code:".concat(e.code, " message:").concat(e.message)), new Sa(Vs).setMessage("code:".concat(e.code, " message:").concat(e.message)).setNetworkType(this.getModule(Ut).getNetworkType()).setLevel("error").end(), this.getOuterEmitterInstance().emit(E.ERROR, e);} }, { key: "reset", value: function value() {Ee.log("".concat(this._className, ".reset")), Ie();var e,t = S(this._moduleMap);try {for (t.s(); !(e = t.n()).done;) {var n = m(e.value, 2)[1];n.reset && n.reset();}} catch (o) {t.e(o);} finally {t.f();}this._startLoginTs = 0, this._initReadyList(), this._isReady = !1, this.stopTimer(), this._outerEmitter.emit(E.SDK_NOT_READY);} }]), e;}(),Yi = function () {function e() {t(this, e), this._funcMap = new Map();}return o(e, [{ key: "defense", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;if ("string" != typeof e) return null;if (0 === e.length) return null;if ("function" != typeof t) return null;if (this._funcMap.has(e) && this._funcMap.get(e).has(t)) return this._funcMap.get(e).get(t);this._funcMap.has(e) || this._funcMap.set(e, new Map());var o = null;return this._funcMap.get(e).has(t) ? o = this._funcMap.get(e).get(t) : (o = this._pack(e, t, n), this._funcMap.get(e).set(t, o)), o;} }, { key: "defenseOnce", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;return "function" != typeof t ? null : this._pack(e, t, n);} }, { key: "find", value: function value(e, t) {return "string" != typeof e || 0 === e.length || "function" != typeof t ? null : this._funcMap.has(e) ? this._funcMap.get(e).has(t) ? this._funcMap.get(e).get(t) : (Ee.log("SafetyCallback.find: 找不到 func —— ".concat(e, "/").concat("" !== t.name ? t.name : "[anonymous]")), null) : (Ee.log("SafetyCallback.find: 找不到 eventName-".concat(e, " 对应的 func")), null);} }, { key: "delete", value: function value(e, t) {return "function" == typeof t && !!this._funcMap.has(e) && !!this._funcMap.get(e).has(t) && (this._funcMap.get(e).delete(t), 0 === this._funcMap.get(e).size && this._funcMap.delete(e), !0);} }, { key: "_pack", value: function value(e, t, n) {return function () {try {t.apply(n, Array.from(arguments));} catch (r) {var o = Object.values(E).indexOf(e);if (-1 !== o) {var a = Object.keys(E)[o];Ee.warn("接入侧事件 TIM.EVENT.".concat(a, " 对应的回调函数逻辑存在问题，请检查！"), r);}var s = new Sa(Us);s.setMessage("eventName:".concat(e)).setMoreMessage(r.message).end();}};} }]), e;}(),$i = function () {function e(n) {t(this, e);var o = { SDKAppID: n.SDKAppID, unlimitedAVChatRoom: n.unlimitedAVChatRoom || !1, scene: n.scene || "", oversea: n.oversea || !1, instanceID: ot() };this._moduleManager = new ji(o), this._safetyCallbackFactory = new Yi();}return o(e, [{ key: "isReady", value: function value() {return this._moduleManager.isReady();} }, { key: "onError", value: function value(e) {this._moduleManager.onError(e);} }, { key: "login", value: function value(e) {return this._moduleManager.login(), this._moduleManager.getModule(kt).login(e);} }, { key: "logout", value: function value() {var e = this;return this._moduleManager.getModule(kt).logout().then(function (t) {return e._moduleManager.reset(), t;});} }, { key: "destroy", value: function value() {var e = this;return this.logout().finally(function () {e._moduleManager.stopTimer(), e._moduleManager.getModule(Bt).dealloc();var t = e._moduleManager.getOuterEmitterInstance(),n = e._moduleManager.getModule(wt);t.emit(E.SDK_DESTROY, { SDKAppID: n.getSDKAppID() });});} }, { key: "on", value: function value(e, t, n) {e === E.GROUP_SYSTEM_NOTICE_RECEIVED && Ee.warn("！！！TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED v2.6.0起弃用，为了更好的体验，请在 TIM.EVENT.MESSAGE_RECEIVED 事件回调内接收处理群系统通知，详细请参考：https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html#.GroupSystemNoticePayload"), Ee.debug("on", "eventName:".concat(e)), this._moduleManager.getOuterEmitterInstance().on(e, this._safetyCallbackFactory.defense(e, t, n), n);} }, { key: "once", value: function value(e, t, n) {Ee.debug("once", "eventName:".concat(e)), this._moduleManager.getOuterEmitterInstance().once(e, this._safetyCallbackFactory.defenseOnce(e, t, n), n || this);} }, { key: "off", value: function value(e, t, n, o) {Ee.debug("off", "eventName:".concat(e));var a = this._safetyCallbackFactory.find(e, t);null !== a && (this._moduleManager.getOuterEmitterInstance().off(e, a, n, o), this._safetyCallbackFactory.delete(e, t));} }, { key: "registerPlugin", value: function value(e) {this._moduleManager.getModule(Vt).registerPlugin(e);} }, { key: "setLogLevel", value: function value(e) {if (e <= 0) {console.log(["", " ________  ______  __       __  __       __  ________  _______", "|        \\|      \\|  \\     /  \\|  \\  _  |  \\|        \\|       \\", " \\$$$$$$$$ \\$$$$$$| $$\\   /  $$| $$ / \\ | $$| $$$$$$$$| $$$$$$$\\", "   | $$     | $$  | $$$\\ /  $$$| $$/  $\\| $$| $$__    | $$__/ $$", "   | $$     | $$  | $$$$\\  $$$$| $$  $$$\\ $$| $$  \\   | $$    $$", "   | $$     | $$  | $$\\$$ $$ $$| $$ $$\\$$\\$$| $$$$$   | $$$$$$$\\", "   | $$    _| $$_ | $$ \\$$$| $$| $$$$  \\$$$$| $$_____ | $$__/ $$", "   | $$   |   $$ \\| $$  \\$ | $$| $$$    \\$$$| $$     \\| $$    $$", "    \\$$    \\$$$$$$ \\$$      \\$$ \\$$      \\$$ \\$$$$$$$$ \\$$$$$$$", "", ""].join("\n")), console.log("%cIM 智能客服，随时随地解决您的问题 →_→ https://cloud.tencent.com/act/event/smarty-service?from=im-doc", "color:#006eff"), console.log("%c从v2.11.2起，SDK 支持了 WebSocket，小程序需要添加受信域名！升级指引: https://web.sdk.qcloud.com/im/doc/zh-cn/tutorial-02-upgradeguideline.html", "color:#ff0000");console.log(["", "参考以下文档，会更快解决问题哦！(#^.^#)\n", "SDK 更新日志: https://cloud.tencent.com/document/product/269/38492\n", "SDK 接口文档: https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html\n", "常见问题: https://web.sdk.qcloud.com/im/doc/zh-cn/tutorial-01-faq.html\n", "反馈问题？戳我提 issue: https://github.com/tencentyun/TIMSDK/issues\n", "如果您需要在生产环境关闭上面的日志，请 tim.setLogLevel(1)\n"].join("\n"));}Ee.setLevel(e);} }, { key: "createTextMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createTextMessage(e);} }, { key: "createTextAtMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createTextMessage(e);} }, { key: "createImageMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createImageMessage(e);} }, { key: "createAudioMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createAudioMessage(e);} }, { key: "createVideoMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createVideoMessage(e);} }, { key: "createCustomMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createCustomMessage(e);} }, { key: "createFaceMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createFaceMessage(e);} }, { key: "createFileMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createFileMessage(e);} }, { key: "createMergerMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createMergerMessage(e);} }, { key: "downloadMergerMessage", value: function value(e) {return e.type !== k.MSG_MERGER ? yr(new fr({ code: eo.MESSAGE_MERGER_TYPE_INVALID, message: Oo })) : gt(e.payload.downloadKey) ? yr(new fr({ code: eo.MESSAGE_MERGER_KEY_INVALID, message: Lo })) : this._moduleManager.getModule(Ct).downloadMergerMessage(e).catch(function (e) {return yr(new fr({ code: eo.MESSAGE_MERGER_DOWNLOAD_FAIL, message: Ro }));});} }, { key: "createForwardMessage", value: function value(e) {return this._moduleManager.getModule(Ct).createForwardMessage(e);} }, { key: "sendMessage", value: function value(e, t) {return e instanceof ur ? this._moduleManager.getModule(Ct).sendMessageInstance(e, t) : yr(new fr({ code: eo.MESSAGE_SEND_NEED_MESSAGE_INSTANCE, message: go }));} }, { key: "callExperimentalAPI", value: function value(e, t) {return "handleGroupInvitation" === e ? this._moduleManager.getModule(Ot).handleGroupInvitation(t) : yr(new fr({ code: eo.INVALID_OPERATION, message: ra }));} }, { key: "revokeMessage", value: function value(e) {return this._moduleManager.getModule(Ct).revokeMessage(e);} }, { key: "resendMessage", value: function value(e) {return this._moduleManager.getModule(Ct).resendMessage(e);} }, { key: "deleteMessage", value: function value(e) {return this._moduleManager.getModule(Ct).deleteMessage(e);} }, { key: "getMessageList", value: function value(e) {return this._moduleManager.getModule(Pt).getMessageList(e);} }, { key: "setMessageRead", value: function value(e) {return this._moduleManager.getModule(Pt).setMessageRead(e);} }, { key: "getConversationList", value: function value() {return this._moduleManager.getModule(Pt).getConversationList();} }, { key: "getConversationProfile", value: function value(e) {return this._moduleManager.getModule(Pt).getConversationProfile(e);} }, { key: "deleteConversation", value: function value(e) {return this._moduleManager.getModule(Pt).deleteConversation(e);} }, { key: "getMyProfile", value: function value() {return this._moduleManager.getModule(Nt).getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this._moduleManager.getModule(Nt).getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this._moduleManager.getModule(Nt).updateMyProfile(e);} }, { key: "getBlacklist", value: function value() {return this._moduleManager.getModule(Nt).getLocalBlacklist();} }, { key: "addToBlacklist", value: function value(e) {return this._moduleManager.getModule(Nt).addBlacklist(e);} }, { key: "removeFromBlacklist", value: function value(e) {return this._moduleManager.getModule(Nt).deleteBlacklist(e);} }, { key: "getFriendList", value: function value() {var e = this._moduleManager.getModule(Lt);return e ? e.getLocalFriendList() : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "addFriend", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.addFriend(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "deleteFriend", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.deleteFriend(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "checkFriend", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.checkFriend(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "getFriendProfile", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.getFriendProfile(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "updateFriend", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.updateFriend(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "getFriendApplicationList", value: function value() {var e = this._moduleManager.getModule(Lt);return e ? e.getLocalFriendApplicationList() : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "acceptFriendApplication", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.acceptFriendApplication(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "refuseFriendApplication", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.refuseFriendApplication(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "deleteFriendApplication", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.deleteFriendApplication(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "setFriendApplicationRead", value: function value() {var e = this._moduleManager.getModule(Lt);return e ? e.setFriendApplicationRead() : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "getFriendGroupList", value: function value() {var e = this._moduleManager.getModule(Lt);return e ? e.getLocalFriendGroupList() : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "createFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.createFriendGroup(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "deleteFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.deleteFriendGroup(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "addToFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.addToFriendGroup(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "removeFromFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.removeFromFriendGroup(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "renameFriendGroup", value: function value(e) {var t = this._moduleManager.getModule(Lt);return t ? t.renameFriendGroup(e) : yr({ code: eo.CANNOT_FIND_MODULE, message: ca });} }, { key: "getGroupList", value: function value(e) {return this._moduleManager.getModule(Ot).getGroupList(e);} }, { key: "getGroupProfile", value: function value(e) {return this._moduleManager.getModule(Ot).getGroupProfile(e);} }, { key: "createGroup", value: function value(e) {return this._moduleManager.getModule(Ot).createGroup(e);} }, { key: "dismissGroup", value: function value(e) {return this._moduleManager.getModule(Ot).dismissGroup(e);} }, { key: "updateGroupProfile", value: function value(e) {return this._moduleManager.getModule(Ot).updateGroupProfile(e);} }, { key: "joinGroup", value: function value(e) {return this._moduleManager.getModule(Ot).joinGroup(e);} }, { key: "quitGroup", value: function value(e) {return this._moduleManager.getModule(Ot).quitGroup(e);} }, { key: "searchGroupByID", value: function value(e) {return this._moduleManager.getModule(Ot).searchGroupByID(e);} }, { key: "getGroupOnlineMemberCount", value: function value(e) {return this._moduleManager.getModule(Ot).getGroupOnlineMemberCount(e);} }, { key: "changeGroupOwner", value: function value(e) {return this._moduleManager.getModule(Ot).changeGroupOwner(e);} }, { key: "handleGroupApplication", value: function value(e) {return this._moduleManager.getModule(Ot).handleGroupApplication(e);} }, { key: "getGroupMemberList", value: function value(e) {return this._moduleManager.getModule(Rt).getGroupMemberList(e);} }, { key: "getGroupMemberProfile", value: function value(e) {return this._moduleManager.getModule(Rt).getGroupMemberProfile(e);} }, { key: "addGroupMember", value: function value(e) {return this._moduleManager.getModule(Rt).addGroupMember(e);} }, { key: "deleteGroupMember", value: function value(e) {return this._moduleManager.getModule(Rt).deleteGroupMember(e);} }, { key: "setGroupMemberMuteTime", value: function value(e) {return this._moduleManager.getModule(Rt).setGroupMemberMuteTime(e);} }, { key: "setGroupMemberRole", value: function value(e) {return this._moduleManager.getModule(Rt).setGroupMemberRole(e);} }, { key: "setGroupMemberNameCard", value: function value(e) {return this._moduleManager.getModule(Rt).setGroupMemberNameCard(e);} }, { key: "setGroupMemberCustomField", value: function value(e) {return this._moduleManager.getModule(Rt).setGroupMemberCustomField(e);} }, { key: "setMessageRemindType", value: function value(e) {return this._moduleManager.getModule(Rt).setMessageRemindType(e);} }]), e;}(),zi = { login: "login", logout: "logout", destroy: "destroy", on: "on", off: "off", ready: "ready", setLogLevel: "setLogLevel", joinGroup: "joinGroup", quitGroup: "quitGroup", registerPlugin: "registerPlugin", getGroupOnlineMemberCount: "getGroupOnlineMemberCount" };function Wi(e, t) {if (e.isReady() || void 0 !== zi[t]) return !0;var n = new fr({ code: eo.SDK_IS_NOT_READY, message: "".concat(t, " ").concat(ua, "，请参考 https://web.sdk.qcloud.com/im/doc/zh-cn/module-EVENT.html#.SDK_READY") });return e.onError(n), !1;}var Ji = {},Xi = {};return Xi.create = function (e) {var t = 0;if (Ce(e.SDKAppID)) t = e.SDKAppID;else if (Ee.warn("TIM.create SDKAppID 的类型应该为 Number，请修改！"), t = parseInt(e.SDKAppID), isNaN(t)) return Ee.error("TIM.create failed. 解析 SDKAppID 失败，请检查传参！"), null;if (t && Ji[t]) return Ji[t];Ee.log("TIM.create");var n = new $i(r({}, e, { SDKAppID: t }));n.on(E.SDK_DESTROY, function (e) {Ji[e.data.SDKAppID] = null, delete Ji[e.data.SDKAppID];});var o = function (e) {var t = Object.create(null);return Object.keys(Et).forEach(function (n) {if (e[n]) {var o = Et[n],a = new C();t[o] = function () {var t = Array.from(arguments);return a.use(function (t, o) {return Wi(e, n) ? o() : yr(new fr({ code: eo.SDK_IS_NOT_READY, message: "".concat(n, " ").concat(ua, "。") }));}).use(function (e, t) {if (!0 === pt(e, St[n], o)) return t();}).use(function (t, o) {return e[n].apply(e, t);}), a.run(t);};}}), t;}(n);return Ji[t] = o, Ee.log("TIM.create ok"), o;}, Xi.TYPES = k, Xi.EVENT = E, Xi.VERSION = "2.13.1", Ee.log("TIM.VERSION: ".concat(Xi.VERSION)), Xi;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../前端学习/91/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 44:
/*!*************************************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/node_modules/tim-upload-plugin/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var global, factory;global = this, factory = function factory() {function e(e, t) {var n = Object.keys(e);if (Object.getOwnPropertySymbols) {var o = Object.getOwnPropertySymbols(e);t && (o = o.filter(function (t) {return Object.getOwnPropertyDescriptor(e, t).enumerable;})), n.push.apply(n, o);}return n;}function t(t) {for (var n = 1; n < arguments.length; n++) {var o = null != arguments[n] ? arguments[n] : {};n % 2 ? e(Object(o), !0).forEach(function (e) {s(t, e, o[e]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : e(Object(o)).forEach(function (e) {Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e));});}return t;}function n(e) {return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function o(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function r(e, t) {for (var n = 0; n < t.length; n++) {var o = t[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);}}function a(e, t, n) {return t && r(e.prototype, t), n && r(e, n), e;}function s(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}function i(e, t) {if (null == e) return {};var n,o,r = function (e, t) {if (null == e) return {};var n,o,r = {},a = Object.keys(e);for (o = 0; o < a.length; o++) {n = a[o], t.indexOf(n) >= 0 || (r[n] = e[n]);}return r;}(e, t);if (Object.getOwnPropertySymbols) {var a = Object.getOwnPropertySymbols(e);for (o = 0; o < a.length; o++) {n = a[o], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);}}return r;}var f = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && Boolean(wx.getSystemInfoSync().fontSizeSetting),u = "undefined" != typeof qq && "function" == typeof qq.getSystemInfoSync && Boolean(qq.getSystemInfoSync().fontSizeSetting),l = "undefined" != typeof tt && "function" == typeof tt.getSystemInfoSync && Boolean(tt.getSystemInfoSync().fontSizeSetting),c = "undefined" != typeof swan && "function" == typeof swan.getSystemInfoSync && Boolean(swan.getSystemInfoSync().fontSizeSetting),y = "undefined" != typeof my && "function" == typeof my.getSystemInfoSync && Boolean(my.getSystemInfoSync().fontSizeSetting),d = "undefined" != typeof uni && "undefined" == typeof window,p = f || u || l || c || y || d,h = u ? qq : l ? tt : c ? swan : y ? my : f ? wx : d ? uni : {},g = function g(e) {if ("object" !== n(e) || null === e) return !1;var t = Object.getPrototypeOf(e);if (null === t) return !0;for (var o = t; null !== Object.getPrototypeOf(o);) {o = Object.getPrototypeOf(o);}return t === o;};function m(e) {if (null == e) return !0;if ("boolean" == typeof e) return !1;if ("number" == typeof e) return 0 === e;if ("string" == typeof e) return 0 === e.length;if ("function" == typeof e) return 0 === e.length;if (Array.isArray(e)) return 0 === e.length;if (e instanceof Error) return "" === e.message;if (g(e)) {for (var t in e) {if (Object.prototype.hasOwnProperty.call(e, t)) return !1;}return !0;}return !1;}var v = function () {function e() {o(this, e), this.downloadUrl = "";}return a(e, [{ key: "request", value: function value(e, t) {var n = this;this.downloadUrl = e.downloadUrl || "";var o = (e.method || "PUT").toUpperCase(),r = e.url;if (e.qs) {var a = function (e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&",n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "=";return m(e) ? "" : g(e) ? Object.keys(e).map(function (o) {var r = encodeURIComponent(o) + n;return Array.isArray(e[o]) ? e[o].map(function (e) {return r + encodeURIComponent(e);}).join(t) : r + encodeURIComponent(e[o]);}).filter(Boolean).join(t) : void 0;}(e.qs);a && (r += "".concat(-1 === r.indexOf("?") ? "?" : "&").concat(a));}var s = new XMLHttpRequest();s.open(o, r, !0), s.responseType = e.dataType || "text";var i = e.headers || {};if (!m(i)) for (var f in i) {i.hasOwnProperty(f) && "content-length" !== f.toLowerCase() && "user-agent" !== f.toLowerCase() && "origin" !== f.toLowerCase() && "host" !== f.toLowerCase() && s.setRequestHeader(f, i[f]);}return s.onload = function () {t(null, n._xhrRes(s, n._xhrBody(s)));}, s.onerror = function (e) {var o = n._xhrBody(s);if (o) t(e, n._xhrRes(s, o));else {var r = s.statusText;r || 0 !== s.status || (r = "CORS blocked or network error"), t(r, n._xhrRes(s, o));}}, e.onProgress && s.upload && (s.upload.onprogress = function (t) {var n = t.total,o = t.loaded,r = Math.floor(100 * o / n);e.onProgress({ total: n, loaded: o, percent: (r >= 100 ? 100 : r) / 100 });}), s.send(e.resources), s;} }, { key: "_xhrRes", value: function value(e, t) {var n = {};return e.getAllResponseHeaders().trim().split("\n").forEach(function (e) {if (e) {var t = e.indexOf(":"),o = e.substr(0, t).trim().toLowerCase(),r = e.substr(t + 1).trim();n[o] = r;}}), { statusCode: e.status, statusMessage: e.statusText, headers: n, data: t };} }, { key: "_xhrBody", value: function value(e) {return 200 === e.status && this.downloadUrl ? { location: this.downloadUrl } : { response: e.responseText };} }]), e;}(),b = ["unknown", "image", "video", "audio", "log"],w = ["name"],O = function () {function e() {o(this, e), this.downloadUrl = "";}return a(e, [{ key: "request", value: function value(e, n) {var o = this,r = e.resources,a = void 0 === r ? "" : r,s = e.headers,f = void 0 === s ? {} : s,u = e.url,l = e.downloadUrl,c = void 0 === l ? "" : l;this.downloadUrl = c;var d = null,p = "",g = c.match(/^(https?:\/\/[^/]+\/)([^/]*\/?)(.*)$/),m = { url: u, header: f, name: "file", filePath: a, formData: { key: p = (p = decodeURIComponent(g[3])).indexOf("?") > -1 ? p.split("?")[0] : p, success_action_status: 200, "Content-Type": "" }, timeout: e.timeout || 3e5 };if (y) {var v = m;v.name, m = t(t({}, i(v, w)), {}, { fileName: "file", fileType: b[e.fileType] });}return (d = h.uploadFile(t(t({}, m), {}, { success: function success(e) {o._handleResponse(e, n);}, fail: function fail(e) {o._handleResponse(e, n);} }))).onProgressUpdate(function (t) {e.onProgress && e.onProgress({ total: t.totalBytesExpectedToSend, loaded: t.totalBytesSent, percent: Math.floor(t.progress) / 100 });}), d;} }, { key: "_handleResponse", value: function value(e, n) {var o = e.header,r = {};if (o) for (var a in o) {o.hasOwnProperty(a) && (r[a.toLowerCase()] = o[a]);}var s = +e.statusCode;200 === s ? n(null, { statusCode: s, headers: r, data: t(t({}, e.data), {}, { location: this.downloadUrl }) }) : n(e, { statusCode: s, headers: r, data: void 0 });} }]), e;}();return function () {function e() {o(this, e), console.log("TIMUploadPlugin.VERSION: ".concat("1.0.3")), this.retry = 1, this.tryCount = 0, this.systemClockOffset = 0, this.httpRequest = p ? new O() : new v();}return a(e, [{ key: "uploadFile", value: function value(e, t) {var n = this;return this.httpRequest.request(e, function (o, r) {o && n.tryCount < n.retry && n.allowRetry(o) ? (n.tryCount++, n.uploadFile(e, t)) : (n.tryCount = 0, t(o, r));});} }, { key: "allowRetry", value: function value(e) {var t = !1,n = !1;if (e) {var o = e.headers && (e.headers.date || e.headers.Date) || e.error && e.error.ServerTime;try {var r = e.error && e.error.Code,a = e.error && e.error.Message;("RequestTimeTooSkewed" === r || "AccessDenied" === r && "Request has expired" === a) && (n = !0);} catch (f) {}if (n && o) {var s = Date.now(),i = Date.parse(o);Math.abs(s + this.systemClockOffset - i) >= 3e4 && (this.systemClockOffset = i - s, t = !0);} else 5 === Math.floor(e.statusCode / 100) && (t = !0);}return t;} }]), e;}();},  true ? module.exports = factory() : undefined;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 5:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 51:
/*!**************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/mixins/mixins.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.mixins = void 0;var mixins = {
  data: function data() {
    return {
      token: '',
      courseId: '',
      personInfo: '',
      personId: '',
      groupId: '' };

  },
  created: function created() {var _this = this;
    uni.getStorage({
      key: 'token',
      success: function success(res) {
        _this.token = res.data;
      } });


    uni.getStorage({
      key: 'courseId',
      success: function success(res) {
        _this.courseId = res.data;
      } });
    uni.getStorage({
      key: 'personInfo',
      success: function success(res) {
        _this.personInfo = res.data;
      } });

    this.getStoreData({ name: 'personId', success: function success(e) {_this.personId = e;} });
    this.getStoreData({ name: 'groupId', success: function success(e) {_this.groupId = e;} });
    // uni.getStorage({
    // 	key: 'personId',
    // 	success: res => {
    // 		this.personId = res.data;
    // 	}
    // });
  },
  methods: {
    // 跳转
    goUrl: function goUrl(url) {
      uni.navigateTo({
        url: url });

    },
    goTabBar: function goTabBar(url) {
      uni.switchTab({
        url: url });

    },
    // 关闭当前页面
    setUrl: function setUrl(url) {
      uni.redirectTo({
        url: url });

    },
    // 存储缓存
    storeData: function storeData(name, data) {
      uni.setStorage({
        key: name,
        data: data });

    },
    // 获取缓存
    getStoreData: function getStoreData(_ref) {var name = _ref.name,_success = _ref.success;
      uni.getStorage({
        key: name,
        success: function success(res) {
          _success(res.data);
        } });

    } } };exports.mixins = mixins;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!*********************************************************!*\
  !*** E:/前端培训/面试作品/微信跨平台小程序/app/store/modules/module.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 5));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);var _default =
new _vuex.default.Store({
  state: {
    groupList: [],
    messageList: [],
    talkingList: [] },

  getters: {
    getGroupList: function getGroupList(state) {
      return state.groupList;
    },
    getChatInfo: function getChatInfo(state) {
      return state.getmessageList;
    },
    getTalking: function getTalking(state) {
      return state.talkingList;
    } },

  mutations: {
    modifyGroup: function modifyGroup(state, data) {
      state.groupList = data;
    },
    modifyMessage: function modifyMessage(state, data) {
      state.messageList = data;
    },
    modifyTalking: function modifyTalking(state, data) {
      state.talkingList = data;
    } },

  actions: {
    getGroup: function getGroup(context, data) {
      context.commit('modifyGroup', data);
    },
    getMessage: function getMessage(context, data) {
      context.commit('modifyMessage', data);
    },
    getTalking: function getTalking(context, data) {
      context.commit('modifyTalking', data);
    } } });exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map