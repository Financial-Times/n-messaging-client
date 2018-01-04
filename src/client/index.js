const fetchAsyncConfig = require('./next-messaging-guru-client');
const bottomSlot = require('./bottom-slot');
const components = require('../components');

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
			};
		});
		if (messages.length > 0) {
			Promise.all(messages.map(msg => this.initialiseMessage(msg))).catch(this.handleError);
		}
	},
	initialiseMessage (config) {
		const render = this.renderHandler(config.position);
		const customSetup = this.setupHandler(config.name);
		const formatData = (conf) => ({ options: conf, customSetup });
		const getData = config.lazy
			? fetchAsyncConfig(config)
			: Promise.resolve(config);

		return getData.then(formatData).then(render);
	},
	renderHandler (position) {
		if (position === 'bottom') return bottomSlot;
	},
	setupHandler (name) {
		return components.hasOwnProperty(name) && components[name];
	},
	handleError (error) {
		throw error;
		// console.error(error);
	}
};
