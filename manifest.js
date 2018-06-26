module.exports = {
	licenceJoinPromptSsiClient: { // name of flag variant
		partial: 'bottom/lazy', // path to template
		messageId: 'licenceJoinPromptSsiClient' // id as specified in ammit-api
	},
	inviteColleagues: {
		partial: 'bottom/invite-colleagues',
		messageId: 'inviteColleagues'
	},
	appPromotingBanner: {
		partial: 'bottom/app-promoting-banner',
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
	deloitteSubscription: {
		partial: 'top/deloitte-subscription',
		messageId: 'deloitteSubscription'
	}
};
