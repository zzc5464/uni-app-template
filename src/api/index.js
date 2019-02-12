import reqMethod from './config';
export const TEST = params => reqMethod('GET', '/api/activity/getActivityListByOrgCode', params);
