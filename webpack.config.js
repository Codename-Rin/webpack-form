const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function webpackSettings(environment) {
	const prod = environment !== undefined && environment.production === true;
	return {
		entry: {
			bundle: ['./src/index.js']
		},
		output: {
			publicPath: '/',
			path: resolve(__dirname, './web'),
			filename: prod ? '[name].[chunkhash].js' : '[name].js',
		},
		devtool: prod ? 'source-map' : 'cheap-module-eval-source-map',
		devServer: {
			contentBase: './src/',
			progress: true,
			hot: true,
			inline: true,
			port: 3000
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: 'es2015',
							plugins: ['syntax-dynamic-import'],
						},
					},
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: ['babel-loader', 'eslint-loader'],
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader'],
					}),
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader'],
					}),
				},
				{
					test: /\.(json|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 20000,
							name: '[name].[ext]',
						},
					},
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		plugins: [
			new ExtractTextPlugin({
				filename: 'bundle.css',
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendors',
			}),
			new webpack.HotModuleReplacementPlugin()
		],
	};
};
