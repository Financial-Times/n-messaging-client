const manifest = require('../manifest');

let messages = [];

const parseSlot = (path) => {
	if (path.includes('bottom')) return 'messageSlotBottom';
	if (path.includes('top')) return 'messageSlotTop';
};

// create array of feature names and slots based on manifest
for (let key in manifest) {
	if (manifest.hasOwnProperty(key)) {
		messages.push({
			name: key,
			slot: parseSlot(manifest[key]['path'])
		});
	}
}

const messageSlotTests = messages.map(message => {
	return {
		headers: {
			'FT-Flags': `${message.slot}:${message.name}`
		},
		urls: {
			[`/${message.slot}-${message.name}`]: 200 // url is irrelevant mainly to help debug
		}
	};
});

module.exports = messageSlotTests;
