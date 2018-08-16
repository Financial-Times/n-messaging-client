const fetchAsyncConfig = require('./next-messaging-guru-client');
const topSlot = require('./top-slot');
const bottomSlot = require('./bottom-slot');
const manifest = require('../../manifest');

module.exports = {
	init: function () {
		const slots = document.querySelectorAll('[data-n-messaging-slot]');
		const messages = slots && Array.prototype.slice.call(slots).map(elm => {
			const dataSet = elm.dataset || {};
			const variant = manifest[dataSet.nMessagingName];
			return {
				slot: dataSet.nMessagingSlot,
				name: dataSet.nMessagingName,
				content: elm.querySelector('[data-n-messaging-component]'),
				path: variant.path,
				lazy: variant.lazy,
				guruQueryString: variant.guruQueryString
			};
		});
		if (messages.length > 0) {
			Promise.all(messages.map(msg => this.initialiseMessage(msg)))
				.catch(this.handleError);
		}
	},
	initialiseMessage (config) {
		const render = this.renderHandler(config.slot);
		const customSetup = this.setupHandler(config.path);
		const formatData = (res) => ({ config, guruResult: res, customSetup });
		const getData = config.lazy
			? fetchAsyncConfig(config)
			: Promise.resolve(null);
		return getData.then(formatData).then(render);
	},
	renderHandler (slot) {
		if (slot === 'top') return topSlot;
		if (slot === 'bottom') return bottomSlot;
	},
	setupHandler (path) {
		try {
			if (path) return require(`../components/${path}/main`);
		} catch (error) {
			// Not all variants have a custom setup files and therefore this prevents an error being throw
			// console.error(error);
			return;
		}
	},
	handleError (error) {
		throw error;
		// console.error(error);
	}
};
