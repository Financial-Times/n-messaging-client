const inviteColleagues = require('./invite-colleagues/main');
const appBanner = require('./desktop-app-banner/main');
const anonSubscribe = require('./anon-subscribe-now-teal/main');
const adBlockerSubBanner = require('./ad-blocker-sub-banner/main');
const adBlockerRegBanner = require('./ad-blocker-reg-banner/main');
const navMyFt = require('./nav-myft/main');
const navContactPreferences = require('./nav-contact-preferences/main');

module.exports = {
	b2bUpsellBanner: inviteColleagues,
	appPromotingBanner: appBanner,
	anonSubscribeNow: anonSubscribe,
	adBlockerSubBanner,
	adBlockerRegBanner,
	navMyFt,
	navContactPreferences
};
