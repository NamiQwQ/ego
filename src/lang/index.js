//国际化
//1.导入vue-i18n
import Vue from "vue";
import VueI18n from "vue-i18n";
//导入语言包
import en from "./myen";
import zh from "./myzh";
//导入element-ui国际化
// import Element from "element-ui";
import ElementLocale from 'element-ui/lib/locale'
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
Vue.use(VueI18n);
//2. 配置语言
const messages = {
  //英文语言
  myen: {
    // home:{
    //     totalmoney:'gross sales',
    //     totalviews:"total views",
    // }
    ...en,
    ...enLocale,
  },
  //中文语言
  myzh: {
    // home:{
    //     totalmoney:"总销售额",
    //     totalviews:'总访问量'
    // }
    ...zh,
    ...zhLocale,
  },
};

//3. 设置语言
const i18n = new VueI18n({
  locale: "myzh", // 设置地区
  messages, // 设置地区信息
});

// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value),
// });

ElementLocale.i18n((key, value) => i18n.t(key, value))


//4. 挂载vue实例  导出i18n
export default i18n;
