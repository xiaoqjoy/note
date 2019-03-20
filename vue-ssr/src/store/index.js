import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function addCookie(state) {
  return process.browser ? {} : {
    headers: {
      cookie: state.cookies
    }
  };
}

export function createStore() {
  return new Vuex.Store({
    state: {
      userInfo: {},
      Lists: [],
      queryUserScheduleData: {},
      cookies: ''
    },
    mutations: {
      // 更新用户信息
      updateUserInfo(state, newUserInfo) {
        state.userInfo = newUserInfo;
      },
      Update(state, {
        key,
        value
      }) {
        state[key] = value;
      }
    },
    actions: {
      getUserSchedule({
        commit,
        rootState
      }, {
        pageSize,
        currentPage
      }) {
        return new Promise((resolve, reject) => {
          // 将获取的cookie传入axios中
          let config = addCookie(rootState);
          config.params = {
            state: 'WAIT_CHECK',
            pageSize,
            currentPage
          };
          config.isCache = true;
          axios.get('/security/oms/schedule/queryUserSchedule', config).then((res) => {
            let data = res.data.result;
            commit('Update', {
              key: 'queryUserScheduleData',
              value: data
            });
            resolve(data);
          }).catch((err) => {
            console.log(err);
            reject(err);
          });
        });
      }
    }
  });
}
