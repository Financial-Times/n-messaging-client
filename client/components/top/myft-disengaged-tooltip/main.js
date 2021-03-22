// This tooltip should be displayed for users who fill all the requirements below
// - who are in disengaged cohort (it has been already checked when the decision for displaying this tooltip was made (messageSlotTop flag === 'MyftDisengagedTooltip'))
// - who haven't followed any topics
// - who haven't seen the tooltip more than 3 times

import Tooltip from '@financial-times/o-tooltip';
import myftClient from 'next-myft-client/myft-bower';
import {broadcast} from 'n-ui-foundations';
import Cookies from 'js-cookie';

const articleAddToMyftButton = document.querySelector('.topper__primary-theme .n-myft-follow-button');
const ARTICLE_TOOLTIP_SEEN_COUNT_COOKIE_NAME = 'FT_MyFT_article_tooltip';
let articleTooltipSeenCount = Cookies.get(ARTICLE_TOOLTIP_SEEN_COUNT_COOKIE_NAME) || 0;

export default function customSetup (banner, done) {
	if(!articleAddToMyftButton || articleTooltipSeenCount >= 3) {
		return;
	}

	myftClient.init([{relationship: 'followed', type: 'concept'}])
		.then(() => myftClient.getAll('followed', 'concept'))
		.then(followedConcepts => showTooltip(followedConcepts, banner))
		.finally(() => done());
}

function showTooltip (followedConcepts, banner) {
	if (followedConcepts.length > 0) {
		return;
	}

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
