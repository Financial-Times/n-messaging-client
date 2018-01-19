import imperativeOptions from './lib/imperative-options';
const oBanner = require('o-banner');
const { messageEvent, listen } = require('./utils');

const BANNER_CLASS = 'n-messaging-banner';
const BANNER_ACTION_SELECTOR = '[data-n-messaging-banner-action]';

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let banner;
	const generateEvent = config.id && messageEvent(config.id);
	const declarativeElement = !config.lazy && config.content;
	const defaults = { bannerClass: BANNER_CLASS, autoOpen: false };

	if (declarativeElement) {
		banner = new oBanner(declarativeElement, defaults);
	} else if (guruResult && guruResult.renderData) {
		banner = new oBanner(null, imperativeOptions(guruResult.renderData, defaults));
	} else {
		if (guruResult.skip && generateEvent) {
			document.body.dispatchEvent(generateEvent('skip'));
		}
		return;
	}

	// attach event handlers
	const actions = banner.innerElement.querySelectorAll(BANNER_ACTION_SELECTOR);
	listen(banner.bannerElement, 'o.bannerClosed', generateEvent('close'));
	listen(banner.bannerElement, 'o.bannerOpened', generateEvent('view'));
	if (actions && actions.length > 0) {
		actions.forEach((el) => { listen(el, 'click', generateEvent('act')); });
	}

	// show banner
	if (customSetup) {
		customSetup(banner, () => { banner.open(); });
	} else {
		banner.open();
	}

};
