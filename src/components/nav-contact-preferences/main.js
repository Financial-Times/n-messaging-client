const oTooltip = require('o-tooltip');

module.exports = function customSetup (banner, done) {

	const contentEl = banner.messageElement.querySelector('.n-alert-banner__content');
	const targetElement = document.querySelector('[data-id="subnav-alerts"]');
	const opts = {
		target: '[data-id="subnav-alerts"]',
		content: contentEl.innerHTML,
		showOnConstruction: true,
		position: 'below'
	};

	const tooltip = new oTooltip(targetElement, opts);
	tooltip.tooltipEl.classList.add('n-messaging-client-tooltip');
	tooltip.tooltipEl.querySelector('.n-alert-banner__content-main').classList.add('n-alert-banner--alert-bleed');
	tooltip.tooltipEl.addEventListener('oTooltip.close', () => {
		banner.close();
	});
	done();
};
