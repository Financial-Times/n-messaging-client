const fs = require('fs');
const bowerPackage = require('../bower.json');
const npmPackage = require('../package.json');

function standardNpmPackage (version, name) {
	return `npm:@financial-times/${name}@${version}`;
}

const resolutionMap = {
	'n-swg': standardNpmPackage,
	'n-ui-foundations': () => 'github:financial-times/n-ui-foundations#nobower',
	'next-myft-client': (version) => `${version}`,
	'o-banner': standardNpmPackage,
	'o-cookie-message': standardNpmPackage,
	'o-grid': standardNpmPackage,
	'o-loading': standardNpmPackage,
	'o-message': standardNpmPackage,
	'o-overlay': standardNpmPackage,
	'o-share': standardNpmPackage,
	'o-tooltip': standardNpmPackage,
	'o-tracking': standardNpmPackage,
	'o-typography': standardNpmPackage,
	'o-viewport': standardNpmPackage,
	// TODO: investigate why new version are not available on npm but only 20.
	'n-myft-ui': (_, name) => `npm:@financial-times/${name}@^20.0.0-beta.1`,
};

for (const dependency in bowerPackage.dependencies) {
	if (!resolutionMap[dependency]) {
		throw new Error(
			`Please update fromBowerToNpm resolution map with the Bower package ${dependency}, so it will be usable also from NPM consumers`
		);
	} else {
		npmPackage.dependencies[dependency] = resolutionMap[dependency](
			bowerPackage.dependencies[dependency],
			dependency
		);
	}
}

fs.writeFileSync('package.json', JSON.stringify(npmPackage, null, 2));
