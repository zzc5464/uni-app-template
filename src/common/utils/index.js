/**
 * 公共的方法
 */
// 删除字符串空格
const isString = s => typeof s === 'string';
let removeSpace = str => isString(str) && (str.replace(/\s/g, '') || str);
// 定义验证规则
let validate = {
  isMobile(mobile) {
    mobile = removeSpace(mobile);
    let phonegi = /^1[0-9]{10}$/;
    return (!mobile && '亲，请填写您的手机号!') || (!phonegi.test(mobile) && '亲，请正确填写您的手机号!') || true;
  },
  isName(name) {
    name = removeSpace(name);
    // isClientName(val, name) {
    //   val = removeSpace(val);
    //   let testgi = /^[\u4E00-\u9FA5A-Za-z0-9]{2,50}$/g;
    //   return (!val && `亲，请填写${name}!`) || (!testgi.test(val) && `亲，请正确填写${name}!`);
    // },
    let testgi = /^[\u4E00-\u9FA5A-Za-z]{2,50}$/g;
    return (!name && '亲，请填写您的姓名!') || (!testgi.test(name) && '亲，请正确填写您的姓名!') || true;
  },
  isVerifyCode(verifyCode) {
    verifyCode = removeSpace(verifyCode);
    return (!verifyCode && '亲，请填写验证码！') || true;
  },
  isExperience(experience) {
    experience = removeSpace(experience);
    let experiencegi = /^[\s\S]{2,300}$/g;
    return (!experience) || (!experiencegi.test(experience) && '亲，个人简介长度范围2-300个汉字!') || true;
  },
  isPersonalHonor(honor) {
    honor = removeSpace(honor);
    let honorgi = /^[\s\S]{2,300}$/g;
    return (!honor) || (!honorgi.test(honor) && '亲，个人荣誉长度范围2-300个汉字') || true;
  },
  isMotto(motto) {
    motto = removeSpace(motto);
    let mottogi = /^[\s\S]{2,50}$/g;
    return (!motto) || (!mottogi.test(motto) && '亲，个性签名长度范围2-50个汉字!') || true;
  },
  isQuestion(question) {
    question = removeSpace(question);
    let questiongi = /^[\s\S]{2,300}$/g;
    return (!question && '亲，请描述您的问题!') || (!questiongi.test(question) && '亲，问题描述长度范围2-300个汉字') || true;
  },
  incomeName(name) {
    name = removeSpace(name);
    let namegi = /^[\u4e00-\u9fa5]{2,50}$/g;
    return (!name && '亲，请填写您的姓名!') || (!namegi.test(name) && '亲，请正确填写您的姓名!') || true;
  },
  // 客户姓名(中文、英文)
  isClientName(val, name) {
    val = removeSpace(val);
    let testgi = /^[\u4E00-\u9FA5A-Za-z]{2,50}$/g;
    return (!val && `亲，请填写${name}!`) || (!testgi.test(val) && `亲，请正确填写${name}!`);
  },
  // 限制长度2-50(只是限制长度)
  isLength(val, name) {
    console.log(name);
    val = removeSpace(val);
    let testgi = /^.{2,50}$/g;
    return (!val && `亲，请填写${name}!`) || (!testgi.test(val) && `亲，请正确填写${name}!`);
  },
  // 邮箱
  isEmail(email) {
    email = removeSpace(email);
    let isemail = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/g;
    return (!isemail.test(email) && '亲，请正确填写客户邮箱!');
  },
  // 匹配18位身份证号
  // isIdCard(card) {
  //   card = removeSpace(card);
  //   let isCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g;
  //   return (!isCard.test(card) && '亲，请正确填写客户证件号码!');
  // },
  // 匹配正整数
  isPositiveNum(num, name) {
    num = removeSpace(num);
    console.log('数字年---：', num);
    let isNum = /^[1-9]\d*$/g;
    console.log('数字年收入：', num, isNum.test(num));
    return isNum.test(num) || (!isNum.test(num) && `亲，${name}仅支持录入大于0的数字!`);
  },
  // 匹配正整数(子女年龄)
  isPositiveNumChild(num, name) {
    num = removeSpace(num);
    console.log('数字年---：', num);
    let isNum = /^[0-9]\d*$/g;
    console.log('数字年收入：', num, isNum.test(num));
    return isNum.test(num) || (!isNum.test(num) && `亲，${name}仅支持录入大于等于0的数字!`);
  },
  // 国内电话号码 支持录入11位数字
  isTel(tel) {
    tel = removeSpace(tel);
    let vary = /^1[0-9]{10}$/.test(tel) || /^\d{8}$/.test(tel) || /^\d{7}$/.test(tel) || /^\d{3}-\d{8}$/.test(tel) || /^\d{3}-\d{7}$/.test(tel) || /^\d{4}-\d{8}$/.test(tel) || /^\d{4}-\d{7}$/.test(tel);
    return (!vary && '亲，请正确填写客户固定电话!') || false;
    // if (vary === true) {
    //   return false;
    // } else if (vary === false) {
    //   return '亲，请正确填写客户固定电话!';
    // }
  },
  // 手机号码
  isClientMobile(mobile, name) {
    mobile = removeSpace(mobile);
    let phonegi = /^1[0-9]{10}$/;
    return (!mobile && `亲，请填写${name}的手机号!`) || (!phonegi.test(mobile) && `亲，请正确填写${name}的手机号!`);
  },
  // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
  isAccount(account) {
    account = removeSpace(account);
    let isAccount = /^[a-zA-Z][a-zA-Z0-9_]{2,50}$/g;
    return (!isAccount.test(account) && '亲，请正确填写客户微信号!');
  },
  // 备注
  isRemark(remark) {
    remark = removeSpace(remark);
    let mark = /^.{2,300}$/g;
    return (!mark.test(remark) && '亲，备注长度范围是2-300个汉字~');
  },
  // 印象 标签
  isImpress(impress) {
    impress = removeSpace(impress);
    let press = /^.{2,10}$/g;
    return (!press.test(impress) && '亲，标签长度范围是2-10~~');
  },
  // 印象 标签
  isTemporary(impress) {
    impress = removeSpace(impress);
    let press = /^.{2,15}$/g;
    return (!press.test(impress) && '亲，表单名称长度范围是2-15~~');
  },
  // 检查身份证号码
  isIdCard(k, name = '') {
    let m = [true, `亲，请正确填写${name}身份证号！`, `亲，请填写${name}身份证号！`, `亲，请正确填写身份证号！`, `亲，请填写${name}身份证号!`, `亲，请填写${name}身份证号!`];
    let pa = {};
    if (!k) return m[2];
    k = k.toUpperCase();
    let c = {
      11: '\u5317\u4eac',
      12: '\u5929\u6d25',
      13: '\u6cb3\u5317',
      14: '\u5c71\u897f',
      15: '\u5185\u8499\u53e4',
      21: '\u8fbd\u5b81',
      22: '\u5409\u6797',
      23: '\u9ed1\u9f99\u6c5f',
      31: '\u4e0a\u6d77',
      32: '\u6c5f\u82cf',
      33: '\u6d59\u6c5f',
      34: '\u5b89\u5fbd',
      35: '\u798f\u5efa',
      36: '\u6c5f\u897f',
      37: '\u5c71\u4e1c',
      41: '\u6cb3\u5357',
      42: '\u6e56\u5317',
      43: '\u6e56\u5357',
      44: '\u5e7f\u4e1c',
      45: '\u5e7f\u897f',
      46: '\u6d77\u5357',
      50: '\u91cd\u5e86',
      51: '\u56db\u5ddd',
      52: '\u8d35\u5dde',
      53: '\u4e91\u5357',
      54: '\u897f\u85cf',
      61: '\u9655\u897f',
      62: '\u7518\u8083',
      63: '\u9752\u6d77',
      64: '\u5b81\u590f',
      65: '\u65b0\u7586',
      71: '\u53f0\u6e7e',
      81: '\u9999\u6e2f',
      82: '\u6fb3\u95e8',
      91: '\u56fd\u5916'
    };
    let b;
    let l;
    let e;
    let j;
    let d;
    let o;
    let f;
    let n;
    let g;
    let h;
    let a = [];
    // 前后各四位为明文中间为掩码验证
    var checkMask15Reg = /^[1-9][0-9]{3}\*{7}[0-9]{4}$/;
    var checkMask18Reg = /^[1-9][0-9]{3}\*{10}[0-9]{3}(\d|[Xx]){1}$/;
    var ereg;
    a = k.split('');
    // 放宽身份证城市的验证，因为有些测试数据不规范
    if (c[parseInt(k.substr(0, 2))] === null) {
      return m[1];
    }
    var checkMask = false;
    switch (k.length) {
      case 15:
        if ((parseInt(k.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(k.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(k.substr(6, 2)) + 1900) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
        } else {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
        }
        checkMask = checkMask15Reg.test(k);
        if (ereg.test(k) || checkMask) {
          if (checkMask) { return true; }
          o = k.substr(6, 2);
          f = k.substr(8, 2);
          n = k.substr(10, 2);
          if (pa && pa.oServerDate) {
            g = pa.oServerDate;
          } else {
            h = new Date();
            g = new Date(h.getFullYear(), h.getMonth(), h.getDate());
          }
          d = new Date(o, parseInt(f, 10) - 1, n);
          if ((Date.parse(d) - Date.parse(g)) >= 0) {
            return m[5];
          }
          return m[0];
        } else {
          return m[1];
        }
      case 18:
        if (parseInt(k.substr(6, 4)) % 4 === 0 || (parseInt(k.substr(6, 4)) % 100 === 0 && parseInt(k.substr(6, 4)) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
        } else {
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
        }
        checkMask = checkMask18Reg.test(k);
        if (ereg.test(k) || checkMask) {
          if (checkMask) return true;
          e = (parseInt(a[0]) + parseInt(a[10])) * 7 + (parseInt(a[1]) + parseInt(a[11])) * 9 + (parseInt(a[2]) + parseInt(a[12])) * 10 + (parseInt(a[3]) + parseInt(a[13])) * 5 + (parseInt(a[4]) + parseInt(a[14])) * 8 + (parseInt(a[5]) + parseInt(a[15])) * 4 + (parseInt(a[6]) + parseInt(a[16])) * 2 + parseInt(a[7]) * 1 + parseInt(a[8]) * 6 + parseInt(a[9]) * 3;
          b = e % 11;
          j = 'F';
          l = '10X98765432';
          j = l.substr(b, 1);
          if (j === a[17]) {
            o = k.substr(6, 4);
            f = k.substr(10, 2);
            n = k.substr(12, 2);
            if (pa && pa.oServerDate) {
              g = pa.oServerDate;
            } else {
              h = new Date();
              g = new Date(h.getFullYear(), h.getMonth(), h.getDate());
            }
            d = new Date(o, parseInt(f, 10) - 1, n);
            if ((Date.parse(d) - Date.parse(g)) >= 0) {
              return m[5];
            }
            return m[0];
          } else {
            return m[3];
          }
        } else {
          return m[1];
        }
      default:
        return m[1];
    }
  }
};
export default {
  validate
}