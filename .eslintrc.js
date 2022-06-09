module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 开启setup语法糖环境
    'vue/setup-compiler-macros': true,
  },
  extends: [
    // 'plugin:vue/essential',// vue核心规范
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended', // vue3规范
    'prettier', // prettier规范,覆盖eslint格式配置,写在最后
    '.eslintrc-auto-import.json',
  ],
  // 针对特定文件重写eslint规则
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        'no-use-before-define': 0,
      },
    },
  ],
  // 支持ts的最新语法
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  // 添加vue和@typescript-eslint插件，增强eslint的能力
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-extraneous-dependencies': 0, // 禁止使用无关的包
    'import/no-unresolved': 0, // 关闭检查未解析的模块
    'vue/multi-word-component-names': 0, // 禁止使用多单词组件名
    'no-unused-vars': 0, // 关闭未使用变量检查
    'no-param-reassign': 0, // 禁止对函数参数进行重新赋值
    '@typescript-eslint/no-empty-function': 0, // 禁止空函数
  },
}
