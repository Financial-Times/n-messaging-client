const dispatchEvent = (event) => {
	document.body.dispatchEvent(event);
};

module.exports = {
	generateMessageEvent: function ({ messageId, position, flag, variant }={}) {
		return function (action, trackingAttr) {
			const detail = {
				category: 'n-messaging',
				action: action,
				messaging: messageId,
				messaging_position: position,
				messaging_flag: flag,
				messaging_variant: variant
			};
			if (trackingAttr)
				detail.messaging_action = trackingAttr;
			const messagingEvent = new CustomEvent('oTracking.event', { detail, bubbles: true });
			dispatchEvent(messagingEvent);
			/* TODO: remove below fallback event once we port to the above */
			const oldEvent = new CustomEvent('oTracking.event', { detail: Object.assign({}, detail, { category: 'component' }), bubbles: true });
			dispatchEvent(oldEvent);
		};
	},
	listen: function (el, ev, cb) {
		if (el) el.addEventListener(ev, cb);
	}
};
