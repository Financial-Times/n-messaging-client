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
	cookieConsentA: {
		partial: 'bottom/cookie-consent',
		messageId: 'cookieConsentA'
	},
	cookieConsentB: {
		partial: 'bottom/cookie-consent',
		messageId: 'cookieConsentB'
	},
	cookieConsentC: {
		partial: 'bottom/cookie-consent',
		messageId: 'cookieConsentC'
	},
	marketingPopupPrompt: {
		partial: 'bottom/lazy',
		messageId: 'marketingPopupPrompt',
		guruQueryString: 'offerId=c1773439-53dc-df3d-9acc-20ce2ecde318'
	},
	paymentFailure: {
		partial: 'top/payment-failure',
		messageId: 'paymentFailure'
	},
	teamTrial: {
		partial: 'top/team-trial',
		messageId: 'teamTrial'
	},
	anonSubscribeNow: {
		partial: 'top/anon-subscribe-now-teal',
		messageId: 'anonSubscribeNow',
	},
	navAccountSettings: {
		partial: 'top/nav-account-settings',
		messageId: 'navAccountSettings',
		tooltip: true
	},
	tlsDeprecation: {
		partial: 'top/tls-deprecation',
		messageId: 'tlsDeprecation'
	},
	deloitteSubscription: {
		partial: 'top/deloitte-subscription',
		messageId: 'deloitteSubscription'
	}
};
