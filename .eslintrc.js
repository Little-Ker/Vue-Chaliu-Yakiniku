module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ['vue', 'prettier'],
  'extends': ['plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    indent: [2, 2], // 縮排規則，index[0] 的數字代表含意為 關閉(0), 警告(1), 錯誤(2)
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    quotes: [2, 'single'], // 單引號, 雙引號
    semi: [2, 'never'], // 將關於分號的檢查關掉
    'linebreak-style': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-console': 'off',
    'arrow-parens': [
      2,
      'as-needed',
      {
        requireForBlockBody: true,
      },
    ],
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-nested-ternary': 'off',
    'quote-props': [
      'error',
      'as-needed',
      {
        keywords: true,
        unnecessary: false,
      },
    ],
    'key-spacing': [1, { // 關於 key 的 ":" 前後是否有空格
      beforeColon: false,
      afterColon: true,
    }],
    'import/first': [0], // 雖說 import 都會先 Hoisting，在這些行數中間可否插入其他的變數或是函式 
    'object-property-newline': [2, { // Object 的撰寫規則，詳請請查閱官方文件
      allowAllPropertiesOnSameLine: false,
    }],
    'object-curly-newline': [1, { // Object 的撰寫規則，詳請請查閱官方文件
      ImportDeclaration: 'always',
      ExportDeclaration: 'never',
    }],
    'vue/html-indent': [1, 4, { // Vue 中的 html 的撰寫規則，詳請請查閱官方文件
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    'vue/html-closing-bracket-newline': [2, { // Vue 中的 html 的撰寫規則，詳請請查閱官方文件
      singleline: 'never',
      multiline: 'always',
    }],
    'vue/html-closing-bracket-spacing': [2, { // Vue 中的 html 的撰寫規則，詳請請查閱官方文件
      selfClosingTag: 'always',
    }],
  },
}
