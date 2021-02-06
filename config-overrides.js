const {
	override,
	addWebpackAlias,
	addLessLoader
} = require('customize-cra')
const path = require('path')

//不暴露（eject）webpack配置的情况下使用less，alias别名
module.exports = override(
	addLessLoader({
		strictMath: true,
		noIeCompat: true,
		javascriptEnabled: true,
		cssLoaderOptions: {
			modules: {
				localIdentName: '[name]_[local]_[hash:base64:5]'
			},
		}, // .less file used css-loader option, not all CSS file.
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