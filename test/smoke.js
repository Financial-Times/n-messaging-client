const messages = [
	{
		name: 'b2bUpsellBanner',
		slot: 'messageSlotBottom'
	},
	{
		name: 'paymentFailure',
		slot: 'messageSlotTop'
	}
];

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
