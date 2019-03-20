// this is aliased in webpack config based on server/client build
import {
  createAPI
} from 'create-api';
import axios from 'axios';
import qs from 'querystring';
const logRequests = true || !!process.env.DEBUG_API;
const api = createAPI();
axios.defaults.baseURL = api.url;

// function warmCache() {
//   // fetchItems((api.cachedIds.top || []).slice(0, 30))
//   setTimeout(warmCache, 1000 * 60 * 15);
// }

function getUrl(config) {
  let url = '';
  if (config.url.indexOf('http') !== -1) {
    url = config.url;
  } else {
    url = combineURLs(config.baseURL, config.url);
  }
  return url + '?' + qs.stringify(config.params);
}

function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  // warmCache();
  const cache = api.cachedItems;
  // 拦截服务器端的get请求，方便做缓存处理
  let getMethod = axios.get;
  axios['get'] = (...args) => {
    let [url = '', {
      isCache, // 是否需要缓存
      params
    }] = args;
    let child = getUrl({
      url,
      params,
      baseURL: axios.defaults.baseURL
    });
    logRequests && console.log(`fetching ${child}...`);
    // 缓存中存在时直接重缓存中获取数据
    if (isCache && cache && cache.has(child)) {
      logRequests && console.log(`cache hit for ${child}.`);
      return Promise.resolve(cache.get(child));
    } else {
      return getMethod(...args);
    }
  };
  // 添加响应拦截器
  axios.interceptors.response.use(function(res) {
    console.log(res);
    if (res.config.isCache) {
      const child = getUrl(res.config);
      if (res) res.__lastUpdated = Date.now();
      cache && cache.set(child, res);
      logRequests && console.log(`fetched ${child}.`);
    }
    return res;
  }, function(error) {
    return Promise.reject(error);
  });

  // 添加请求拦截器
  // axios.interceptors.request.use(function(config) {
  //   // console.log('store.state.cookies', store.state.cookies);
  //   config.headers.common['cookie'] = store.state.cookies;
  //   return config;
  // }, function(error) {
  //   return Promise.reject(error);
  // });
}
