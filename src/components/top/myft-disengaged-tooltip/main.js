import Tooltip from 'o-tooltip';
import myftClient from 'next-myft-client';
import {broadcast} from 'n-ui-foundations';
import Cookies from 'js-cookie';

const articleAddToMyftButton = document.querySelector('.topper__primary-theme .n-myft-follow-button');
const headerMyFTLogo = document.querySelector('[data-trackable="my-ft"]');
const externalReferer = !document.referrer || !(new URL(document.referrer).hostname.endsWith('ft.com'));
const ARTICLE_TOOLTIP_SEEN_COUNT_COOKIE_NAME = 'FT_MyFT_article_tooltip';
const {FT: {flags = {get: () => {}}} = {}} = window;
let articleTooltipSeenCount = Cookies.get(ARTICLE_TOOLTIP_SEEN_COUNT_COOKIE_NAME) || 0;

module.exports = async (banner, done) => {

	try {

		await myftClient.init([{relationship: 'followed', type: 'concept'}]);
		const followedConcepts = await myftClient.getAll('followed', 'concept');

		if (followedConcepts.length && externalReferer) {
			showHeaderTooltip(followedConcepts);
		} else if (!followedConcepts.length && articleTooltipSeenCount < 3) {
			showAboutTooltip(banner);
		}

		done();
	} catch (e) {
		done(e);
	}
};

function showHeaderTooltip (banner, followedConcepts) {
	if (!headerMyFTLogo) return;
	const concepts = followedConcepts
		.sort((a, b) => b.lastPublished - a.lastPublished)
		.map(({name}) => `<span style="white-space: nowrap">${name}</span>`)
		.slice(0, 3);
	let content = 'Read the latest';

	if (concepts.length === 3) {
		content += ` ${concepts.shift()}, `;
	}

	content += concepts.join(' and ');
	content += ' stories.';

	broadcast('oTracking.event', {
		action: 'criteria-met',
		category: 'myft-disengaged-tooltip',
		detail: {
			type: 'header-tooltip',
			followedConceptCount: followedConcepts.length
		}
	});

	if (flags.get('MyFT_DisengagedTooltipsTest')) {
		const tooltip = new Tooltip(headerMyFTLogo, {
			target: 'myft-disengaged-tooltip',
			content: content,
			showOnConstruction: true,
			position: 'below'
		});
		tooltip.tooltipEl.addEventListener('oTooltip.close', () => banner.close());
	}

}

function showAboutTooltip (banner) {
	if (!articleAddToMyftButton) return;
	const topicName = document.querySelector('.topper__primary-theme .js-primary-theme').innerText;
	const content = [
		`Find ${topicName} stories easily.`,
		'Start your feed.'
	]
		.map(line => `<span style="display: block">${line}</span>`)
		.join(' ');

	broadcast('oTracking.event', {
		action: 'criteria-met',
		category: 'myft-disengaged-tooltip',
		detail: {
			type: 'article-page-about-tooltip',
			followedConceptCount: 0
		}
	});


	if (flags.get('MyFT_DisengagedTooltipsTest')) {
		const tooltip = new Tooltip(articleAddToMyftButton, {
			target: 'myft-disengaged-tooltip',
			content: content,
			showOnConstruction: true,
			position: 'below'
		});
		articleTooltipSeenCount++;
		Cookies.set(ARTICLE_TOOLTIP_SEEN_COUNT_COOKIE_NAME, articleTooltipSeenCount, { expires: 365, path: '/content' });
		tooltip.tooltipEl.addEventListener('oTooltip.close', () => banner.close());
	}
}
