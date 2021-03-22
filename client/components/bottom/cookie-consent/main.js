const oCookieMessage = require('@financial-times/o-cookie-message').default;

module.exports = function customSetup () {
	oCookieMessage.init();
};
