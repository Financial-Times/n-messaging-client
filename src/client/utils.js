const dispatchEvent = (event) => {
	document.body.dispatchEvent(event);
};

module.exports = {
	messageEvent: function (messageId) {
		return function (action) {
			return new CustomEvent('oTracking.event', {
				detail: {
					category: 'component',
					action: action,
					messaging: messageId
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
