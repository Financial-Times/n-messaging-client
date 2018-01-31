module.exports = {
	licenceJoinPromptSsiClient: { // name of flag variant
		partial: 'bottom/lazy', // path to template
		messageId: 'licenceJoinPromptSsiClient' // id as specified in ammit-api
	},
	b2bUpsellBanner: {
		partial: 'bottom/b2b-upsell',
		messageId: 'b2c-invite-colleague-banner'
	},
	appPromotingBanner: {
		partial: 'bottom/desktop-app-banner',
		messageId: 'appPromotingBanner'
	},
	paymentFailure: {
		partial: 'top/payment-failure',
		messageId: 'paymentFailure'
	}
};
