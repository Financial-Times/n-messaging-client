const oTooltip = require('o-tooltip');

module.exports = function customSetup (banner, done) {

	const contentEl = banner.innerElement.querySelector('.n-alert-banner__content');
	const targetElement = document.querySelector('.o-header__top-link--myft').parentElement;
	const opts = {
		target: 'o-header__top-link--myft',
		content: contentEl.innerHTML,
		showOnConstruction: true,
		position: 'below'
	};

	const tooltip = new oTooltip(targetElement, opts);
	tooltip.tooltipEl.classList.add('n-messaging-client-tooltip');
	done();
};
