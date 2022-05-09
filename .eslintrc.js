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
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // 允许依赖项为devDependencies
    'import/no-extraneous-dependencies': [
      'error',
      { peerDependencies: ['**/*.config.ts'] },
    ],
    // 'import/no-unresolved': ['error', { commonjs: true }],
    'import/no-unresolved': 0,
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 0,
  },
};
