const fetchAsyncConfig = require('./next-messaging-guru-client');
const topSlot = require('./top-slot');
const bottomSlot = require('./bottom-slot');
const components = require('../components');

let _flags;

module.exports = {
	init: function (flags) {
		_flags = flags;
		const slots = document.querySelectorAll('[data-n-messaging-slot]');
		const messages = slots && Array.prototype.slice.call(slots).map(elm => {
			const dataSet = elm.dataset || {};
			return {
				position: dataSet.nMessagingPosition,
				name: dataSet.nMessagingName,
				flag: dataSet.nMessagingFlag,
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
		const formatData = (res) => ({ config, guruResult: res, customSetup });
		const getData = config.lazy
			? fetchAsyncConfig(config)
			: Promise.resolve(null);
		return getData.then(formatData).then(render);
	},
	renderHandler (position) {
		if (position === 'top') return topSlot;
		if (position === 'bottom') return bottomSlot.bind(this, _flags);
	},
	setupHandler (name) {
		return components.hasOwnProperty(name) && components[name];
	},
	handleError (error) {
		throw error;
		// console.error(error);
	}
};
