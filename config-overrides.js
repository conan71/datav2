const {
  override,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra')
const { aliyunTheme } = require('@ant-design/aliyun-theme')
// import aliyunTheme from '@ant-design/aliyun-theme'
const path = require('path')

//不暴露（eject）webpack配置的情况下使用less，alias别名
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // change importing css to less
  }),
  addLessLoader({
    // strictMath: true,
    noIeCompat: true,
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A', // for example, you use Ant Design to change theme color.
    },
    // modifyVars: aliyunTheme,
    cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
    cssModules: {
      // localIdentName: '[hash:base64:5]',
      localIdentName: '[name]__[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    },
  }),
  //https://github.com/arackaf/customize-cra/issues/207
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@image': path.resolve(__dirname, './src/assets/image'),
    '@less': path.resolve(__dirname, './src/assets/less'),
    '@common': path.resolve(__dirname, './src/common'),
    '@components': path.resolve(__dirname, './src/components'),
    '@containers': path.resolve(__dirname, './src/containers'),
    '@http': path.resolve(__dirname, './src/http'),
    '@redux': path.resolve(__dirname, './src/redux'),
    '@mock': path.resolve(__dirname, './src/mock'),
    '@routes': path.resolve(__dirname, './src/Routes'),
  })
)