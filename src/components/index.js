const inviteColleagues = require('./invite-colleagues/main');
const appBanner = require('./desktop-app-banner/main');
const anonSubscribe = require('./anon-subscribe-now-teal/main');

module.exports = {
	b2bUpsellBanner: inviteColleagues,
	appPromotingBanner: appBanner,
	anonSubscribeNow: anonSubscribe
};
