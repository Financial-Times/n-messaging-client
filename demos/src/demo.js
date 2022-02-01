const oTracking = require('o-tracking').default;
const { nMessagingClient } = require('../../main-client');

document.documentElement.classList.add('js', 'enhanced');

oTracking.init({
	server: 'https://spoor-api.ft.com/px.gif',
	context: { product: 'next' }
});

oTracking.click.init('cta');

nMessagingClient.init();
