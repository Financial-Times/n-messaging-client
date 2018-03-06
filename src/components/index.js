const inviteColleagues = require('./invite-colleagues/main');
const appBanner = require('./desktop-app-banner/main');
const anonSubscribe = require('./anon-subscribe-now-teal/main');
const adBlockerSubBanner = require('./ad-blocker-sub-banner/main');
const adBlockerRegBanner = require('./ad-blocker-reg-banner/main');

module.exports = {
	b2bUpsellBanner: inviteColleagues,
	appPromotingBanner: appBanner,
	anonSubscribeNow: anonSubscribe,
	adBlockerSubBanner,
	adBlockerRegBanner
};
