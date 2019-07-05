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
	anonSubscribeNow: {
		path: 'top/anon-subscribe-now'
	},
	navAccountSettings: {
		path: 'top/nav-account-settings',
		tooltip: true
	},
	onboardingMyFt: {
		path: 'bottom/onboarding-myft'
	},
	onboardingPremium: {
		path: 'bottom/onboarding-premium'
	},
	onboardingApp: {
		path: 'bottom/onboarding-app'
	},
	onboardingRegion: {
		path: 'top/onboarding-region',
		tooltip: true
	},
	bookYourConsult: {
		path: 'bottom/book-your-consult'
	},
	brexitCampaign: {
		path: 'bottom/brexit'
	},
	b2bTrialNewsletter: {
		path: 'bottom/lazy',
		lazy: true
	},
	b2bTrialMyFt: {
		path: 'bottom/lazy',
		lazy: true
	},
	b2bTrialCountdown: {
		path: 'top/lazy',
		lazy: true
	},
	b2bTrialContactUs: {
		path: 'bottom/b2b-trial-contact-us'
	},
	b2bTrialMember: {
		path: 'bottom/b2b-trial-member',
		lazy: true
	},
	b2bTrialMobile: {
		path: 'bottom/b2b-trial-mobile'
	},
	techScrollAsia: {
		path: 'bottom/tech-scroll-asia'
	},
	b2bTrialAnon: {
		path: 'bottom/lazy',
		lazy: true
	},
	appPromoMobile: {
		path: 'bottom/app-promo-mobile'
	},
	contentMessage: {
		path: 'bottom/content-message'
	},
	b2cTrialAcquisitions: {
		path: 'bottom/lazy',
		lazy: true
	},
	b2cSubAcquisitions: {
		path: 'bottom/lazy',
		lazy: true
	},
	ftWeekendPromo: {
		path: 'bottom/ft-weekend-promo'
	},
	giftArticles: {
		path: 'top/gift-articles',
		tooltip: true
	},
	myFtFeedpage: {
		path: 'top/my-ft-feedpage',
		tooltip: true
	}
};
