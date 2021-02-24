const oCookieMessage = require('o-cookie-message').default;

const { generateMessageEvent, listen } = require('./utils');

const BOTTOM_SLOT_FLAG = 'messageSlotBottom';

module.exports = function customSetup (config) {
	const cookieMessage = oCookieMessage.init();

	try {
		trackCookieMessageInteractions(cookieMessage, config);
	} catch (error) {
		console.warn('Could not report cookie message interactions.', error); // eslint-disable-line no-console
	}
};

function trackCookieMessageInteractions (cookieMessage, config) {
	const trackEventAction = generateMessageEvent({
		flag: BOTTOM_SLOT_FLAG,
		messageId: config.name,
		position: config.slot,
		trackingContext: config.trackingContext || {},
		variant: config.name
	});

	listen(cookieMessage.cookieMessageElement, 'oCookieMessage.close', () => trackEventAction('close'));
	listen(cookieMessage.cookieMessageElement, 'oCookieMessage.view', () => trackEventAction('view'));

	const actionElements = document.querySelectorAll('[data-n-messaging-manage-cookies],[data-n-messaging-accept-cookies]');
	actionElements.forEach(actionElement => {
		listen(actionElement, 'click', () => trackEventAction('act', actionElement.textContent));
	});
}
