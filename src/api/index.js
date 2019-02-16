if(process.env.NODE_ENV === 'development'){
  // console.log('开发环境')
}else{
  // console.log('生产环境')
}
import reqMethod from './config';
export const TEST = params => reqMethod('GET', '/api/activity/getActivityListByOrgCode', params);
