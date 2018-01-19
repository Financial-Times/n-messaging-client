const inviteColleagues = require('./invite-colleagues/main');
const removeCloseButton = require('./remove-close-button');

module.exports = {
	b2bUpsellBanner: inviteColleagues,
	paymentFailure: removeCloseButton
};
