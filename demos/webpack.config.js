const path = require('path');
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass');
const xEngine = require('@financial-times/x-engine/src/webpack');

module.exports = {
	mode: 'development',
	resolve: {
		modules: [__dirname + '/../node_modules'],
		descriptionFiles: ['package.json'],
		mainFields: ['browser', 'main'],
		mainFiles: ['main', 'index', 'main-client'],
	},
	plugins: [
		xEngine(),
		new PageKitSassPlugin({
			webpackImporter: true,
			includePaths: [
				// Legacy bower components imports don't refer to
				// dependencies using the "@financial-times/" scope
				path.resolve('./node_modules/@financial-times'),
			],
		}),
	],
	output: {
		path: __dirname + '/public/',
	},
	entry: {
		demo: './demos/src/demo',
		demoStyles: './demos/src/demo.scss',
	},
};
