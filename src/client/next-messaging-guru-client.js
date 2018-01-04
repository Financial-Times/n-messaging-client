module.exports = function (params) {
	// TODO: actually fetch this async from an api
	// fetch from next-messaging-client
	// include: 'same-origin'
	// params: {
	// 	messageName
	// }
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Object.assign({}, {
				theme: ['marketing', 'small'],
				contentLong: `
				<header class="n-messaging-banner__heading">
					<h1>Your school has free access to FT.com, make the most of it!</h1>
				</header>
				<p>If you are 16-19 years old, create your own free account.</p>
				<ul>
					<li>Access FT from anywhere</li>
					<li>Download the app for news on the go</li>
					<li>Recieve the weekly schools newsletter</li>
				</ul>
				`,
				contentShort: `
				<header class="n-messaging-banner__heading">
					<h1>Your school has free access to FT.com, make the most of it!</h1>
				</header>
				<p>If you are 16-19 years old, create your own free account.</p>
				`,
				buttonLabel: 'Activate subscription',
				buttonUrl: '#try-button'
			}, params));
		}, 2000);
	});
};
