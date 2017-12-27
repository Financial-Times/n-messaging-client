'use strict';
const MANIFEST = require('../../manifest');

const BOTTOM_SLOT_FLAG = 'messageSlotBottom';
const CLIENT_SIDE_VARIANT_REGEXP = /Client$/;
const TOP_TYPE = 'top';
const BOTTOM_TYPE = 'bottom';

const parseFlagsObject = (flags) => (key) => flags && flags.hasOwnProperty(key) && flags[key];
const regexpTest = (regexp) => (val) => regexp.test(val);
const dataTypeContract = (type) => [TOP_TYPE, BOTTOM_TYPE].includes(type);
const relevantFlag = (type) => {
	return {
		[TOP_TYPE]: '',
		[BOTTOM_TYPE]: BOTTOM_SLOT_FLAG
	}[type];
};
const getVariantConfig = (variant) => (MANIFEST && MANIFEST[variant]) || {};
const resolvePartialPath = (path) => `n-messaging-client/templates/partials/${path}`;

const getConfig = (position, flags) => {
	const variant = flags(relevantFlag(position));
	const isLazyLoad = regexpTest(CLIENT_SIDE_VARIANT_REGEXP)(variant);
	const conf = getVariantConfig(isLazyLoad ? `${position}Lazy` : variant);
	return Object.assign({}, conf,
		{
			variant,
			position,
			lazyLoad: isLazyLoad,
			partial: resolvePartialPath(conf.partial)
		}
	);
};

const SlotPresenter = class SlotPresenter {

	constructor (_data) {
		this._data = _data || {};
		this.position = dataTypeContract(_data.type) && _data.type;
		this.config = getConfig(this.position, parseFlagsObject(this._data.flags));
	}

	get data () {
		return this.config;
	}

	get hasMessage () {
		return !!(this.config.variant);
	}

};

module.exports = SlotPresenter;
