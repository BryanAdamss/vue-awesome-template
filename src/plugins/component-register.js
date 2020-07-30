/**
 * @author GuangHui
 * @description 组件注册器
 */

import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  Popover,
  Button,
  Table,
  TableColumn,
  DatePicker,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tree,
  Icon,
  Row,
  Col,
  Progress,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Scrollbar
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import VueLazyload from 'vue-lazyload'

/**
 * element-ui组件注册器
 *
 * @export
 */
export function elementUiRegister() {
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Radio)
  Vue.use(RadioButton)
  Vue.use(RadioGroup)
  Vue.use(Checkbox)
  Vue.use(CheckboxButton)
  Vue.use(CheckboxGroup)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Popover)
  Vue.use(Button)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(DatePicker)
  Vue.use(Tooltip)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Tree)
  Vue.use(Icon)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Progress)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Scrollbar)

  Vue.component(CollapseTransition.name, CollapseTransition)
}

/**
 * VueLazyload注册器
 */
export function vueLazyloadReigster() {
  Vue.use(VueLazyload, {
    loading: require('Assets/img/loading.gif')
  })
}
