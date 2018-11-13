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
	cookieConsentA: {
		path: 'bottom/cookie-consent'
	},
	cookieConsentB: {
		path: 'bottom/cookie-consent'
	},
	cookieConsentC: {
		path: 'bottom/cookie-consent'
	},
	swgEntitlementsPrompt: {
		path: 'bottom/swg-entitlements-prompt'
	},
	marketingPopupPrompt: {
		path: 'bottom/lazy',
		lazy: true,
		guruQueryString: 'offerId=c1773439-53dc-df3d-9acc-20ce2ecde318'
	},
	paymentFailure: {
		path: 'top/payment-failure'
	},
	teamTrial: {
		path: 'bottom/team-trial'
	},
	teamTrialV2: {
		path: 'bottom/team-trial-v2',
		component: 'bottom/team-trial'
	},
	anonSubscribeNow: {
		path: 'top/anon-subscribe-now-teal'
	},
	navAccountSettings: {
		path: 'top/nav-account-settings',
		tooltip: true
	},
  bookYourConsult: {
    path: 'bottom/book-your-consult'
  }
};
