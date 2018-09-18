const manifest = require('../manifest');

const parseSlot = (path) => {
	if (path.includes('bottom')) return 'messageSlotBottom';
	if (path.includes('top')) return 'messageSlotTop';
};

// create array for pa11y, with url and FT flag setting for each message
const createTest = (key) => {
	const slotName = parseSlot(manifest[key].path);
	return {
		headers: {
			'FT-Flags': `${slotName}:${key}`
		},
		urls: {
			[`/${slotName}-${key}`]: 200 // url is irrelevant mainly to help debug
		}
	};
};
const messageSlotTests = Object.keys(manifest).map(createTest);

module.exports = messageSlotTests;
