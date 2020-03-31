var path=require('path');
var webpack=require('webpack');
// 该方法用于返回一个拼接的绝对路径
function resolve(dir) {
    // _dirname是指vue.config.js所在目录
    return path.join(__dirname, dir)
  }
module.exports={
    lintOnSave: false,// 保存时不用eslint进行检查
    assetsDir: 'static',
    publicPath: './',
    devServer:{
      port:8800,
      /* proxy:{

      } */
    },
    pages:{
      //配置多页面,chunks指定在页面内引入哪些js文件
      index:{
        entry:"./src/views/main/main.js",
        template:"./public/index.html",
        filename:"index.html",
        chunks:['chunk-vendors','chunk-common','index']
      },
      client:{
        entry:"./src/views/client/client.js",
        template:"./public/client.html",
        filename:"client.html",
        chunks:['chunk-vendors','chunk-common','client']
      }
    },
    outputDir: 'dist',
    configureWebpack:{
        plugins: [
            // 这样当 webpack 碰到 require 的第三方库中出现全局的$、jQeury和window.jQuery 时，
            // 就会使用 node_module 下 jquery 包 export 出来的东西了。
            new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery',
              'windows.jQuery': 'jquery',
              Popper: ['popper.js', 'default']
            })
          ]
    },
    chainWebpack:config=>{
        config.resolve.alias
        .set('~@', resolve('src'))
        .set('component', resolve('src/component'))
    }
}