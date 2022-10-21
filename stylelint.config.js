module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'max-empty-lines': 1,
    'color-no-invalid-hex': true,
    'color-hex-case': 'lower',
    'block-no-empty': null,
    'no-empty-source': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [':export'],
      },
    ],
    'property-case': [
      'lower',
      {
        ignoreSelectors: [':export'],
      },
    ],
  },
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/*.gif',
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.svg',
    '**/*.ttf',
    '**/*.woff',
    '**/*.json',
    '**/*.md',
    '**/*.html',
  ],
}

// 以忽略整個檔案
/* stylelint-disable */
// 忽略下一行
/* stylelint-disable-next-line */
// 指定需要忽略的文件
// ignoreFiles: ["src/assets/scss/abc.scss"];
