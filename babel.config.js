// babel 配置文件
var prodPlugin = [];
if (process.env.NODE_ENV == 'production') {
  // 生产环境下配置
  // 自动清理打印日志
  prodPlugin.push([
    'transform-remove-console',
    {
      exclude: ['error', 'warn']
    }
  ])
} else {
  // 开发环境下配置
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodPlugin
  ]
}
