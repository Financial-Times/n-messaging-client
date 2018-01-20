const nAlertBanner = require('n-alert-banner');
const { messageEvent, listen } = require('./utils');

const ALERT_BANNER_CLASS = 'n-alert-banner';
const ALERT_ACTION_SELECTOR = '[data-n-messaging-alert-banner-action]';

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let alertBanner;
	const generateEvent = config.id && messageEvent({ messageId: config.id, position: config.position, variant: config.name, flag: config.flag });
	const declarativeElement = !config.lazy && config.content;
	const defaults = { alertBannerClass: ALERT_BANNER_CLASS, autoOpen: false };

	if (declarativeElement) {
		alertBanner = new nAlertBanner(declarativeElement, defaults);
	} else if (guruResult && guruResult.renderData) {
		alertBanner = new nAlertBanner(null, imperativeOptions(guruResult.renderData, defaults));
	} else {
		if (guruResult.skip && generateEvent) {
			document.body.dispatchEvent(generateEvent('skip'));
		}
		return;
	}

	// attach event handlers
	const actions = alertBanner.innerElement.querySelectorAll(ALERT_ACTION_SELECTOR);
	listen(alertBanner.alertBannerElement, 'n.alertBannerClosed', generateEvent('close'));
	listen(alertBanner.alertBannerElement, 'n.alertBannerOpen', generateEvent('view'));
	if (actions && actions.length > 0) {
		actions.forEach((el) => { listen(el, 'click', generateEvent('act')); });
	}

	//show alertBanner
	if (customSetup) {
		customSetup(alertBanner, () => { alertBanner.open(); });
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
		linkUrl: opts.linkUrl
	};
}
