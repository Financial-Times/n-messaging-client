import express from 'express';
import cookieParser from 'cookie-parser';
import {PageKitHandlebars} from '@financial-times/dotcom-server-handlebars/dist/node/PageKitHandlebars';
import ifEquals from '@financial-times/dotcom-server-handlebars/dist/node/helpers/ifEquals';
import ifSome from '@financial-times/dotcom-server-handlebars/dist/node/helpers/ifSome';

import nMessagingPresenter from '../server/nMessagingPresenter';
import proxy from './proxy-controller';

const app = express();
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');

const partialPaths = {};
partialPaths[__dirname + '/templates/partials'] = '**/*.html';
partialPaths[__dirname + '/../..'] = 'n-messaging-client/server/templates/**/*.html';

const helpers = { nMessagingPresenter, ifEquals, ifSome };

const renderer = new PageKitHandlebars({ helpers, partialPaths });
app.engine('html', renderer.engine);

app.all('/__message/:id?', proxy(process.env.GURU_HOST || 'https://www.ft.com'));
app.all('/__myft/*', proxy('https://www.ft.com'));
app.post('/email-app-links', (req, res) => {res.sendStatus(200);});

function parseFlags (str) {
	const pairs = str.split(',').map((pair) => pair.trim().split(':'));
	// one day we can do this instead (Node v12): return Object.fromEntries(pairs)
	const flags = {};
	pairs.forEach((pair) => flags[pair[0]] = pair[1]);
	return flags;
}

app.get('/', (req, res) => {
	if (process.env.GURU_HOST) {
		res.locals.guruEndpoint = process.env.GURU_HOST;
	}
	const flags = req.headers['ft-flags'] || req.cookies['next-flags'];
	if (flags) {
		const flagsObj = parseFlags(flags);
		app.locals.flags = flagsObj;
		// Prints the flags object on the page-kit-flags-embed to mimic FT pages
		return res.render('index',{ layout: 'custom-vanilla', title: 'Demo', flagsObj: JSON.stringify((flagsObj)) });
	}

	return res.render('index',{ layout: 'custom-vanilla', title: 'Demo' });
});

module.exports = app;
