import './register-service-worker'

// * ----------------------------------------
// * 导入插件
// * ----------------------------------------
import {
  elementUiRegister,
  vueLazyloadReigster
} from 'Plugins/component-register'
import { globalInjecter, vueInjecter } from 'Plugins/injecter'
import { bindNetworkChangeEvent } from 'Plugins/network-detector'
import { directiveRegister, filterRegister } from 'Plugins/register'
import { mountRootVue } from 'Plugins/root-instance'
import { vconsoleProvider } from 'Plugins/vconsole-provider'
import { setVueConfig } from 'Plugins/vue-config'

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
