const {
  getUserInfo,
  getTemplateInfo,
} = require('../redux/actions/cache');
const isUUID = require('is-uuid');
const immutable = require('immutable');

let _store = null;
exports.attachStore = function(store) {
  _store = store;
}

exports.checkUser = function(uuid, type = 'user') {
  if(uuid.toString().substr(0, 4) === 'trpg') {
    // 不检测trpg开头的内置系统用户
    return;
  }

  if(!isUUID.v1(uuid)) {
    console.warn('该UUID不是一个合法的UUID:', uuid);
    return;
  }

  let store = _store;
  if(!!store && !!store.dispatch) {
    const state = store.getState();
    if(type === 'user') {
      let info = state.getIn(['cache', 'user', uuid]);
      if(!info) {
        store.dispatch(getUserInfo(uuid));
      }
    }
  }else {
    throw new Error('checkUser func should bind store');
  }
}

exports.checkTemplate = function(uuid) {
  let store = _store;
  if(!!store && !!store.dispatch) {
    const state = store.getState();
    let info = state.getIn(['cache', 'template', uuid]);
    if(!info) {
      store.dispatch(getTemplateInfo(uuid));
    }
  }else {
    throw new Error('checkUser func should bind store');
  }
}

exports.savecache = function() {
  // TODO
}

exports.loadcache = function() {
  // TODO
}

// 更加优化的用户信息缓存获取
let isGettingUserInfoUUID = []; // 用于防止同时请求多个相同内容
exports.getUserInfoCache = function(uuid) {
  let store = _store;
  if(!!store && !!store.dispatch) {
    const state = store.getState();
    let info = state.getIn(['cache', 'user', uuid]);
    if(!info) {
      if(isGettingUserInfoUUID.indexOf(uuid) === -1) {
        // 没有正在获取
        console.log('没有检测到该用户缓存记录, 自动获取', uuid);
        store.dispatch(getUserInfo(uuid, () => {
          let index = isGettingUserInfoUUID.indexOf(uuid);
          if(index !== -1) {
            isGettingUserInfoUUID.splice(index, 1);
          }
        }));
        isGettingUserInfoUUID.push(uuid);
      }

      return immutable.Map();
    }else {
      return info;
    }
  }else {
    throw new Error('checkUser func should bind store');
  }
}
