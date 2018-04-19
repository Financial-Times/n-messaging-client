const nAlertBanner = require('o-message');
const { generateMessageEvent, listen } = require('./utils');

const ALERT_BANNER_CLASS = 'n-alert-banner';
const ALERT_ACTION_SELECTOR = '[data-n-messaging-alert-banner-action]';
const ALERT_BANNER_BUTTON_SELECTOR = `.${ALERT_BANNER_CLASS}__button`;
const ALERT_BANNER_LINK_SELECTOR = `.${ALERT_BANNER_CLASS}__link`;

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let alertBanner;
	const trackEventAction = config.id && generateMessageEvent({ messageId: config.id, position: config.position, variant: config.name, flag: config.flag });
	const declarativeElement = !config.lazy && config.content;
	const defaults = { messageClass: ALERT_BANNER_CLASS, autoOpen: false };

	if (declarativeElement) {
		alertBanner = new nAlertBanner(declarativeElement, defaults);
	} else if (guruResult && guruResult.renderData) {
		alertBanner = new nAlertBanner(null, imperativeOptions(guruResult.renderData, defaults));
	} else {
		if (guruResult.skip && trackEventAction) {
			trackEventAction('skip');
		}
		return;
	}

	// attach event handlers
	let actions = alertBanner.messageElement.querySelectorAll(ALERT_ACTION_SELECTOR);
	if (actions.length === 0) {
		// if no actions specified in markup then default to adding it to the
		// button element (this can happen when declared imperatively)
		actions = alertBanner.messageElement.querySelectorAll(ALERT_BANNER_BUTTON_SELECTOR);
		if (actions.length === 0) {
			actions = alertBanner.messageElement.querySelectorAll(ALERT_BANNER_LINK_SELECTOR);
		}
	}

	listen(alertBanner.messageElement, 'o.messageClosed', () => trackEventAction('close'));
	listen(alertBanner.messageElement, 'o.messageOpen', () => trackEventAction('view'));
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
		messageClass: opts.messageClass || defaults.messageClass,
		type: opts.type,
		status: opts.status,
		parentElement: opts.parentElement,
		theme: opts.theme,
		content: {
			highlight: opts.highlight,
			detail: opts.detail,
			additionalInfo: opts.additionalInfo
		},
		actions: {
			primary: {
				text: opts.buttonLabel,
				url: opts.buttonUrl
			},
			secondary: {
				text: opts.linkLabel,
				url: opts.linkUrl
			}
		},
		close: opts.close
	};
}
