const { getCurrentLayout } = require('o-grid');

module.exports = function customSetup (banner, done) {

	function hasAdBlockingClass () {
		if (document.documentElement.classList.contains('isAdBlocking')) return true;
	}

	function isDesktop () {
		return ['L', 'XL'].indexOf(getCurrentLayout()) !== -1;
	}

	function isVideo () {
		if (document.querySelector('.content__video')) return true;
	}

	if (hasAdBlockingClass() && isDesktop() && !isVideo()) {
		done();
	} else {
		done({ skip: true });
	}

};
