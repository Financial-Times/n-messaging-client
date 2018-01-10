module.exports = function ({ guruEndpoint='https://www.ft.com/__message', name }={}) {
	const url = `${guruEndpoint}/${name}`;
	const options = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin' // todo: allow easier local guru testing as this won't work due to different ports
	};
	const responseContract = (json) => {
		if (!json.skip && json.data && json.renderData) return true;
		throw new Error('Bad response body');
	};
	return fetch(url, options)
		.then(res => {
			if (res.status === 200) return res.json();
			res.text().then(txt => {
				throw new Error(`Bad response status ${status}: ${txt}`)
			});
		})
		.then(json => {
			if (json.skip) return json;
			return responseContract(json) && json;
		})
		.catch(() => {
			return false;
		});
};
