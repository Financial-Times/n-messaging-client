const inviteColleagues = require('./invite-colleagues/main');
const appPromotingBanner = require('./app-promoting-banner/main');
const cookieConsent = require('./cookie-consent/main');

module.exports = {
	inviteColleagues,
	appPromotingBanner,
	cookieConsentA: cookieConsent,
	cookieConsentB: cookieConsent,
	cookieConsentC: cookieConsent
};
