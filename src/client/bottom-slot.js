const oBanner = require('o-banner');
const { messageEvent, listen } = require('./utils');

const BANNER_CLASS = 'n-messaging-banner';
const BANNER_ACTION_SELECTOR = '[data-n-messaging-banner-action]';

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let banner;
	const generateEvent = config.id && messageEvent({ messageId: config.id, position: config.position, variant: config.name, flag: config.flag });
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

function imperativeOptions (opts, defaults) {
	return {
		autoOpen: opts.autoOpen || defaults.autoOpen,
		bannerClass: opts.bannerClass || defaults.bannerClass,
		theme: opts.theme,
		contentLongBold: opts.contentLongBold,
		contentLong: opts.contentLong,
		contentShort: opts.contentShort,
		buttonLabel: opts.buttonLabel,
		buttonUrl: opts.buttonUrl,
		linkLabel: opts.linkLabel,
		linkUrl: opts.linkUrl,
	};
}
