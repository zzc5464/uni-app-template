
/**
 * 这是一个请求方法
 * @param  {string}  method 请求方式
 * @param  {string}  url    请求连接
 * @param  {object}  params 请求参数
 * @return {Promise}        返回 Promise
 */
function reqMethod(method, url, data) {
  let headers = {};
  if (typeof (data) === 'string') {
    headers = {'Content-Type': 'application/json;charset=UTF-8'};
  } else {
    headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  };
  return new Promise((resolve, reject) => {
    uni.request({
      url, 
      method,
      data,
      header: headers || {},
      success(res){
        resolve(res);
      },
      fail(err) {
        reject(err)
      },
      complete() {
        console.log('调用了');
        
      }
    });
  });
};

export default reqMethod;
