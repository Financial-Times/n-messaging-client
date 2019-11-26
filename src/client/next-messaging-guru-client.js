module.exports = function ({ guruEndpoint='/__message', name, guruQueryString }={}) {
	const url = `${guruEndpoint}/${name}${guruQueryString ? '?' + guruQueryString : ''}`;
	const options = {
		method: 'GET',
		headers: {
			'Accept': 'application/json'
		},
		credentials: 'same-origin'
	};
	const responseContract = (json) => {
		if (!json.skip && json.data && json.renderData) return true;
		throw new Error('Bad response body');
	};
	return fetch(url, options)
		.then(res => {
			if (res.status === 200) return res.json();
			res.text().then(txt => {
				throw new Error(`Bad response status ${status}: ${txt}`);
			});
		})
		.then(json => {
			if (json.skip) return json;
			return responseContract(json) && json;
		})

		// I'm so, so sorry. I don't want message guru to
		// block the release of this project, as it'll throw
		// the whole cascade off. I know this is gross, we
		// should definitely fix it after or at the end of
		// the cascade. However also messaging guru probably
		// shouldn't be in charge of classnames etc as it
		// means that a back-end API is non-explicitly
		// coupled to o-banner's client-side JS API.
		.then(json => {
			const validBannerThemes = [
				'product',
				'marketing'
			];
			const validBannerLayouts = [
				'small',
				'compact'
			];

			json.renderData.customThemes = [];

			if (json && json.renderData && Array.isArray(json.renderData.theme)) {
				const themes = json.renderData.theme;
				for (const theme of themes) {
					if (validBannerThemes.includes(theme)) {
						json.renderData.bannerTheme = theme;
					} else if (validBannerLayouts.includes(theme)) {
						json.renderData.bannerLayout = theme;
					} else {
						json.renderData.customThemes.push(theme);
					}
				}
			}

			return json;
		})

		.catch(() => {
			return false;
		});
};
