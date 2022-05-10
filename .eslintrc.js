module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 开启setup语法糖环境
    'vue/setup-compiler-macros': true,
  },
  extends: [
    // 'plugin:vue/essential',// vue核心规范
    'plugin:vue/vue3-recommended', // vue3规范
    'airbnb-base',
    'prettier', // prettier规范,覆盖eslint格式配置,写在最后
    '.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 允许依赖项为devDependencies
    'import/no-extraneous-dependencies': [
      'error',
      { peerDependencies: ['**/*.config.ts'] },
    ],
    'import/no-unresolved': 0, // 关闭检查未解析的模块
    'vue/multi-word-component-names': 0, // 禁止使用多单词组件名
    'no-unused-vars': 0, // 关闭未使用变量检查
    'no-param-reassign': 0, // 禁止对函数参数进行重新赋值
  },
};
