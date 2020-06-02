module.exports = {
  root: true,
  extends: '@react-native-community',
  bracketSpacing: true,
  //强制使用单引号
  quotes: ['error', 'single'],
  //强制不使用分号结尾
  semi: ['error', 'never'],
  // 关闭冲突规则
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      trailingComma: 'none',
      bracketSpacing: true,
      jsxBracketSameLine: true,
      parser: 'flow',
    },
  ],
}
