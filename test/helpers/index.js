const path = require('path');
const semver = require('semver');
const {loadNycConfig} = require('../..');

const hasESM = semver.gte(process.versions.node, '13.2.0');

function fixturePath(...args) {
	return path.resolve(__dirname, '..', 'fixtures', ...args);
}

function sanitizeConfig(config) {
	if (config.cwd === path.resolve('/')) {
		config.cwd = 'root:;';
	} else {
		config.cwd = path.basename(config.cwd);
	}

	return config;
}

async function basicTest(t) {
	const cwd = fixturePath(t.name);
	const config = await loadNycConfig({cwd});

	t.matchSnapshot(sanitizeConfig(config));
}

module.exports = {
	fixturePath,
	sanitizeConfig,
	basicTest,
	hasESM
};
