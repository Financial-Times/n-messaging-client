const dispatchEvent = (event) => {
	document.body.dispatchEvent(event);
};

module.exports = {
	messageEvent: function ({ messageId, position, flag, variant }={}) {
		return function (action) {
			return new CustomEvent('oTracking.event', {
				detail: {
					category: 'component',
					action: action,
					messaging: messageId,
					messaging_position: position,
					messaging_flag: flag,
					messaging_variant: variant
				},
				bubbles: true
			});
		};
	},
	listen: function (el, ev, message) {
		if (el) {
			el.addEventListener(ev, function () {
				dispatchEvent(message);
			});
		}
	}
};
