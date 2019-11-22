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
		const relativeCWD = path.relative(path.resolve(__dirname, '..', '..'), config.cwd);
		config.cwd = 'package-root:;' + relativeCWD.replace(/\\/g, path.posix.sep);
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
