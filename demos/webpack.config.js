const xEngine = require('@financial-times/x-engine/src/webpack');

module.exports = {
	mode: 'development',
	resolve: {
		modules: [__dirname + '/../node_modules'],
		descriptionFiles: ['package.json'],
		mainFields: ['browser', 'main'],
		mainFiles: ['main', 'index', 'main-client']
	},
	plugins: [
		xEngine()
	],
	output: {
		path: __dirname + '/public/'
	},
	entry: {
		'demo': './demos/src/demo'
	}
};
