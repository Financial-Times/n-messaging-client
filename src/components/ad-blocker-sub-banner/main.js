const { getCurrentLayout } = require('o-grid');

module.exports = function customSetup (banner, done) {
	function isDesktop () {
		return ['L', 'XL'].indexOf(getCurrentLayout()) !== -1;
	}

	function isVideo () {
		if (document.querySelector('.content__video')) return true;
	}

	if (isDesktop () && !isVideo()) {
		done();
	} else {
		done({ skip: true });
	}

};
