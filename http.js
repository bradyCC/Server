/**
 * Created by brady on 2019/6/21.
 */
// axios
const axios = require('axios');
const http = axios.create({
  baseURL: 'https://api.github.com/'
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = token
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

http.get('repos/vuejs/vue').then((res) => {
  // console.log(res.data)
})
