const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    // 告诉 Jest 处理 `*.vue` 文件
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // webpack配置了路径别名，jest中也同样需要配置
    '^Api/(.*)$': '<rootDir>/src/api/$1',
    '^Assets/(.*)$': '<rootDir>/src/assets/$1',
    '^Base/(.*)$': '<rootDir>/src/base/$1',
    '^Config/(.*)$': '<rootDir>/src/config/$1',
    '^Components/(.*)$': '<rootDir>/src/components/$1',
    '^Directives/(.*)$': '<rootDir>/src/directives/$1',
    '^Routes/(.*)$': '<rootDir>/src/routes/$1',
    '^Sass/(.*)$': '<rootDir>/src/sass/$1',
    '^Store/(.*)$': '<rootDir>/src/store/$1',
    '^Services/(.*)$': '<rootDir>/src/services/$1',
    '^Plugins/(.*)$': '<rootDir>/src/plugins/$1',
    '^Views/(.*)$': '<rootDir>/src/views/$1',
    '^Utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  transform: {
    // 用 `babel-jest` 处理 js测试文件
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    // 用 `vue-jest` 处理 `*.vue` 文件
    // vue-jest 目前并不支持 vue-loader 所有的功能，比如自定义块和样式加载。额外的，诸如代码分隔等 webpack 特有的功能也是不支持的。如果要使用这些不支持的特性，你需要用 Mocha 取代 Jest 来运行你的测试，同时用 webpack 来编译你的组件。
    // https://vue-test-utils.vuejs.org/zh/guides/#%E7%94%A8-jest-%E6%B5%8B%E8%AF%95%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  // jest会自动查找.spec.js、.test.js测试文件，所以需要e2e的测试文件
  testPathIgnorePatterns: ['<rootDir>/test/e2e'],
  snapshotSerializers: [
    // 配置使用jest-serializer-vue序列化快照html
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  setupFiles: [
    // 配置setup文件目录
    '<rootDir>/test/unit/setup'
  ],
  // mapCoverage已经被遗弃，直接注释即可
  // mapCoverage: true,
  // 配置覆盖度报告输出目录
  coverageDirectory: '<rootDir>/test/unit/coverage',
  // 覆盖度收集范围
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
  // 配置testURL，解决jest SecurityError: localStorage is not available for opaque origins错误,在jest 24.9版本已经默认设置为http://localhost，所以这个可以不用设置
  // testURL: 'http://localhost'
}
