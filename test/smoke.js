const messageSlotBottomVariants = [
	'b2bUpsellBanner'
];

const messageSlotBottomTests = messageSlotBottomVariants.map(v => {
	return {
		headers: {
			'FT-Flags': `messageSlotBottom:${v}`
		},
		urls: {
			[`/${v}`]: 200 // url is irrelevant mainly to help debug
		}
	}
});

module.exports = messageSlotBottomTests;
