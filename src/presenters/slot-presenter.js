'use strict';
const MANIFEST = require('../../manifest');

const BOTTOM_SLOT_FLAG = 'messageSlotBottom';
const TOP_SLOT_FLAG = 'messageSlotTop';
const TOP_TYPE = 'top';
const BOTTOM_TYPE = 'bottom';

const parseFlagsObject = (flags) => (key) => flags && flags.hasOwnProperty(key) && flags[key];
const dataTypeContract = (type) => [TOP_TYPE, BOTTOM_TYPE].includes(type);
const relevantFlag = (type) => {
	return {
		[TOP_TYPE]: TOP_SLOT_FLAG,
		[BOTTOM_TYPE]: BOTTOM_SLOT_FLAG
	}[type];
};
const getVariantConfig = (variant) => (MANIFEST && MANIFEST[variant]) || {};
const resolvePartialPath = (path) => path && `n-messaging-client/templates/partials/${path}`;

const getConfig = (position, root, flags) => {
	const variant = flags(relevantFlag(position));
	const conf = getVariantConfig(variant);
	return Object.assign({}, conf,
		{
			variant,
			position,
			root,
			path: resolvePartialPath(conf.path),
			tooltip: conf.tooltip
		}
	);
};

const SlotPresenter = class SlotPresenter {

	constructor (_data) {
		this._data = _data || {};
		this.position = dataTypeContract(_data.type) && _data.type;
		const root = this._data.root || {};
		this.config = getConfig(this.position, root, parseFlagsObject(root.flags));
	}

	get data () {
		return this.config;
	}

	get hasMessage () {
		return !!(this.config.variant && this.config.path);
	}

};

module.exports = SlotPresenter;
