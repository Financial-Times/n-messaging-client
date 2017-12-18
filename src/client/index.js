const fetchAsyncConfig = require('./next-messaging-guru-client');
const bottomSlot = require('./bottom-slot');

module.exports = {
	init: function () {
		const slots = document.querySelectorAll('[data-n-messaging-slot]');
		const messages = slots && Array.prototype.slice.call(slots).map(elm => {
			const dataSet = elm.dataset || {};
			return {
				position: dataSet.nMessagingPosition,
				name: dataSet.nMessagingName,
				id: dataSet.nMessagingId,
				content: elm.querySelector('[data-n-messaging-component]'),
				lazy: dataSet.nMessagingLazy === 'true'
			}
		});
		if (messages.length > 0) {
			Promise.all(messages.map(msg => this.initialiseMessage(msg))).catch(this.handleError);
		}
	},
	initialiseMessage (config) {
		const render = this.renderHandler(config.position);
		let getData;
		if (config.lazy) {
			getData = fetchAsyncConfig(config);
		} else {
			getData = Promise.resolve(config);
		}
		return getData.then(render);
	},
	renderHandler (position) {
		if (position === 'bottom') return bottomSlot;
	},
	handleError (error) {
		console.log('error in n-messaging-client init()');
		console.error(error);
	}
};
