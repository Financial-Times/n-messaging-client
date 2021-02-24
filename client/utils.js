const cookies = require('js-cookie');

const manifest = require('../manifest');
const LOCAL_COUNTER_COOKIE_NAME = 'nMessagingEventCounter';
const COOKIE_LIFE_MINUTES = 5;

const dispatchEvent = (event) => {
	document.body.dispatchEvent(event);
};

const getMessageRules = messageId => manifest[messageId] ? manifest[messageId].eventRules : undefined;

const getMessageEventCounts = () => {
	return cookies.get(LOCAL_COUNTER_COOKIE_NAME) ? JSON.parse(cookies.get(LOCAL_COUNTER_COOKIE_NAME)) : {};
};

const getEventCountForMessage = (messageId, event) => {
	const currentCounts = getMessageEventCounts();
	return typeof currentCounts[messageId] === 'object' &&
		typeof currentCounts[messageId][event] === 'number' ?
		currentCounts[messageId][event] : 0;
};

const updateMessageEventCount = (messageId, event) => {
	const currentCounts = getMessageEventCounts();
	const currentCount = getEventCountForMessage(messageId, event);
	// Set event counters for the message for the first time if not set already.
	currentCounts[messageId] = currentCounts[messageId] || {};
	// Increment the counter.
	currentCounts[messageId][event] = currentCount + 1;

	// don't make the cookie too sticky, or we can't re-show the message intentionally at a later date.
	// But it needs to stick around long enough to do the job of allowing spoor/envoy pipeline to catch up:
	const expiryDate = new Date(new Date().getTime() + COOKIE_LIFE_MINUTES * 60 * 1000);

	cookies.set(LOCAL_COUNTER_COOKIE_NAME, currentCounts, { domain: 'ft.com', expires: expiryDate });
};

module.exports = {
	generateMessageEvent: function ({ messageId, position, flag, trackingContext, variant }={}) {
		return function (action, trackingAttr) {
			// Do nothing when the message id is not configured. This is to
			// replicate existing behaviour prior to a tangential refactor. It's
			// not clear if a missing id is possible or likely, or whether it's
			// something that should be warned of.
			if (!messageId) {
				return;
			}

			const detail = Object.assign({
				category: 'n-messaging',
				action: action,
				messaging: messageId,
				messaging_position: position,
				messaging_flag: flag,
				messaging_variant: variant
			},
			trackingContext
			);

			if (trackingAttr)
				detail.messaging_action = trackingAttr;
			const messagingEvent = new CustomEvent('oTracking.event', { detail, bubbles: true });
			dispatchEvent(messagingEvent);
			/* TODO: remove below fallback event once we port to the above */
			const oldEvent = new CustomEvent('oTracking.event', { detail: Object.assign({}, detail, { category: 'component' }), bubbles: true });
			dispatchEvent(oldEvent);
			if (getMessageRules(messageId)){
				updateMessageEventCount(messageId,action);
			}
		};
	},
	listen: function (el, ev, cb) {
		if (el) el.addEventListener(ev, cb);
	},
	messageEventLimitsBreached: function (messageId) {
		const messageRules = getMessageRules(messageId);
		if (!messageRules){
			return false;
		}

		return Object.keys(messageRules.maxOccurrences).some( function (eventType) {
			const eventCount = getEventCountForMessage(messageId, event);
			return (eventCount >= messageRules.maxOccurrences[eventType]);
		});
	}
};
