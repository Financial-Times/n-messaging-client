module.exports = {
	files: {
		allow: [
			'secret-squirrel.cjs'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'4312a4ca-aeac-11e8-99ca-68cf89602132', // demos/templates/layouts/custom-vanilla.html:14
			'97212eb0-abb9-11e8-8253-48106866cd8a', // demos/templates/layouts/custom-vanilla.html:29
			'info@companyx\\.com', // docs/corporate-cancellation-message.md:31|36
			'16b14c00-c43e-f3fb-a3fd-2355127d3e69', // docs/lazy-and-static-messages.md:37, server/templates/partials/top/digital-marketing-new-world.html:5
			'41218b9e-c8ae-c934-43ad-71b13fcb4465', // docs/lazy-and-static-messages.md:84, manifest.js:73
			'499f84e9-d7fb-f90d-ba6a-9cbb65060a44', // manifest.js:21
			'da448d11-851d-545c-dc0e-e9a2aef62e54', // secret-squirrel.cjs:9
			'eb62aef2-4bdc-0f31-a2c5-6532b8e17896', // server/templates/partials/bottom/content-message.html:16
			'5f60b8b4-cbf0-18d7-df41-9caa1171e8c1', // server/templates/partials/top/anon-subscribe-now.html:5|18
			'0b1f847b-03f4-87d5-1f1d-ef958102d37c', // server/templates/partials/top/cop-open-day-climate-capital-anon.html:5
			'a44c9005-2a9c-fe2a-9140-1311ff87f25f' // server/templates/partials/top/print-banner-usa.html:4
		]
	}
};
