module.exports = {
	licenceJoinPromptSsiClient: { // name of flag variant
		partial: 'bottom/lazy', // path to template
		messageId: 'ssi-join-prompt'// id as specified in ammit-api
	},
	b2bUpsellBanner: {
		partial: 'bottom/b2b-upsell',
		messageId: 'b2c-invite-colleague-banner'
	},
	desktopAppBanner: {
		partial: 'bottom/desktop-app-banner',
		messageId: 'desktop-app-banner'
	},
	licenceJoinPromptSsiClient: {
		partial: 'bottom/lazy',
		messageId: 'licenceJoinPromptSsiClient'
	},
	paymentFailure: {
		partial: 'bottom/payment-failure',
		messageId: 'paymentFailure'
	}
};
