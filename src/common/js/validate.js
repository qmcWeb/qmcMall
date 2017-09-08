/**
 * Created by Administrator on 2017/9/7.
 */
//1.引入表单验证依赖文件，并且引入的是支持中文错误提示的文件
import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件

//2.进行中文错误提示的配置
// 配置中文
Validator.addLocale(zh);

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate,config);

//3.如果你想自定义表单验证的提示语，不配置有默认。
// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: ( field )=> "请输入" + field
    },
    attributes:{
      phoneCode: '手机号码',
      phonePwd: '手机号码',
      password: '登录密码',
      messageCode: '短信验证码',
      picCode: '图形验证码'
    }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('phoneCode', {
  messages: {
    zh_CN:field => field + '必须是11位数字',
  },
  validate: value => {
    return /^1[34578]\d{9}$/.test(value);
  }
});
Validator.extend('phonePwd', {
  messages: {
    zh_CN:field => field + '必须是11位数字',
  },
  validate: value => {
    return /^1[34578]\d{9}$/.test(value);
  }
});

Validator.extend('messageCode', {
  messages: {
    zh_CN:field => field + '必须是6位数字',
  },
  validate: value => {
    return /\d{6}/.test(value);
  }
});

Validator.extend('password', {
  messages: {
    zh_CN:field => field + '必须是6-12位字符，数字与字母组合',
  },
  validate: value => {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value);
  }
});

Validator.extend('picCode', {
  messages: {
    zh_CN:field => field + '必须是4位数字',
  },
  validate: value => {
    return /\d{4}/.test(value);
  }
});

