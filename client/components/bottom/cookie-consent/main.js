let oCookieMessage = require('o-cookie-message');
oCookieMessage = oCookieMessage.default || oCookieMessage;

const { generateMessageEvent, listen } = require('../../../utils');

const BOTTOM_SLOT_FLAG = 'messageSlotBottom';

/**
 * Initialise and log interactions on the cookie message component.
 *
 * @param {CookieMessage} cookieMessage
 * @param {Object} config
 * @return {void}
 */
module.exports = function customSetup (config) {
	const trackEventAction = generateMessageEvent({
		flag: BOTTOM_SLOT_FLAG,
		messageId: config.name,
		position: config.slot,
		trackingContext: config.trackingContext || {},
		variant: config.name
	});

	listen(document.documentElement, 'oCookieMessage.close', () => trackEventAction('close'));
	listen(document.documentElement, 'oCookieMessage.view', () => trackEventAction('view'));

	oCookieMessage.init();

	const actionElements = document.querySelectorAll('[data-n-messaging-policy],[data-n-messaging-manage-cookies],[data-n-messaging-accept-cookies]');
	actionElements.forEach(actionElement => {
		listen(actionElement, 'click', () => trackEventAction('act', actionElement.textContent.trim()));
	});
};
