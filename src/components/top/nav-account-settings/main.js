const oTooltip = require('o-tooltip');

module.exports = function customSetup (banner, done) {
	const selector = '[data-trackable="Account Settings"]';
	const contentEl = banner.messageElement.querySelector('.n-alert-banner__content');
	const targetElement = document.querySelector(selector);
	const opts = {
		target: selector,
		content: contentEl.innerHTML,
		showOnConstruction: true,
		position: 'below'
	};

	if (targetElement) {
		const tooltip = new oTooltip(targetElement, opts);
		tooltip.tooltipEl.classList.add('n-messaging-client-tooltip');
		tooltip.tooltipEl.querySelector('.n-alert-banner__content-main').classList.add('n-alert-banner--alert-bleed');
		tooltip.tooltipEl.addEventListener('oTooltip.close', () => {
			banner.close();
		});
	}
	done();
};
