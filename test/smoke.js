const manifest = require('../manifest');

const parseSlot = (path) => {
	if (path.includes('bottom')) return 'messageSlotBottom';
	if (path.includes('top')) return 'messageSlotTop';
};

// create array of feature names and slots based on manifest
const createMessage = (key) => {
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
const messageSlotTests = Object.keys(manifest).map(createMessage);

module.exports = messageSlotTests;
