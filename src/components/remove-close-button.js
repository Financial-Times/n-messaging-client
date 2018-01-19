module.exports = function removeCloseButton (alertBanner, done) {
	alertBanner.closeButtonElement.remove();
	done();
}
