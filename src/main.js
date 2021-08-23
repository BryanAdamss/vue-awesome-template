import './register-service-worker'

// * ----------------------------------------
// * 导入插件
// * ----------------------------------------
import { bindNetworkChangeEvent } from 'Plugins/network-detector'
import { vconsoleProvider } from 'Plugins/vconsole-provider'

// * ----------------------------------------
// * 导入服务插件
// * ----------------------------------------
import {
  directiveRegister,
  filterRegister 
} from 'Services/extends/assets-register'
import {
  elementUiRegister,
  vueLazyloadReigster
} from 'Services/extends/component-register'
import { globalInjecter, vueInjecter } from 'Services/extends/injecter'
import { mountRootVue } from 'Services/extends/root-instance'
import { setVueConfig } from 'Services/extends/vue-config'

// * ----------------------------------------
// * 注册组件
// * ----------------------------------------
elementUiRegister()
vueLazyloadReigster()

// * ----------------------------------------
// * 调用filters、directives注册器
// * ----------------------------------------
filterRegister()
directiveRegister()

// * ----------------------------------------
// * 调用注入器
// * ----------------------------------------
vueInjecter()
globalInjecter()

// * ----------------------------------------
// * vconsole
// * ----------------------------------------
vconsoleProvider()

// * ----------------------------------------
// * 绑定网络变化事件
// * ----------------------------------------
bindNetworkChangeEvent()

// * ----------------------------------------
// * 设置vue config
// * ----------------------------------------
setVueConfig()

// * ----------------------------------------
// * 挂载根实例
// * ----------------------------------------
mountRootVue()
