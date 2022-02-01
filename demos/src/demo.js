const oTracking = require('o-tracking').default;
const { nMessagingClient } = require('../../main-client');

document.documentElement.classList.add('js', 'enhanced');

oTracking.init({
	context: { product: 'next' },
	test: true
});

oTracking.click.init('cta');

nMessagingClient.init();
