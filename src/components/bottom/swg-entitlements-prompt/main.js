const swgLoader = require('n-swg').swgLoader;

module.exports = (banner, done) => {
		return swgLoader()
			.then(swg => {
				swg.init();
				return swg.checkEntitlements();
			})
			.catch(() => { /* fail silently */ })
			.finally(done);
};
