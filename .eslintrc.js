module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['plugin:@vkontakte/eslint-plugin/default', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    requireConfigFile: false,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/no-duplicates': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['block-like', 'multiline-expression', 'let', 'const', 'debugger', 'cjs-import'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block-like',
          'multiline-expression',
          'let',
          'const',
          'debugger',
          'return',
          'continue',
        ],
      },
      {
        blankLine: 'any',
        prev: ['singleline-let', 'singleline-const'],
        next: ['singleline-let', 'singleline-const'],
      },
      { blankLine: 'always', prev: 'cjs-import', next: '*' },
      { blankLine: 'any', prev: 'cjs-import', next: 'cjs-import' },
    ],
  },
};
