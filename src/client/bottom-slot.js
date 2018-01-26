const oBanner = require('o-banner');
const { messageEvent, listen } = require('./utils');

const BANNER_CLASS = 'n-messaging-banner';
const BANNER_ACTION_SELECTOR = '[data-n-messaging-banner-action]';
const BANNER_BUTTON_SELECTOR = '.n-messaging-banner__button';
const BANNER_LINK_SELECTOR = '.n-messaging-banner__link';

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
	let actions = banner.innerElement.querySelectorAll(BANNER_ACTION_SELECTOR);
	if (actions.length === 0) {
		// if no actions specified in markup then default to adding it to the
		// button element (this can happen when declared imperatively)
		let buttonAction = banner.innerElement.querySelectorAll(BANNER_BUTTON_SELECTOR);
		let linkAction = banner.innerElement.querySelectorAll(BANNER_LINK_SELECTOR);
		actions = buttonAction ? buttonAction : linkAction;
	}
	listen(banner.bannerElement, 'o.bannerClosed', generateEvent('close'));
	listen(banner.bannerElement, 'o.bannerOpened', generateEvent('view'));
	if (actions && actions.length > 0) {
		actions.forEach((el) => { listen(el, 'click', generateEvent('act')); });
	}

	// show banner
	if (customSetup) {
		customSetup(banner, ({ skip=false }={}) => {
			if (skip) {
				document.body.dispatchEvent(generateEvent('skip'));
			} else {
				banner.open();
			}
		});
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
