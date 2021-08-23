/**
 * @author GuangHui
 * @description EventBus
 */

import Vue from 'vue'

import { GLOBAL_NAME_SPACE } from 'Config'

const eventBus =
  window[GLOBAL_NAME_SPACE] && window[GLOBAL_NAME_SPACE].$bus
    ? window[GLOBAL_NAME_SPACE].$bus
    : new Vue()

export  { eventBus }
