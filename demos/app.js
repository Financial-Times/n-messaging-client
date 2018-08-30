/* eslint no-console:0 */
'use strict';

const { resolve } = require('path');
const chalk = require('chalk');
const express = require('@financial-times/n-internal-tool');
const proxy = require('./proxy-controller');

const app = module.exports = express({
	name: 'public',
	systemCode: 'n-messaging-client-demo',
	withFlags: true,
	withHandlebars: true,
	withNavigation: false,
	withAnonMiddleware: false,
	hasHeadCss: false,
	layoutsDir: resolve(__dirname,'./templates/layouts'),
	viewsDirectory: '/demos/templates',
	partialsDirectory: resolve(__dirname, '../public'),
	directory: process.cwd(),
	helpers: {
		nMessagingPresenter: require('../main').presenter
	},
	demo: true,
	s3o: false
});

app.locals.origami = {
	css: 'o-header@7.2.8',
	js: 'o-header@7.2.8'
};

app.all('/__message/:id?', proxy(process.env.GURU_HOST || 'https://www.ft.com'));
app.post('/email-app-links', (req, res) => {res.sendStatus(200);});

app.get('/*', (req, res) => {
	if (process.env.GURU_HOST) res.locals.guruEndpoint = process.env.GURU_HOST;
	res.render('index',{ layout: 'custom-vanilla', title: 'Demo' });
});

const PORT = process.env.PORT || 5050;

const listen = app.listen(PORT);

function runPa11yTests () {
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data) => {
		console.log(chalk.bold.green(`${data}`)); //eslint-disable-line
	});

	pa11y.stderr.on('data', (error) => {
		console.log(chalk.bold.red(`${error}`)); //eslint-disable-line
	});

	pa11y.on('close', (code) => {
		process.exit(code);
	});
}

listen
	.then(() => console.log(`demo running on port ${PORT}. ENSURE YOU ACCESS VIA LOCAL.FT.COM TO USE COOKIES.`))
	.catch(error => console.log(error));

if (process.env.PA11Y === 'true') {
	listen.then(runPa11yTests);
}
