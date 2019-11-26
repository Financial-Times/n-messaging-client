const nAlertBanner = require('o-message');
const { generateMessageEvent, listen, messageEventLimitsBreached } = require('./utils');

const ALERT_BANNER_CLASS = 'o-message';
const ALERT_ACTION_SELECTOR = '[data-o-message-action]';
const ALERT_BANNER_BUTTON_SELECTOR = `.${ALERT_BANNER_CLASS}__button`;
const ALERT_BANNER_LINK_SELECTOR = `.${ALERT_BANNER_CLASS}__link`;

const TOP_SLOT_FLAG = 'messageSlotTop';

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	let alertBanner;
	const trackEventAction = config.name && generateMessageEvent({ messageId: config.name, position: config.slot, variant: config.name, flag: TOP_SLOT_FLAG });
	const declarativeElement = !config.lazy && config.content;
	const options = { messageClass: ALERT_BANNER_CLASS, autoOpen: false, close: nAlertBanner.getDataAttributes(declarativeElement).close};

	if (declarativeElement) {
		alertBanner = new nAlertBanner(declarativeElement, options);
	} else if (guruResult && guruResult.renderData) {
		alertBanner = new nAlertBanner(null, imperativeOptions(guruResult.renderData, options));
	} else {
		if (guruResult.skip && trackEventAction) {
			trackEventAction('skip');
		}
		return;
	}

	if (messageEventLimitsBreached(config.name)) {
		trackEventAction('skip'); // todo do we actually need to do this?
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

	actions = [].slice.call(actions);
	listen(alertBanner.messageElement, 'o.messageClosed', () => trackEventAction('close'));
	listen(alertBanner.messageElement, 'o.messageOpen', () => trackEventAction('view'));
	if (actions && actions.length > 0) {
		actions.forEach((el) => {
			const trackingAttr = el.dataset.nAlertBannerActionType;
			listen(el, 'click', () => trackEventAction(el.dataset['nAlertBannerAction'] || 'act', trackingAttr));
		});
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
		content: {
			highlight: opts.contentTitle,
			detail: opts.content,
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
		close: opts.closeButton
	};
}
