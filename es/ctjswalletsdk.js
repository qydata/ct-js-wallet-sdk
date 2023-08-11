import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/theme-chalk/index.css';
import { createApp } from 'vue';
// lib模式下，vue的主入口文件
import App from './App.vue';
const app = createApp(App);
app.config.globalProperties.productionTip = false;
app.use(ElementPlus);
class ctjswalletsdk {
  constructor(option, cb) {
    if (!ctjswalletsdk.instance) {
      ctjswalletsdk.renderDom(option, cb);
      ctjswalletsdk.instance = this;
    }
    return ctjswalletsdk.instance;
  }

  // 渲染vue
  static renderDom(option, cb) {
    // 先判断参数
    if (!option) {
      console.log('缺少参数');
      return;
    }
    // 1.创建挂载节点
    const outer = document.createElement('div');
    outer.setAttribute('id', 'ctjswalletsdk');
    document.body.appendChild(outer);
    // 2.vue挂载
    app.mount('#ctjswalletsdk');
    // 3.传入的参数绑定到全局，方便统一调用
    app.config.globalProperties.$keyA = option.keyA;
    app.config.globalProperties.$keyB = option.keyB;
    // 4.绑定成功的回调，完成弹框功能后，通知用户
    app.config.globalProperties.$successCb = cb;
  }

  // 初始化
  static init(option, cb) {
    if (!this.instance) {
      this.instance = new ctjswalletsdk(option, cb);
    }
    return this.instance;
  }
  static test() {
    console.log(666666);
  }
  static async connectWallet() {
    return await window.ctApp.connectWallet();
  }
  static async sendAddressTrans(from, to, value) {
    return await window.ctApp.sendAddressTrans(from, to, value);
  }
  static async sendContractTrans(from, to, contractAddress, value, abi, method, params) {
    return await window.ctApp.sendContractTrans(from, to, contractAddress, value, abi, method, params);
  }
}
export default ctjswalletsdk;
//# sourceMappingURL=ctjswalletsdk.js.map