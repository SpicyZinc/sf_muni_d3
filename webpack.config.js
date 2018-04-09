const webpack = require('webpack');

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.js' // entry point to bundle all of its imported js files and then transpile from here
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}, {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }, {
            	test: /\.js$/,
            	exclude: /node_modules/,
            	use: ['babel-loader', 'eslint-loader']
            }
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: './dist',
		hot: true
	}
};