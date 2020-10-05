let message = require('o-message');
message = message.default || message;
const { generateMessageEvent, listen, messageEventLimitsBreached } = require('./utils');

const ALERT_BANNER_CLASS = 'o-message';
const ALERT_ACTION_SELECTOR = '[data-o-message-action]';
const ALERT_BANNER_BUTTON_SELECTOR = `.${ALERT_BANNER_CLASS}__button`;
const ALERT_BANNER_LINK_SELECTOR = `.${ALERT_BANNER_CLASS}__link`;

const TOP_SLOT_CONTENT_SELECTOR = '[data-n-messaging-slot="top"] [data-n-messaging-component]';
const TOP_SLOT_FLAG = 'messageSlotTop';

function getServerRenderedBanner (config, guruResult) {
	if (!config.lazy && config.content) {
		// server-side rendered banner
		return config.content;
	} else if (config.lazy && guruResult && guruResult.renderData
			&& guruResult.renderData.reservedSpace) {
		// a hybrid of server-side and client-side solution:
		// this has reserved space on the page (to prevent "jerky" page loading)
		// and we populate this space with lazily-fetched content
		return config.content;
	} else {
		// client-side rendered banner
		return null;
	}
}

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	const variant = (guruResult && guruResult.renderData && guruResult.renderData.dynamicTrackingData) || config.name;
	const trackEventAction = config.name && generateMessageEvent({
		flag: TOP_SLOT_FLAG,
		messageId: config.name,
		position: config.slot,
		trackingContext: config.trackingContext,
		variant: variant
	});
	const declarativeElement = getServerRenderedBanner(config, guruResult);
	const options = {
		messageClass: ALERT_BANNER_CLASS,
		autoOpen: false,
		close: message.getDataAttributes(declarativeElement).close,
		type: 'notice',
		state: 'skip'
	};

	if (guruResult && guruResult.skip && trackEventAction) {
		trackEventAction('skip');
		return;
	}

	const guruRenderData = guruResult && guruResult.renderData || {};
	const allOptions = imperativeOptions(guruRenderData, options, config);
	const alertBanner = new message(declarativeElement, allOptions);

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
		if (customSetup.default) {
			customSetup = customSetup.default; // ESM modules
		}
		function customSetupCallback ({ skip=false }={}) {
			if (skip) {
				trackEventAction('skip');
			} else {
				alertBanner.open();
			}
		}
		customSetup(alertBanner, customSetupCallback, guruResult);
	} else {
		alertBanner.open();
	}

};

function imperativeOptions (opts, defaults, config) {
	return {
		autoOpen: opts.autoOpen || defaults.autoOpen,
		messageClass: opts.messageClass || defaults.messageClass,
		type: opts.type || defaults.type,
		parentElement: config.lazy ? opts.parentElement || TOP_SLOT_CONTENT_SELECTOR : null,
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
		close: opts.closeButton,
		dynamicTrackingData: opts.dynamicTrackingData,
		state: opts.state || defaults.state,
	};
}
