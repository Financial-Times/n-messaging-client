const inviteColleagues = require('./invite-colleagues/main');
const appPromotingBanner = require('./app-promoting-banner/main');
const cookieConsent = require('./cookie-consent/main');
const anonSubscribeNow = require('./anon-subscribe-now-teal/main');
const navContactPreferences = require('./nav-contact-preferences/main');
const teamTrial = require('./team-trial/main');

module.exports = {
	inviteColleagues,
	appPromotingBanner,
	cookieConsentA: cookieConsent,
	cookieConsentB: cookieConsent,
	cookieConsentC: cookieConsent,
	anonSubscribeNow,
	navContactPreferences,
	teamTrial
};
