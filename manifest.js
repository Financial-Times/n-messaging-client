module.exports = {
	licenceJoinPromptSsiClient: { // name of flag variant and must match the messageId in ammit-api
		path: 'bottom/lazy', // path to template
		lazy: true
	},
	inviteColleagues: {
		path: 'bottom/invite-colleagues'
	},
	appPromotingBanner: {
		path: 'bottom/app-promoting-banner'
	},
	cookieConsentC: {
		path: 'bottom/cookie-consent'
	},
	marketingPopupPrompt: {
		path: 'bottom/lazy',
		lazy: true,
		guruQueryString: 'offerId=c1773439-53dc-df3d-9acc-20ce2ecde318'
	},
	usaSaleBottom: {
		path: 'bottom/usa-sale',
	},
	paymentFailure: {
		path: 'top/payment-failure'
	},
	teamTrial: {
		path: 'top/team-trial'
	},
	anonSubscribeNow: {
		path: 'top/anon-subscribe-now-teal'
	},
	navAccountSettings: {
		path: 'top/nav-account-settings',
		tooltip: true
	},
	usaSaleTop: {
		path: 'top/usa-sale'
	}
};
