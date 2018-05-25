const oBanner = require('o-banner');
const { generateMessageEvent, listen } = require('./utils');

const BANNER_CLASS = 'n-messaging-banner';
const BANNER_ACTION_SELECTOR = '[data-n-messaging-banner-action]';
const BANNER_BUTTON_SELECTOR = `.${BANNER_CLASS}__button`;
const BANNER_LINK_SELECTOR = `.${BANNER_CLASS}__link`;

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let banner;
	const trackEventAction = config.id && generateMessageEvent({ messageId: config.id, position: config.position, variant: config.name, flag: config.flag });
	const declarativeElement = !config.lazy && config.content;
	const defaults = { bannerClass: BANNER_CLASS, autoOpen: false };

	if (declarativeElement) {
		banner = new oBanner(declarativeElement, defaults);
	} else if (guruResult && guruResult.renderData) {
		banner = new oBanner(null, imperativeOptions(guruResult.renderData, defaults));
	} else {
		if (guruResult.skip && trackEventAction) {
			trackEventAction('skip');
		}
		return;
	}

	// attach event handlers
	let actions = banner.innerElement.querySelectorAll(BANNER_ACTION_SELECTOR);
	if (actions.length === 0) {
		// if no actions specified in markup then default to adding it to the
		// button element (this can happen when declared imperatively)
		actions = banner.innerElement.querySelectorAll(BANNER_BUTTON_SELECTOR);
		if (actions.length === 0) {
			actions = banner.innerElement.querySelectorAll(BANNER_LINK_SELECTOR);
		}
	}
	actions = [].slice.call(actions);
	listen(banner.bannerElement, 'o.bannerClosed', () => trackEventAction('close'));
	listen(banner.bannerElement, 'o.bannerOpened', () => trackEventAction('view'));
	if (actions && actions.length > 0) {
		actions.forEach((el) => { listen(el, 'click', () => trackEventAction('act')); });
	}

	// show banner
	if (customSetup) {
		customSetup(banner, ({ skip=false }={}) => {
			if (skip) {
				trackEventAction('skip');
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
		suppressCloseButton: opts.suppressCloseButton || false,
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
