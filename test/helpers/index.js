const path = require('path');
const {loadNycConfig} = require('../..');

function fixturePath(...args) {
	return path.join(__dirname, '..', 'fixtures', ...args);
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

function canImport() {
	try {
		return typeof require('../../load-esm') === 'function';
	} catch (_) {
		return false;
	}
}

async function hasESM() {
	try {
		const loader = require('../../load-esm');
		try {
			await loader(require.resolve('./esm-tester.mjs'));
			return true;
		} catch (_) {
			return false;
		}
	} catch (_) {
		return false;
	}
}

module.exports = {
	fixturePath,
	sanitizeConfig,
	basicTest,
	hasImport: canImport(),
	hasESM
};
