const fetchAsyncConfig = require('./next-messaging-guru-client');
const topSlot = require('./top-slot');
const bottomSlot = require('./bottom-slot');
const manifest = require('../manifest');

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
				component: variant.component,
				lazy: variant.lazy,
				guruQueryString: variant.guruQueryString,
				trackingContext: variant.trackingContext
			};
		});
		if (messages.length > 0) {
			Promise.all(messages.map(msg => this.initialiseMessage(msg)))
				.catch(this.handleError);
		}
	},
	initialiseMessage (config) {
		const customSetup = this.setupHandler(config.component || config.path);
		// This function makes assumptions about the kind of component which
		// goes in a slot. Ignore all these assumptions and only use "custom
		// setup" for the cookie message component.
		if (config.path === 'bottom/cookie-consent') {
			return customSetup(config);
		}
		const render = this.renderHandler(config.slot);
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
			if (path) return require(`./components/${path}/main`);
		} catch (error) {
			// Not all variants have a custom setup file and therefore this prevents an error being thrown
			return;
		}
	},
	handleError (error) {
		console.error(error); // eslint-disable-line no-console
		throw error;
	}
};
