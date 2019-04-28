# Vuex

## 安装

- Vuex 依赖 Promise。如果你支持的浏览器并没有实现 Promise (比如 IE)，那么你可以使用一个 polyfill 的库，例如 es6-promise

## 什么情况需要 Vuex

- 相互嵌套的组件多，需要相互共享、传递数据时。
  - 简单方案:EventBus、provide/inject、inheritAttrs/$attrs/$listeners 或者手动实现一个订阅者模式

## 概念

- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
  - Vuex 的状态存储是响应式的。当组件从 store 中获取状态后，后期只要状态变更了，组件就会自动更新 DOM
  - 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。

### State

- Vuex 单一状态树

  - 一个对象包含了全部的应用状态
  - **单例模式：每个应用将仅仅包含一个 store 实例**

- 在 Vue 组件中获得 Vuex 状态

  - 在计算属性中返回某个状态

  ```javascript
  // app.vue
  const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: { Counter },
    template: `
      <div class="app">
        <counter></counter>
      </div>
    `
  })

  // counter.vue
  const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
      count() {
        return this.$store.state.count
      }
    }
  }
  ```

  - **实际生产中，一般不直接获取 State，而是通过 Getter 间接获取 State**
  - mapState

    - 使用 mapState 辅助函数帮助我们生成计算属性（将状态映射成计算属性）
    - mapState 返回的是一个对象，对象中包含了获取对应状态的方法定义，所以合适用 computed 接收

    ```javascript
    // 在单独构建的版本中辅助函数为 Vuex.mapState
    import { mapState } from 'vuex'

    export default {
      // ...
      computed: mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,

        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState(state) {
          return state.count + this.localCount
        }
      })
    }

    // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    computed: mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ])

    // 合并现有computed，使用对象展开运算符
    computed: {
      localComputed () { /* ... */ },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState({
        // ...
      })
    }
    ```

### Getter

- 派生状态

  - 基于原始状态，派生出一些新状态(类似计算属性)

  ```javascript
  const store = new Vuex.Store({
    state: {
      todos: [
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ]
    },
    getters: {
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      }
    }
  })
  ```

  - 每个 getter 在调用时会被传入 state 和 getters

    - state 包含了当前所有原始状态，等价 store.state
    - getters 包含了当前所有 getters，等价 store.getters

  - 传参给 Getter
    - 让 getter 返回一个函数，来实现给 getter 传参
    ```javascript
    getters: {
      // ...
      getTodoById: state => id => {
        return state.todos.find(todo => todo.id === id)
      }
    }
    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
    // 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
    ```
  - mapGetters

    - 返回一个对象，包含获取 Getter 的方法定义，所以合适用 computed 接收

    ```javascript
    import { mapGetters } from 'vuex'

    export default {
      // ...
      computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
          'doneTodosCount',
          'anotherGetter'
          // ...
        ])
      }
    }

    // 如果你想将一个 getter 属性另取一个名字，使用对象形式：
    mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
    ```

### Mutation

- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

  - 每个 mutation 都像一个事件处理器

    - 有一个事件类型 type 和一个回调函数 handler

    ```javascript
    const store = new Vuex.Store({
      state: {
        count: 1
      },
      // 声明有哪些mutation
      mutations: {
        // 这里的函数名increment相当于事件中的事件类型type
        increment(state) {
          // 函数体相当于事件中的回调handler
          // 变更状态
          state.count++
        }
      }
    })

    // 提交mutation
    // 相当于触发某一事件类型（increment），将会自动调用对应的回调handler
    store.commit('increment')
    ```

- 每个 mutation 在调用时会被传入 state 和 payload

  - state 包含了当前所有原始状态，等价 store.state
  - payload 为额外参数

- 提交载荷(Payload)

  - 可理解为提交 mutation 时的额外参数

  ```javascript
  // 例子1，普通Payload
  mutations: {
    increment (state, n) {
      state.count += n
    }
  }
  store.commit('increment', 10)

  // 例子2，对象Payload
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  }
  store.commit('increment', {
    amount: 10
  })

  // 例子3，对象风格的提交方式
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  }

  store.commit({
    type: 'increment',
    amount: 10
  })
  ```

- mapMutations

  - mapMutations，返回的是一个对象，包含 mutation 定义，而 mutation 更像一个方法，所以使用 methods 接收合适。

  ```javascript
  import { mapMutations } from 'vuex'

  export default {
    // ...
    methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  }
  ```

- Mutation 需遵守 Vue 的响应规则

  - 最好提前在你的 store 中初始化好所有所需属性。
  - 当需要在对象上添加新属性时，你应该
  - 使用 Vue.set(obj, 'newProp', 123), 或者
  - 以新对象替换老对象（扩展运算符）

- 使用常量替代 Mutation 事件类型

  - 单独创建一个 mutation-types.js 保存整个 APP 的 mutation 类型
  - 方便 eslint，方便他人查看

  ```javascript
  // mutation-types.js
  export const SOME_MUTATION = 'SOME_MUTATION'
  // store.js
  import Vuex from 'vuex'
  import { SOME_MUTATION } from './mutation-types'

  const store = new Vuex.Store({
    state: { ... },
    mutations: {
      // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
      [SOME_MUTATION] (state) {
        // mutate state
      }
    }
  })
  ```

- mutation 必须是同步函数
  - 调试工具无法准确捕捉到每次记录，难以调试
  - 异步操作可以使用 action 完成

### Action

- Action 类似于 mutation，不同在于：

  - Action 通过提交 mutation 来变更状态，而不是直接变更状态。所以 vuex 中唯一能改变状态的方法就是提交 mutation
  - Action 可以包含任意异步操作。

- 每个 action 在被调用时，会被传入一个 context 对象和 payload

  - context 为一个对象，包含以下属性，可利用解构提取
    - state, // 等同于 `store.state`，若在模块中则为局部状态
    - rootState, // 等同于 `store.state`，只存在于模块中
    - commit, // 等同于 `store.commit`
    - dispatch, // 等同于 `store.dispatch`
    - getters, // 等同于 `store.getters`
    - rootGetters // 等同于 `store.getters`，只存在于模块中
  - payload 为额外参数

- Action 定义及派发

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})

store.dispatch('incrementAsync')

// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

- mapActions

  - 返回的是一个对象，包含 action 定义，而 action 更像一个方法，所以使用 methods 接收合适。

  ```javascript
  import { mapActions } from 'vuex'

  export default {
    // ...
    methods: {
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

        // `mapActions` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ]),
      ...mapActions({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    }
  }
  ```

- 组合 Action

  - 返回 promise

  ```javascript
  actions: {
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      })
    }
  }

  store.dispatch('actionA').then(() => {
    // ...
  })

  // 在另外一个 action 中也可以：

  actions: {
    // ...
    actionB ({ dispatch, commit }) {
      return dispatch('actionA').then(() => {
        commit('someOtherMutation')
      })
    }
  }
  ```

### 小总结

- state
  - 原始状态
  - mapState 结合 computed 使用
- getters

  - 基于原始状态派生的一些状态，类似计算属性
  - mapGetters 结合 computed 使用
  - 每个 getter 在调用时会被传入 state 和 getters
    - state 包含了当前所有原始状态，等价 store.state
    - getters 包含了当前所有 getters，等价 store.getters

- mutations

  - 用来变更某一原始状态，不能直接变更派生状态 getter
  - 通过 commit 提交 mutation
  - mutation 中做的任务一般为同步任务，且较为简单
  - mapMutations 结合 methos 使用
  - 每个 mutation 在调用时会被传入 state 和 payload
    - state 包含了当前所有原始状态，等价 store.state
    - payload 为额外参数

- actions
  - 负责复杂的异步任务
  - 不能直接变更原始状态，需要提交 mutation 来变更原始状态
  - mapActions 结合 methods 使用
  - 每个 action 在被调用时，会被传入一个 context 对象和 payload
    - context 为一个对象，包含以下属性，可利用解构提取
      - state, // 等同于 `store.state`，若在模块中则为局部状态
      - rootState, // 等同于 `store.state`，只存在于模块中
      - commit, // 等同于 `store.commit`
      - dispatch, // 等同于 `store.dispatch`
      - getters, // 等同于 `store.getters`
      - rootGetters // 等同于 `store.getters`，只存在于模块中
    - payload 为额外参数

### Module

- 复杂应用中，Vuex 允许将 store 切割成模块

  - 注意并不是创建了另外一个 store，全局中仍然只有一个 store，因为其是单例模式

- 拆分成的模块依旧包含 state、getters、mutations、actions

```javascript
const moduleA = {
  state: {...},
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
   state: {
    test:'cgh'
   },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  // 定义模块
  modules: {
    a: moduleA,
    b: moduleB
  }
})

// 引用模块
store.state.a // -> 访问moduleA 的所有状态
store.state.b.test // -> 访问moduleB 的某一状态，不必store.state.b.state.test
```

- 模块内部的局部状态

  - 模块内部定义的 mutation、getter 接受到的第一个参数是**模块的局部状态对象**
    - 可通过 第三个参数 rootState 访问到根节点状态
  - 模块内部定义的 action 接受到的 context.state 也是**模块的局部状态对象**
    - 可通过 context.rootState 访问到根节点状态

  ```javascript
  const moduleA = {
    // 模块内局部状态
    state: {
      count: 0
    },
    mutations: {
      increment(state) {
        // 这里的 `state` 对象是模块的局部状态
        state.count++
      }
    },
    getters: {
      doubleCount(state, getters, rootState) {
        return state.count * 2
      }
    },
    actions: {
      incrementIfOddOnRootSum({ state, commit, rootState }) {
        if ((state.count + rootState.count) % 2 === 1) {
          commit('increment')
        }
      }
    }
  }
  ```

- 命名空间

  - 默认情况下，**模块内部的 action、mutation 和 getter 是注册在全局命名空间的**——这样使得多个模块能够对同一 mutation 或 action 作出响应。
  - 注意**模块内部的状态仍然是挂在对应模块内部的，而不是在根状态节点上。即 store.state.moduleA.cgh 而不是 store.state.cgh**
  - 可以给模块添加 namespaced:true ，让其成为一个带命名空间的模块
    - 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。
    - **模块 A 使用 namespaced:true 后,A 内再嵌套模块 B 时，模块 B 会默认继承父模块 A 的命名空间**
      - 如下面例子中的 `getters['account/profile']`
      - 当模块 B 再添加 namespaced:true,模块 B 会在默认继承 A 的命名空间前提下，再添加自己的命名空间
      - 如下面例子中的 `getters['account/posts/popular']`

  ```javascript
  const store = new Vuex.Store({
    modules: {
      account: {
        namespaced: true,

        // 模块内容（module assets）
        state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
        getters: {
          isAdmin () { ... } // -> getters['account/isAdmin']
        },
        actions: {
          login () { ... } // -> dispatch('account/login')
        },
        mutations: {
          login () { ... } // -> commit('account/login')
        },

        // 嵌套模块
        modules: {
          // 继承父模块的命名空间
          myPage: {
            state: { ... },
            getters: {
              profile () { ... } // -> getters['account/profile']
            }
          },

          // 进一步嵌套命名空间
          posts: {
            namespaced: true,

            state: { ... },
            getters: {
              popular () { ... } // -> getters['account/posts/popular']
            }
          }
        }
      }
    }
  })
  ```

  - 启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit 参数，即**在模块内部提交模块内部的 mutation、派发内部的 action、获取内部的 getter 时，不需要添加额外的空间名前缀(vuex 隐式帮我们添加了空间前缀，会默认获取模块内的资源)**。更改 namespaced 属性后也不需要修改模块内的代码。

  - 在带命名空间的模块内访问全局内容
    - 如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
    - 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。

  ```javascript
  modules: {
    foo: {
      namespaced: true,

      getters: {
        // 在这个模块的 getter 中，`getters` 被局部化了
        // 你可以使用 getter 的第四个参数来调用 `rootGetters`
        someGetter (state, getters, rootState, rootGetters) {
          getters.someOtherGetter // -> 'foo/someOtherGetter'
          rootGetters.someOtherGetter // -> 'someOtherGetter'
        },
        someOtherGetter: state => { ... }
      },

      actions: {
        // 在这个模块中， dispatch 和 commit 也被局部化了
        // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
        someAction ({ dispatch, commit, getters, rootGetters }) {
          getters.someGetter // -> 'foo/someGetter'
          rootGetters.someGetter // -> 'someGetter'

          dispatch('someOtherAction') // -> 'foo/someOtherAction'
          dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

          commit('someMutation') // -> 'foo/someMutation'
          commit('someMutation', null, { root: true }) // -> 'someMutation'
        },
        someOtherAction (ctx, payload) { ... }
      }
    }
  }
  ```

  - 在带命名空间的模块注册全局 action

    - 若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。

    ```javascript
    {
      actions: {
        someOtherAction ({dispatch}) {
          dispatch('someAction')
        }
      },
      modules: {
        foo: {
          namespaced: true,

          actions: {
            someAction: {
              root: true,
              handler (namespacedContext, payload) { ... } // -> 'someAction'
            }
          }
        }
      }
    }
    ```

  - 带命名空间的 mapState、mapGetters、mapMutations、mapActions 辅助函数

  ```javascript
  computed: {
    ...mapState({
      a: state => state.some.nested.module.a,
      b: state => state.some.nested.module.b
    })
  },
  methods: {
    ...mapActions([
      'some/nested/module/foo', // -> this['some/nested/module/foo']()
      'some/nested/module/bar' // -> this['some/nested/module/bar']()
    ])
  }

  // 可将命名空间做为第一个参数传递给辅助函数
  computed: {
    ...mapState('some/nested/module', {
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    ...mapActions('some/nested/module', [
      'foo', // -> this.foo()
      'bar' // -> this.bar()
    ])
  }

  // 可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数
  import { createNamespacedHelpers } from 'vuex'

  const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

  export default {
    computed: {
      // 在 `some/nested/module` 中查找
      ...mapState({
        a: state => state.a,
        b: state => state.b
      })
    },
    methods: {
      // 在 `some/nested/module` 中查找
      ...mapActions([
        'foo',
        'bar'
      ])
    }
  }
  ```

  - 模块动态注册

    - 在 store 创建之后，你可以使用 store.registerModule 方法注册模块
    - 可以使用 store.unregisterModule(moduleName) 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。

    ```javascript
    // 注册模块 `myModule`
    store.registerModule('myModule', {
      // ...
    })
    // 注册嵌套模块 `nested/myModule`
    store.registerModule(['nested', 'myModule'], {
      // ...
    })
    ```

    - 注册一个新 module 时，你很有可能想保留过去的 state
      - 可以通过 preserveState 选项将其归档：store.registerModule('a', module, { preserveState: true })。

### 插件

- 内置 logger 插件

```javascript
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  plugins: debug ? [createLogger()] : [] // * 开发模式启用log工具
})
```

### 严格模式

- 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到

```javascript
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug
})
```

### 表单处理

- 在严格模式，在属于 vuex 的 state 上使用 v-model 会报错(没有通过 commit 提交 mutation 而直接改变了状态)

  - 可以将 v-model 使用原始方法实现(:value+@input)

  ```javascript
  <input :value="message" @input="updateMessage">

  // ...
  computed: {
    ...mapState({
      message: state => state.obj.message
    })
  },
  methods: {
    updateMessage (e) {
      this.$store.commit('updateMessage', e.target.value)
    }
  }

  // store
  mutations: {
    updateMessage (state, message) {
      state.obj.message = message
    }
  }
  ```

  - 使用带有 setter 的双向绑定计算属性(推荐)

  ```javascript
  <input v-model="message">

  // ...
  computed: {
    message: {
      get () {
        return this.$store.state.obj.message
      },
      set (value) {
        this.$store.commit('updateMessage', value)
      }
    }
  }
  ```
