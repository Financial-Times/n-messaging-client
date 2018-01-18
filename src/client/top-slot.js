const nAlertBanner = require('n-alert-banner');

const ALERT_BANNER_CLASS = 'n-alert-banner';

module.exports = function ({ config={}, guruResult, customSetup }) {
	let alertBanner;
	const declarativeElement = !config.lazy && config.content;
	const defaults = { alertBannerClass: ALERT_BANNER_CLASS, autoOpen: true }

	if (declarativeElement) {
		alertBanner = new nAlertBanner(declarativeElement, defaults);
	}
}
