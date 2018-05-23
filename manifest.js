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
	marketingPopupPrompt: {
		partial: 'bottom/lazy',
		messageId: 'marketingPopupPrompt',
		guruQueryString: 'offerId=c1773439-53dc-df3d-9acc-20ce2ecde318'
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
	gdprConsent: {
		partial: 'top/gdpr-consent',
		messageId: 'gdprConsent'
	},
	navContactPreferences: {
		partial: 'top/nav-contact-preferences',
		messageId: 'navContactPreferences',
		tooltip: true
	},
	privacyPolicy: {
		partial: 'top/privacy-policy',
		messageId: 'privacyPolicy'
	},
	deloitteSubscription: {
		partial: 'top/deloitte-subscription',
		messageId: 'deloitteSubscription'
	}
};
