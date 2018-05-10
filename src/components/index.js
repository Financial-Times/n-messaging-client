const inviteColleagues = require('./invite-colleagues/main');
const appBanner = require('./desktop-app-banner/main');
const cookieConsent = require('./cookie-consent/main');
const anonSubscribe = require('./anon-subscribe-now-teal/main');
const navContactPreferences = require('./nav-contact-preferences/main');
const profile = require('./profile/main');

module.exports = {
	b2bUpsellBanner: inviteColleagues,
	appPromotingBanner: appBanner,
	cookieConsentA: cookieConsent,
	cookieConsentB: cookieConsent,
	anonSubscribeNow: anonSubscribe,
	navContactPreferences,
	profile
};
