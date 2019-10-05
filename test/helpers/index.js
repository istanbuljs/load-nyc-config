const path = require('path');
const {loadNycConfig} = require('../..');

function fixturePath(...args) {
	return path.join(__dirname, '..', 'fixtures', ...args);
}

async function basicTest(t) {
	const cwd = fixturePath(t.name);

	t.matchSnapshot(await loadNycConfig({cwd}));
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
	basicTest,
	hasImport: canImport(),
	hasESM
};
