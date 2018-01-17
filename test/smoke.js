const messageSlotBottomVariants = [
	'b2bUpsellBanner',
	'desktopAppBanner'
];

const messageSlotBottomTests = messageSlotBottomVariants.map(v => {
	return {
		headers: {
			'FT-Flags': `messageSlotBottom:${v}`
		},
		urls: {
			[`/messageSlotBottom-${v}`]: 200 // url is irrelevant mainly to help debug
		}
	};
});

module.exports = messageSlotBottomTests;
