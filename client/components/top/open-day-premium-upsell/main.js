module.exports = function customSetup (banner, done) {
	let openDayBanner = document.getElementById('openDayBanner');

	let target = document.querySelector('#site-content[data-access-level="premium"]');
	if (target) {
		openDayBanner.style.display = 'block';
	}

	done();
};
