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
	},
	registrationNotice: {
		partial: 'top/registration-notice',
		messageId: 'registrationNotice'
	},
	anonSubscribeNow: {
		partial: 'top/anon-subscribe-now-teal',
		messageId: 'anonSubscribeNow',
	},
	marketingPopupPrompt: {
		partial: 'bottom/lazy',
		messageId: 'marketingPopupPrompt',
		guruQueryString: 'offerId=c1773439-53dc-df3d-9acc-20ce2ecde318'
	},
	adBlockerSubBanner: {
		partial: 'bottom/ad-blocker-sub-banner',
		messageId: 'adBlockerSubBanner'
	},
	adBlockerRegBanner: {
		partial: 'bottom/ad-blocker-reg-banner',
		messageId: 'adBlockerRegBanner'
	},
	gdprConsent: {
		partial: 'top/gdpr-consent',
		messageId: 'gdprConsent'
	},
	navMyFt: {
		partial: 'top/nav-my-ft',
		messageId: 'navMyFt',
		tooltip: true
	},
	navContactPreferences: {
		partial: 'top/nav-contact-preferences',
		messageId: 'navContactPreferences',
		tooltip: true
	}
};
