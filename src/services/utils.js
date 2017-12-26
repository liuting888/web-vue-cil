/**
 * Created By xuzhaohui on 2017/6/5
 *
 * 公共的工具方法
 *
 */

let utils = {
  /**
   * [isMobile 判断平台]
   * @param test: 0:iPhone    1:Android
   */

  ismobile:function () {
    let u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
      if(window.location.href.indexOf("?mobile")<0){
        try{
          if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
            return '0';
          }else{
            return '1';
          }
        }catch(e){}
      }
    }else if( u.indexOf('iPad') > -1){
      return '0';
    }else{
      return '1';
    }
  },

  /**
   * 保存数据在sessionStorage，以键值对存在
   * @param {String} name  键名
   * @param {String/Object/Array/...} value 键值
   *
   */
  setSessionStorage: function(name, value) {
    if (!this.isSupportStorage())
      return null;

    if (this.isObject(value))
      value = JSON.stringify(value);

    sessionStorage.setItem(name, value);
  },

  /**
   * 获取sessionStorage数据
   * @param {String} name 键名
   * @return {String/Object/...} 键值
   *
   */
  getSessionStorage: function(name) {
    if (!this.isSupportStorage())
      return null;
    let value = sessionStorage.getItem(name);
    if (this.isJSON(value)) {
      return JSON.parse(value);
    } else {
      return value;
    }
  },

  /**
   * 保存数据在localStorage，以键值对存在
   * @param {String} name  键名
   * @param {String/Object/Array/...} value 键值
   *
   */
  setLocalStorage: function(name, value) {
    if (!this.isSupportStorage())
      return null;

    if (this.isObject(value))
      value = JSON.stringify(value);

    localStorage.setItem(name, value);
  },

  /**
   * 获取localStorage数据
   * @param {String} name 键名
   * @return {String/Object/...} 键值
   *
   */
  getLocalStorage: function(name) {
    if (!this.isSupportStorage())
      return null;
    let value = localStorage.getItem(name);
    if (this.isJSON(value)) {
      return JSON.parse(value);
    } else {
      return value;
    }
  },

  /**
   * 判断字符串是否为JSON
   * @param  {String}  str json字符串
   * @return {Boolean}     true/false
   */
  isJSON: function(str) {
    try {
      JSON.parse(str);
      return true;
    } catch(e) {
      return false;
    }
  },

  /**
   * 判断是否支持sessionStorage和localStorage
   * @return {Boolean} true/false
   *
   */
  isSupportStorage: function() {
    if (window.sessionStorage && window.localStorage)
      return true;
    else
      return false;
  },

  /**
   * 判断是否为object对象，排除null
   * @param  {obj}  value 判断的对像
   * @return {Boolean} true/false
   *
   */
  isObject: function(value) {
    return (value !== null && typeof value === 'object');
  },

  /**
   * 判断是否为整数
   * @param  {Number}  int 判断的数字
   * @return {Boolean}     true/false
   */
  isInteger: function(int) {
    var n = Number(int);
    return typeof n === 'number' && n%1 === 0
  },

  /**
   * 获取url地址参数
   * @param  {String} val 参数名
   * @return {String}      参数值
   *
   */
  getQueryString: function(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    let context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  }

}

export default utils;
