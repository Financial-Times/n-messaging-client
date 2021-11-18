const MANIFEST = require('../manifest');

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
const resolvePartialPath = (path) => path && `n-messaging-client/server/pages/${path}`;

const getConfig = (position, flags) => {
	const variant = flags(relevantFlag(position));
	const conf = getVariantConfig(variant);
	return Object.assign({}, conf,
		{
			variant,
			path: resolvePartialPath(conf.path),
			tooltip: conf.tooltip
		}
	);
};

const getVariantLimiter = (data) => {
	if (!data.variants) {
		return () => true;
	}
	return (variant) => data.variants.split(',').includes(variant);
};

export class Presenter {

	constructor (_data) {
		this._data = _data || {};
		this.position = dataTypeContract(_data.type) && _data.type;
		this.data = getConfig(this.position, parseFlagsObject(_data.flags));

		// helper function because the variants is optional
		const variantLimiter = getVariantLimiter(_data);

		this.hasMessage = !!(this.data.variant && this.data.path && variantLimiter(this.data.variant));
	}

}