const b2bUpsellBanner = require('./invite-colleagues/main');
const appPromotingBanner = require('./desktop-app-banner/main');
const cookieConsent = require('./cookie-consent/main');
const anonSubscribeNow = require('./anon-subscribe-now-teal/main');
const navContactPreferences = require('./nav-contact-preferences/main');
const teamTrial = require('./team-trial/main');
const marketingPopupPrompt = require('./marketingPopupPrompt/main');

module.exports = {
	b2bUpsellBanner,
	appPromotingBanner,
	cookieConsentA: cookieConsent,
	cookieConsentB: cookieConsent,
	anonSubscribeNow,
	navContactPreferences,
	teamTrial,
	marketingPopupPrompt
};
