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
	printBannerUsa: {
		path: 'top/print-banner-usa',
		trackingContext: {
			opportunity_type: 'marketingPrompt',
			opportunity_subtype: 'top_trial_splitter_US'
		}
	},
	contentMessage: {
		path: 'bottom/content-message'
	},
	myftDisengagedTooltip: {
		path: 'top/myft-disengaged-tooltip',
		tooltip: true
	},
	tbybInTrialSubscribe: {
		path: 'bottom/tbyb-in-trial-subscribe'
	},
	postActivationJourney: {
		path: 'bottom/post-activation-journey'
	},
	tbybPostTrialSubscribe: {
		path: 'bottom/tbyb-post-trial-subscribe'
	},
	wapoInTrialSubscribe: {
		path: 'bottom/wapo-in-trial-subscribe'
	},
	wapoPostTrialSubscribe: {
		path: 'bottom/wapo-post-trial-subscribe'
	},
	remainingArticlesTest: {
		path: 'bottom/remaining-articles',
		lazy: true
	},
	aberdeenStandardLifeCancellation: {
		path: 'bottom/asi-cancellation'
	},
	tryFullAccess: {
		path: 'top/lazy',
		lazy: true,
		guruQueryString: 'offerId=41218b9e-c8ae-c934-43ad-71b13fcb4465',
	},
	threeMonthsIntroPricePromo: {
		path: 'top/lazy',
		lazy: true,
	},
	climateCapitalFeedback: {
		path: 'top/lazy',
		lazy: true,
	}
};
