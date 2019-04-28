# Javascript 编码规范

## 目录

- [基本规则](#%E5%9F%BA%E6%9C%AC%E8%A7%84%E5%88%99)
- [格式](#%E6%A0%BC%E5%BC%8F)
- [命名](#%E5%91%BD%E5%90%8D)
- [语言特性](#%E8%AF%AD%E8%A8%80%E7%89%B9%E6%80%A7)
  - [变量声明](#%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E)
    - [使用 const 和 let 代替 var](#%E4%BD%BF%E7%94%A8const%E5%92%8Clet%E4%BB%A3%E6%9B%BFvar)
    - [按需声明变量，声明之后尽快初始化](#%E6%8C%89%E9%9C%80%E5%A3%B0%E6%98%8E%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E%E4%B9%8B%E5%90%8E%E5%B0%BD%E5%BF%AB%E5%88%9D%E5%A7%8B%E5%8C%96)
  - [数组](#%E6%95%B0%E7%BB%84)
    - [数组的尾逗号](#%E6%95%B0%E7%BB%84%E7%9A%84%E5%B0%BE%E9%80%97%E5%8F%B7)
    - [解构赋值](#%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
    - [[RECOMMENDED]使用扩展操作符代替 Array.prototype 上的一些方法。](#recommended%E4%BD%BF%E7%94%A8%E6%89%A9%E5%B1%95%E6%93%8D%E4%BD%9C%E7%AC%A6%E4%BB%A3%E6%9B%BFarrayprototype%E4%B8%8A%E7%9A%84%E4%B8%80%E4%BA%9B%E6%96%B9%E6%B3%95)
    - [[RECOMMENDED]使用 Array.from 方法来将类数组转换成真正的数组](#recommended%E4%BD%BF%E7%94%A8arrayfrom%E6%96%B9%E6%B3%95%E6%9D%A5%E5%B0%86%E7%B1%BB%E6%95%B0%E7%BB%84%E8%BD%AC%E6%8D%A2%E6%88%90%E7%9C%9F%E6%AD%A3%E7%9A%84%E6%95%B0%E7%BB%84)
  - [对象](#%E5%AF%B9%E8%B1%A1)
    - [对象的尾逗号](#%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B0%BE%E9%80%97%E5%8F%B7)
    - [方法和属性的简写](#%E6%96%B9%E6%B3%95%E5%92%8C%E5%B1%9E%E6%80%A7%E7%9A%84%E7%AE%80%E5%86%99)
    - [对象的解构赋值](#%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
  - [字符串](#%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [使用字符串模板](#%E4%BD%BF%E7%94%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%A8%A1%E6%9D%BF)
  - [类](#%E7%B1%BB)
    - [构造函数](#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
    - [计算属性](#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)
    - [不要重复定义类的成员](#%E4%B8%8D%E8%A6%81%E9%87%8D%E5%A4%8D%E5%AE%9A%E4%B9%89%E7%B1%BB%E7%9A%84%E6%88%90%E5%91%98)
  - [函数](#%E5%87%BD%E6%95%B0)
    - [使用剩余参数来代替 arguments](#%E4%BD%BF%E7%94%A8%E5%89%A9%E4%BD%99%E5%8F%82%E6%95%B0%E6%9D%A5%E4%BB%A3%E6%9B%BFarguments)
    - [使用默认参数](#%E4%BD%BF%E7%94%A8%E9%BB%98%E8%AE%A4%E5%8F%82%E6%95%B0)
    - [默认值参数要放到函数参数列表的末尾](#%E9%BB%98%E8%AE%A4%E5%80%BC%E5%8F%82%E6%95%B0%E8%A6%81%E6%94%BE%E5%88%B0%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%88%97%E8%A1%A8%E7%9A%84%E6%9C%AB%E5%B0%BE)
    - [箭头函数](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)
  - [不要直接修改函数的入参](#%E4%B8%8D%E8%A6%81%E7%9B%B4%E6%8E%A5%E4%BF%AE%E6%94%B9%E5%87%BD%E6%95%B0%E7%9A%84%E5%85%A5%E5%8F%82)
    - [生成器函数](#%E7%94%9F%E6%88%90%E5%99%A8%E5%87%BD%E6%95%B0)
  - [模块](#%E6%A8%A1%E5%9D%97)
    - [使用模块](#%E4%BD%BF%E7%94%A8%E6%A8%A1%E5%9D%97)
    - [模块导入](#%E6%A8%A1%E5%9D%97%E5%AF%BC%E5%85%A5)
    - [不要导出可变绑定](#%E4%B8%8D%E8%A6%81%E5%AF%BC%E5%87%BA%E5%8F%AF%E5%8F%98%E7%BB%91%E5%AE%9A)
    - [优先使用默认导出](#%E4%BC%98%E5%85%88%E4%BD%BF%E7%94%A8%E9%BB%98%E8%AE%A4%E5%AF%BC%E5%87%BA)
    - [import 语句放在文件的开头](#import%E8%AF%AD%E5%8F%A5%E6%94%BE%E5%9C%A8%E6%96%87%E4%BB%B6%E7%9A%84%E5%BC%80%E5%A4%B4)
    - [不要在 import 中使用 webpack 的 loader 语法](#%E4%B8%8D%E8%A6%81%E5%9C%A8import%E4%B8%AD%E4%BD%BF%E7%94%A8webpack%E7%9A%84loader%E8%AF%AD%E6%B3%95)

## 语言特性

### 变量声明

#### 使用 const 和 let 代替 var

[MUST]声明本地变量时，使用 const 和 let，不要使用 var，同时默认使用 const，如果变量需要重新赋值，则使用 let 代替。

#### 按需声明变量，声明之后尽快初始化

[RECOMMENDED]本地变量不要习惯性的在它们所包含代码块的起始处就进行声明，而应该在接近第一次使用之前进行声明，来减小他们的作用域。

### 数组

#### 数组的尾逗号

[MUST]在使用多行形式定义数组时，在最后一个成员之后添加逗号。

```javascript
const chapters = [chapterOne, chapterTwo, chapterThree]
```

#### 解构赋值

[MUST]数组赋值时可以  通过  解构赋值从一个数组或迭代器中获取多个值，可以配合扩展运算符一起使用。对不需要关注的元素应该要省略。

```javascript
const [a, b, c, ...rest] = [1, 2, 3, 4, 5, 6]
const [x, , y, , z] = [1, 2, 3, 4, 5, 6]
```

#### [RECOMMENDED]使用扩展操作符代替 Array.prototype 上的一些方法。

```javascript
// 数组拷贝
const itemsCopy = [...items]

// 数组合并，代替Array.prototype.concat
const itemsConcat = [...arrayOne, ...arrayTwo]
```

#### [RECOMMENDED]使用 Array.from 方法来将类数组转换成真正的数组

```javascript
const foo = document.querySelectorAll('.foo')
const nodes = Array.from(foo)
```

### 对象

#### 对象的尾逗号

[MUST]在使用多行形式定义对象字面时，最后一个键值对之后添加逗号。

```javascript
const components = {
  componentOne,
  componentTwo,
  componentThree
}
```

#### 方法和属性的简写

[MUST]在定义对象时，可以使用  方法和属性的简写形式。

```javascript
// 非简写
const atom = {
  addValue: function(value) {
    return atom.value + value
  }
}

const obj = {
  lukeSkywalker: lukeSkywalker
}

// 简写
const atom = {
  addValue(value) {
    return atom.value + value
  }
}

const obj = {
  lukeSkywalker
}
```

这里需要注意，如果使用函数的简写形式或原 function 的形式，其中 this 是指所处的对象本身，但如果是使用箭头函数，那 this 是指向该对象外的作用域

#### 对象的解构赋值

[RECOMMENDED]对象解构赋值与数组的解构赋值类似，不同点在于它是根据 key 来进行赋值的，与位置没关系。

```javascript
const obj = {
  first: 'hello',
  last: 'world'
}
const { first: f, last: l } = obj
// 此时f的值为'hello'，l的值为'world'
```

对象的解构赋值也可用于函数的参数，但尽量使用简单的（只是有一个层级），不要使用有复杂的几层嵌套的属性。此外，关于默认值也与数组的解构赋值类似，形式如下：

```javascript
function destructured(ordinary, { num = 1, str = 'some default' } = {}) {
  // ...
}
```

### 字符串

#### 使用字符串模板

[MUST]当需要动态拼接字符串时，比如字符串中包括一个变量，可以使用字符串模板。

```javascript
function sayHi(name) {
  return `How are you, ${name}?`
}
```

### 类

#### 构造函数

[RECOMMENDED]使用 class 来定义类及类的方法，不要使用旧语法及直接操作 prototype。

[MUST]构造函数是可选的，子类的构造函数中，在设置任何字段或访问 this 之前必须调用 super()。

[MUST]在进行类的继承操作时，使用 extends。如果没为类指定构造函数，它会默认添加一个，所以在定义子类时，如果构造函数为空或其内容仅仅是调用父类的构造方法（super），则可以直接省略。

```javascript
class Jedi {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

class SubJedi extends Jedi {}
```

#### 计算属性

[MUST]只有 symbol 类型的计算属性可以在类中使用，对于逻辑上支持迭代的类，应当定义[Symbol.iterator]方法。

#### 不要重复定义类的成员

[MUST]重复定义类的成员后会静默选择最后一个定义。

### 函数

#### 使用剩余参数来代替 arguments

[RECOMMENDED]剩余参数在语义和可读性上更好，而且它本身就是一个数组，不像 arguments 是一个类数组。

#### 使用默认参数

[RECOMMENDED]使用参数的  默认值语法代替在函数体内对参数的操作来进行默认值的处理。

```javascript
// bad
function handleThings(opts) {
  opts = opts || {}
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

#### 默认值参数要放到函数参数列表的末尾

[MUST]函数的参数列表中，要将默认值参数放在列表的最后部分。

```javascript
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

#### 箭头函数

[RECOMMENDED]推荐使用箭头函数来代替 function 声明式的函数，特别是作为一个嵌套函数时。

```javascript
// bad
;[1, 2, 3].map(function(x) {
  const y = x + 1
  return x * y
})

// good
;[1, 2, 3].map(x => {
  const y = x + 1
  return x * y
})
```

[MUST]如果函数的参数只有一个，参数可以省略括号，也可以保留，但代码风格必须保持统一。

[RECOMMENDED]如果函数体只是单语句表达式，可以省略包裹函数体的大括号并使用隐式的 return

```javascript
// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good，单句表达式，省略大括号并使用隐式return
[1, 2, 3].map(number => `A string containing the ${number}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// 当返回的是一个对象字面量时，要用括号括起来
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));
```

### 不要直接修改函数的入参

[MUST]不要直接修改函数的入参，这可能会造成意料之外的副作用，而且可读性不好，可以使用返回值来代替。

#### 生成器函数

[MUST]在原生环境不支持的情况下（浏览器端），不要使用生成器函数，即使你使用了 babel 之类的工具进行转换。

### 模块

#### 使用模块

[RECOMMENDED]使用 ES6 的模块系统，使用 import/export 导入导出模块（node 环境尚不支持此语法， 建议保留其自身的模块语法）。

#### 模块导入

[RECOMMENDED]不要使用  通配符的方式进行模块导入，这可以有效的保证你在导出模块时，会有一个默认导出（export default）。

```javascript
// bad
import * as request from './request'

// good
import request from './request'
```

[MUST]从同一个模块引入的内容使用一条 import 语句。

```javascript
// bad
import foo from 'foo'
// … some other imports … //
import { named1, named2 } from 'foo'

// good
import foo, { named1, named2 } from 'foo'
```

#### 不要导出可变绑定

[MUST]除特殊场景，导出的内容都要求是一个常量引用。

```javascript
// bad
let foo = 3;
export { foo };

// good
const foo = 3;
export { foo };
```

#### 优先使用默认导出

[RECOMMENDED]如果一个模块中只一处导出，则使用默认导出代替具名导出，这样可以代码的可读性和可维护。

#### import 语句放在文件的开头

[MUST]import 语句存在声明提升，所以应将模块引入语句集成中在文件的起始部分。
