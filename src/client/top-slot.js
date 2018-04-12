const nAlertBanner = require('n-alert-banner');
const { generateMessageEvent, listen } = require('./utils');

const ALERT_BANNER_CLASS = 'n-alert-banner';
const ALERT_ACTION_SELECTOR = '[data-n-messaging-alert-banner-action]';
const ALERT_BANNER_BUTTON_SELECTOR = `.${ALERT_BANNER_CLASS}__button`;
const ALERT_BANNER_LINK_SELECTOR = `.${ALERT_BANNER_CLASS}__link`;

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let alertBanner;
	const trackEventAction = config.id && generateMessageEvent({ messageId: config.id, position: config.position, variant: config.name, flag: config.flag });
	const declarativeElement = !config.lazy && config.content;
	const defaults = { alertBannerClass: ALERT_BANNER_CLASS, autoOpen: false };

	if (declarativeElement) {
		alertBanner = new nAlertBanner(declarativeElement);
	} else if (guruResult && guruResult.renderData) {
		alertBanner = new nAlertBanner(null, imperativeOptions(guruResult.renderData, defaults));
	} else {
		if (guruResult.skip && trackEventAction) {
			trackEventAction('skip');
		}
		return;
	}

	// attach event handlers
	let actions = alertBanner.innerElement.querySelectorAll(ALERT_ACTION_SELECTOR);
	if (actions.length === 0) {
		// if no actions specified in markup then default to adding it to the
		// button element (this can happen when declared imperatively)
		actions = alertBanner.innerElement.querySelectorAll(ALERT_BANNER_BUTTON_SELECTOR);
		if (actions.length === 0) {
			actions = alertBanner.innerElement.querySelectorAll(ALERT_BANNER_LINK_SELECTOR);
		}
	}

	listen(alertBanner.alertBannerElement, 'n.alertBannerClosed', () => trackEventAction('close'));
	listen(alertBanner.alertBannerElement, 'n.alertBannerOpened', () => trackEventAction('view'));
	if (actions && actions.length > 0) {
		actions.forEach((el) => { listen(el, 'click', () => trackEventAction('act')); });
	}

	//show alertBanner
	if (customSetup) {
		customSetup(alertBanner, ({ skip=false }={}) => {
			if (skip) {
				trackEventAction('skip');
			} else {
				alertBanner.open();
			}
		});
	} else {
		alertBanner.open();
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
		closeButton: opts.closeButton
	};
}
