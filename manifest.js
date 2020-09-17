module.exports = {
	licenceJoinPromptSsiClient: { // name of flag variant and must match the messageId in ammit-api
		path: 'bottom/lazy', // path to template
		lazy: true
	},
	ssiSurvey: {
		path: 'bottom/secondary-school-survey'
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
		path: 'bottom/marketing-popup-prompt',
		lazy: true,
		guruQueryString: 'offerId=499f84e9-d7fb-f90d-ba6a-9cbb65060a44',
		trackingContext: {
			opportunity_type: 'marketingPrompt',
			opportunity_subtype: 'discount_33%off'
		}
	},
	paymentFailure: {
		path: 'top/payment-failure'
	},
	anonSubscribeNow: {
		path: 'top/anon-subscribe-now',
		trackingContext: {
			opportunity_type: 'marketingPrompt',
			opportunity_subtype: 'top_trial_splitter'
		}
	},
	ukElection: {
		path: 'top/uk-election'
	},
	printBannerUsa: {
		path: 'top/print-banner-usa',
		trackingContext: {
			opportunity_type: 'marketingPrompt',
			opportunity_subtype: 'top_trial_splitter_US'
		}
	},
	navAccountSettings: {
		path: 'top/nav-account-settings',
		tooltip: true
	},
	contentMessage: {
		path: 'bottom/content-message'
	},
	myftDisengagedTooltip: {
		path: 'top/myft-disengaged-tooltip',
		tooltip: true
	},
	usElection2020Promo: {
		path: 'bottom/us-election-2020-promo'
	},
	coronavirusNewsletterPromoTop: {
		path: 'top/coronavirus-newsletter-promo-top'
	},
	tbybInTrialSubscribe: {
		path: 'bottom/tbyb-in-trial-subscribe'
	},
	tbybPostTrialSubscribe: {
		path: 'bottom/tbyb-post-trial-subscribe'
	},
	energySourcePromo: {
		path: 'top/energy-source-promo',
		trackingContext: {
			newsletterId: '5655d099e4b01077e911d60f',
		},
	},
	remainingArticlesTest: {
		path: 'bottom/remaining-articles',
		lazy: true
	},
	tryFullAccess: {
		path: 'top/lazy',
		lazy: true,
		guruQueryString: 'offerId=683995bf-ed3f-2fd6-d589-1628ebad1629',
	},
};
