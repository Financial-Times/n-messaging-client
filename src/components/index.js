const b2bUpsellBanner = require('./invite-colleagues/main');
const appPromotingBanner = require('./desktop-app-banner/main');
const cookieConsent = require('./cookie-consent/main');
const anonSubscribeNow = require('./anon-subscribe-now-teal/main');
const navAccountSettings = require('./nav-account-settings/main');
const teamTrial = require('./team-trial/main');

module.exports = {
	b2bUpsellBanner,
	appPromotingBanner,
	cookieConsentA: cookieConsent,
	cookieConsentB: cookieConsent,
	cookieConsentC: cookieConsent,
	anonSubscribeNow,
	navAccountSettings,
	teamTrial
};
