/**
 * @author GuangHui
 * @description vue-shim 声明
 */


import { MessageCenter } from "@/plugins/message-center";
import { messageCenterKey } from "@/services/const/injection-symbol";

declare module 'vue' {
  /* 为app.config.globalProperties上挂载的属性写声明 */
  interface ComponentCustomProperties {
    [`$${messageCenterKey.description}`]: typeof MessageCenter
  }
}