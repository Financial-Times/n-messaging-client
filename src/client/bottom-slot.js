const oBanner = require('o-banner');
const { generateMessageEvent, listen } = require('./utils');

const BANNER_CLASS = 'n-messaging-banner';
const BANNER_ACTION_SELECTOR = '[data-n-messaging-banner-action]';
const BANNER_BUTTON_SELECTOR = `.${BANNER_CLASS}__button`;
const BANNER_LINK_SELECTOR = `.${BANNER_CLASS}__link`;
const BOTTOM_SLOT_FLAG = 'messageSlotBottom';

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let banner;
	const trackEventAction = config.name && generateMessageEvent({ messageId: config.name, position: config.slot, variant: config.name, flag: BOTTOM_SLOT_FLAG });
	const declarativeElement = !config.lazy && config.content;

	if (declarativeElement) {
		banner = new oBanner(declarativeElement, oBanner.getOptionsFromDom(declarativeElement));
	} else if (guruResult && guruResult.renderData) {
		banner = new oBanner(null, imperativeOptions(guruResult.renderData, { bannerClass: BANNER_CLASS, autoOpen: false }));
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
		actions.forEach((el) => {
			const trackingAttr = el.dataset.nMessagingBannerActionType;
			listen(el, 'click', () => trackEventAction(el.dataset['nMessagingBannerAction'] || 'act', trackingAttr));
		});
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
