const path = require('path');
const {loadNycConfig} = require('../..');

function fixturePath(...args) {
	return path.join(__dirname, '..', 'fixtures', ...args);
}

function basicTest(t) {
	const cwd = fixturePath(t.name);

	t.matchSnapshot(loadNycConfig({cwd}));
	t.end();
}

module.exports = {
	fixturePath,
	basicTest
};
