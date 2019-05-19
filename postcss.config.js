module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 设置 转换 的 基数
      propList: ['*'], // 设置 哪些 css 属性需要转换
      selectorBlackList: [] // 设置哪些选择器要忽略
    }
  }
}
