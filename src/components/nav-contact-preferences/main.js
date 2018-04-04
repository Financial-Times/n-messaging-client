const oTooltip = require('o-tooltip');

module.exports = function customSetup (banner, done) {

	const contentEl = banner.innerElement.querySelector('.n-alert-banner__content');
	const targetElement = document.querySelector('[data-id="subnav-alerts"]');
	const opts = {
		target: '[data-id="subnav-alerts"]',
		content: contentEl.innerHTML,
		showOnConstruction: true,
		position: 'below'
	};

	const tooltip = new oTooltip(targetElement, opts);
	tooltip.tooltipEl.classList.add('n-messaging-client-tooltip');
	done();
};
