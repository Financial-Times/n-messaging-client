const oBanner = require('o-banner');
const { messageEvent, listen } = require('./utils');

const BANNER_CLASS = 'n-messaging-banner';
const BANNER_ACTION_SELECTOR = '[data-n-messaging-banner-action]';

module.exports = function ({ options={}, customSetup }) {
	let banner;
	const generateEvent = messageEvent(options.id);
	const declarativeElement = !options.lazy && options.content;
	const defaults = { bannerClass: BANNER_CLASS, autoOpen: false };

	if (declarativeElement) {
		banner = new oBanner(declarativeElement, defaults);
	} else {
		banner = new oBanner(null, imperativeOptions(options, defaults));
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

function imperativeOptions (opts, defaults) {
	return {
		autoOpen: opts.autoOpen || defaults.autoOpen,
		bannerClass: opts.bannerClass || defaults.bannerClass,
		theme: opts.theme,
		contentLong: opts.contentLong,
		contentShort: opts.contentShort,
		buttonLabel: opts.buttonLabel,
		buttonUrl: opts.buttonUrl,
		linkLabel: opts.linkLabel,
		linkUrl: opts.linkUrl
	};
}
