/**
 * Created by sks on 2017/9/6.
 */
export default {
  install: function (Vue, options) {
    // 添加的内容写在这个函数里面
    Vue.prototype.doubleNumber = function (val) {
      if (typeof val === 'number') {
        return val * 2;
      } else if (!isNaN(Number(val))) {
        return Number(val) * 2;
      } else {
        return null
      }
    }
  }
};
